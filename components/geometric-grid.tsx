// By Okazz
"use client";

import { useEffect, useRef } from "react";

export default function GeometricGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: any = null;

    // Dynamically import p5 only on client side
    import("p5").then((p5Module) => {
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        const colors = ['#f71735', '#067bc2', '#FFC247', '#3BD89F', '#81cfe5', '#f654a9'];

        const drawShape = (x: number, y: number, w: number, shapeType: number, clr: string) => {
          const offset = w * 0.05;
          p.push();
          p.translate(x, y);
          p.strokeWeight(w * 0.03);
          p.noStroke();
          p.fill(clr);

          if (shapeType === 0) {
            p.circle(-offset, offset, w * 0.5);
            p.noFill();
            p.stroke(0);
            p.circle(0, 0, w * 0.5);
            const r = w * 0.5;
            for (let i = 0; i < 4; i++) {
              const a = p.map(i, 0, 4, 0, p.TAU);
              p.line(r * 0.5 * p.cos(a), r * 0.5 * p.sin(a), r * p.cos(a), r * p.sin(a));
            }
          } else if (shapeType === 1) {
            p.square(-(w / 4) - offset, -(w / 4) + offset, w / 2);
            p.square((w / 4) - offset, (w / 4) + offset, w / 2);
            p.stroke(0);
            p.noFill();
            p.square(-(w / 4), -(w / 4), w / 2);
            p.square((w / 4), (w / 4), w / 2);
          } else if (shapeType === 2) {
            p.triangle((w / 2) - offset, (w / 2) + offset, -(w / 2) - offset, (w / 2) + offset, -(w / 2) - offset, -(w / 2) + offset);
            p.noFill();
            p.stroke(0);
            p.triangle((w / 2), (w / 2), -(w / 2), (w / 2), -(w / 2), -(w / 2));
          } else if (shapeType === 3) {
            p.circle(-(w / 4) - offset, -(w / 4) + offset, w / 2);
            p.circle((w / 4) - offset, offset, w / 2);
            p.noFill();
            p.stroke(0);
            p.circle(-(w / 4), -(w / 4), w / 2);
            p.circle((w / 4), 0, w / 2);
            p.line(-w / 4, 0, -w / 4, w / 2);
            p.line(w / 4, w / 4, w / 4, w / 2);
          } else if (shapeType === 4) {
            p.beginShape();
            p.vertex(0 - offset, -(w / 2) + offset);
            p.vertex((w / 2) - offset, offset);
            p.vertex(0 - offset, (w / 2) + offset);
            p.vertex(-(w / 2) - offset, 0 + offset);
            p.endShape();
            p.noFill();
            p.stroke(0);
            p.beginShape();
            p.vertex(0, -(w / 2));
            p.vertex((w / 2), 0);
            p.vertex(0, (w / 2));
            p.vertex(-(w / 2), 0);
            p.endShape(p.CLOSE);
            p.line((w / 4), 0, (w / 4), w / 2);
            p.line((w / 3), 0, (w / 3), w / 2);
          } else if (shapeType === 5) {
            p.beginShape();
            p.vertex(-(w / 2) - offset, -(w / 2) + offset);
            p.vertex((w / 2) - offset, -(w / 2) + offset);
            p.vertex((w / 2) - offset, 0 + offset);
            p.vertex(-offset, 0 + offset);
            p.vertex(-offset, (w / 2) + offset);
            p.vertex(-(w / 2) - offset, (w / 2) + offset);
            p.endShape(p.CLOSE);
            p.noFill();
            p.stroke(0);
            p.beginShape();
            p.vertex(-(w / 2), -(w / 2));
            p.vertex((w / 2), -(w / 2));
            p.vertex((w / 2), 0);
            p.vertex(0, 0);
            p.vertex(0, (w / 2));
            p.vertex(-(w / 2), (w / 2));
            p.endShape(p.CLOSE);
          } else if (shapeType === 6) {
            p.circle((w * 0.3) - offset, (w * 0.3) + offset, w * 0.4);
            p.circle(-(w * 0.15) - offset, -(w * 0.15) + offset, w * 0.7);
            p.noFill();
            p.stroke(0);
            p.circle((w * 0.3), (w * 0.3), w * 0.4);
            p.circle(-(w * 0.15), -(w * 0.15), w * 0.7);
          } else if (shapeType === 7) {
            p.rect(-offset, -(w / 8) * 3 + offset, w, (w / 4));
            p.rect(-offset, (w / 8) + offset, (w / 2), (w / 2));
            p.noFill();
            p.stroke(0);
            p.rect(0, -(w / 8) * 3, w, (w / 4));
            p.rect(0, (w / 8), (w / 2), (w / 2));
          } else if (shapeType === 8) {
            p.circle(-(w / 8) - offset, (w / 8) + offset, (w / 8 * 6));
            p.noFill();
            p.stroke(0);
            p.circle(-(w / 8), (w / 8), (w / 8 * 6));
            p.line(0, 0, w / 2, -w / 2);
            p.line((w / 8), 0, (w / 8 * 3), -(w / 4));
          } else if (shapeType === 9) {
            p.arc(-offset, offset, w, w, 0, p.PI, p.PIE);
            p.noFill();
            p.stroke(0);
            p.arc(0, 0, w, w, 0, p.PI, p.PIE);
            p.line(-w * 0.2, w / 4, -w * 0.2, -w / 4);
          } else if (shapeType === 10) {
            p.push();
            p.translate(-offset, offset);
            p.circle(w * 0.3, 0, w * 0.4);
            p.circle(0, w * 0.3, w * 0.4);
            p.circle(-w * 0.3, 0, w * 0.4);
            p.circle(0, -w * 0.3, w * 0.4);
            p.pop();
            p.noFill();
            p.stroke(0);
            p.circle(w * 0.3, 0, w * 0.4);
            p.circle(0, w * 0.3, w * 0.4);
            p.circle(-w * 0.3, 0, w * 0.4);
            p.circle(0, -w * 0.3, w * 0.4);
          } else if (shapeType === 11) {
            p.beginShape();
            for (let a = p.PI / 2; a < p.PI; a += p.TAU / 180) {
              p.vertex(w / 2 + w * p.cos(a) - offset, -w / 2 + w * p.sin(a) + offset);
            }
            for (let a = p.PI * 1.5; a < p.TAU; a += p.TAU / 180) {
              p.vertex(-w / 2 + w * p.cos(a) - offset, w / 2 + w * p.sin(a) + offset);
            }
            p.endShape();
            p.noFill();
            p.stroke(0);
            p.beginShape();
            for (let a = p.PI / 2; a < p.PI; a += p.TAU / 180) {
              p.vertex(w / 2 + w * p.cos(a), -w / 2 + w * p.sin(a));
            }
            for (let a = p.PI * 1.5; a < p.TAU; a += p.TAU / 180) {
              p.vertex(-w / 2 + w * p.cos(a), w / 2 + w * p.sin(a));
            }
            p.endShape();
          } else if (shapeType === 12) {
            p.push();
            p.translate(-offset, offset);
            p.beginShape();
            p.vertex(-w / 4, 0);
            p.vertex(w / 4, -w / 2);
            p.vertex(w / 2, -w / 4);
            p.vertex(-w / 4, w / 2);
            p.vertex(-w / 2, w / 4);
            p.vertex(-w / 4, 0);
            p.vertex(w / 4, w / 2);
            p.vertex(w / 2, w / 4);
            p.vertex(-w / 4, -w / 2);
            p.vertex(-w / 2, -w / 4);
            p.endShape(p.CLOSE);
            p.pop();

            p.noFill();
            p.stroke(0);
            p.beginShape();
            p.vertex(-w / 4, 0);
            p.vertex(w / 4, -w / 2);
            p.vertex(w / 2, -w / 4);
            p.vertex(-w / 4, w / 2);
            p.vertex(-w / 2, w / 4);
            p.vertex(-w / 4, 0);
            p.vertex(w / 4, w / 2);
            p.vertex(w / 2, w / 4);
            p.vertex(-w / 4, -w / 2);
            p.vertex(-w / 2, -w / 4);
            p.endShape(p.CLOSE);
          } else if (shapeType === 13) {
            p.push();
            p.translate(-offset, offset);
            p.circle(-w / 4, w * 0.15, w / 2);
            p.circle(w / 4, -w * 0.15, w / 2);
            p.pop();
            p.noFill();
            p.stroke(0);
            p.circle(-w / 4, w * 0.15, w / 2);
            p.circle(w / 4, -w * 0.15, w / 2);
            p.line(0, -w * 0.15, 0, w * 0.15);
          } else if (shapeType === 14) {
            p.push();
            p.translate(-offset, offset);
            p.arc(w * 0.1, w * 0.1, w * 0.75, w * 0.75, p.PI / 4, p.PI + p.PI / 4);
            p.arc(-w * 0.1, -w * 0.1, w * 0.75, w * 0.75, p.PI + p.PI / 4, p.TAU + p.PI / 4);
            p.pop();
            p.noFill();
            p.stroke(0);
            p.arc(w * 0.1, w * 0.1, w * 0.75, w * 0.75, p.PI / 4, p.PI + p.PI / 4);
            p.arc(-w * 0.1, -w * 0.1, w * 0.75, w * 0.75, p.PI + p.PI / 4, p.TAU + p.PI / 4);
            p.line(-w / 2, -w / 2, w / 2, w / 2);
          } else if (shapeType === 15) {
            p.rect(-offset, offset, w, w, w, w, 0, w);
            p.noFill();
            p.stroke(0);
            p.rect(0, 0, w, w, w, w, 0, w);
          }
          p.pop();
        };

        p.setup = () => {
          p.createCanvas(900, 900);
          p.rectMode(p.CENTER);
          const side = p.width * 0.8;
          const cellCount = 7;
          const cellSize = side / cellCount;
          let c = 0;
          p.background('#fffafe');
          for (let i = 0; i < cellCount; i++) {
            for (let j = 0; j < cellCount; j++) {
              const x = p.map(i, 0, cellCount, 0, side) + cellSize / 2 + (p.width - side) / 2;
              const y = p.map(j, 0, cellCount, 0, side) + cellSize / 2 + (p.height - side) / 2;
              const clr = p.random(colors);
              drawShape(x, y, cellSize * 0.6, c % 15, clr);
              c++;
            }
          }
          p.noLoop();
        };

        p.draw = () => {
          // Static drawing, no animation
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
    <div className="w-full flex items-center justify-center bg-[#fffafe]">
      <div ref={containerRef} />
    </div>
  );
}
