import { useEffect, useState } from 'react';
import EvilEye from './EvilEye';
import useThemeMode from '../useThemeMode';

/* Each look gets its own burn. Editorial is deliberately absent — that
   theme's whole argument is restraint, and a watching eye undoes it. */
const LOOKS = {
    metal:  { eyeColor: '#FF6F37', intensity: 1.5,  glowIntensity: 0.35, flameSpeed: 1.0 },
    hnband: { eyeColor: '#E934FF', intensity: 1.35, glowIntensity: 0.42, flameSpeed: 0.8 },
};

/* In metal mode the eye picks up the selected genre's accent, so the
   switcher changes the whole room rather than just the type. */
const GENRE_EYES = {
    death:      '#FF2A00',
    nu:         '#FF8A1F',
    classic:    '#FFC21F',
    thrash:     '#E8DC00',
    glam:       '#FF3D93',
    industrial: '#1FB6FF',
    power:      '#9A6BFF',
};

/* A fullscreen fragment shader every frame is not worth it on a phone, so
   the eye is never mounted there rather than merely hidden with CSS. */
const WIDE = '(min-width: 768px)';

export default function EyeBackground() {
    const { mode, genre } = useThemeMode();
    const [wide, setWide] = useState(() => window.matchMedia(WIDE).matches);

    useEffect(() => {
        const mq = window.matchMedia(WIDE);
        const onChange = e => setWide(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    const look = (wide && LOOKS[mode]) || null;

    // A body-level flag lets CSS swap the hero backdrop to the eye.
    useEffect(() => {
        document.body.classList.toggle('eye-on', Boolean(look));
        return () => document.body.classList.remove('eye-on');
    }, [look]);

    if (!look) return null;

    const eyeColor = (mode === 'metal' && genre && GENRE_EYES[genre]) || look.eyeColor;

    return (
        <div className={`evil-eye-layer ${look ? 'visible' : ''}`} aria-hidden="true">
            <EvilEye
                eyeColor={eyeColor}
                intensity={look.intensity}
                pupilSize={0.6}
                irisWidth={0.25}
                glowIntensity={look.glowIntensity}
                scale={0.62}
                noiseScale={1.0}
                pupilFollow={1.0}
                flameSpeed={look.flameSpeed}
                backgroundColor="#000000"
            />
        </div>
    );
}
