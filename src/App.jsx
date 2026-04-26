import { useState } from 'react';
import Splash from './Components/Splash';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import About from './Components/About';
import Projects from './Components/Projects';
import Skills from './Components/Skills';
import Music from './Components/Music';
import Contact from './Components/Contact';
import Musicbutton from './Components/MusicButton';
import Particles from './Components/Particles';
import CursorTrail from './Components/CursorTrail';
import ClickShockwave from './Components/ClickShockwave';
import './index.css';


export default function App() { 
  const [splashDone, setSplashDone] = useState(false); 
  return ( 
    <> 
    {!splashDone && <Splash onDone={() => setSplashDone(true)} /> }  
      <div style={{ 
        opacity: splashDone ? 1 : 0, 
        transition: 'opacity 0.8s ease',
      }}>  
      <Particles />
      <CursorTrail />
      <ClickShockwave />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      < Skills />
      < Music />
      < Contact />
      <footer style={{ 
        background: '#000',
        borderTop: '1px solid var(--red)',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'Cinzel, serif',
        fontSize: '0.7rem',
        letterSpacing: '0.3em',
        color: 'var(--text-dim)',
        textTransform: 'uppercase', 
       }}>
      © 2025 <span style={{ color: 'var(--red-bright)' }}>Joseph Linao</span> · Forged in Darkness
      </footer> 

      <Musicbutton />
      </div> 
      </>
  )
}
