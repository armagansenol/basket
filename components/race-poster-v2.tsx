"use client";

import { useEffect, useRef } from "react";

export default function RacePosterV2() {
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
        // ============================================================================
        // CONFIGURATION
        // ============================================================================
        const CONFIG = {
          canvas: {
            size: 900,
          },
          background: {
            topColor: [240, 45, 18], // HSB: indigo/ultramarine
            bottomColor: [250, 55, 12], // HSB: darker purple-indigo
          },
          grain: {
            strength: 0.08,
            particleCount: 4000,
          },
          shadow: {
            color: [250, 60, 8], // darker purple
            alpha: 50,
          },
          track: {
            color: [45, 35, 75], // warm creamy yellow
            weight: 1.5,
            laneCount: 9,
            centerX: 1200, // off-canvas right
            centerY: 1100, // off-canvas bottom
            startRadius: 300,
            laneSpacing: 45,
          },
          confetti: {
            count: 80,
            colors: [
              [180, 70, 85], // cyan/teal
              [45, 60, 85], // warm yellow
              [10, 75, 80], // red/orange
            ],
            minSize: 2,
            maxSize: 5,
          },
          tokens: [
            { letter: "W", color: [25, 85, 95], x: 0.58, y: 0.45 }, // orange
            { letter: "I", color: [180, 75, 85], x: 0.52, y: 0.52 }, // teal
            { letter: "-", color: [330, 85, 90], x: 0.47, y: 0.58 }, // hot pink
            { letter: "S", color: [280, 75, 85], x: 0.62, y: 0.38 }, // magenta-violet
            { letter: "T", color: [350, 80, 90], x: 0.68, y: 0.48 }, // red-pink
            { letter: "A", color: [25, 85, 95], x: 0.42, y: 0.65 }, // orange
            { letter: "R", color: [180, 75, 85], x: 0.72, y: 0.55 }, // teal
            { letter: "T", color: [330, 85, 90], x: 0.38, y: 0.72 }, // hot pink
          ],
          tokenSize: 70,
          animation: {
            speed: 0.002,
            amplitude: 2,
          },
        };

        let time = 0;
        let confettiDots: any[] = [];
        let noiseOffsets: number[] = [];

        // ============================================================================
        // SETUP
        // ============================================================================
        p.setup = () => {
          p.createCanvas(CONFIG.canvas.size, CONFIG.canvas.size);
          p.colorMode(p.HSB, 360, 100, 100, 100);
          p.pixelDensity(1);

          // Initialize confetti positions
          for (let i = 0; i < CONFIG.confetti.count; i++) {
            confettiDots.push({
              x: p.random(p.width),
              y: p.random(p.height),
              size: p.random(CONFIG.confetti.minSize, CONFIG.confetti.maxSize),
              color: p.random(CONFIG.confetti.colors),
              noiseOffsetX: p.random(1000),
              noiseOffsetY: p.random(1000),
            });
          }

          // Initialize noise offsets for tokens
          CONFIG.tokens.forEach(() => {
            noiseOffsets.push(p.random(1000));
          });
        };

        // ============================================================================
        // DRAW
        // ============================================================================
        p.draw = () => {
          // 1. Background gradient
          drawGradientBackground();

          // 2. Grain overlay
          drawGrain();

          // 3. Confetti dots
          drawConfetti();

          // 4. Diagonal shadow plane
          drawShadowPlane();

          // 5. Track arcs
          drawTrackArcs();

          // 6. Token shadows
          drawTokenShadows();

          // 7. Colored tokens
          drawTokens();

          // 8. Letters on top
          drawLetters();

          // Update animation
          time += CONFIG.animation.speed;
        };

        // ============================================================================
        // DRAWING FUNCTIONS
        // ============================================================================

        function drawGradientBackground() {
          for (let y = 0; y < p.height; y++) {
            const inter = p.map(y, 0, p.height, 0, 1);
            const c = p.lerpColor(
              p.color(
                CONFIG.background.topColor[0],
                CONFIG.background.topColor[1],
                CONFIG.background.topColor[2]
              ),
              p.color(
                CONFIG.background.bottomColor[0],
                CONFIG.background.bottomColor[1],
                CONFIG.background.bottomColor[2]
              ),
              inter
            );
            p.stroke(c);
            p.line(0, y, p.width, y);
          }
        }

        function drawGrain() {
          p.noStroke();
          for (let i = 0; i < CONFIG.grain.particleCount; i++) {
            const x = p.random(p.width);
            const y = p.random(p.height);
            const brightness = p.random(0, 100);
            const alpha = p.random(5, 15) * CONFIG.grain.strength;

            p.fill(0, 0, brightness, alpha);
            p.circle(x, y, p.random(0.3, 1));
          }
        }

        function drawConfetti() {
          p.noStroke();
          confettiDots.forEach((dot, i) => {
            // Subtle drift animation
            const driftX = p.noise(dot.noiseOffsetX + time * 0.5) * 4 - 2;
            const driftY = p.noise(dot.noiseOffsetY + time * 0.5) * 4 - 2;

            p.fill(dot.color[0], dot.color[1], dot.color[2]);
            p.circle(dot.x + driftX, dot.y + driftY, dot.size);
          });
        }

        function drawShadowPlane() {
          p.noStroke();
          p.fill(
            CONFIG.shadow.color[0],
            CONFIG.shadow.color[1],
            CONFIG.shadow.color[2],
            CONFIG.shadow.alpha
          );

          // Large diagonal polygon in lower-right
          p.beginShape();
          p.vertex(p.width * 0.4, p.height);
          p.vertex(p.width, p.height);
          p.vertex(p.width, p.height * 0.3);
          p.vertex(p.width * 0.85, p.height * 0.5);
          p.endShape(p.CLOSE);
        }

        function drawTrackArcs() {
          p.noFill();
          p.stroke(
            CONFIG.track.color[0],
            CONFIG.track.color[1],
            CONFIG.track.color[2]
          );
          p.strokeWeight(CONFIG.track.weight);

          const centerX = CONFIG.track.centerX;
          const centerY = CONFIG.track.centerY;

          // Draw concentric arc lanes
          for (let i = 0; i < CONFIG.track.laneCount; i++) {
            const radius = CONFIG.track.startRadius + i * CONFIG.track.laneSpacing;
            const diameter = radius * 2;

            // Draw partial arc that sweeps across canvas
            p.arc(
              centerX,
              centerY,
              diameter,
              p.radians(180),
              p.radians(270),
              p.OPEN
            );
          }
        }

        function drawTokenShadows() {
          p.noStroke();

          CONFIG.tokens.forEach((token, i) => {
            const x = token.x * p.width;
            const y = token.y * p.height;

            // Subtle breathing animation
            const breathe = p.noise(noiseOffsets[i] + time) * CONFIG.animation.amplitude;
            const offsetX = 8;
            const offsetY = 12;

            // Draw soft shadow with multiple translucent ellipses
            for (let j = 0; j < 3; j++) {
              const alpha = 8 - j * 2;
              const size = CONFIG.tokenSize + j * 6;

              p.fill(250, 60, 5, alpha);
              p.ellipse(
                x + offsetX + breathe,
                y + offsetY + breathe,
                size * 1.3,
                size * 0.9
              );
            }
          });
        }

        function drawTokens() {
          p.noStroke();

          CONFIG.tokens.forEach((token, i) => {
            const x = token.x * p.width;
            const y = token.y * p.height;

            // Subtle breathing animation
            const breathe = p.noise(noiseOffsets[i] + time) * CONFIG.animation.amplitude;

            p.fill(token.color[0], token.color[1], token.color[2]);
            p.circle(x + breathe, y + breathe, CONFIG.tokenSize);
          });
        }

        function drawLetters() {
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(32);
          p.textStyle(p.BOLD);
          p.fill(240, 50, 10); // very dark navy

          CONFIG.tokens.forEach((token, i) => {
            const x = token.x * p.width;
            const y = token.y * p.height;

            // Subtle breathing animation (same as token)
            const breathe = p.noise(noiseOffsets[i] + time) * CONFIG.animation.amplitude;

            p.text(token.letter, x + breathe, y + breathe);
          });
        }
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
