/*
Bunny Ear Cactus
#WCCChallenge topic "Sand ⏳" 2024.8.31 by TKt | 陳建中 Tân Kiàn-tiong（rainsr7235）
Bunny Ear Cactus is so cute 😍
*/

"use client";

import { useEffect, useRef } from "react";

export default function BunnyEarCactus() {
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
        let texture: any;

        const createProceduralTexture = () => {
          texture = p.createGraphics(p.width, p.height);
          texture.loadPixels();

          // Create noise-based texture
          for (let x = 0; x < texture.width; x++) {
            for (let y = 0; y < texture.height; y++) {
              const noiseVal = p.noise(x * 0.01, y * 0.01);
              const brightness = p.map(noiseVal, 0, 1, 200, 255);
              const idx = (x + y * texture.width) * 4;
              texture.pixels[idx] = brightness;
              texture.pixels[idx + 1] = brightness;
              texture.pixels[idx + 2] = brightness;
              texture.pixels[idx + 3] = 255;
            }
          }
          texture.updatePixels();
        };

        const bunnyEarCactusLeaf = (x: number, y: number, w: number, h: number) => {
          p.colorMode(p.RGB);
          p.fill("#C3CDBE");
          p.noStroke();
          p.ellipse(0, -h * 0.4, w, h);

          p.strokeWeight(1);
          for (let i = 0; i < w * h * 0.5; i++) {
            const a = p.random(p.PI * 2);
            const r = 1 - p.random(p.random());
            p.colorMode(p.HSB);
            p.stroke(p.randomGaussian(109, 10), p.randomGaussian(10, 10), p.randomGaussian(60, 20));
            p.point(p.cos(a) * w * r / 2, p.sin(a) * h * r / 2 - h * 0.4);
          }

          for (let i = 0; i < w * h * 0.5; i++) {
            const a = p.random(p.PI * 2);
            const r = 1 - p.random(p.random(p.random()));
            p.colorMode(p.HSB);
            p.stroke(p.randomGaussian(109, 10), p.randomGaussian(30, 10), p.randomGaussian(50, 20));
            p.point(p.cos(a) * w * r / 2, p.sin(a) * h * r / 2 - h * 0.4);
          }
        };

        const bunnyEarCactus = (x: number, y: number, w: number, h: number, rAngle: number, step: number) => {
          p.push();
          p.colorMode(p.HSB);
          p.translate(x, y);
          p.strokeWeight(2);
          p.rotate(rAngle);

          bunnyEarCactusLeaf(x, y, w, h);
          p.point(0, 0);

          if ((step > 0 && p.random() < 0.7) || step >= 3) {
            p.translate(0, -h * 0.4);
            p.point(0, 0);

            if (p.random() < 0.5) {
              bunnyEarCactus(
                p.cos(-p.PI / 2 + 1) * w / 2,
                p.sin(-p.PI / 2 + 1) * h / 2,
                w * p.random(0.7, 0.9),
                h * p.random(0.7, 0.9),
                p.random(1, 0),
                step - 1
              );
              bunnyEarCactus(
                p.cos(-p.PI / 2 - 1) * w / 2,
                p.sin(-p.PI / 2 - 1) * h / 2,
                w * p.random(0.7, 0.9),
                h * p.random(0.7, 0.9),
                p.random(-1, 0),
                step - 1
              );
            } else {
              bunnyEarCactus(
                0,
                -h * 0.4,
                w * p.random(0.7, 0.9),
                h * p.random(0.7, 0.9),
                p.random(-0.5, 0.5),
                step - 1
              );
            }
          }
          p.pop();
        };

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          p.background("#E9E6DB");

          // Draw sand background
          p.fill(200);
          p.noStroke();
          const w = 200;
          const h = 70;

          // First sand layer
          for (let i = 0; i < 140000; i++) {
            const t = 1;
            const r = Math.pow(p.random(0, Math.pow(10, t)), 1 / t) / 10;
            p.stroke("#877E75");
            p.strokeWeight(p.random(1));
            const a = p.random(p.PI * 2);

            const x = p.width / 2 + p.cos(a) * w * r;
            const y = p.height / 2 + p.sin(a) * h * r;
            const yOffset = p.sin(r * 50) * (1 - r) * 5;

            p.point(x, y + yOffset);
          }

          // Second sand layer
          for (let i = 0; i < 140000; i++) {
            const t = -1;
            const r = Math.pow(p.random(0, Math.pow(10, t)), 1 / t) / 10;
            p.stroke("#877E75");
            p.strokeWeight(p.random(1));
            const a = p.random(p.PI * 2);

            const x = p.width / 2 + p.cos(a) * w * r;
            const y = p.height / 2 + p.sin(a) * h * r;
            const yOffset = p.sin(r * 50) * (1 - r) * 5;

            p.point(x, y + yOffset);
          }

          // Draw bunny ear cactus
          bunnyEarCactus(
            p.width / 2,
            p.height / 2,
            p.random(40, 60),
            p.random(60, 100),
            0,
            p.random([3, 4])
          );

          // Apply texture overlay
          createProceduralTexture();
          p.blendMode(p.MULTIPLY);
          p.tint(255, 200);
          p.image(texture, 0, 0);

          p.noLoop();
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
          // Redraw on resize
          p.setup();
        };

        p.mousePressed = () => {
          if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            p.setup();
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
    <div className="w-full h-screen flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
