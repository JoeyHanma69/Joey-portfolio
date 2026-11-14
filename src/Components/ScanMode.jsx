import { useCallback, useEffect, useState } from 'react';
import './stylesheet/ScanMode.css';

/* ── Scan mode ──────────────────────────────────────────────────
   The optics toggle: the page desaturates, washes blue, and every
   section gains an outline and a HUD tag naming it. Triggered by the
   corner button or the S key.
   ─────────────────────────────────────────────────────────────── */

const SECTIONS = [
    ['about', 'SEC_01 // BACKGROUND'],
    ['projects', 'SEC_02 // PROJECTS'],
    ['skills', 'SEC_03 // ARSENAL'],
    ['certifications', 'SEC_04 // CREDENTIALS'],
    ['music', 'SEC_05 // AUDIO'],
    ['contact', 'SEC_06 // COMMS'],
];

export default function ScanMode() {
    const [on, setOn] = useState(false);

    const toggle = useCallback(() => setOn(v => !v), []);

    // Tag every section once, so CSS can render the label from an
    // attribute rather than this component having to portal into them.
    useEffect(() => {
        SECTIONS.forEach(([id, label]) => {
            const el = document.getElementById(id);
            if (el) el.dataset.scanTag = label;
        });
    }, []);

    useEffect(() => {
        document.body.classList.toggle('scan-mode', on);
        return () => document.body.classList.remove('scan-mode');
    }, [on]);

    useEffect(() => {
        const onKey = e => {
            if (e.key !== 's' && e.key !== 'S') return;
            if (e.metaKey || e.ctrlKey || e.altKey) return;

            // The contact form would otherwise eat the shortcut.
            const el = document.activeElement;
            const tag = el?.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el?.isContentEditable) return;

            e.preventDefault();
            toggle();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [toggle]);

    return (
        <>
            {on && <div className="scan-sweep" aria-hidden="true" />}
            <button
                type="button"
                className={`scan-btn ${on ? 'on' : ''}`}
                onClick={toggle}
                aria-pressed={on}
                title="Scan mode (S)"
            >
                <span className="scan-btn-mark" aria-hidden="true" />
                <span className="scan-btn-label">{on ? 'SCAN ON' : 'SCAN'}</span>
            </button>
        </>
    );
}
