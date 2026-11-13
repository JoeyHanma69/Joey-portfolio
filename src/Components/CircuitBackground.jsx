import { useEffect, useRef } from 'react';
import './CircuitBackground.css';

/* ── Tunables ──────────────────────────────────────────────────── */
const GRID = 38;             // px between grid lines
const TRACE_COUNT = 22;      // circuit paths drawn across the field
const TRACE_MIN_SEGS = 3;
const TRACE_MAX_SEGS = 7;
const PULSE_SPEED = 46;      // px per second a pulse travels
const ALERT_CHANCE = 0.55;   // share of pulses that run red instead of blue

const BLUE = '90, 216, 230';   // data pulses
const RED  = '255, 45, 74';    // board structure

const rand = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[(Math.random() * arr.length) | 0];

/* A trace is an orthogonal walk — the Manhattan turns are what make it
   read as a circuit board rather than as scribble. */
function buildTrace(w, h) {
    const pts = [{ x: Math.round(rand(0, w) / GRID) * GRID, y: Math.round(rand(0, h) / GRID) * GRID }];
    let dir = pick([[1, 0], [-1, 0], [0, 1], [0, -1]]);
    const segs = (rand(TRACE_MIN_SEGS, TRACE_MAX_SEGS) | 0);

    for (let i = 0; i < segs; i++) {
        const last = pts[pts.length - 1];
        const len = (rand(2, 7) | 0) * GRID;
        const next = { x: last.x + dir[0] * len, y: last.y + dir[1] * len };
        pts.push(next);
        // Turn 90 degrees, never reverse, so the path keeps travelling.
        dir = dir[0] !== 0 ? pick([[0, 1], [0, -1]]) : pick([[1, 0], [-1, 0]]);
    }

    // Cumulative lengths let a pulse be positioned by distance travelled.
    const cum = [0];
    for (let i = 1; i < pts.length; i++) {
        cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
    }

    return {
        pts,
        cum,
        total: cum[cum.length - 1],
        alert: Math.random() < ALERT_CHANCE,
        offset: Math.random(),          // staggers pulses so they never march in step
        speed: PULSE_SPEED * rand(0.6, 1.5),
    };
}

/* Walk a trace's points to find the x,y at a given distance along it. */
function pointAt(trace, dist) {
    const { pts, cum } = trace;
    for (let i = 1; i < pts.length; i++) {
        if (dist <= cum[i]) {
            const seg = cum[i] - cum[i - 1] || 1;
            const t = (dist - cum[i - 1]) / seg;
            return {
                x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t,
                y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t,
            };
        }
    }
    return pts[pts.length - 1];
}

export default function CircuitBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

        let w = 0, h = 0, traces = [], dpr = 1;

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            traces = Array.from({ length: TRACE_COUNT }, () => buildTrace(w, h));
        };

        resize();
        window.addEventListener('resize', resize);

        const drawGrid = () => {
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(${RED}, 0.05)`;
            ctx.beginPath();
            for (let x = 0; x <= w; x += GRID) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, h);
            }
            for (let y = 0; y <= h; y += GRID) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(w, y + 0.5);
            }
            ctx.stroke();
        };

        const drawTrace = t => {
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(${t.alert ? RED : BLUE}, 0.17)`;
            ctx.beginPath();
            ctx.moveTo(t.pts[0].x, t.pts[0].y);
            for (let i = 1; i < t.pts.length; i++) ctx.lineTo(t.pts[i].x, t.pts[i].y);
            ctx.stroke();

            // Solder pads at every turn.
            ctx.fillStyle = `rgba(${t.alert ? RED : BLUE}, 0.3)`;
            for (const p of t.pts) ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
        };

        const drawPulse = (t, time) => {
            const dist = ((time * t.speed) / 1000 + t.offset * t.total) % t.total;
            const head = pointAt(t, dist);
            const tail = pointAt(t, Math.max(0, dist - 26));
            const rgb = t.alert ? RED : BLUE;

            const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
            grad.addColorStop(0, `rgba(${rgb}, 0)`);
            grad.addColorStop(1, `rgba(${rgb}, 0.95)`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(tail.x, tail.y);
            ctx.lineTo(head.x, head.y);
            ctx.stroke();

            ctx.fillStyle = `rgba(${rgb}, 0.9)`;
            ctx.beginPath();
            ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
            ctx.fill();
        };

        let raf;
        const frame = time => {
            raf = requestAnimationFrame(frame);
            if (document.hidden) return;

            ctx.clearRect(0, 0, w, h);
            drawGrid();
            for (const t of traces) drawTrace(t);
            if (!calm.matches) for (const t of traces) drawPulse(t, time);
        };

        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="circuit-bg" aria-hidden="true" />;
}
