import { useState, useEffect } from 'react';
import './GenreToggle.css';

const GENRES = [
    { id: null,         label: 'Metal Core',   icon: '🔥', accent: '#cc1111',  desc: 'DEFAULT' },
    { id: 'death',      label: 'Death Metal',  icon: '☠',  accent: '#990000',  desc: 'BRUTAL · DARK' },
    { id: 'nu',         label: 'Nu Metal',     icon: '⛓',  accent: '#d97000',  desc: '90s · 2000s' },
    { id: 'classic',    label: 'Classic Rock', icon: '🎸', accent: '#d4a800',  desc: '70s · 80s · 90s' },
    { id: 'thrash',     label: 'Thrash Metal', icon: '⚡',  accent: '#ccbb00',  desc: 'AGGRESSIVE · FAST' },
    { id: 'glam',       label: 'Glam Metal',   icon: '✦',  accent: '#ee2277',  desc: '80s · EXCESS' },
    { id: 'industrial', label: 'Industrial',   icon: '⚙',  accent: '#0088bb',  desc: 'COLD · MECHANICAL' },
    { id: 'power',      label: 'Power Metal',  icon: '⚔',  accent: '#7744ee',  desc: 'EPIC · FANTASY' },
];

// Whole-site looks, as opposed to the genre palettes below them.
const MODES = [
    { id: 'hnband',    label: 'HnBand',         icon: '✦', accent: '#e934ff', desc: 'ELECTRO · STAGE', cls: 'theme-hnband' },
    { id: 'editorial', label: 'Editorial Noir', icon: '◑', accent: '#ece8e1', desc: 'QUIET · TYPOGRAPHIC', cls: 'theme-editorial' },
];

const MODE_CLASSES = MODES.map(m => m.cls);
const STORAGE_KEY = 'portfolio-theme-mode';
const DEFAULT_MODE = 'hnband';

const readStoredMode = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'metal') return 'metal';
        return MODES.some(m => m.id === stored) ? stored : DEFAULT_MODE;
    } catch {
        return DEFAULT_MODE;
    }
};

export default function GenreToggle() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(readStoredMode);
    const [activeId, setActiveId] = useState(null);

    const activeMode = MODES.find(m => m.id === mode) ?? null;

    useEffect(() => {
        document.body.classList.remove(...MODE_CLASSES);
        if (activeMode) document.body.classList.add(activeMode.cls);
        try {
            localStorage.setItem(STORAGE_KEY, mode);
        } catch {
            /* storage blocked — theme still applies for this visit */
        }
        return () => document.body.classList.remove(...MODE_CLASSES);
    }, [mode, activeMode]);

    useEffect(() => {
        GENRES.forEach(g => {
            if (g.id) document.body.classList.remove(`genre-${g.id}`);
        });
        // Genre palettes only paint in metal mode.
        if (activeId && !activeMode) document.body.classList.add(`genre-${activeId}`);
        return () => GENRES.forEach(g => {
            if (g.id) document.body.classList.remove(`genre-${g.id}`);
        });
    }, [activeId, activeMode]);

    const active = GENRES.find(g => g.id === activeId) ?? GENRES[0];

    const pickGenre = id => {
        setActiveId(id);
        setMode('metal');
        setOpen(false);
    };

    const title = activeMode
        ? `${activeMode.label} — click to change theme`
        : `Genre: ${active.label} — click to change`;

    return (
        <>
            {/* Fog — visible only for certain genres via CSS */}
            <div className="genre-fog" />

            {/* Film grain — visible only in editorial mode via CSS */}
            <div className="grain" />

            {/* Stage bloom — visible only in hnband mode via CSS */}
            <div className="stage-bloom" />

            {/* Dismiss overlay */}
            {open && <div className="genre-overlay" onClick={() => setOpen(false)} />}

            {/* Theme picker panel */}
            <div className={`genre-panel ${open ? 'open' : ''}`}>
                <div className="genre-panel-header">// mode</div>

                {MODES.map(m => (
                    <button
                        key={m.id}
                        className={`genre-option ${mode === m.id ? 'selected' : ''}`}
                        style={{ '--ga': m.accent }}
                        onClick={() => { setMode(m.id); setOpen(false); }}
                    >
                        <span className="genre-icon">{m.icon}</span>
                        <span className="genre-info">
                            <span className="genre-name">{m.label}</span>
                            <span className="genre-desc">{m.desc}</span>
                        </span>
                        {mode === m.id && (
                            <span
                                className="genre-active-dot"
                                style={{ background: m.accent, boxShadow: `0 0 6px ${m.accent}` }}
                            />
                        )}
                    </button>
                ))}

                <div className="genre-panel-header">// select_genre</div>
                {GENRES.map(g => {
                    const selected = !activeMode && activeId === g.id;
                    return (
                        <button
                            key={g.id ?? 'default'}
                            className={`genre-option ${selected ? 'selected' : ''}`}
                            style={{ '--ga': g.accent }}
                            onClick={() => pickGenre(g.id)}
                        >
                            <span className="genre-icon">{g.icon}</span>
                            <span className="genre-info">
                                <span className="genre-name">{g.label}</span>
                                <span className="genre-desc">{g.desc}</span>
                            </span>
                            {selected && (
                                <span
                                    className="genre-active-dot"
                                    style={{ background: g.accent, boxShadow: `0 0 6px ${g.accent}` }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Trigger button */}
            <button
                className={`genre-btn ${open ? 'open' : ''} ${!activeMode && activeId ? 'active' : ''}`}
                onClick={() => setOpen(o => !o)}
                title={title}
                style={!activeMode && activeId ? { '--ga': active.accent } : {}}
            >
                {activeMode ? activeMode.icon : '🤘'}
            </button>
        </>
    );
}
