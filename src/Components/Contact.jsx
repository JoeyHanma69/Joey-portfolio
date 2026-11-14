import { useState } from 'react'
import './stylesheet/Contact.css'
import SlashReveal from './SlashReveal';

const INBOX = 'linaojoseph3111@gmail.com'

/* Stopgap until the form has a real backend.

   This used to fake a send: it cancelled the submit, showed "Sent ✓" and
   cleared the fields, while the message went nowhere. A client lost an
   enquiry that way. Handing the composed message to the visitor's own
   mail client is slower, but it never claims to have sent something it
   has not. */
export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [opened, setOpened] = useState(false)

    const update = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        // Collapse newlines out of the subject — a header cannot span lines.
        const subject = `Portfolio enquiry from ${form.name}`.replace(/\s+/g, ' ').trim()
        const body = [
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            '',
            form.message,
            '',
        ].join('\n')
        window.location.href =
            `mailto:${INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        setOpened(true)
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
    <button type="submit" className="btn-primary">Compose Email</button>
    <p className="contact-note" role="status" aria-live="polite">
        {opened
            ? <>Your email app should have opened with this message ready to send. If nothing happened, write to <a href={`mailto:${INBOX}`}>{INBOX}</a> directly.</>
            : <>This opens your email app with the message filled in — you still press send there.</>}
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