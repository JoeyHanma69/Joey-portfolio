import { useEffect } from 'react';

const GLYPHS = '▓▒░<>/\\[]{}=+*#@$%&01';
const DURATION = 440;    // ms for a label to fully decrypt, whatever the frame rate

/**
 * Runs a decrypt-style reveal over any [data-scramble] element on hover:
 * characters resolve left to right out of a run of glyphs.
 *
 * Driven by elapsed time rather than a tick count, so the reveal always
 * takes DURATION in wall-clock terms even where the browser throttles
 * timers for an unfocused window.
 *
 * Listeners are delegated from the document so elements mounted later
 * (tab panels, modals) are covered without re-binding.
 */
export default function useScramble() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const running = new WeakMap();

        const start = el => {
            // Rewriting textContent replaces the text node under the pointer,
            // which makes the browser fire mouseover again. Without this guard
            // the animation restarts every frame and never resolves.
            if (running.has(el)) return;

            if (!el.dataset.scrambleText) el.dataset.scrambleText = el.textContent;
            const text = el.dataset.scrambleText;
            const begun = performance.now();

            const tick = now => {
                const progress = Math.min((now - begun) / DURATION, 1);
                const locked = Math.floor(progress * text.length);

                if (progress >= 1) {
                    running.delete(el);
                    el.textContent = text;
                    return;
                }

                let out = text.slice(0, locked);
                for (let i = locked; i < text.length; i++) {
                    // Spaces stay spaces, or the word shape dissolves.
                    out += text[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
                }
                el.textContent = out;
                running.set(el, requestAnimationFrame(tick));
            };

            running.set(el, requestAnimationFrame(tick));
        };

        const onOver = e => {
            const el = e.target.closest?.('[data-scramble]');
            if (el) start(el);
        };

        document.addEventListener('mouseover', onOver);
        return () => {
            document.removeEventListener('mouseover', onOver);
            document.querySelectorAll('[data-scramble]').forEach(el => {
                const raf = running.get(el);
                if (raf) cancelAnimationFrame(raf);
                if (el.dataset.scrambleText) el.textContent = el.dataset.scrambleText;
            });
        };
    }, []);
}
