import { useState } from 'react'
import './stylesheet/Contact.css'
import SlashReveal from './SlashReveal';

const INBOX = 'linaojoseph3111@gmail.com'

/* Stopgap until the form has a real backend.

   This used to fake a send: it cancelled the submit, showed "Sent ✓" and
   cleared the fields, while the message went nowhere. A client lost an
   enquiry that way.

   The first replacement handed off with mailto:, which turned out to be
   just as bad in practice — mailto goes to the OS default mail app, and
   on a machine where mail lives in a browser tab there is often nothing
   registered to handle it, so the click did nothing at all. Silently.

   So the primary action is now Gmail's web compose window, which needs
   no desktop client, and copy-to-clipboard sits behind it as the path
   that cannot fail. The address is on screen either way. */
export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [note, setNote] = useState(null)   // null | 'gmail' | 'copied' | 'copyfail'

    const update = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

    // Collapse newlines out of the subject — a mail header cannot span lines.
    const subject = () =>
        `Portfolio enquiry from ${form.name}`.replace(/\s+/g, ' ').trim()

    const body = () =>
        [`Name: ${form.name}`, `Email: ${form.email}`, '', form.message, ''].join('\n')

    const handleSubmit = (e) => {
        e.preventDefault()
        const url =
            'https://mail.google.com/mail/?view=cm&fs=1' +
            `&to=${encodeURIComponent(INBOX)}` +
            `&su=${encodeURIComponent(subject())}` +
            `&body=${encodeURIComponent(body())}`
        window.open(url, '_blank', 'noopener,noreferrer')
        setNote('gmail')
    }

    const handleCopy = async () => {
        const text = `To: ${INBOX}\nSubject: ${subject()}\n\n${body()}`
        try {
            await navigator.clipboard.writeText(text)
            setNote('copied')
        } catch {
            // Insecure context, or permission refused.
            setNote('copyfail')
        }
    }
 return (
    <section id="contact" className="contact-section" style={{position:'relative',overflow:'hidden'}}>
    <SlashReveal />
    <div className="container">
    <div className="section-header" data-reveal>
    <p className="section-eyebrow">// summon_me</p>
    <h2 className="section-title">Contact</h2>
    <div className="section-divider" />
    </div>
    <p className="contact-intro">
        Ready to forge something? Send the signal — whether it's a software campaign, a world to build, or an AI weapon to deploy.
    </p>
    <form className="contact-form" data-reveal onSubmit={handleSubmit}>
    <div className="form-group">
    <label htmlFor="cf-name">Name</label>
    <input id="cf-name" name="name" type="text" placeholder="Your name"
        value={form.name} onChange={update} required />
    </div>
    <div className="form-group">
    <label htmlFor="cf-email">Email</label>
    <input id="cf-email" name="email" type="email" placeholder="your@email.com"
        value={form.email} onChange={update} required />
    </div>
    <div className="form-group">
    <label htmlFor="cf-message">Message</label>
    <textarea id="cf-message" name="message" placeholder="What do you want to forge together?"
        value={form.message} onChange={update} required />
    </div>
    <div className="contact-actions">
        <button type="submit" className="btn-primary">Open in Gmail</button>
        <button type="button" className="btn-secondary" onClick={handleCopy}>Copy Message</button>
    </div>
    <p className="contact-note" role="status" aria-live="polite">
        {note === 'gmail' &&
            <>Gmail should have opened in a new tab with this message ready — you still press send there. Blocked by a popup blocker, or not a Gmail user? Use <strong>Copy Message</strong> and send it to <a href={`mailto:${INBOX}`}>{INBOX}</a>.</>}
        {note === 'copied' &&
            <>Copied. Paste it into any email app and send to <a href={`mailto:${INBOX}`}>{INBOX}</a>.</>}
        {note === 'copyfail' &&
            <>Could not reach your clipboard. Email <a href={`mailto:${INBOX}`}>{INBOX}</a> directly — or just call.</>}
        {note === null &&
            <>This does not send on its own. It opens Gmail with the message filled in, or copies it for any other mail app. Either way it reaches <a href={`mailto:${INBOX}`}>{INBOX}</a>.</>}
    </p>
    </form>
    <div className="contact-details" data-reveal style={{ '--reveal-delay': '120ms' }}>
        <div className="contact-detail-item">
            <span className="contact-detail-label">// email</span>
            <a href="mailto:linaojoseph3111@gmail.com" className="contact-detail-value">linaojoseph3111@gmail.com</a>
        </div>
        <div className="contact-detail-item">
            <span className="contact-detail-label">// phone</span>
            <a href="tel:+61423239004" className="contact-detail-value">+61 423 239 004</a>
        </div>
    </div>
    <div className="social-links">
    <a href="https://github.com/JoeyHanma69" className="social-link"
    target="_blank" rel="noreferrer">GitHub</a>
    <a href="https://www.linkedin.com/in/joseph-linao/" className="social-link"
    target="_blank" rel="noreferrer">LinkedIn</a>
    <a href="mailto:linaojoseph3111@gmail.com" className="social-link">Email</a>
    </div>
    </div>
    </section>
 ) 
}