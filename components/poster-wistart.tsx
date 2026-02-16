// P5Poster.tsx
"use client";

import { useEffect, useRef } from "react";

type Dot = {
  xN: number;
  yN: number;
  rN: number;
  c: string;
  seed: number;
};

type Token = {
  lane: number;      // which track lane
  aDeg: number;      // angle along the arc (degrees)
  label: string;     // single char
  fill: string;      // token color
  sizeN: number;     // size as fraction of min(canvas)
  bobSeed: number;
};

export default function PosterWIStart() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hostRef.current) return;

    let p5Instance: any = null;
    let isCancelled = false;

    // Dynamically import p5 only on client side
    import("p5").then((p5Module) => {
      if (isCancelled) return; // Don't create instance if component unmounted
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        // ---------- Palette (tweak freely) ----------
        const BG_A = "#2b2a6d"; // indigo
        const BG_B = "#3a49a4"; // ultramarine
        const PLANE = "#1f1f55"; // darker wedge
        const TRACK = "#e6d98a"; // warm creamy yellow
        const INK = "#121739"; // very dark navy (letters)
        const SHADOW = "#0f1433";

        const CONFETTI = ["#2ee6d6", "#ffd34d", "#ff4d5a", "#35c0ff", "#ff9f1c"];

        // ---------- Geometry knobs ----------
        const LANES = 9; // number of arcs
        const LANE_GAP_N = 0.055; // gap as fraction of minDim
        const TRACK_STROKE_N = 0.0022; // stroke as fraction of minDim
        const ARC_START_DEG = 150;
        const ARC_END_DEG = 285;

        // ellipse center (off-canvas) + base radii ratios
        const CENTER_X_N = 1.28;
        const CENTER_Y_N = 0.06;
        const RX_N = 1.12;
        const RY_N = 0.95;

        // ---------- Buffers ----------
        let grain: any = null;

        // ---------- Scene objects ----------
        let dots: Dot[] = [];
        let tokens: Token[] = [];

        // ---------- Helpers ----------
        const d2r = (deg: number) => (deg * Math.PI) / 180;

        const minDim = () => Math.min(p.width, p.height);

        const rebuildGrain = () => {
          grain = p.createGraphics(p.width, p.height);
          grain.pixelDensity(1);
          grain.clear();

          // subtle film grain: many tiny points with low alpha
          grain.noStroke();
          const count = Math.floor((p.width * p.height) * 0.03); // density
          for (let i = 0; i < count; i++) {
            const x = p.random(p.width);
            const y = p.random(p.height);
            const a = p.random(6, 22); // low alpha
            // mix of light + dark specks
            const v = p.random() < 0.5 ? 255 : 0;
            grain.fill(v, a);
            grain.rect(x, y, 1, 1);
          }
        };

        const buildDots = () => {
          dots = [];
          const n = 26;
          for (let i = 0; i < n; i++) {
            dots.push({
              xN: p.random(0.06, 0.96),
              yN: p.random(0.06, 0.96),
              rN: p.random(0.004, 0.008),
              c: CONFETTI[Math.floor(p.random(CONFETTI.length))],
              seed: p.random(1000),
            });
          }
        };

        const buildTokens = () => {
          // Letters roughly matching the poster vibe: W I - S T A R T
          // Lane index 0 is innermost (closest to center), higher = outer.
          tokens = [
            { lane: 8, aDeg: 238, label: "W", fill: "#f3a21a", sizeN: 0.07, bobSeed: 11 },
            { lane: 6, aDeg: 232, label: "I", fill: "#1dd6c1", sizeN: 0.07, bobSeed: 22 },
            { lane: 5, aDeg: 250, label: "–", fill: "#ff2c68", sizeN: 0.07, bobSeed: 33 },
            { lane: 4, aDeg: 260, label: "S", fill: "#ff4aa5", sizeN: 0.07, bobSeed: 44 },
            { lane: 3, aDeg: 270, label: "T", fill: "#b070d8", sizeN: 0.07, bobSeed: 55 },
            { lane: 2, aDeg: 257, label: "A", fill: "#f0b326", sizeN: 0.07, bobSeed: 66 },
            { lane: 1, aDeg: 268, label: "R", fill: "#29c8b6", sizeN: 0.07, bobSeed: 77 },
            { lane: 0, aDeg: 280, label: "T", fill: "#ff3b6c", sizeN: 0.07, bobSeed: 88 },
          ];
        };

        const sizeCanvasToHost = () => {
          const host = hostRef.current!;
          const rect = host.getBoundingClientRect();
          const s = Math.max(320, Math.floor(Math.min(rect.width, rect.height || rect.width)));
          p.resizeCanvas(s, s);
          rebuildGrain();
        };

        // point on a lane ellipse at angle (deg)
        const lanePoint = (laneIdx: number, aDeg: number) => {
          const m = minDim();
          const gap = m * LANE_GAP_N;
          const cx = p.width * CENTER_X_N;
          const cy = p.height * CENTER_Y_N;

          const rx = p.width * RX_N + laneIdx * gap;
          const ry = p.height * RY_N + laneIdx * gap * 0.85;

          const a = d2r(aDeg);
          const x = cx + rx * Math.cos(a);
          const y = cy + ry * Math.sin(a);
          return { x, y };
        };

        // ---------- p5 lifecycle ----------
        p.setup = () => {
          p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
          p.createCanvas(720, 720);
          p.noSmooth();

          buildDots();
          buildTokens();
          rebuildGrain();

          // initial fit
          sizeCanvasToHost();
        };

        p.windowResized = () => {
          // Keep it responsive to container.
          sizeCanvasToHost();
        };

        // ---------- Draw layers ----------
        const drawBackground = () => {
          // diagonal-ish gradient with subtle vignetting
          const g = p.drawingContext.createLinearGradient(0, 0, p.width, p.height);
          g.addColorStop(0, BG_B);
          g.addColorStop(1, BG_A);
          // @ts-ignore
          p.drawingContext.fillStyle = g;
          p.noStroke();
          p.rect(0, 0, p.width, p.height);

          // soft vignette (very subtle)
          p.push();
          p.noFill();
          p.stroke(0, 25);
          p.strokeWeight(minDim() * 0.04);
          p.rect(0, 0, p.width, p.height);
          p.pop();
        };

        const drawConfetti = (t: number) => {
          p.noStroke();
          for (const d of dots) {
            // very slow drift using noise
            const dx = (p.noise(d.seed, t * 0.08) - 0.5) * 10;
            const dy = (p.noise(d.seed + 9.1, t * 0.08) - 0.5) * 10;

            const x = d.xN * p.width + dx;
            const y = d.yN * p.height + dy;
            const r = d.rN * minDim();

            p.fill(d.c);
            p.circle(x, y, r * 2);
          }
        };

        const drawShadowPlane = () => {
          p.push();
          p.noStroke();
          p.fill(PLANE);

          // a hard-edged diagonal wedge in lower-right
          // (tweak points for closer match)
          const w = p.width;
          const h = p.height;
          p.beginShape();
          p.vertex(w * 0.24, h * 0.72);
          p.vertex(w * 0.98, h * 0.50);
          p.vertex(w * 0.98, h * 0.98);
          p.vertex(w * 0.35, h * 0.98);
          p.endShape(p.CLOSE);

          p.pop();
        };

        const drawTrack = () => {
          p.push();
          p.noFill();
          p.stroke(TRACK);
          p.strokeWeight(minDim() * TRACK_STROKE_N);
          p.strokeCap(p.ROUND);

          for (let i = 0; i < LANES; i++) {
            const m = minDim();
            const gap = m * LANE_GAP_N;

            const cx = p.width * CENTER_X_N;
            const cy = p.height * CENTER_Y_N;

            const rx = p.width * RX_N + i * gap;
            const ry = p.height * RY_N + i * gap * 0.85;

            p.push();
            p.translate(cx, cy);
            p.arc(0, 0, rx * 2, ry * 2, d2r(ARC_START_DEG), d2r(ARC_END_DEG));
            p.pop();
          }

          p.pop();
        };

        const drawTokenShadow = (x: number, y: number, r: number) => {
          // soft oval shadow offset down-right
          p.push();
          p.noStroke();
          p.fill(SHADOW);
          const ox = r * 0.35;
          const oy = r * 0.45;

          // fake blur: stack translucent ellipses
          for (let i = 0; i < 4; i++) {
            const a = 30 - i * 6;
            p.fill(15, 20, 60, a);
            p.ellipse(x + ox, y + oy, r * (1.35 + i * 0.08), r * (0.55 + i * 0.06));
          }
          p.pop();
        };

        const drawTokens = (t: number) => {
          const m = minDim();

          for (const tok of tokens) {
            const base = lanePoint(tok.lane, tok.aDeg);

            // micro-bob (cinematic, subtle)
            const bob =
              (p.noise(tok.bobSeed, t * 0.4) - 0.5) * (m * 0.008);

            const x = base.x;
            const y = base.y + bob;

            const r = tok.sizeN * m;

            drawTokenShadow(x, y, r);

            // token
            p.noStroke();
            p.fill(tok.fill);
            p.circle(x, y, r * 2);

            // letter
            p.fill(INK);
            p.textAlign(p.CENTER, p.CENTER);
            p.textStyle(p.BOLD);
            p.textSize(r * 0.95);
            p.text(tok.label, x, y + r * 0.03);
          }
        };

        const drawGrain = () => {
          if (!grain) return;
          p.push();
          p.blendMode(p.OVERLAY);
          p.tint(255, 90); // overall grain strength
          p.image(grain, 0, 0);
          p.pop();
        };

        p.draw = () => {
          const t = p.millis() / 1000;

          // 1) background
          drawBackground();

          // 2) confetti
          drawConfetti(t);

          // 3) shadow plane
          drawShadowPlane();

          // 4) track arcs
          drawTrack();

          // 5) token shadows + tokens + letters
          drawTokens(t);

          // 6) grain overlay (last for authenticity)
          drawGrain();
        };
      };

      if (hostRef.current) {
        p5Instance = new p5(sketch, hostRef.current);
      }
    });

    return () => {
      isCancelled = true;
      if (p5Instance) {
        p5Instance.remove();
      }
      // Clear container to prevent duplicate canvases
      if (hostRef.current) {
        hostRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      style={{
        width: "min(90vmin, 900px)",
        height: "min(90vmin, 900px)",
      }}
    />
  );
}
