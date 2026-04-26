import { useEffect, useRef, useState } from 'react';
import './SlashReveal.css';

export default function SlashReveal() {
    const ref = useRef(null);
    const [active, setActive] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const target = ref.current?.parentElement;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !done) {
                    setActive(true);
                    setTimeout(() => setDone(true), 1000);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [done]);

    if (done) return null;

    return <div ref={ref} className={`slash-reveal ${active ? 'active' : ''}`} />;
}
