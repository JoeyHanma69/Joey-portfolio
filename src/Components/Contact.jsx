import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './stylesheet/Contact.css'
import SlashReveal from './SlashReveal';

const INBOX = 'linaojoseph3111@gmail.com'

export default function Contact() {
    const formRef = useRef(null)
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('idle') // idle | sending | sent | error

    const update = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.email,
                    message: form.message,
                    reply_to: form.email,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            setStatus('sent')
            setForm({ name: '', email: '', message: '' })
        } catch {
            setStatus('error')
        }
    }

    const handleCopy = async () => {
        const text = [
            `From: ${form.name} <${form.email}>`,
            `To: ${INBOX}`,
            '',
            form.message,
        ].join('\n')
        try {
            await navigator.clipboard.writeText(text)
            setStatus('copied')
        } catch {
            setStatus('copyfail')
        }
    }

    return (
        <section id="contact" className="contact-section" style={{ position: 'relative', overflow: 'hidden' }}>
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
                <form ref={formRef} className="contact-form" data-reveal onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="cf-name">Name</label>
                        <input id="cf-name" name="name" type="text" placeholder="Your name"
                            value={form.name} onChange={update} required disabled={status === 'sending' || status === 'sent'} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cf-email">Email</label>
                        <input id="cf-email" name="email" type="email" placeholder="your@email.com"
                            value={form.email} onChange={update} required disabled={status === 'sending' || status === 'sent'} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cf-message">Message</label>
                        <textarea id="cf-message" name="message" placeholder="What do you want to forge together?"
                            value={form.message} onChange={update} required disabled={status === 'sending' || status === 'sent'} />
                    </div>
                    <div className="contact-actions">
                        {status !== 'sent' && (
                            <>
                                <button type="submit" className="btn-primary" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                                </button>
                                <button type="button" className="btn-secondary" onClick={handleCopy}
                                    disabled={status === 'sending'}>
                                    Copy Message
                                </button>
                            </>
                        )}
                        {status === 'sent' && (
                            <button type="button" className="btn-secondary" onClick={() => setStatus('idle')}>
                                Send Another
                            </button>
                        )}
                    </div>
                    <p className="contact-note" role="status" aria-live="polite">
                        {status === 'idle' && <>Message goes directly to <a href={`mailto:${INBOX}`}>{INBOX}</a>.</>}
                        {status === 'sending' && <>Sending…</>}
                        {status === 'sent' && <>Message delivered. I'll respond within 24 hours.</>}
                        {status === 'error' && <>Send failed. Use <strong>Copy Message</strong> and email <a href={`mailto:${INBOX}`}>{INBOX}</a> directly.</>}
                        {status === 'copied' && <>Copied. Paste into any email app and send to <a href={`mailto:${INBOX}`}>{INBOX}</a>.</>}
                        {status === 'copyfail' && <>Email <a href={`mailto:${INBOX}`}>{INBOX}</a> directly.</>}
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
                    <a href="https://github.com/JoeyHanma69" className="social-link" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/joseph-linao/" className="social-link" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a href="mailto:linaojoseph3111@gmail.com" className="social-link">Email</a>
                </div>
            </div>
        </section>
    )
}
