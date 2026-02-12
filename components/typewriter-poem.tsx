// For the #wccChallenge on the theme of 'typewriter art'
// Text: First stanza of William Butler Yeats' "The Second Coming"

"use client";

import { useEffect, useRef } from "react";

export default function TypewriterPoem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: any = null;

    // Dynamically import p5 only on client side
    import("p5").then((p5Module) => {
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        // Poem: "The Second Coming" by William Butler Yeats (first stanza)
        const poem = [
          'T', 'u','r','n','i','n','g','space','a','n','d','space' ,'t','u','r','n','i','n','g', 'space','i','n','space' ,'t','h','e','space' ,'w','i','d','e','n','i','n','g', 'space','g','y','r','e',
          'T','h','e','space', 'f','a','l','c','o','n', 'space','c','a','n','n','o','t', 'space','h','e','a','r','space' ,'t','h','e', 'space','f','a','l','c','o','n','e','r',
          'space','T','h','i','n','g','s','space' ,'f','a','l','l', 'space','a','p','a','r','t', 'space','t','h','e','space' ,'c','e','n','t','r','e', 'space','c','a','n','n','o','t', 'space','h','o','l','d',
          'space','M','e','r','e', 'space','a','n','a','r','c','h','y', 'space','i','s','space' ,'l','o','o','s','e','d','space' ,'u','p','o','n','space' ,'t','h','e','space' ,'w','o','r','l','d',
          'space','T','h','e', 'space','b','l','o','o','d','d','i','m','m','e','d','space' ,'t','i','d','e','space' ,'i','s', 'space','l','o','o','s','e','d','space' ,'a','n','d','space' ,'e','v','e','r','y','w','h','e','r','e',
          'space' ,'T','h','e','space' ,'c','e','r','e','m','o','n','y', 'space','o','f', 'space','i','n','n','o','c','e','n','c','e', 'space','i','s','space' ,'d','r','o','w','n','e','d',
          'space' ,'T','h','e', 'space','b','e','s','t', 'space','l','a','c','k', 'space','a','l','l', 'space','c','o','n','v','i','c','t','i','o','n','space' ,'w','h','i','l','e','space' ,'t','h','e','space' ,'w','o','r','s','t',
          'space' ,'A','r','e','space' ,'f','u','l','l', 'space','o','f', 'space','p','a','s','s','i','o','n','a','t','e', 'space','i','n','t','e','n','s','i','t','y',
          'space', 'space'
        ];

        p.setup = () => {
          const m = p.min(p.windowWidth, p.windowHeight);
          p.createCanvas(m, m);
          // Use monospace font (Courier family)
          p.textFont('Courier New, monospace');
          p.textStyle(p.BOLD);
        };

        p.draw = () => {
          p.background("#FBF6EE");

          let alphabetP = 0;
          const fspeed = p.frameCount / 20;
          let flaming;
          const spacing = p.width / 40;
          const hSpacing = p.width / 80;
          const bigT = p.width / 18;
          const littleT = p.width / 36;

          for (let y = 10; y < p.height - 10; y += 12) {
            flaming = p.map(y, p.height, 0, 0.2, 0.8);

            for (let x = 10; x < p.width - 10; x += 6) {
              const na = p.noise(x / 50, y / 100 + fspeed, fspeed);

              if (na < flaming) {
                p.textSize(na * littleT);
              } else {
                p.textSize(na * bigT);
              }

              const letter = poem[alphabetP % poem.length];

              if (letter !== 'space') {
                p.text(letter, x, y);
              }

              alphabetP++;
            }
          }
        };

        p.windowResized = () => {
          const m = p.min(p.windowWidth, p.windowHeight);
          p.resizeCanvas(m, m);
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
    <div className="w-full h-screen flex items-center justify-center" style={{ background: "#FBF6EE" }}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
