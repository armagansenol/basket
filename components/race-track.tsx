"use client";

import { useRef, useEffect, useState } from "react";

interface Racer {
  id: number;
  color: string;
  lane: number;
  progress: number;
  speed: number;
}

export default function RaceTrack() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [racers] = useState<Racer[]>([
    { id: 1, color: "#F59E0B", lane: 0, progress: 0.2, speed: 0.003 },
    { id: 2, color: "#10B981", lane: 1, progress: 0.4, speed: 0.0025 },
    { id: 3, color: "#EC4899", lane: 2, progress: 0.6, speed: 0.004 },
    { id: 4, color: "#3B82F6", lane: 3, progress: 0.3, speed: 0.0035 },
    { id: 5, color: "#8B5CF6", lane: 4, progress: 0.5, speed: 0.0028 },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Stars positions
    const stars: { x: number; y: number; size: number }[] = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
      });
    }

    const numLanes = 5;
    const laneSpacing = 50;

    function drawBackground(ctx: CanvasRenderingContext2D) {
      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#1e1b4b");
      gradient.addColorStop(1, "#312e81");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      ctx.fillStyle = "#ffffff";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawTrackLane(ctx: CanvasRenderingContext2D, lane: number) {
      // Perspective: bottom-left to top-right with isometric feel
      const baseX = width * 0.2; // Start more to the left
      const laneHorizontalOffset = lane * 60; // Horizontal spacing between lanes

      // Start point (bottom of screen)
      const sx = baseX + laneHorizontalOffset;
      const sy = height * 0.85;

      // End point (top of screen) - with perspective shift
      const ex = baseX + laneHorizontalOffset + width * 0.15;
      const ey = height * 0.15;

      // Control points for gentle curve
      const cp1x = sx + width * 0.05;
      const cp1y = sy - height * 0.25;

      const cp2x = ex - width * 0.05;
      const cp2y = ey + height * 0.25;

      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    function getPointOnLane(lane: number, progress: number): { x: number; y: number } {
      const baseX = width * 0.2;
      const laneHorizontalOffset = lane * 60;

      const sx = baseX + laneHorizontalOffset;
      const sy = height * 0.85;

      const ex = baseX + laneHorizontalOffset + width * 0.15;
      const ey = height * 0.15;

      const cp1x = sx + width * 0.05;
      const cp1y = sy - height * 0.25;

      const cp2x = ex - width * 0.05;
      const cp2y = ey + height * 0.25;

      // Cubic bezier curve calculation
      const t = progress;
      const mt = 1 - t;

      const x =
        mt * mt * mt * sx +
        3 * mt * mt * t * cp1x +
        3 * mt * t * t * cp2x +
        t * t * t * ex;

      const y =
        mt * mt * mt * sy +
        3 * mt * mt * t * cp1y +
        3 * mt * t * t * cp2y +
        t * t * t * ey;

      return { x, y };
    }

    function drawRacer(ctx: CanvasRenderingContext2D, racer: Racer) {
      const pos = getPointOnLane(racer.lane, racer.progress);

      // Glow effect
      const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 20);
      gradient.addColorStop(0, racer.color);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Sphere
      ctx.fillStyle = racer.color;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2);
      ctx.fill();

      // Highlight
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.beginPath();
      ctx.arc(pos.x - 4, pos.y - 4, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    let animationId: number;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      drawBackground(ctx);

      // Draw track lanes
      for (let i = 0; i < numLanes; i++) {
        drawTrackLane(ctx, i);
      }

      // Update and draw racers
      racers.forEach((racer) => {
        racer.progress += racer.speed;
        if (racer.progress > 1) racer.progress = 0;
        drawRacer(ctx, racer);
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [racers]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
