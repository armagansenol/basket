// By Okazz
"use client";

import { useEffect, useRef } from "react";

export default function MotionGrid() {
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
        let ctx: any;
        const colors = ['#235789', '#c1292e', '#f1d302', '#ffffff', '#d67ab1', '#2e933c', '#e4572e', '#17bebb'];
        let motions: any[] = [];
        let motionClasses: any[] = [];

        const easeInOutQuint = (x: number) => {
          return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
        };

        class Motion {
          x: number;
          y: number;
          w: number;
          t: number;
          t1: number;
          t2: number;
          clr1: any;
          clr2: any;
          ang: number;

          constructor(x: number, y: number, w: number, clr1: string, clr2: string) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.t = 0;
            this.t1 = 60;
            this.t2 = this.t1 + 60;
            this.clr1 = p.color(clr1);
            this.clr2 = p.color(clr2);
            this.ang = p.int(p.random(4)) * (p.TAU / 4);
            this.init();
          }

          show() {
            // Override in subclasses
          }

          move() {
            // Override in subclasses
          }

          area() {
            p.push();
            p.translate(this.x, this.y);
            p.rotate(this.ang);
            p.fill(0, 0);
            p.stroke(0, 0);
            p.square(0, 0, this.w);
            ctx.clip();
            this.show();
            p.pop();
          }

          init() {
            this.t = 0;
          }

          run() {
            this.area();
            this.move();
            this.t++;
            if (this.t2 < this.t) {
              this.init();
              this.ang = p.int(p.random(4)) * (p.TAU / 4);
              let clr1 = p.random(colors);
              let clr2 = p.random(colors);
              while (clr1 === clr2) {
                clr1 = p.random(colors);
                clr2 = p.random(colors);
              }
              this.clr1 = p.color(clr1);
              this.clr2 = p.color(clr2);
            }
          }
        }

        class Motion01 extends Motion {
          clr: any;
          shift1: number;
          shift2: number;

          constructor(x: number, y: number, w: number, clr1: string, clr2: string) {
            super(x, y, w, clr1, clr2);
            this.clr = this.clr1;
            this.shift1 = this.w;
            this.shift2 = 0;
          }

          init() {
            this.t = 0;
            this.shift1 = this.w;
            this.shift2 = 0;
          }

          show() {
            p.fill(this.clr);
            p.arc(this.shift2, -this.shift1, this.w, this.w, 0, p.PI / 2);
            p.arc(-this.shift2, -this.shift1, this.w, this.w, p.PI / 2, p.PI);
            p.arc(-this.shift2, this.shift1, this.w, this.w, p.PI, p.PI + p.PI / 2);
            p.arc(this.shift2, this.shift1, this.w, this.w, p.PI + p.PI / 2, p.TAU);
          }

          move() {
            if (0 < this.t && this.t < this.t1) {
              const n = p.norm(this.t, 0, this.t1 - 1);
              this.clr = p.lerpColor(this.clr1, this.clr2, easeInOutQuint(n));
              this.shift1 = p.lerp(this.w, 0, easeInOutQuint(n));
            }
            if (this.t1 < this.t && this.t < this.t2) {
              const n = p.norm(this.t, this.t1, this.t2 - 1);
              this.clr = p.lerpColor(this.clr2, this.clr1, easeInOutQuint(n));
              this.shift2 = p.lerp(0, this.w / 2, easeInOutQuint(n));
            }
          }
        }

        class Motion02 extends Motion {
          shift: number;

          constructor(x: number, y: number, w: number, clr1: string, clr2: string) {
            super(x, y, w, clr1, clr2);
            this.shift = this.w * 1.1;
          }

          init() {
            this.t = 0;
            this.shift = this.w * 1.1;
          }

          show() {
            for (let i = 0; i < 6; i++) {
              if (i % 2 === 0) {
                p.fill(this.clr1);
              } else {
                p.fill(this.clr2);
              }
              p.rotate(p.TAU / 6);
              p.beginShape();
              p.vertex(this.shift, 0);
              p.vertex(this.w * 0.5 * p.cos(0) + this.shift, this.w * 0.5 * p.sin(0));
              p.vertex(this.w * 0.5 * p.cos(p.PI / 3) + this.shift, this.w * 0.5 * p.sin(p.PI / 3));
              p.endShape();
            }
          }

          move() {
            if (0 < this.t && this.t < this.t1) {
              const n = p.norm(this.t, 0, this.t1 - 1);
              this.shift = p.lerp(this.w, 0, easeInOutQuint(n));
            }
            if (this.t1 < this.t && this.t < this.t2) {
              const n = p.norm(this.t, this.t1, this.t2 - 1);
              this.shift = p.lerp(0, -this.w * 1.1, easeInOutQuint(n));
            }
          }
        }

        class Motion03 extends Motion {
          shift1: number;
          shift2: number;
          shift3: number;

          constructor(x: number, y: number, w: number, clr1: string, clr2: string) {
            super(x, y, w, clr1, clr2);
            this.shift1 = this.w;
            this.shift2 = this.w;
            this.shift3 = this.w;
          }

          init() {
            this.t = 0;
            this.shift1 = this.w;
            this.shift2 = this.w;
            this.shift3 = this.w;
          }

          show() {
            p.fill(this.clr1);
            p.rect(this.shift1, this.w / 3, this.w, this.w / 3);
            p.fill(this.clr1);
            p.rect(-this.shift2, -this.w / 3, this.w, this.w / 3);
            p.fill(this.clr2);
            p.rect(this.shift3, 0, this.w, this.w / 3);
          }

          move() {
            if (5 < this.t && this.t < this.t1) {
              const n = p.norm(this.t, 5, this.t1 - 1);
              this.shift3 = p.lerp(this.w, 0, easeInOutQuint(n));
            }
            if (10 < this.t && this.t < this.t1) {
              const n = p.norm(this.t, 10, this.t1 - 1);
              this.shift2 = p.lerp(this.w, 0, easeInOutQuint(n));
            }
            if (15 < this.t && this.t < this.t1) {
              const n = p.norm(this.t, 15, this.t1 - 1);
              this.shift1 = p.lerp(this.w, 0, easeInOutQuint(n));
            }

            if (this.t1 + 5 < this.t && this.t < this.t2) {
              const n = p.norm(this.t, this.t1 + 5, this.t2 - 1);
              this.shift3 = p.lerp(0, this.w, easeInOutQuint(n));
            }
            if (this.t1 + 10 < this.t && this.t < this.t2) {
              const n = p.norm(this.t, this.t1 + 10, this.t2 - 1);
              this.shift1 = p.lerp(0, -this.w, easeInOutQuint(n));
            }
            if (this.t1 + 15 < this.t && this.t < this.t2) {
              const n = p.norm(this.t, this.t1 + 15, this.t2 - 1);
              this.shift2 = p.lerp(0, -this.w, easeInOutQuint(n));
            }
          }
        }

        class Motion04 extends Motion {
          shift: number;
          circleD: number;

          constructor(x: number, y: number, w: number, clr1: string, clr2: string) {
            super(x, y, w, clr1, clr2);
            this.shift = this.w / 2;
            this.circleD = 0;
          }

          init() {
            this.t = 0;
            this.shift = this.w / 2;
            this.circleD = 0;
          }

          show() {
            p.fill(this.clr1);
            p.circle(this.w * 0.05 + this.shift, this.w * 0.05, this.circleD);
            p.fill(this.clr2);
            p.circle(-this.w * 0.05 + this.shift, -this.w * 0.05, this.circleD);
          }

          move() {
            if (0 < this.t && this.t < this.t1) {
              const n = p.norm(this.t, 0, this.t1 - 1);
              this.shift = p.lerp(this.w / 2, 0, easeInOutQuint(n));
              this.circleD = p.lerp(0, this.w * 0.9, easeInOutQuint(n));
            }
            if (this.t1 < this.t && this.t < this.t2) {
              const n = p.norm(this.t, this.t1, this.t2 - 1);
              this.shift = p.lerp(0, -this.w / 2, easeInOutQuint(n));
              this.circleD = p.lerp(this.w * 0.9, 0, easeInOutQuint(n));
            }
          }
        }

        p.setup = () => {
          p.createCanvas(900, 900);
          p.rectMode(p.CENTER);
          ctx = p.drawingContext;
          motionClasses = [Motion01, Motion02, Motion03, Motion04];
          const gridSize = p.width * 0.9;
          const cellCount = 6;
          const cellSize = gridSize / cellCount;
          let number = 0;
          for (let i = 0; i < cellCount; i++) {
            for (let j = 0; j < cellCount; j++) {
              const x = cellSize * j + (cellSize / 2) + (p.width - gridSize) / 2;
              const y = cellSize * i + (cellSize / 2) + (p.height - gridSize) / 2;
              const MotionClass = motionClasses[number % motionClasses.length];
              let clr1 = p.random(colors);
              let clr2 = p.random(colors);
              while (clr1 === clr2) {
                clr1 = p.random(colors);
                clr2 = p.random(colors);
              }
              motions.push(new MotionClass(x, y, cellSize * 0.5, clr1, clr2));
              number++;
            }
          }
        };

        p.draw = () => {
          p.background('#000000');
          for (const m of motions) {
            m.run();
          }
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
    <div className="w-full flex items-center justify-center bg-black">
      <div ref={containerRef} />
    </div>
  );
}
