import { useState, useEffect } from 'react';
import './HorrorToggle.css';

export default function HorrorToggle() {
    const [horror, setHorror] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('horror', horror);
        return () => document.body.classList.remove('horror');
    }, [horror]);

    return (
        <>
            {/* Fog overlay */}
            <div className="horror-fog" />

            {/* Skull toggle button */}
            <button
                className={`horror-btn ${horror ? 'active' : ''}`}
                onClick={() => setHorror(h => !h)}
                title={horror ? 'Exit horror mode' : 'Enter horror mode'}
            >
                ☠
            </button>
        </>
    );
}
