import './Hero.css';

export default function Hero() {
    return (
        <section id="about" className="hero">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="hero-video"
            >
                <source
                    src="https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4"
                    type="video/mp4"
                />
            </video>
            <div className="hero-overlay" />

            <div className="hero-content">
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

            <div className="hero-scroll" aria-hidden="true">
                <span>Scroll</span>
                <span className="hero-scroll-line" />
            </div>
        </section>
    );
}
