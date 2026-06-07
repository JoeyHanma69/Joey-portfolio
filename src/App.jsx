import { useState } from 'react';
import Splash from './Components/Splash';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import About from './Components/About';
import Projects from './Components/Projects';
import Skills from './Components/Skills';
import Certifications from './Components/Certifications';
import Music from './Components/Music';
import Contact from './Components/Contact';
import Particles from './Components/Particles';
import './index.css';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  return (
    <>
      {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
      <div style={{ opacity: splashDone ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <Particles />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Certifications />
          <Music />
          <Contact />
        </main>
        <footer className="site-footer">
          <span>© 2025 <strong>Joseph Linao</strong></span>
          <span className="footer-dot">·</span>
          <span>Built with care &amp; caffeine</span>
        </footer>
      </div>
    </>
  );
}
