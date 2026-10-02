import React, { useEffect, useRef } from 'react';

/**
 * SkillTrailEffect - Interactive Canvas Cursor Trail Effect
 * Spawns glowing particle trails and technology accent sparks following cursor motion.
 */
export default function SkillTrailEffect({ activeColor = '#fe3c01', activeSkillText = '' }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const activeColorRef = useRef(activeColor);
  const activeSkillTextRef = useRef(activeSkillText);

  useEffect(() => {
    activeColorRef.current = activeColor;
  }, [activeColor]);

  useEffect(() => {
    activeSkillTextRef.current = activeSkillText;
  }, [activeSkillText]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseRef.current = { x, y, active: true };

      // Spawn trail particles on mouse move
      const color = activeColorRef.current || '#fe3c01';
      const particleCount = 2;

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.8,
          radius: Math.random() * 5 + 3,
          maxRadius: Math.random() * 8 + 6,
          color,
          alpha: 0.85,
          decay: Math.random() * 0.025 + 0.015,
          text: Math.random() > 0.7 ? activeSkillTextRef.current : '',
        });
      }

      // Limit particle array size for performance
      if (particlesRef.current.length > 80) {
        particlesRef.current = particlesRef.current.slice(-80);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const parentEl = canvas.parentElement;
    if (parentEl) {
      parentEl.addEventListener('mousemove', handleMouseMove, { passive: true });
      parentEl.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Draw particle glow
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Optional text label spark
        if (p.text) {
          ctx.font = '700 10px monospace';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(p.text, p.x + 8, p.y + 4);
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      if (parentEl) {
        parentEl.removeEventListener('mousemove', handleMouseMove);
        parentEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
