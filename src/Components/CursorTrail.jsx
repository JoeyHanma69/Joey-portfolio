import { useEffect, useRef } from 'react';

export default function CursorTrail() {
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

        let particles = [];

        const onMouseMove = (e) => {
            for (let i = 0; i < 3; i++) {
                particles.push({
                    x: e.clientX + (Math.random() - 0.5) * 6,
                    y: e.clientY + (Math.random() - 0.5) * 6,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 1.2,
                    speedY: -(Math.random() * 1.8 + 0.4),
                    life: 1,
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        let animId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles = particles.filter(p => p.life > 0);
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.life -= 0.045;
                p.size *= 0.97;
                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(p.size, 0.1), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 40, 17, ${p.life * 0.75})`;
                ctx.shadowBlur = 7;
                ctx.shadowColor = 'rgba(139, 0, 0, 0.9)';
                ctx.fill();
            });
            animId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none',
                zIndex: 9996,
            }}
        />
    );
}
