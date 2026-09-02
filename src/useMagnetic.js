import { useEffect } from 'react';

const STRENGTH = 0.28;   // fraction of the cursor offset the element follows
const RADIUS = 90;       // px beyond the element's box that still pulls

/**
 * Pulls any [data-magnetic] element gently toward the cursor.
 * Only active in editorial mode and only for devices with a real pointer.
 */
export default function useMagnetic() {
    useEffect(() => {
        const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
        const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!fine.matches || calm.matches) return;

        const release = el => {
            el.classList.remove('magnet-active');
            el.style.transform = '';
        };

        const onMove = e => {
            if (!document.body.classList.contains('theme-editorial')) return;

            document.querySelectorAll('[data-magnetic]').forEach(el => {
                const r = el.getBoundingClientRect();
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                const dx = e.clientX - cx;
                const dy = e.clientY - cy;

                const inRange =
                    Math.abs(dx) < r.width / 2 + RADIUS &&
                    Math.abs(dy) < r.height / 2 + RADIUS;

                if (inRange) {
                    el.classList.add('magnet-active');
                    el.style.transform = `translate(${dx * STRENGTH}px, ${dy * STRENGTH}px)`;
                } else if (el.classList.contains('magnet-active')) {
                    release(el);
                }
            });
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', onMove);
            document.querySelectorAll('[data-magnetic]').forEach(release);
        };
    }, []);
}
