// For #genuary2025, day 16: "generative palette."
// Inspired by: https://medium.com/@greggunn/how-to-make-your-own-color-palettes-712959fbf021
// And: @AaronReuland's Palette Generator 2.5

"use client";

import { useEffect, useRef } from "react";

export default function PaletteGenerator() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: any = null;

    // Dynamically import p5 only on client side
    import("p5").then((p5Module) => {
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        let pimg: any;
        let palette: string[] = [];
        let invert = false;

        let hslider: any, hsliderlabel: any;
        let offslider: any, offsliderlabel: any;
        let sslider: any, ssliderlabel: any;
        let plabels: any[] = [];
        let button: any, button2: any;

        // From Stack Overflow
        const RGBtoHex = (array: number[]) => {
          return "#" + array
            .map(color => {
              const hex = color.toString(16);
              return hex.length === 1 ? "0" + hex : hex;
            })
            .join("");
        };

        const copyToClipboard = () => {
          button.html('Palette Copied!');
          const text = palette.join();

          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(err => {
              console.warn("Copy to clipboard failed.", err);
            });
          } else if ((document as any).queryCommandSupported && (document as any).queryCommandSupported("copy")) {
            const textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";
            document.body.appendChild(textarea);
            textarea.select();
            try {
              document.execCommand("copy");
            } catch (ex) {
              console.warn("Copy to clipboard failed.", ex);
            } finally {
              document.body.removeChild(textarea);
            }
          }
        };

        const invertPalette = () => {
          invert = !invert;
          updateHue();
        };

        const makeHTML = () => {
          hslider = p.createSlider(0, 360, 0, 1);
          hslider.style('width', '360px');
          hslider.input(updateHue);
          hsliderlabel = p.createP('Base Hue: ' + hslider.value());
          hsliderlabel.style('color', 'white');
          hsliderlabel.style('font-family', 'monospace');

          offslider = p.createSlider(0, 0.75, 0, 0.01);
          offslider.style('width', '360px');
          offslider.input(updateHue);
          offsliderlabel = p.createP('Hue Offset: ' + offslider.value() * 360);
          offsliderlabel.style('color', 'white');
          offsliderlabel.style('font-family', 'monospace');

          sslider = p.createSlider(0, 1.0, 1.0, 0.01);
          sslider.style('width', '360px');
          sslider.input(updateHue);
          ssliderlabel = p.createP('Saturation: ' + sslider.value() * 360);
          ssliderlabel.style('color', 'white');
          ssliderlabel.style('font-family', 'monospace');

          for (let i = 0; i < 8; i++) {
            const l = p.createP('Color ' + (i + 1));
            const y = p.height / 2 + p.map(i, 0, 7, -192, -40);
            l.position(p.width / 2 + 190, y);
            l.style('color', 'white');
            l.style('width', '180px');
            l.style('padding', '2px');
            l.style('font-family', 'monospace');
            l.style('border-radius', '3px');
            plabels.push(l);
          }

          button = p.createButton('Copy Palette!');
          button.style('width', '185px');
          button.style('height', '22px');
          button.style('font-family', 'monospace');
          button.style('border-radius', '5px');
          button.mousePressed(copyToClipboard);

          button2 = p.createButton('Invert Palette!');
          button2.style('width', '185px');
          button2.style('height', '22px');
          button2.style('font-family', 'monospace');
          button2.style('border-radius', '5px');
          button2.mousePressed(invertPalette);
        };

        const makePalette = (hue: number) => {
          for (let y = 0; y < 360; y += 10) {
            for (let x = 0; x < 360; x += 10) {
              pimg.noStroke();
              pimg.fill((hue + (x + y) * offslider.value()) % 360, x * sslider.value(), (360 - y));
              pimg.square(x, y, 10);
            }
          }
        };

        const drawPalette = (x: number, y: number) => {
          p.background(0);
          p.imageMode(p.CENTER);
          p.push();
          p.translate(x, y);
          p.image(pimg, 0, 0);
          p.noFill();

          for (let i = 1; i < 9; i++) {
            const a = i * p.HALF_PI / 9;
            let px, py;
            px = -180 + 340 * p.cos(a);
            py = 180 - 340 * p.sin(a);
            if (invert) {
              px = -180 + 340 * p.sin(a);
              py = 180 - 340 * p.cos(a);
            }
            const col = p.color(pimg.get(px + 180, py + 180));
            const levels = [p.red(col), p.green(col), p.blue(col)];
            palette.push(RGBtoHex(levels));
            p.noStroke();
            p.fill(255);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(9 - i, px, py);
            p.noFill();
            p.stroke(255);
            p.ellipse(px, py - 1, 14, 14);
            const rx = p.map(i, 8, 1, -157.5, 157.5);
            p.fill(col);
            p.rectMode(p.CENTER);
            p.noStroke();
            p.rect(rx, 210, 45, 45, 5);
            p.noFill();
            p.stroke(255);
            p.ellipse(rx, 209, 14, 14);
            p.fill(255);
            p.noStroke();
            p.text(9 - i, rx, 210);
          }

          p.rectMode(p.CORNER);
          p.noStroke();
          p.fill(palette[4]);
          p.rect(-180, -250, 555, 60, 5);
          for (let i = 0; i < 8; i++) {
            p.noStroke();
            p.fill(palette[7 - i]);
            p.rect(190, 0, (8 - i) * 23, (8 - i) * 23, 5);
          }
          p.pop();

          hsliderlabel.html('Base Hue: ' + p.nf(hslider.value(), 3, 0));
          offsliderlabel.html('Hue Offset: ' + p.nf(offslider.value() * 360, 3, 0));
          ssliderlabel.html('Saturation: ' + p.nf(sslider.value() * 360, 3, 0));

          hslider.position(x - 182, y - 250);
          hsliderlabel.position(x + 190, y - 260);
          offslider.position(x - 182, y - 230);
          offsliderlabel.position(x + 190, y - 240);
          sslider.position(x - 182, y - 210);
          ssliderlabel.position(x + 190, y - 220);

          for (let i = 0; i < 8; i++) {
            const ly = y + p.map(i, 0, 7, -192, -40);
            plabels[i].position(x + 190, ly);
          }

          for (let i = 0; i < 8; i++) {
            plabels[i].style('background-color', palette[7 - i]);
            plabels[i].html('Color ' + (i + 1) + ': ' + palette[7 - i]);
          }

          button.position(x + 190, y + 210);
          button2.position(x + 190, y + 188);
        };

        const updateHue = () => {
          palette = [];
          makePalette(hslider.value());
          drawPalette(p.width / 2 - 90, p.height / 2);
        };

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          p.textFont('monospace');
          pimg = p.createGraphics(360, 360);
          pimg.colorMode(p.HSB, 360, 360, 360);
          makeHTML();
          makePalette(0);
          updateHue();
        };

        p.keyPressed = () => {
          invert = !invert;
          updateHue();
        };

        p.mouseReleased = () => {
          button.html('Copy Palette!');
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
          updateHue();
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
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
