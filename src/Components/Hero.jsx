import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
    const bgRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            if (bgRef.current) {
                bgRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section id="about" className="hero">
            <div className="hero-bg" ref={bgRef} />
            <div className="hero-content">
                <div className="hero-text">
                    <p className="hero-tag">
                        <span className="status-dot" /> Available for graduate &amp; IT roles
                    </p>
                    <h1 className="hero-name">
                        Hi, I&apos;m Joseph Linao.
                        <br />
                        <span className="hero-accent">I turn ideas into software.</span>
                    </h1>
                    <p className="hero-role">Software Developer &nbsp;·&nbsp; Game Creator &nbsp;·&nbsp; AI Engineer</p>
                    <p className="hero-bio">
                        I build across the stack — engineering robust <strong>web systems</strong>,
                        crafting worlds through <strong>game development</strong>, and applying{' '}
                        <strong>AI &amp; machine learning</strong> to real problems. Computer Science
                        student at Swinburne University, shipping projects since before the degree
                        made it official.
                    </p>
                    <div className="hero-cta">
                        <a href="#projects" className="btn-primary">See my work</a>
                        <a href="#contact" className="btn-secondary">Get in touch</a>
                    </div>
                </div>

                <div className="hero-image-wrap glass">
                    <img
                        src="/avatar.jpg"
                        alt="Portrait of Joseph Linao"
                        className="hero-avatar"
                    />
                    <div className="hero-card-meta">
                        <span className="hero-card-name">Joseph Linao</span>
                        <span className="hero-card-loc">Melbourne, Australia</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
