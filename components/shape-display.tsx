"use client";

import { useEffect, useRef } from "react";

export default function ShapeDisplay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: any = null;
    let isCancelled = false;

    // Dynamically import p5 only on client side
    import("p5").then((p5Module) => {
      if (isCancelled) return; // Don't create instance if component unmounted
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        const drawShape = (x: number, y: number, size: number) => {
          p.push();
          p.translate(x, y);

          // Colors
          const centerOrange = '#D26633';
          const lightBeige = '#EACBB1';
          const darkOrange = '#C75333';
          const white = '#FFFFFF';

          const petalSize = size * 0.35;
          const centerSize = size * 0.25;
          const distance = size * 0.42;

          // Draw light beige petals (diagonal positions) - using ellipses
          p.noStroke();
          for (let i = 0; i < 4; i++) {
            p.fill(lightBeige);
            p.push();
            p.rotate(p.PI / 4 + i * p.PI / 2);
            p.translate(distance, 0);
            p.ellipse(0, 0, petalSize, petalSize);
            p.pop();
          }

          // Draw dark orange petals (cardinal positions) - using ellipses
          for (let i = 0; i < 4; i++) {
            p.fill(darkOrange);
            p.push();
            p.rotate(i * p.PI / 2);
            p.translate(distance, 0);
            p.ellipse(0, 0, petalSize * 0.8, petalSize * 0.8);
            p.pop();
          }

          // Draw white cross lines
          p.stroke(white);
          p.strokeWeight(size * 0.12);
          p.line(-size * 0.6, 0, size * 0.6, 0);
          p.line(0, -size * 0.6, 0, size * 0.6);

          // Draw center diamond
          p.noStroke();
          p.fill(centerOrange);
          p.push();
          p.rotate(p.PI / 4);
          p.rectMode(p.CENTER);
          p.rect(0, 0, centerSize, centerSize);
          p.pop();

          p.pop();
        };

        p.setup = () => {
          p.createCanvas(800, 800);
          p.noLoop();
        };

        p.draw = () => {
          p.background(240, 240, 238);
          drawShape(p.width / 2, p.height / 2, 150);
        };
      };

      if (containerRef.current) {
        p5Instance = new p5(sketch, containerRef.current);
      }
    });

    // Cleanup function
    return () => {
      isCancelled = true;
      if (p5Instance) {
        p5Instance.remove();
      }
      // Clear container to prevent duplicate canvases
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center bg-white">
      <div ref={containerRef} />
    </div>
  );
}
