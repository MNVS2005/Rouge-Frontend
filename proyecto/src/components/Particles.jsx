import { useEffect, useRef } from "react";

export default function EmberParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

   
    const colors = ["#e8432a", "#f0b429", "#ff7a5c", "#ff9966"];

    const particles = Array.from({ length: 50 }, () => ({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      r:       Math.random() * 3 + 1,
      speed:   Math.random() * 1 + 0.8,
      drift:   (Math.random() - 0.5) * 0.4,   // movimiento lateral suave
      opacity: Math.random() * 0.99 + 0.3,
      color:   colors[Math.floor(Math.random() * colors.length)],
      flicker: Math.random() * 0.02 + 0.005,  // parpadeo
      flickerDir: 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Parpadeo de opacidad
        p.opacity += p.flicker * p.flickerDir;
        if (p.opacity >= 0.6 || p.opacity <= 0.05) p.flickerDir *= -1;

        // Movimiento: sube con deriva lateral
        p.y     -= p.speed;
        p.x     += p.drift;

        // Si sale por arriba, reaparece abajo en posición aleatoria
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }

        // Dibujar brasa con glow
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur  = 6;
        ctx.shadowColor = p.color;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",   // no bloquea clics
      }}
    />
  );
}