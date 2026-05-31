import { useState } from 'react';
import './Certifications.css';
import SlashReveal from './SlashReveal';

const certs = [
    {
        issuer: 'Anthropic',
        course: 'Claude 101',
        certNo: 'a5328m3a7azd',
        verify: null,
        year: '2025',
        pdf: '/certs/claude-101.pdf',
    },
    {
        issuer: 'Anthropic',
        course: 'Claude Code in Action',
        certNo: '7k7t3hojwrks',
        verify: 'https://verify.skilljar.com/c/7k7t3hojwrks',
        year: '2025',
        pdf: '/certs/claude-code-in-action.pdf',
    },
    {
        issuer: 'Akkodis Academy · Microsoft',
        course: 'Microsoft Data & AI Bootcamp: AI-900',
        certNo: 'L6JL99V6YYWQN',
        verify: null,
        year: '2024',
        pdf: '/certs/microsoft-ai900-bootcamp.pdf',
    },
]

export default function Certifications() {
    const [active, setActive] = useState(null);

    return (
        <section id="certifications" className="certs-section" style={{ position: 'relative', overflow: 'hidden' }}>
            <SlashReveal />
            <div className="container">
                <div className="section-header">
                    <p className="section-eyebrow">// proof_of_battle</p>
                    <h2 className="section-title">Certifications</h2>
                    <div className="section-divider" />
                </div>
                <div className="certs-grid">
                    {certs.map((cert, i) => (
                        <div className="cert-card" key={i} onClick={() => setActive(cert)}>
                            <div className="cert-preview">
                                <iframe
                                    src={`${cert.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
                                    title={cert.course}
                                    className="cert-thumb"
                                    scrolling="no"
                                />
                                <div className="cert-preview-overlay">
                                    <span>View Certificate</span>
                                </div>
                            </div>
                            <div className="cert-body">
                                <div className="cert-issuer">{cert.issuer}</div>
                                <h3 className="cert-course">{cert.course}</h3>
                                {cert.certNo && <p className="cert-no">// cert: {cert.certNo}</p>}
                                <div className="cert-footer">
                                    <span className="cert-year">{cert.year}</span>
                                    {cert.verify && (
                                        <a href={cert.verify} className="cert-verify"
                                            target="_blank" rel="noreferrer"
                                            onClick={e => e.stopPropagation()}>
                                            Verify ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {active && (
                <div className="cert-modal-backdrop" onClick={() => setActive(null)}>
                    <div className="cert-modal" onClick={e => e.stopPropagation()}>
                        <div className="cert-modal-header">
                            <span className="cert-modal-title">{active.course}</span>
                            <button className="cert-modal-close" onClick={() => setActive(null)}>✕</button>
                        </div>
                        <iframe
                            src={active.pdf}
                            title={active.course}
                            className="cert-modal-frame"
                        />
                    </div>
                </div>
            )}
        </section>
    )
}
