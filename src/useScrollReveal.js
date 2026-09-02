import { useEffect } from 'react';

/**
 * Reveals any element carrying [data-reveal] once it scrolls into view.
 * Observes the whole document and re-scans on DOM changes, so sections
 * that mount later (tab switches, modals) are picked up automatically.
 */
export default function useScrollReveal() {
    useEffect(() => {
        const seen = new WeakSet();

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );

        const scan = () => {
            document.querySelectorAll('[data-reveal]').forEach(el => {
                if (seen.has(el)) return;
                seen.add(el);
                observer.observe(el);
            });
        };

        scan();
        const mutations = new MutationObserver(scan);
        mutations.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutations.disconnect();
        };
    }, []);
}
