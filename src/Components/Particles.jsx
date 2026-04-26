import { useEffect, useRef } from 'react';

export default function Particles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 1.8 + 0.4,
            speedY: -(Math.random() * 0.4 + 0.15),
            speedX: (Math.random() - 0.5) * 0.25,
            life: Math.random(),
            maxLife: Math.random() * 0.4 + 0.4,
        }));

        let animId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.y += p.speedY;
                p.x += p.speedX;
                p.life -= 0.0025;

                if (p.life <= 0 || p.y < -10) {
                    p.x = Math.random() * canvas.width;
                    p.y = canvas.height + 10;
                    p.life = p.maxLife;
                }

                const opacity = (p.life / p.maxLife) * 0.75;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(204, 50, 17, ${opacity})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = `rgba(139, 0, 0, ${opacity})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
}
