import { useEffect, useState } from 'react';

const MODE_CLASSES = ['theme-hnband', 'theme-editorial'];

function read() {
    const cls = document.body.classList;
    const modeClass = MODE_CLASSES.find(c => cls.contains(c));
    const mode = modeClass ? modeClass.slice(6) : 'metal';   // theme-hnband -> hnband
    const genre = [...cls].find(c => c.startsWith('genre-'))?.slice(6) ?? null;
    return { mode, genre };
}

/**
 * Reads the active look off the body class, which GenreToggle owns.
 * A MutationObserver keeps it in step without threading state through
 * the whole tree for what is really one global switch.
 */
export default function useThemeMode() {
    const [theme, setTheme] = useState(read);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(prev => {
                const next = read();
                return prev.mode === next.mode && prev.genre === next.genre ? prev : next;
            });
        });
        // GenreToggle sets the body class from its own effect, which runs
        // after this one, so the observer catches the initial look too.
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    return theme;
}
