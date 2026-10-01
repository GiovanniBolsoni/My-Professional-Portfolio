import { useEffect, useRef } from 'react';
import styles from './NetworkBackground.module.css';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: Point[] = [];
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Calculate number of points based on screen size to keep density consistent
      const numPoints = Math.floor((width * height) / 15000);
      points = [];

      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw points
      ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
      
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i];
          const p2 = points[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 120) {
            ctx.strokeStyle = `rgba(0, 255, 0, ${0.2 - dist / 600})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connection to mouse
        const mouseDist = Math.hypot(points[i].x - mouseRef.current.x, points[i].y - mouseRef.current.y);
        if (mouseDist < 180) {
          ctx.strokeStyle = `rgba(0, 255, 0, ${0.4 - mouseDist / 450})`;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
          
          // Slight attraction to mouse
          points[i].x -= (points[i].x - mouseRef.current.x) * 0.002;
          points[i].y -= (points[i].y - mouseRef.current.y) * 0.002;
        }
      }

      if (document.visibilityState === 'visible') {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOut = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    init();
    draw();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};
