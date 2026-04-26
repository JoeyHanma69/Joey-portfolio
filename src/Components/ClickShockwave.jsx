import { useState, useEffect } from 'react';
import './ClickShockwave.css';

export default function ClickShockwave() {
    const [waves, setWaves] = useState([]);

    useEffect(() => {
        const onClick = (e) => {
            const id = Date.now() + Math.random();
            setWaves(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
            setTimeout(() => {
                setWaves(prev => prev.filter(w => w.id !== id));
            }, 700);
        };
        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, []);

    return (
        <div className="shockwave-container">
            {waves.map(w => (
                <div key={w.id} className="shockwave" style={{ left: w.x, top: w.y }} />
            ))}
        </div>
    );
}
