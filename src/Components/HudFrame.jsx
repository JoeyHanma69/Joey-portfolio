import { useEffect, useState } from 'react';
import './HudFrame.css';

/* The binary strings the game scatters along its UI edges. Generated once
   per mount rather than hardcoded so the frame never reads as a fixed
   graphic, and regenerated slowly so it looks like live telemetry. */
function randomBits(groups, size) {
    return Array.from({ length: groups }, () =>
        Array.from({ length: size }, () => (Math.random() < 0.5 ? '0' : '1')).join('')
    ).join(' ');
}

export default function HudFrame() {
    const [bits, setBits] = useState(() => randomBits(6, 8));

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const id = setInterval(() => setBits(randomBits(6, 8)), 2600);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="hud-frame" aria-hidden="true">
            {/* Four edges, drawn separately so the corners can be notched */}
            <span className="hud-edge hud-edge-top" />
            <span className="hud-edge hud-edge-bottom" />
            <span className="hud-edge hud-edge-left" />
            <span className="hud-edge hud-edge-right" />

            {/* Corner brackets */}
            <span className="hud-corner hud-corner-tl" />
            <span className="hud-corner hud-corner-tr" />
            <span className="hud-corner hud-corner-bl" />
            <span className="hud-corner hud-corner-br" />

            {/* Edge telemetry */}
            <span className="hud-bits hud-bits-top">{bits}</span>
            <span className="hud-bits hud-bits-bottom">{bits}</span>
            <span className="hud-label hud-label-left">SYS//PORTFOLIO_v3</span>
            <span className="hud-label hud-label-right">NET_STATUS : ONLINE</span>
        </div>
    );
}
