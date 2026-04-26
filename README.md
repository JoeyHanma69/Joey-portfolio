# 🔴 Joey the Berserker — Portfolio

> *"Seven minutes. Seven minutues is all i can spare to play games with you"*

Live site: [joey-portfolio.vercel.app](https://joey-portfolio.vercel.app)

---

## 👤 About

Personal portfolio of **Joseph Linao** —
Computer Science student at Swinburne University of Technology,
specialising in AI/ML, full-stack development, and game engineering.

A dark rock/metal aesthetic fused with a software developer identity.
Built entirely from scratch with React and Vite — no UI libraries, no templates.

---

## ⚡ Features

- 🎸 **Rock/Metal + Software dual theme** — Metal Mania typography, terminal syntax, and red dark theme
- 💀 **Glitch animations** — Hero title ignition glitch on load, idle glitch effects
- 🔥 **Floating ember particles** — Canvas-based sparks drifting across the page
- ⚔️ **Slash reveal** — Diagonal red slash sweeps across each section on scroll
- 📺 **CRT scanline overlay** — Animated scanline effect across the full page
- 🖱️ **Cursor ember trail** — Red sparks follow the mouse cursor
- 💥 **Click shockwave** — Red ring ripples out on every click
- ⌨️ **Typewriter bio** — Hero bio types itself out on load
- ⚡ **Skill power surge** — Electric glow pulses on skill hover
- 🪖 **Rock persona toggle** — Click the avatar to switch to berserker mode
- 🎵 **Background music** — Doom-inspired track with toggle button
- 📱 **Responsive** — Mobile-friendly layout

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Framework | React 19, Vite |
| Styling | CSS (no Tailwind, no UI lib) |
| Animations | Canvas API, CSS keyframes, IntersectionObserver |
| Fonts | Metal Mania, Cinzel, Rajdhani, JetBrains Mono |
| Deployment | Vercel / GitHub Pages |

## 🎨 CSS Techniques

| Technique | Used For |
|---|---|
| CSS Variables | Global colours, fonts, spacing |
| CSS Grid | Skills grid, Projects grid, About layout |
| Flexbox | Navbar, buttons, pills, contact links |
| Keyframe Animations | Glitch, scanlines, slash reveal, power surge, ignition |
| `clip-path` | Angled corners on buttons and avatar |
| `position: fixed` | Navbar, particles, cursor trail, scanlines |
| `::before` / `::after` | Scanlines, card hover glow effects |
| `backdrop-filter: blur()` | Navbar glass effect |
| `clamp()` | Responsive hero font sizes |
| `@media` queries | Mobile responsive layouts |
| `filter` | GitHub icon tint and glow |
| `will-change` | Parallax background performance |
| `IntersectionObserver` | Slash reveal trigger on scroll |
| Canvas API | Floating embers, cursor trail |

---

## 🔤 Fonts

All fonts loaded via [Google Fonts](https://fonts.google.com):

| Font | Usage |
|---|---|
| [Metal Mania](https://fonts.google.com/specimen/Metal+Mania) | Hero title, section headings |
| [Cinzel](https://fonts.google.com/specimen/Cinzel) | Labels, nav links, project names |
| [Rajdhani](https://fonts.google.com/specimen/Rajdhani) | Body text |
| [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Code-style `//` labels |

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool and dev server |
| [React Icons](https://react-icons.github.io/react-icons/) | GitHub, Play, Link icons |

---

## 🔗 Resources & Links

| Resource | Link |
|---|---|
| 🎨 Google Fonts | https://fonts.google.com |
| 🎵 Pixabay Music (background track) | https://pixabay.com/music |
| 🐙 GitHub Mark (logo) | https://github.com/logos |
| ⚛️ React Docs | https://react.dev |
| ⚡ Vite Docs | https://vitejs.dev |
| 🚀 Vercel Deployment | https://vercel.com |
| 🎮 React Icons | https://react-icons.github.io/react-icons |

---


## 📂 Project Structure
src/
├── Components/
│ ├── Navbar.jsx/css
│ ├── Hero.jsx/css # Landing + typewriter + glitch
│ ├── About.jsx/css # Timeline + stats
│ ├── Projects.jsx/css # Tabbed project cards
│ ├── Skills.jsx/css # Arsenal grid
│ ├── Music.jsx/css # Band section
│ ├── Contact.jsx/css # Form + social links
│ ├── Particles.jsx # Floating ember canvas
│ ├── CursorTrail.jsx # Mouse ember trail canvas
│ ├── ClickShockwave.jsx # Click ripple effect
│ ├── SlashReveal.jsx # Section slash animation
│ ├── MusicButton.jsx # Floating audio toggle
│ └── Splash.jsx # Intro splash screen
└── index.css # Global styles + scanlines

--- 


## 🚀 Run Locally
```bash
# Clone the repo
git clone https://github.com/JoeyHanma69/Joey-portfolio.git
# Navigate into the folder
cd Joey-portfolio
# Install dependencies
npm install
# Start the dev server
npm run dev
Open http://localhost:5173 in your browser.

📬 Contact
Email: linaojoseph3111@gmail.com
LinkedIn: linkedin.com/in/joseph-linao
GitHub: github.com/JoeyHanma69
📄 License
This project is open source and available under the MIT License.

Forged in darkness. Deployed in fury.

---
**How to add it on GitHub:**
1. Go to your `Joey-portfolio` repo
2. Click **Add file** → **Create new file**
3. Name it `README.md`
4. Paste the content above
5. Click **Commit changes**
Once you deploy and have a live URL, replace the placeholder link at the top with your real Vercel/GitHub Pages URL.
