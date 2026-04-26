import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const BIO_PLAIN = "I forge chaos into code. Whether it's engineering robust software systems, building worlds through game development, or wielding AI as a weapon — I bring the same relentless intensity to every project.\n\nThis is not a portfolio. This is a war chest.";

const BioFull = () => (
    <>
        I forge <strong>chaos into code</strong>. Whether it's engineering robust
        software systems, building worlds through game development, or wielding{' '}
        <strong>AI</strong> as a weapon — I bring the same relentless intensity to every project.
        <br /><br />
        "In the <strong>grim darkness </strong> of the far <strong>future</strong>, there is only <strong>war</strong>." — Warhammer 40,000, Games Workshop.
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
            <div className="hero-bg" ref={bgRef} />
            <div className="hero-content">
                <div className="hero-text">
                    <p className="hero-tag">// PORTFOLIO<span className="cursor">_</span></p>
                    <h1 className={`hero-name ${ignite ? 'ignite' : ''}`}>
                        <span className="glitch" data-text="Joseph Linao">Joseph Linao</span>
                        <br />
                        <span className="glitch hero-red" data-text="AKA JOEY THE BERSERKER">AKA JOEY THE BERSERKER</span>
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
        </section>
    );
}
