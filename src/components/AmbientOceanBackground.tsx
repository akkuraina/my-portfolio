'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  colorType: 'cyan' | 'white' | 'pale';
}

export default function AmbientOceanBackground() {
  const prefersReduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw cursor position motion values for the spotlight ripple
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);
  const targetOpacity = useMotionValue(0);

  // Spring physics for the lag-behind fluid spotlight ripple
  // Damping: 20, stiffness: 90, mass: 0.5 creates a gentle fluid inertia
  const springX = useSpring(cursorX, { damping: 20, stiffness: 90, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 20, stiffness: 90, mass: 0.5 });
  const springOpacity = useSpring(targetOpacity, { damping: 25, stiffness: 120 });

  // Store raw mouse position in ref for high-perf canvas constellation interaction
  const mousePosRef = useRef({ x: -1000, y: -1000, active: false });

  // Handle touch device detection & mouse tracking
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsTouchDevice(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(!e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches || prefersReduced) {
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      targetOpacity.set(1);
      mousePosRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      targetOpacity.set(0);
      mousePosRef.current.active = false;
    };

    const handleMouseEnter = () => {
      targetOpacity.set(1);
      mousePosRef.current.active = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, targetOpacity, prefersReduced]);

  // Constellation particle field canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = !document.hidden;

    // Handle canvas dimensions & retina scaling
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Initialize particles
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 60;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorTypes: ('cyan' | 'white' | 'pale')[] = ['cyan', 'white', 'pale'];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.2 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.35,
        colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)],
      });
    }

    const proximityThreshold = isMobile ? 95 : 125;
    const mouseProximityThreshold = 145;

    const getColor = (type: 'cyan' | 'white' | 'pale', alpha: number) => {
      if (type === 'cyan') return `rgba(25, 211, 197, ${alpha})`;
      if (type === 'pale') return `rgba(165, 243, 252, ${alpha})`;
      return `rgba(255, 255, 255, ${alpha})`;
    };

    const render = () => {
      if (!isTabVisible) return;

      ctx.clearRect(0, 0, width, height);

      const mouse = mousePosRef.current;

      // 1. Update positions & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges smoothly
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        // Calculate cursor proximity brightening
        let alpha = p.baseAlpha;
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const mouseDist = Math.sqrt(dx * dx + dy * dy);
          if (mouseDist < mouseProximityThreshold) {
            const boost = (1 - mouseDist / mouseProximityThreshold) * 0.5;
            alpha = Math.min(1, alpha + boost);

            // Draw subtle line from particle to cursor
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(25, 211, 197, ${(1 - mouseDist / mouseProximityThreshold) * 0.16})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw particle dot with soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = getColor(p.colorType, alpha);
        ctx.fill();
      }

      // 2. Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < proximityThreshold) {
            const lineAlpha = (1 - dist / proximityThreshold) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(25, 211, 197, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      if (!prefersReduced) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Initial render
    render();

    // Pause when tab not visible to save CPU/battery
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !prefersReduced) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* Layer 1: Aurora Mesh Gradient Base (Slow, morphing ambient light pools in deep teal & cyan) */}
      {!prefersReduced && (
        <div className="absolute inset-0 overflow-hidden opacity-70 dark:opacity-85 pointer-events-none">
          {/* Aurora Blob 1: Deep Navy / Oceanic Teal (Top-Left / Center Drift) */}
          <div className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[110px] bg-[radial-gradient(circle_at_center,rgba(10,37,51,0.75)_0%,rgba(7,45,56,0.45)_50%,transparent_75%)] dark:bg-[radial-gradient(circle_at_center,rgba(7,45,56,0.85)_0%,rgba(10,37,51,0.5)_50%,transparent_75%)] animate-aurora-blob-1" />

          {/* Aurora Blob 2: Deep Teal / Cerulean Glow (Bottom-Right Drift) */}
          <div className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-[120px] bg-[radial-gradient(circle_at_center,rgba(13,59,62,0.65)_0%,rgba(8,51,68,0.4)_50%,transparent_75%)] dark:bg-[radial-gradient(circle_at_center,rgba(14,165,198,0.22)_0%,rgba(13,59,62,0.6)_50%,transparent_75%)] animate-aurora-blob-2" />

          {/* Aurora Blob 3: Bright Cyan Accent Pool (Center-Right Breathing) */}
          <div className="absolute top-[35%] right-[15%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full blur-[95px] bg-[radial-gradient(circle_at_center,rgba(25,211,197,0.22)_0%,rgba(14,165,198,0.08)_45%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(25,211,197,0.26)_0%,rgba(14,165,198,0.1)_45%,transparent_70%)] animate-aurora-blob-3" />
        </div>
      )}

      {/* Layer 2: Constellation Particle Field (Canvas Network of Slow Floating Stars) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80 dark:opacity-90"
      />

      {/* Layer 3: Cursor-Following Glow ("Spotlight Ripple" - Diffuse Soft Radial Ambient Light) */}
      {!isTouchDevice && !prefersReduced && (
        <motion.div
          className="absolute -top-[250px] -left-[250px] w-[500px] h-[500px] rounded-full pointer-events-none blur-[35px] will-change-transform z-10"
          style={{
            x: springX,
            y: springY,
            opacity: springOpacity,
            background:
              'radial-gradient(circle 250px at center, rgba(25, 211, 197, 0.14) 0%, rgba(14, 165, 198, 0.06) 35%, rgba(2, 132, 199, 0.02) 65%, transparent 75%)',
          }}
        />
      )}
    </div>
  );
}
