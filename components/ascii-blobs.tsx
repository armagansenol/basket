/*
   ASCII Blobs - Typewriter Art
   Based on 'ascii-blobs' by @cartocopia
   Combining "Morph" + "Typewriter Art" #WCCChallenge
*/

"use client";

import { useEffect, useRef } from "react";

class Blob {
  pos: any;
  strength: number;
  dir: any;
  drift: number;
  gridsize: number;
  p: any;

  constructor(p: any, gridsize: number) {
    this.p = p;
    this.gridsize = gridsize;
    this.pos = p.createVector(p.random(gridsize), p.random(gridsize));
    this.strength = p.random(gridsize * 0.3, gridsize * 0.5);
    // Create random 2D vector using instance methods
    const angle = p.random(p.TWO_PI);
    this.dir = p.createVector(p.cos(angle), p.sin(angle));
    this.drift = p.random(-1, 1) * 0.1;
  }

  move() {
    this.dir.rotate(this.p.random(this.drift));
    this.pos.add(this.dir);
    this.pos.x = this.p.constrain(this.pos.x, 0, this.gridsize);
    this.pos.y = this.p.constrain(this.pos.y, 0, this.gridsize);
  }
}

export default function AsciiBlobs() {
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
        const gridsize = 80;
        let grid: number[] = [];
        let blobs: Blob[] = [];
        const numblobs = 10;

        const initGrid = () => {
          grid = [];
          for (let i = 0; i < gridsize * gridsize; i++) {
            grid[i] = 0;
          }
          blobs = [];
          for (let i = 0; i < numblobs; i++) {
            blobs.push(new Blob(p, gridsize));
          }
        };

        p.setup = () => {
          const size = p.min(p.windowWidth, p.windowHeight);
          p.createCanvas(size, size);
          p.pixelDensity(1);
          p.textFont("Georgia");
          initGrid();
        };

        p.windowResized = () => {
          const size = p.min(p.windowWidth, p.windowHeight);
          p.resizeCanvas(size, size);
        };

        p.draw = () => {
          p.background("#F8F8DDCC");
          p.translate(p.width * 0.05, p.height * 0.05);
          p.scale(0.9);
          calcgrid();
          drawgrid();
          frame();
          for (let b of blobs) {
            b.move();
          }
        };

        const calcgrid = () => {
          for (let i = 0; i < gridsize * gridsize; i++) {
            grid[i] = 0;
            const x = i % gridsize;
            const y = Math.floor(i / gridsize);
            for (let b of blobs) {
              grid[i] += numblobs / p.map(p.dist(x, y, b.pos.x, b.pos.y), 0, b.strength, 0.001, 1);
            }
          }
        };

        const drawgrid = () => {
          p.push();
          p.noStroke();
          const c = p.color("#554242");
          p.textAlign(p.CENTER, p.CENTER);
          const step = p.width / gridsize;
          p.textSize(1.0 * step);

          for (let i = 0; i < gridsize * gridsize; i++) {
            c.setAlpha(p.random(128, 255));
            p.fill(c);
            const x = step * (i % gridsize + 0.5) + p.random(-1, 1);
            const y = step * (Math.floor(i / gridsize) + 0.5) + p.random(-1, 1);

            let t = " ";
            if (grid[i] > 11 * numblobs) t = "@";
            else if (grid[i] > 10.5 * numblobs) t = "%";
            else if (grid[i] > 10 * numblobs) t = "#";
            else if (grid[i] > 9.5 * numblobs) t = "+";
            else if (grid[i] > 9 * numblobs) t = "∙";

            // Random character glitch
            if (p.random() < 0.005) t = String.fromCharCode(Math.floor(p.random(33, 127)));

            p.text(t, x, y);
          }
          p.pop();
        };

        const frame = () => {
          p.push();
          p.noStroke();
          const c = p.color("#554242");
          p.textAlign(p.CENTER, p.CENTER);
          const step = p.width / gridsize;
          p.textSize(1.0 * step);

          for (let i = -2; i < gridsize + 2; i++) {
            c.setAlpha(p.random(128, 255));
            p.fill(c);
            const pos = step * (i + 0.5) + p.random(-1, 1);
            p.text("=", pos, -2 * step + 0.5);
            p.text("=", pos, (gridsize + 2) * step + 0.5);
            p.text("l", -2 * step + 0.5, pos);
            p.text("l", (gridsize + 2) * step + 0.5, pos);
          }
          p.pop();
        };

        // Click to restart
        p.mousePressed = () => {
          if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            initGrid();
            p.background("#F8F8DD");
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
    <div className="w-full flex items-center justify-center">
      <div ref={containerRef} className="rounded-2xl overflow-hidden shadow-2xl" />
    </div>
  );
}
