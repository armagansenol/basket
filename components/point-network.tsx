"use client";

import { useEffect, useRef } from "react";

export default function PointNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: any = null;

    // Dynamically import p5 only on client side
    import("p5").then((p5Module) => {
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        let points: any[] = [];
        let palette = ["#ff0000", "#00ff00", "#0000ff", "#00ffff", "#ff00ff", "#ffff00", "#ffffff", "#000000"];

        const myLine = (x1: number, y1: number, x2: number, y2: number) => {
          const pAng = p.atan((y1 - y2) / (x1 - x2));
          const a1 = -(p.PI * 0.5) + pAng;
          const a2 = (p.PI * 0.5) + pAng;
          const d = p.dist(x1, y1, x2, y2);
          const w = d * p.random(0.001, 0.02);

          const p1 = {
            x: x1 + w * 0.5 * p.cos(a1),
            y: y1 + w * 0.5 * p.sin(a1)
          };
          const p2 = {
            x: x2 + w * 0.5 * p.cos(a1),
            y: y2 + w * 0.5 * p.sin(a1)
          };
          const p3 = {
            x: x2 + w * 0.5 * p.cos(a2),
            y: y2 + w * 0.5 * p.sin(a2)
          };
          const p4 = {
            x: x1 + w * 0.5 * p.cos(a2),
            y: y1 + w * 0.5 * p.sin(a2)
          };
          const cp = { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };

          p.noStroke();
          p.fill(palette[2]);
          p.beginShape();
          p.vertex(p1.x, p1.y);
          p.vertex(cp.x, cp.y);
          p.vertex(p2.x, p2.y);
          p.vertex(p3.x, p3.y);
          p.vertex(cp.x, cp.y);
          p.vertex(p4.x, p4.y);
          p.endShape();
        };

        const drawDots = (x_: number, y_: number, w_: number) => {
          const seg = 150;
          const w = w_ / seg;
          for (let i = 0; i <= seg; i++) {
            for (let j = 0; j <= seg; j++) {
              const x = x_ - w_ / 2 + i * w;
              const y = y_ - w_ / 2 + j * w;
              const ps = p.noise(x * 0.0006, y * 0.0006) * w * 1.5;
              if ((i % 2) === 0) {
                p.circle(x, y + w / 2, ps);
              } else {
                p.circle(x, y, ps);
              }
            }
          }
        };

        p.setup = () => {
          p.createCanvas(800, 800);
          p.noLoop();
          palette = p.shuffle(palette, true);
        };

        p.draw = () => {
          let col1 = p.random(palette);
          let col2 = p.random(palette);
          while (col1 === col2) {
            col1 = p.random(palette);
          }

          p.background(palette[0]);
          p.noStroke();
          p.fill(palette[1]);
          drawDots(p.width / 2, p.height / 2, p.width);
          p.background(0, 50);

          for (let i = 0; i < 110; i++) {
            const x = p.random(-0.1, 1.1) * p.width;
            const y = p.random(-0.1, 1.1) * p.height;
            points.push(p.createVector(x, y));
          }

          for (let i = 0; i < points.length; i++) {
            const p1 = points[i];
            for (let j = 0; j < points.length; j++) {
              const p2 = points[j];
              const d = p.dist(p1.x, p1.y, p2.x, p2.y);
              if (p1 !== p2 && d <= 150) {
                myLine(p1.x, p1.y, p2.x, p2.y);
              }
            }
          }

          for (let i = 0; i < points.length; i++) {
            const pt = points[i];
            const d = p.random(1, 20);
            p.noStroke();
            p.fill(palette[2]);
            p.circle(pt.x, pt.y, d);
          }
        };

        p.mousePressed = () => {
          points = [];
          p.redraw();
        };
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
    <div className="w-full flex items-center justify-center bg-neutral-900">
      <div ref={containerRef} />
    </div>
  );
}
