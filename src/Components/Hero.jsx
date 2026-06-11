import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const BIO_PLAIN = "I design and build software systems that solve real problems — from full-stack web applications and AI-powered tools to game engines. I bring structured thinking, technical depth, and a drive to ship products that make an impact.";

const BioFull = () => (
    <>
        I design and build <strong>software systems</strong> that solve real problems —
        from <strong>full-stack web applications</strong> and <strong>AI-powered tools</strong>{' '}
        to game engines. I bring structured thinking, technical depth, and a drive to
        ship <strong>products that make an impact</strong>.
    </>
);

export default function Hero() {
    const bgRef = useRef(null);
    const [berserker, setBerserker] = useState(false);
    const [typed, setTyped] = useState('');
    const [typeDone, setTypeDone] = useState(false);
    const [ignite, setIgnite] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            if (bgRef.current) {
                bgRef.current.style.transform = `translateY(${window.scrollY * 0.38}px)`;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Ignition glitch: remove class after 1.2s so it only fires once
    useEffect(() => {
        const t = setTimeout(() => setIgnite(false), 1200);
        return () => clearTimeout(t);
    }, []);

    // Typewriter
    useEffect(() => {
        let i = 0;
        const delay = setTimeout(() => {
            const interval = setInterval(() => {
                i++;
                setTyped(BIO_PLAIN.slice(0, i));
                if (i >= BIO_PLAIN.length) {
                    clearInterval(interval);
                    setTimeout(() => setTypeDone(true), 200);
                }
            }, 14);
            return () => clearInterval(interval);
        }, 600);
        return () => clearTimeout(delay);
    }, []);

    return (
        <section id="about" className="hero">
            {/* Cinematic background video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="hero-video"
            >
                <source src="https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4" type="video/mp4" />
            </video>

            {/* Multi-layer cinematic overlay — parallaxes on scroll */}
            <div className="hero-overlay" ref={bgRef} />

            <div className="hero-content">
                <div className="hero-text">
                    <p className="hero-tag">// PORTFOLIO<span className="cursor">_</span></p>
                    <h1 className={`hero-name ${ignite ? 'ignite' : ''}`}>
                        <span className="glitch" data-text="Joseph Linao">Joseph Linao</span>
                    </h1>
                    <p className="hero-role">Software Developer &nbsp;·&nbsp; Game Creator &nbsp;·&nbsp; AI Engineer</p>
                    <p className="hero-bio">
                        {typeDone
                            ? <BioFull />
                            : <>{typed.split('\n').map((line, i) => (
                                <span key={i}>{line}{i < typed.split('\n').length - 1 && <><br /><br /></>}</span>
                            ))}<span className="cursor">_</span></>
                        }
                    </p>
                    <div className="hero-cta">
                        <a href="#projects" className="btn-primary">See My Work</a>
                        <a href="#contact" className="btn-secondary">Get In Touch</a>
                    </div>
                </div>
                <div className="hero-image-wrap" onClick={() => setBerserker(b => !b)}>
                    <img
                        src={berserker ? '/goofy.jpg' : '/avatar.jpg'}
                        alt="Joey Linao"
                        className={`hero-avatar ${berserker ? 'berserker-mode' : ''}`}
                    />
                    <span className="avatar-hint">{berserker ? '> exit rock persona' : '> activate rock persona'}</span>
                </div>
            </div>

            {/* Cinematic scroll indicator */}
            <div className="hero-scroll-hint">
                <span className="hero-scroll-line" />
                <span className="hero-scroll-label">scroll</span>
            </div>
        </section>
    );
}
