import { useEffect, useState } from 'react';
import './HudWidgets.css';

/* Decorative breach-protocol readouts, lifted from the reference HUD:
   a segmented loading bar, an alert plate, a barcode and a data log.
   They live in the outer margins only — the content column is never
   allowed to sit on top of them. */

const LOG_LINES = [
    'ICE_LAYER....BYPASSED',
    'DAEMON_UPLOAD...OK',
    'TRACE_MASK......ON',
    'SUBNET_SCAN.....RUN',
    'NODE_AUTH.....GRANT',
    'BUFFER_FLUSH....OK',
];

function Barcode() {
    // Fixed widths rather than random so the bars do not reshuffle on
    // every render; it should look printed, not animated.
    const bars = [3, 1, 2, 1, 1, 4, 1, 2, 3, 1, 1, 2, 4, 1, 3, 1, 2, 1, 1, 3, 2, 1];
    return (
        <span className="hw-barcode" aria-hidden="true">
            {bars.map((w, i) => (
                <i key={i} style={{ width: `${w}px`, opacity: i % 3 ? 0.9 : 0.45 }} />
            ))}
        </span>
    );
}

export default function HudWidgets() {
    const [pct, setPct] = useState(68);
    const [log, setLog] = useState(0);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const a = setInterval(() => setPct(p => (p >= 99 ? 11 : p + Math.floor(1 + Math.random() * 5))), 900);
        const b = setInterval(() => setLog(i => (i + 1) % LOG_LINES.length), 1800);
        return () => { clearInterval(a); clearInterval(b); };
    }, []);

    const cells = 18;
    const filled = Math.round((pct / 100) * cells);

    return (
        <div className="hud-widgets" aria-hidden="true">
            {/* Left margin: alert plate over a data log */}
            <div className="hw-block hw-left">
                <div className="hw-alert">
                    <span className="hw-alert-mark">&#9888;</span>
                    <span className="hw-alert-text">ATTENTION</span>
                </div>
                <div className="hw-log">
                    {LOG_LINES.map((l, i) => (
                        <span key={l} className={i === log ? 'hw-log-line active' : 'hw-log-line'}>
                            {l}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right margin: loading bar over a barcode */}
            <div className="hw-block hw-right">
                <div className="hw-loading">
                    <span className="hw-loading-label">LOADING : {String(pct).padStart(2, '0')}%</span>
                    <span className="hw-bar">
                        {Array.from({ length: cells }, (_, i) => (
                            <i key={i} className={i < filled ? 'on' : ''} />
                        ))}
                    </span>
                </div>
                <div className="hw-complete">COMPLETE</div>
                <Barcode />
            </div>
        </div>
    );
}
