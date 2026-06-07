import { useState } from 'react'
import './Contact.css'
import SlashReveal from './SlashReveal';
export default function Contact() {
    const [submitted, setSubmitted] = useState(false)
    const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
    setSubmitted(false)
    e.target.reset()
    }, 3000)
 }
 return (
    <section id="contact" className="contact-section" style={{position:'relative',overflow:'hidden'}}>
    <SlashReveal />
    <div className="container">
    <div className="section-header">
    <p className="section-eyebrow">// get_in_touch</p>
    <h2 className="section-title">Contact</h2>
    <div className="section-divider" />
    </div>
    <p className="contact-intro">
        Got a project, a role, or an idea worth building? Drop me a line — whether it&apos;s software,
        a game, or an AI system, I&apos;d love to hear about it.
    </p>
    <form className="contact-form" onSubmit={handleSubmit}>
    <div className="form-group">
    <label>Name</label>
    <input type="text" placeholder="Your name" required />
    </div>
    <div className="form-group">
    <label>Email</label>
    <input type="email" placeholder="your@email.com" required /> 
    </div>
    <div className="form-group">
    <label>Message</label>
    <textarea placeholder="What would you like to build together?" required />
    </div>
    <button type="submit" className={`btn-primary ${submitted ? 'sent' : ''}`}>
    {submitted ? 'Sent ✓' : 'Send message'}
    </button>
    </form>
    <div className="contact-details">
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
