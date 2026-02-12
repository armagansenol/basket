"use client";

import { useEffect, useRef } from "react";

export default function ParticleFormations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: any = null;

    // Dynamically import p5 only on client side
    import("p5").then((p5Module) => {
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        let particles: any[] = [];
        const numParticles = 1000;
        let formationType = 0;
        let formations: any[] = [];
        let t = 0;

        class Particle {
          pos: any;
          target: any;
          vel: any;
          acc: any;
          maxSpeed: number;
          maxForce: number;
          color: any;
          size: number;

          constructor(x: number, y: number) {
            this.pos = p.createVector(x, y);
            this.target = p.createVector(x, y);
            const angle = p.random(p.TWO_PI);
            this.vel = p.createVector(p.cos(angle), p.sin(angle));
            this.acc = p.createVector(0, 0);
            this.maxSpeed = 10;
            this.maxForce = 1;
            this.color = p.color(255, 255, 255);
            this.size = p.random(1, 3);
          }

          update() {
            // Arrival behavior towards target
            const desired = p5.Vector.sub(this.target, this.pos);
            const d = desired.mag();
            let speed = this.maxSpeed;
            if (d < 100) {
              speed = p.map(d, 0, 100, 0, this.maxSpeed);
            }
            desired.setMag(speed);
            const steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);

            this.acc.add(steer);
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);

            // Fade color based on speed
            const speedMag = this.vel.mag();
            const alpha = p.map(speedMag, 0, this.maxSpeed, 50, 255);
            this.color.setAlpha(alpha);
          }

          display() {
            p.fill(this.color);
            p.ellipse(this.pos.x, this.pos.y, this.size);
          }

          setTarget(x: number, y: number) {
            this.target = p.createVector(x, y);
          }
        }

        const cubicBezier = (p0: any, p1: any, p2: any, p3: any, t: number) => {
          const a = p0.copy().mult(p.pow(1 - t, 3));
          const b = p1.copy().mult(3 * t * p.pow(1 - t, 2));
          const c = p2.copy().mult(3 * p.pow(t, 2) * (1 - t));
          const d = p3.copy().mult(p.pow(t, 3));
          return a.add(b).add(c).add(d);
        };

        const setFormation = () => {
          // Assign target positions to particles based on the current formation
          for (let i = 0; i < particles.length; i++) {
            const target = formations[formationType](i);
            particles[i].setTarget(target.x, target.y);
          }
        };

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          p.noStroke();

          // Initialize particles at random positions
          for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(p.random(p.width), p.random(p.height)));
          }

          // Define different mathematical formations
          formations = [
            (i: number) => { // Spiral
              const angle = p.map(i, 0, numParticles, 0, p.TWO_PI * 5);
              const radius = p.map(i, 0, numParticles, 0, p.min(p.width, p.height) / 3);
              return p.createVector(p.width / 2 + radius * p.cos(angle), p.height / 2 + radius * p.sin(angle));
            },
            (i: number) => { // Flower
              const angle = p.map(i, 0, numParticles, 0, p.TWO_PI * 8);
              const radius = p.sin(4 * angle) * p.min(p.width, p.height) / 4;
              return p.createVector(p.width / 2 + radius * p.cos(angle), p.height / 2 + radius * p.sin(angle));
            },
            (i: number) => { // Lissajous Curve
              const a = p.random(1, 5);
              const b = p.random(1, 5);
              const delta = p.random(p.TWO_PI);
              const angle = p.map(i, 0, numParticles, 0, p.TWO_PI * 5);
              const x = p.width / 2 + (p.width / 3) * p.sin(a * angle + delta);
              const y = p.height / 2 + (p.height / 3) * p.sin(b * angle);
              return p.createVector(x, y);
            },
            (i: number) => { // Circle
              const angle = p.map(i, 0, numParticles, 0, p.TWO_PI);
              const radius = p.min(p.width, p.height) / 3;
              return p.createVector(p.width / 2 + radius * p.cos(angle), p.height / 2 + radius * p.sin(angle));
            },
            (i: number) => { // Heart
              const angle = p.map(i, 0, numParticles, -p.PI, p.PI);
              const x = 16 * p.pow(p.sin(angle), 3);
              const y = 13 * p.cos(angle) - 5 * p.cos(2 * angle) - 2 * p.cos(3 * angle) - p.cos(4 * angle);
              return p.createVector(p.width / 2 + x * 10, p.height / 2 - y * 10);
            },
            (i: number) => { // Random Bezier Curve
              const p0 = p.createVector(p.random(p.width), p.random(p.height));
              const p1 = p.createVector(p.random(p.width), p.random(p.height));
              const p2 = p.createVector(p.random(p.width), p.random(p.height));
              const p3 = p.createVector(p.random(p.width), p.random(p.height));
              const t = p.map(i, 0, numParticles, 0, 1);
              const pos = cubicBezier(p0, p1, p2, p3, t);
              return pos;
            }
          ];

          // Initialize first formation
          setFormation();
        };

        p.draw = () => {
          p.background(10, 10, 30, 50);

          // Update and display particles
          for (const particle of particles) {
            particle.update();
            particle.display();
          }

          t += 0.01;
        };

        p.mousePressed = () => {
          // Change formation on mouse click
          formationType = (formationType + 1) % formations.length;
          setFormation();
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
          setFormation();
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
    <div className="w-full h-screen flex items-center justify-center" style={{ background: "#0a0a1e" }}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
