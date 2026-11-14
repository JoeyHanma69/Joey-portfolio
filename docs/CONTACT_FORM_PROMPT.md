Everything below this line is the prompt. Copy it whole into a coding
agent, or work through it yourself.

---

You are fixing a broken contact form in a React portfolio. Read the whole
brief before writing code.

## The bug

`src/Components/Contact.jsx` renders a contact form that **never sends
anything, but tells the user it did.** The entire submit handler is:

```jsx
const handleSubmit = (e) => {
  e.preventDefault()
  setSubmitted(true)
  setTimeout(() => { setSubmitted(false); e.target.reset() }, 3000)
}
```

It cancels the submit, flips a flag that changes the button to `Sent ✓`,
then clears the fields. There is no `fetch`, no backend, no email
service, no `action`.

A real client used this form and their message was lost. The success tick
is the damaging part — a visibly broken form would have made them email
instead.

Three facts confirm the diagnosis:

- No `api/` directory, no `vercel.json`, no `.env` in the repo.
- Zero network calls anywhere in `src/` — no `fetch`, `axios`, EmailJS or
  Formspree.
- Zero `name=` attributes on the inputs, and the values are never read
  into state. Even bolting on a POST would send empty fields.

## The target

Make the form actually deliver mail, and never claim success unless the
server confirmed it.

There is a **working reference implementation in the same GitHub
account**: `JoeyHanma69/qe-mandarin-website`, file `api/contact.js`. It is
a Vercel serverless function using `nodemailer` with Gmail, including a
honeypot field and a submission-timing check. Port that approach. Do not
invent a different one.

## This project's constraints

- React 19 + Vite 8 single-page app. The reference project is plain
  static HTML, so the function ports directly but the client code does
  not — you are writing React, not vanilla JS.
- Deployed on Vercel at `joey-portfolio-silk.vercel.app`, auto-deploying
  from `main`.
- Vercel picks up serverless functions from an `api/` directory at the
  **repo root**, not inside `src/`. Vite will not bundle it and must not
  try to.
- `npm run dev` (Vite) does **not** run serverless functions. Local
  testing of the endpoint needs `npx vercel dev`. Say so in the README
  rather than leaving a trap.
- The submit button uses `.btn-primary`, whose `::before` and `::after`
  are already taken by the quickhack bar and the corner tick. A loading
  state must not rely on a free pseudo-element on that class.
- Palette variables live in `src/index.css` `:root`. Error text should
  use `--cp-red`, success `--cp-blue`. Do not introduce a new colour.

## Tasks

### Task 1 — the serverless function

Create `api/contact.js` at the repo root, modelled on the reference.

It must:

- Accept `POST` only; reply `405` with an `Allow: POST` header otherwise.
- Read JSON `{ name, email, message, website, loaded_at }`.
- **Honeypot:** if `website` is non-empty, return `200 { success: true }`
  without sending. Pretending success means the bot learns nothing.
- **Timing:** if `loaded_at` is present and the submission came less than
  3 seconds after page load, return `200 { success: true }` without
  sending.
- Trim and validate: all three fields required; email must match a basic
  pattern; cap lengths at name 100, email 200, message 3000.
- Read `GMAIL_USER`, `GMAIL_APP_PASSWORD` and optional `TO_EMAIL` from
  `process.env`. If the credentials are missing, log to the server and
  return a `500` with a user-safe message — never leak which variable is
  unset to the client.
- Send via `nodemailer` with `service: 'gmail'`, setting `replyTo` to the
  sender so replying from the inbox goes to the client.
- Strip CR/LF from the name before putting it in the subject line —
  header injection.
- Return `{ success: true }` or `{ success: false, error }`, and log
  failures with `console.error` so they appear in Vercel's logs.

Add `nodemailer` to `dependencies` in `package.json`. The portfolio's
`package.json` currently has no server dependencies.

### Task 2 — rewrite the client form

Rewrite the form part of `src/Components/Contact.jsx`. Leave the section
heading, the intro copy, the email/phone block and the social links
exactly as they are — they already work and the email and phone are the
real fallback.

Requirements:

- Controlled inputs backed by state, with `name` attributes. Both: the
  state is what you POST, the names make the markup honest.
- A hidden honeypot input named `website`, visually hidden but not
  `display: none`, `tabIndex={-1}` and `autoComplete="off"`.
- Capture page-load time once on mount and send it as `loaded_at`.
- Four explicit states: `idle`, `sending`, `sent`, `error`. The button is
  disabled while `sending`.
- **The success state must only be set when the response is `ok` and the
  JSON says `success: true`.** This is the actual bug. A network failure,
  a 500, or a `success: false` must land in `error`, not `sent`.
- On error, show the server's message if present, otherwise a generic
  one, **and show the direct email address as a fallback** so nobody is
  stranded a second time.
- Wrap the `fetch` in try/catch — an offline client throws rather than
  returning a bad response.
- Only reset the fields on genuine success.
- Announce the result to assistive tech with `role="status"` and
  `aria-live="polite"`.

### Task 3 — document the setup

Add a short section to `README.md` covering:

- The three Vercel environment variables, and that `GMAIL_APP_PASSWORD`
  is a 16-character Google app password from
  `myaccount.google.com/apppasswords`, which needs 2-Step Verification
  enabled. It is not the account password.
- That the secret lives only in Vercel's project settings and must never
  be committed.
- That `npm run dev` will not exercise the endpoint and `npx vercel dev`
  is required to test it locally.

## Definition of done

- `npx vite build` clean, `npx eslint src --ext .js,.jsx` clean.
- Submitting with the network blocked shows the **error** state, not
  `Sent ✓`. Test this explicitly — it is the regression that caused the
  original problem.
- Submitting with a 500 from the server shows the error state.
- The honeypot path returns success without sending.
- No secret appears anywhere in the repo or in the client bundle.
- The form still looks correct in the existing cyberpunk styling, with no
  new colours and no layout shift between states.

Report what you changed and what you verified. If you could not verify
real mail delivery because the environment variables are not set, say so
plainly rather than implying it was tested end to end.
