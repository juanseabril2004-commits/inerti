"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface GlobalParticlesProps {
  quantity?: number;
  staticity?: number;
  ease?: number;
  color?: string;
  opacity?: number;
}

export default function GlobalParticles({
  quantity = 40,
  staticity = 40,
  ease = 30,
  color = "#3b82f6",
  opacity = 0.4,
}: GlobalParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<
    { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[]
  >([]);
  const animationFrame = useRef<number>(0);
  const isAnimating = useRef(true);
  const isVisible = useRef(true);

  const initParticles = useCallback(
    (w: number, h: number) => {
      particles.current = Array.from({ length: quantity }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      }));
    },
    [quantity]
  );

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    initParticles(dimensions.width, dimensions.height);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const handleVisibility = () => {
      isVisible.current = document.visibilityState === "visible";
      if (isVisible.current && !isAnimating.current) {
        isAnimating.current = true;
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const animate = () => {
      if (!isVisible.current) {
        isAnimating.current = false;
        return;
      }

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      particles.current.forEach((p) => {
        // Mouse influence
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.02 * (ease / 50);
          p.vy += (dy / dist) * force * 0.02 * (ease / 50);
        }

        // Static drag
        p.vx *= staticity / 100;
        p.vy *= staticity / 100;

        // Random movement
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = dimensions.width;
        if (p.x > dimensions.width) p.x = 0;
        if (p.y < 0) p.y = dimensions.height;
        if (p.y > dimensions.height) p.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      // Draw connections
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [dimensions, quantity, staticity, ease, color, initParticles]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
