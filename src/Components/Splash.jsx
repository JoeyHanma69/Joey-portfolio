import { useEffect, useRef, useState } from 'react';
import './stylesheet/Splash.css';

/* ── Breach Protocol boot ───────────────────────────────────────
   The game's hacking minigame as a loading screen: a matrix of hex
   pairs, a highlight that sweeps row-then-column alternating axis,
   and each pick flying into the buffer until the sequence uploads.

   Driven from elapsed time rather than a tick count, because browsers
   clamp timers in unfocused windows. The whole run is capped under
   3200ms — App holds every page element at opacity 0 until onDone
   fires, so a slow loader is a bounce.
   ─────────────────────────────────────────────────────────────── */

const POOL = ['1C', '55', 'BD', 'E9', 'FF', '7A'];
const SIZE = 5;
const SEQ_LEN = 5;

const START = 260;                               // grid fade-in
const STEP = 420;                                // ms per pick
const PICKS_END = START + STEP * SEQ_LEN;        // 2360
const UPLOADED_AT = PICKS_END + 180;             // 2540
const WIPE_AT = UPLOADED_AT + 330;               // 2870
const DONE_AT = 3120;                            // under the 3200 ceiling

const rand = n => (Math.random() * n) | 0;

/* The path alternates axis exactly like the minigame: pick a column
   along the current row, then a row along that column, and so on. */
function buildRun() {
    const grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => POOL[rand(POOL.length)])
    );

    const path = [];
    let axis = 'row';
    let line = 0;
    const usedRows = new Set();
    const usedCols = new Set();

    for (let i = 0; i < SEQ_LEN; i++) {
        let idx;
        let guard = 0;
        do {
            idx = rand(SIZE);
            guard++;
        } while (guard < 24 && (axis === 'row' ? usedCols.has(idx) : usedRows.has(idx)));

        const cell = axis === 'row' ? { r: line, c: idx } : { r: idx, c: line };
        usedRows.add(cell.r);
        usedCols.add(cell.c);
        path.push({ ...cell, axis, line });

        line = axis === 'row' ? cell.c : cell.r;
        axis = axis === 'row' ? 'col' : 'row';
    }

    return { grid, path };
}

export default function Splash({ onDone }) {
    // Read the motion preference during the first render rather than in
    // the effect, so the reduced-motion path starts already finished
    // instead of setting state on mount.
    const [calm] = useState(
        () => typeof window !== 'undefined' &&
              window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    const [run] = useState(buildRun);
    const [picked, setPicked] = useState(calm ? SEQ_LEN : 0);
    const [phase, setPhase] = useState(calm ? 'uploaded' : 'scan');
    const firedRef = useRef(false);

    // onDone must fire exactly once, however the run ends.
    const finish = useRef(() => {
        if (firedRef.current) return;
        firedRef.current = true;
        onDone();
    });

    useEffect(() => {
        if (calm) {
            const t = setTimeout(() => finish.current(), 400);
            return () => clearTimeout(t);
        }

        const begun = performance.now();
        let raf;

        const tick = now => {
            const t = now - begun;

            const count = t < START ? 0 : Math.min(SEQ_LEN, Math.floor((t - START) / STEP) + 1);
            setPicked(count);

            if (t >= WIPE_AT) setPhase('wipe');
            else if (t >= UPLOADED_AT) setPhase('uploaded');

            if (t >= DONE_AT) {
                finish.current();
                return;
            }
            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);

        // Belt and braces: if rAF is starved the loader still clears.
        const bail = setTimeout(() => finish.current(), DONE_AT + 600);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(bail);
        };
    }, [calm]);

    const active = run.path[Math.min(picked, SEQ_LEN - 1)];
    const scanning = phase === 'scan';

    return (
        <div className={`bp ${phase === 'wipe' ? 'bp-wipe' : ''}`}>
            <div className="bp-inner">
                <p className="bp-head">
                    BREACH PROTOCOL <span className="bp-head-dim">// LOADING PORTFOLIO</span>
                </p>

                <div className="bp-buffer">
                    <span className="bp-buffer-label">BUFFER</span>
                    <div className="bp-slots">
                        {Array.from({ length: SEQ_LEN }, (_, i) => (
                            <span key={i} className={`bp-slot ${i < picked ? 'filled' : ''}`}>
                                {i < picked ? run.grid[run.path[i].r][run.path[i].c] : ''}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bp-grid">
                    {run.grid.map((row, r) =>
                        row.map((hex, c) => {
                            const takenAt = run.path.findIndex(p => p.r === r && p.c === c);
                            const taken = takenAt > -1 && takenAt < picked;
                            const onLine =
                                scanning && active &&
                                (active.axis === 'row' ? r === active.line : c === active.line);
                            const isNext =
                                scanning && active && active.r === r && active.c === c && !taken;

                            return (
                                <span
                                    key={`${r}-${c}`}
                                    className={[
                                        'bp-cell',
                                        taken ? 'taken' : '',
                                        onLine ? 'on-line' : '',
                                        isNext ? 'next' : '',
                                    ].join(' ')}
                                >
                                    {hex}
                                </span>
                            );
                        })
                    )}
                </div>

                <p className={`bp-status ${phase !== 'scan' ? 'ok' : ''}`}>
                    {phase === 'scan' ? 'SCANNING SEQUENCE...' : 'SEQUENCE UPLOADED'}
                </p>

                <div className="bp-timer">
                    <span className="bp-timer-fill" />
                </div>
            </div>
        </div>
    );
}
