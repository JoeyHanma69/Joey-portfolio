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
            {/* Dialled well back from the Sauron build. At full strength an
                acid-yellow eye blows out the whole right half and reads as a
                rendering fault rather than a design; here it is an ambient
                scanner glow sitting behind the portrait. */}
            <EvilEye
                eyeColor="#FCEE0A"
                intensity={0.85}
                pupilSize={0.72}
                irisWidth={0.2}
                glowIntensity={0.22}
                scale={0.42}
                noiseScale={1.15}
                pupilFollow={1.0}
                flameSpeed={0.55}
                backgroundColor="#000000"
            />
        </div>
    );
}
