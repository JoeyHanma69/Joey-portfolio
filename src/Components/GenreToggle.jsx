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

const STORAGE_KEY = 'portfolio-theme-mode';

// Editorial is the front door; the genre palettes live behind it.
const readStoredMode = () => {
    try {
        return localStorage.getItem(STORAGE_KEY) === 'metal' ? 'metal' : 'editorial';
    } catch {
        return 'editorial';
    }
};

export default function GenreToggle() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(readStoredMode);
    const [activeId, setActiveId] = useState(null);

    const editorial = mode === 'editorial';

    useEffect(() => {
        document.body.classList.toggle('theme-editorial', editorial);
        try {
            localStorage.setItem(STORAGE_KEY, mode);
        } catch {
            /* storage blocked — theme still applies for this visit */
        }
        return () => document.body.classList.remove('theme-editorial');
    }, [mode, editorial]);

    useEffect(() => {
        GENRES.forEach(g => {
            if (g.id) document.body.classList.remove(`genre-${g.id}`);
        });
        // Genre palettes only paint in metal mode.
        if (activeId && !editorial) document.body.classList.add(`genre-${activeId}`);
        return () => GENRES.forEach(g => {
            if (g.id) document.body.classList.remove(`genre-${g.id}`);
        });
    }, [activeId, editorial]);

    const active = GENRES.find(g => g.id === activeId) ?? GENRES[0];

    const pickGenre = id => {
        setActiveId(id);
        setMode('metal');
        setOpen(false);
    };

    return (
        <>
            {/* Fog — visible only for certain genres via CSS */}
            <div className="genre-fog" />

            {/* Film grain — visible only in editorial mode via CSS */}
            <div className="grain" />

            {/* Dismiss overlay */}
            {open && <div className="genre-overlay" onClick={() => setOpen(false)} />}

            {/* Theme picker panel */}
            <div className={`genre-panel ${open ? 'open' : ''}`}>
                <div className="genre-panel-header">// mode</div>

                <button
                    className={`genre-option ${editorial ? 'selected' : ''}`}
                    style={{ '--ga': '#ece8e1' }}
                    onClick={() => { setMode('editorial'); setOpen(false); }}
                >
                    <span className="genre-icon">◑</span>
                    <span className="genre-info">
                        <span className="genre-name">Editorial Noir</span>
                        <span className="genre-desc">QUIET · TYPOGRAPHIC</span>
                    </span>
                    {editorial && (
                        <span
                            className="genre-active-dot"
                            style={{ background: '#ece8e1', boxShadow: '0 0 6px #ece8e1' }}
                        />
                    )}
                </button>

                <div className="genre-panel-header">// select_genre</div>
                {GENRES.map(g => {
                    const selected = !editorial && activeId === g.id;
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
                className={`genre-btn ${open ? 'open' : ''} ${!editorial && activeId ? 'active' : ''}`}
                onClick={() => setOpen(o => !o)}
                title={editorial ? 'Editorial Noir — click to change theme' : `Genre: ${active.label} — click to change`}
                style={!editorial && activeId ? { '--ga': active.accent } : {}}
            >
                {editorial ? '◑' : '🤘'}
            </button>
        </>
    );
}
