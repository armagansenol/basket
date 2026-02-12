"use client";

import { useEffect, useRef } from "react";

export default function RadialBurst() {
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
        let w: number;
        let b = 1;

        p.setup = () => {
          p.createCanvas((w = 600), w);
          p.background(15);
          p.noLoop();
        };

        p.draw = () => {
          if (b) {
            p.createCanvas((w = 600), w);
            p.background(15);
          }
          p.stroke(255);
          const n = 12;
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < 10; j++) {
              const a = p.random(Math.PI * 2);
              const r =
                p.map(i, 0, n - 1, w / 3, w / 10) *
                Math.pow(
                  p.random(),
                  p.map(i, 0, n - 1, 0.1, 0.2) - Math.abs(a - Math.PI) / 10
                );
              p.point(Math.cos(a) * r + w / 2, Math.sin(a) * r + w / 2);
            }
          }
          b = 0;
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
    <div className="w-full flex items-center justify-center">
      <div ref={containerRef} className="rounded-2xl overflow-hidden shadow-2xl" />
    </div>
  );
}
