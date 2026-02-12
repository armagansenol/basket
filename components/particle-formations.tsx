"use client";

import { useEffect, useRef } from "react";
import type p5 from "p5";

class Particle {
  p: p5;
  p5: typeof p5;
  pos: p5.Vector;
  target: p5.Vector;
  vel: p5.Vector;
  acc: p5.Vector;
  maxSpeed: number;
  maxForce: number;
  color: p5.Color;
  size: number;

  constructor(p: p5, p5Static: typeof p5, x: number, y: number) {
    this.p = p;
    this.p5 = p5Static;
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
    const desired = this.p5.Vector.sub(this.target, this.pos);
    const d = desired.mag();
    let speed = this.maxSpeed;
    if (d < 100) {
      speed = this.p.map(d, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    const steer = this.p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);

    this.acc.add(steer);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Fade color based on speed
    const speedMag = this.vel.mag();
    const alpha = this.p.map(speedMag, 0, this.maxSpeed, 50, 255);
    this.color.setAlpha(alpha);
  }

  display() {
    this.p.fill(this.color);
    this.p.ellipse(this.pos.x, this.pos.y, this.size);
  }

  setTarget(x: number, y: number) {
    this.target = this.p.createVector(x, y);
  }
}

const cubicBezier = (p: p5, p0: p5.Vector, p1: p5.Vector, p2: p5.Vector, p3: p5.Vector, t: number) => {
  const a = p0.copy().mult(p.pow(1 - t, 3));
  const b = p1.copy().mult(3 * t * p.pow(1 - t, 2));
  const c = p2.copy().mult(3 * p.pow(t, 2) * (1 - t));
  const d = p3.copy().mult(p.pow(t, 3));
  return a.add(b).add(c).add(d);
};

export default function ParticleFormations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let p5Instance: p5 | null = null;
    let isCancelled = false;

    // Dynamically import p5 only on client side
    import("p5").then((p5Module) => {
      if (isCancelled) return; // Don't create instance if component unmounted
      const p5 = p5Module.default;

      const sketch = (p: p5) => {
        const particles: Particle[] = [];
        const numParticles = 1000;
        let formationType = 0;
        let formations: ((i: number) => p5.Vector)[] = [];

        const setFormation = () => {
          // Assign target positions to particles based on the current formation
          for (let i = 0; i < particles.length; i++) {
            const target = formations[formationType](i);
            particles[i].setTarget(target.x, target.y);
          }
        };

        p.setup = () => {
          const width = container.clientWidth || p.windowWidth;
          const height = container.clientHeight || p.windowHeight;
          p.createCanvas(width, height);
          p.noStroke();

          // Initialize particles at random positions
          for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(p, p5, p.random(p.width), p.random(p.height)));
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
              const pos = cubicBezier(p, p0, p1, p2, p3, t);
              return pos;
            },
            (i: number) => { // Grid
              const gridSize = Math.floor(Math.sqrt(numParticles));
              const row = Math.floor(i / gridSize);
              const col = i % gridSize;
              const spacing = p.min(p.width, p.height) * 0.6 / gridSize;
              const offsetX = p.width / 2 - (gridSize * spacing) / 2;
              const offsetY = p.height / 2 - (gridSize * spacing) / 2;
              return p.createVector(offsetX + col * spacing, offsetY + row * spacing);
            },
            (i: number) => { // Wave
              const t = p.map(i, 0, numParticles, 0, p.TWO_PI * 4);
              const amplitude = p.min(p.width, p.height) / 6;
              const x = p.map(i, 0, numParticles, p.width * 0.1, p.width * 0.9);
              const y = p.height / 2 + amplitude * p.sin(t);
              return p.createVector(x, y);
            },
            (i: number) => { // Infinity (Lemniscate)
              const angle = p.map(i, 0, numParticles, 0, p.TWO_PI);
              const scale = p.min(p.width, p.height) / 5;
              const x = p.width / 2 + scale * p.cos(angle) / (1 + p.pow(p.sin(angle), 2));
              const y = p.height / 2 + scale * p.sin(angle) * p.cos(angle) / (1 + p.pow(p.sin(angle), 2));
              return p.createVector(x, y);
            },
            (i: number) => { // Star
              const numPoints = 5;
              const angle = p.map(i, 0, numParticles, 0, p.TWO_PI * numPoints);
              const outerRadius = p.min(p.width, p.height) / 3;
              const innerRadius = outerRadius * 0.4;
              const k = i % Math.floor(numParticles / (numPoints * 2));
              const isOuter = k < Math.floor(numParticles / (numPoints * 4));
              const radius = isOuter ? outerRadius : innerRadius;
              return p.createVector(p.width / 2 + radius * p.cos(angle), p.height / 2 + radius * p.sin(angle));
            },
            (i: number) => { // User Icon
              const scale = p.min(p.width, p.height) / 8;
              const headParticles = Math.floor(numParticles * 0.35);
              const shouldersParticles = numParticles - headParticles;

              if (i < headParticles) {
                // Head circle
                const angle = p.map(i, 0, headParticles, 0, p.TWO_PI);
                const headRadius = scale * 0.8;
                const x = p.width / 2 + headRadius * p.cos(angle);
                const y = p.height / 2 - scale * 0.5 + headRadius * p.sin(angle);
                return p.createVector(x, y);
              } else {
                // Shoulders/body (arc shape)
                const idx = i - headParticles;
                const angle = p.map(idx, 0, shouldersParticles, p.PI * 0.2, p.PI * 0.8);
                const shoulderRadius = scale * 1.8;
                const x = p.width / 2 + shoulderRadius * p.cos(angle);
                const y = p.height / 2 + scale * 0.8 + shoulderRadius * p.sin(angle);
                return p.createVector(x, y);
              }
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
        };

        p.mousePressed = () => {
          // Change formation on mouse click
          formationType = (formationType + 1) % formations.length;
          setFormation();
        };

        p.windowResized = () => {
          const width = container.clientWidth || p.windowWidth;
          const height = container.clientHeight || p.windowHeight;
          p.resizeCanvas(width, height);
          setFormation();
        };
      };

      if (container) {
        p5Instance = new p5(sketch, container);
      }
    });

    // Cleanup function
    return () => {
      isCancelled = true;
      if (p5Instance) {
        p5Instance.remove();
      }
      // Clear container to prevent duplicate canvases
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center" style={{ background: "#0a0a1e" }}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
