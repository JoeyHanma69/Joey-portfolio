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

export default function GenreToggle() {
    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        GENRES.forEach(g => {
            if (g.id) document.body.classList.remove(`genre-${g.id}`);
        });
        if (activeId) document.body.classList.add(`genre-${activeId}`);
        return () => GENRES.forEach(g => {
            if (g.id) document.body.classList.remove(`genre-${g.id}`);
        });
    }, [activeId]);

    const active = GENRES.find(g => g.id === activeId) ?? GENRES[0];

    return (
        <>
            {/* Fog — visible only for certain genres via CSS */}
            <div className="genre-fog" />

            {/* Dismiss overlay */}
            {open && <div className="genre-overlay" onClick={() => setOpen(false)} />}

            {/* Genre picker panel */}
            <div className={`genre-panel ${open ? 'open' : ''}`}>
                <div className="genre-panel-header">// select_genre</div>
                {GENRES.map(g => (
                    <button
                        key={g.id ?? 'default'}
                        className={`genre-option ${activeId === g.id ? 'selected' : ''}`}
                        style={{ '--ga': g.accent }}
                        onClick={() => { setActiveId(g.id); setOpen(false); }}
                    >
                        <span className="genre-icon">{g.icon}</span>
                        <span className="genre-info">
                            <span className="genre-name">{g.label}</span>
                            <span className="genre-desc">{g.desc}</span>
                        </span>
                        {activeId === g.id && (
                            <span
                                className="genre-active-dot"
                                style={{ background: g.accent, boxShadow: `0 0 6px ${g.accent}` }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Trigger button */}
            <button
                className={`genre-btn ${open ? 'open' : ''} ${activeId ? 'active' : ''}`}
                onClick={() => setOpen(o => !o)}
                title={activeId ? `Genre: ${active.label} — click to change` : 'Select genre theme'}
                style={activeId ? { '--ga': active.accent } : {}}
            >
                🤘
            </button>
        </>
    );
}
