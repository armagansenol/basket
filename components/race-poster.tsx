"use client";

import { useEffect, useRef } from "react";

export default function RacePoster() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: any = null;

    // Dynamically import p5 only on client side
    import("p5").then((p5Module) => {
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        let time = 0;
        const racers = [
          { x: 0, color: [45, 150, 240], lane: 0, speed: 0.012 }, // Orange (desaturated)
          { x: 0, color: [120, 160, 170], lane: 1, speed: 0.015 }, // Green (desaturated)
          { x: 0, color: [330, 180, 240], lane: 2, speed: 0.018 }, // Pink (desaturated)
          { x: 0, color: [200, 170, 240], lane: 3, speed: 0.013 }, // Blue (desaturated)
          { x: 0, color: [270, 150, 210], lane: 4, speed: 0.016 }, // Purple (desaturated)
        ];

        const stars: any[] = [];

        p.setup = () => {
          p.createCanvas(600, 600);
          p.colorMode(p.HSB, 360, 100, 100, 100);
          p.noLoop();
          p.frameRate(60);

          // Generate random stars
          for (let i = 0; i < 30; i++) {
            stars.push({
              x: p.random(p.width),
              y: p.random(p.height),
              size: p.random(1, 3),
              brightness: p.random(60, 100),
            });
          }

          // Initialize racer positions
          racers.forEach((racer) => {
            racer.x = p.random(0, 1);
          });

          p.loop();
        };

        p.draw = () => {
          // Gradient background
          drawGradientBackground();

          // Draw stars
          drawStars();

          // Draw racing lanes
          drawRacingLanes();

          // Draw racers
          drawRacers();

          // Apply vintage effects
          applyGrain();
          applyVignette();

          // Update racer positions
          time += 0.01;
          racers.forEach((racer) => {
            racer.x += racer.speed;
            if (racer.x > 1) racer.x = 0;
          });
        };

        function drawGradientBackground() {
          // Create gradient from purple to dark blue
          for (let y = 0; y < p.height; y++) {
            const inter = p.map(y, 0, p.height, 0, 1);
            const c = p.lerpColor(
              p.color(250, 60, 30), // Top purple
              p.color(230, 80, 10), // Bottom dark blue
              inter
            );
            p.stroke(c);
            p.line(0, y, p.width, y);
          }
        }

        function drawStars() {
          p.noStroke();
          stars.forEach((star) => {
            p.fill(0, 0, star.brightness, 80);
            p.circle(star.x, star.y, star.size);
          });
        }

        function drawRacingLanes() {
          p.noFill();
          p.strokeWeight(2);

          // Draw 5 curved lanes with perspective
          for (let i = 0; i < 5; i++) {
            // Lane color - subtle yellow/white
            p.stroke(50, 40, 70, 60);

            // Draw lane as a bezier curve
            const startY = p.height - 100 - i * 60;
            const endY = 150 - i * 30;
            const startX = 50;
            const endX = p.width - 50;

            // Control points for perspective curve
            const cx1 = p.width * 0.3;
            const cy1 = startY - 50;
            const cx2 = p.width * 0.7;
            const cy2 = endY - 30;

            p.bezier(startX, startY, cx1, cy1, cx2, cy2, endX, endY);

            // Draw lane divider lines
            p.strokeWeight(1);
            p.stroke(50, 40, 50, 40);
            const dividerY = startY - 20;
            const dividerEndY = endY - 10;
            p.bezier(
              startX,
              dividerY,
              cx1,
              dividerY - 40,
              cx2,
              dividerEndY - 20,
              endX,
              dividerEndY
            );
          }
        }

        function drawRacers() {
          racers.forEach((racer) => {
            const pos = getRacerPosition(racer.x, racer.lane);

            // Draw shadow
            p.noStroke();
            p.fill(0, 0, 0, 20);
            p.circle(pos.x + 3, pos.y + 8, pos.size * 0.8);

            // Draw racer sphere with glow
            // Outer glow
            const glowSize = pos.size * 1.8;
            const gradient = p.drawingContext.createRadialGradient(
              pos.x,
              pos.y,
              0,
              pos.x,
              pos.y,
              glowSize / 2
            );

            const col = p.color(racer.color[0], racer.color[1], racer.color[2]);
            const colStr = `hsla(${racer.color[0]}, ${racer.color[1]}%, ${racer.color[2]}%, 0.3)`;
            const colStrCenter = `hsla(${racer.color[0]}, ${racer.color[1]}%, ${racer.color[2]}%, 0.8)`;

            gradient.addColorStop(0, colStrCenter);
            gradient.addColorStop(0.5, colStr);
            gradient.addColorStop(1, "rgba(0,0,0,0)");

            p.drawingContext.fillStyle = gradient;
            p.circle(pos.x, pos.y, glowSize);

            // Main sphere
            p.fill(racer.color[0], racer.color[1], racer.color[2]);
            p.circle(pos.x, pos.y, pos.size);

            // Highlight
            p.fill(0, 0, 100, 60);
            p.circle(pos.x - pos.size * 0.15, pos.y - pos.size * 0.15, pos.size * 0.3);
          });
        }

        function getRacerPosition(t: number, lane: number) {
          // Calculate position along the bezier curve
          const startY = p.height - 100 - lane * 60;
          const endY = 150 - lane * 30;
          const startX = 50;
          const endX = p.width - 50;

          const cx1 = p.width * 0.3;
          const cy1 = startY - 50;
          const cx2 = p.width * 0.7;
          const cy2 = endY - 30;

          // Bezier curve formula
          const x =
            Math.pow(1 - t, 3) * startX +
            3 * Math.pow(1 - t, 2) * t * cx1 +
            3 * (1 - t) * Math.pow(t, 2) * cx2 +
            Math.pow(t, 3) * endX;

          const y =
            Math.pow(1 - t, 3) * startY +
            3 * Math.pow(1 - t, 2) * t * cy1 +
            3 * (1 - t) * Math.pow(t, 2) * cy2 +
            Math.pow(t, 3) * endY;

          // Size decreases with distance (perspective)
          const size = p.map(t, 0, 1, 35, 15);

          return { x, y, size };
        }

        function applyGrain() {
          // Add film grain effect with random noise points
          p.noStroke();
          const grainCount = 3000; // number of grain particles

          for (let i = 0; i < grainCount; i++) {
            const x = p.random(p.width);
            const y = p.random(p.height);
            const brightness = p.random(0, 100);
            const alpha = p.random(10, 40);

            p.fill(0, 0, brightness, alpha);
            p.circle(x, y, p.random(0.5, 1.5));
          }
        }

        function applyVignette() {
          // Add vignette effect (darker edges)
          const ctx = p.drawingContext;
          const centerX = p.width / 2;
          const centerY = p.height / 2;
          const radius = p.width * 0.8;

          const gradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            radius
          );

          gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
          gradient.addColorStop(0.7, "rgba(0, 0, 0, 0)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");

          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, p.width, p.height);
        }
      };

      if (containerRef.current) {
        p5Instance = new p5(sketch, containerRef.current);
      }
    });

    // Cleanup function
    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div ref={containerRef} className="rounded-2xl overflow-hidden shadow-2xl" />
    </div>
  );
}
