import { useEffect, useState } from 'react';
import EvilEye from './EvilEye';

/* A fullscreen fragment shader every frame is not worth it on a phone, so
   the eye is never mounted there rather than merely hidden with CSS. */
const WIDE = '(min-width: 768px)';

export default function EyeBackground() {
    const [wide, setWide] = useState(() => window.matchMedia(WIDE).matches);

    useEffect(() => {
        const mq = window.matchMedia(WIDE);
        const onChange = e => setWide(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    // A body-level flag lets CSS hand the hero its backdrop over to the eye.
    useEffect(() => {
        document.body.classList.toggle('eye-on', wide);
        return () => document.body.classList.remove('eye-on');
    }, [wide]);

    if (!wide) return null;

    return (
        <div className="evil-eye-layer visible" aria-hidden="true">
            <EvilEye
                eyeColor="#FF6F37"
                intensity={1.5}
                pupilSize={0.6}
                irisWidth={0.25}
                glowIntensity={0.35}
                scale={0.62}
                noiseScale={1.0}
                pupilFollow={1.0}
                flameSpeed={1.0}
                backgroundColor="#000000"
            />
        </div>
    );
}
