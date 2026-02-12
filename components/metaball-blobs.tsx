"use client";

import { useEffect, useRef } from "react";

export default function MetaballBlobs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: any = null;

    // Load dependencies
    Promise.all([
      import("p5"),
      import("matter-js")
    ]).then(([p5Module, MatterModule]) => {
      const p5 = p5Module.default;
      const Matter = MatterModule.default;

      const sketch = (p: any) => {
        let engine: any;
        let blobs: any[] = [];
        let metaballShader: any;
        let spheremap: any;

        const BLOB_NODE_SIZE = 20;
        const BLOB_NODE_R = 15;
        const BLOB_NODE_AREA = Math.PI * BLOB_NODE_SIZE * BLOB_NODE_SIZE;

        // Shader code
        const vert = `#version 300 es
precision highp float;

in vec3 aPosition;
in vec2 aTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

out vec2 vTexCoord;

void main() {
  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * viewModelPosition;
  vTexCoord = aTexCoord;
}`;

        const frag = `#version 300 es
precision highp float;

in vec2 vTexCoord;
out vec4 fragColor;

uniform sampler2D data;
uniform sampler2D spheremap;
uniform vec4 bbox;
uniform int numNodes;
uniform float k;
uniform float r;
uniform vec4 c;

float opSmoothUnion( float d1, float d2, float k )
{
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h);
}

vec2 nodeCoord(int i) {
    float x = fract(float(i)/20.) + 1./40.;
    float y = floor(float(i)/20.)/20. + 1./40.;
    vec2 pos = texture(data, vec2(x, y)).xy;
    return mix(bbox.xy, bbox.zw, pos);
}

void main() {
    vec2 coord = mix(bbox.xy, bbox.zw, vTexCoord);

    float dist = 100000.;
    float avg = 0.;
    float total = 0.;
    for (int i = 0; i < 400; i++) {
        if (i >= numNodes) break;

        float dist2 = length(coord - nodeCoord(i)) - r;
        avg += pow(dist2, 2.);
        total += 1.;
        dist = opSmoothUnion(dist, dist2, k);
    }
    avg /= total;
    vec3 pos = vec3(coord, -40.*smoothstep(0., 2., pow(-dist, .1)));

    vec3 normal = -normalize(cross(dFdx(pos), dFdy(pos)));

    vec3 fromCam = normalize(pos - vec3(0., 0., -800.0));
    vec3 n = reflect(fromCam, normal);
    float phi = acos( n.y );
    float theta = 0.0;
    theta = acos(n.x / sin(phi));
    float sinTheta = n.z / sin(phi);
    if (sinTheta < 0.0) {
        theta = 2.0 * 3.14159 - theta;
    }
    theta = theta / (2.0 * 3.14159);
    phi = phi / 3.14159 ;
    vec2 angles = vec2( fract(theta + 0.25), 1.0 - phi );

    vec3 lightDir = normalize(vec3(-0.3, 0.9, 0.));
    float l = 0.15 * max(0., dot(lightDir, normal)) + 0.85;
    vec3 outColor = c.xyz * l + pow(texture(spheremap, angles).xyz, vec3(4.));

    fragColor = vec4(outColor, 1.) * (1. - smoothstep(0., 0.01, dist));
}`;

        // Blob class
        class Blob {
          nodes: any[];
          springs: any[];
          c: any;
          tex: any;

          constructor(x: number, y: number, r: number, c: string) {
            this.nodes = [];
            this.springs = [];
            this.c = p.color(c);
            this.tex = p.createImage(20, 20);
            this.tex.loadPixels();
            for (let i = 0; i < this.tex.pixels.length; i++) {
              this.tex.pixels[i] = 255;
            }
            (p as any)._renderer.getTexture(this.tex).setInterpolation(p.NEAREST, p.NEAREST);

            const a = p.PI * r * r;
            const numBlobs = p.ceil(a / BLOB_NODE_AREA);

            while (this.nodes.length < numBlobs) {
              const rx = p.random(-r, r);
              const ry = p.random(-r, r);
              if (Math.hypot(rx, ry) > r) continue;

              const vert = Matter.Bodies.circle(x + rx, y + ry, BLOB_NODE_R, {
                inertia: Infinity,
                friction: 0.015,
              });
              this.nodes.push(vert);
            }

            Matter.World.add(engine.world, this.nodes);
          }

          bin(x: number, y: number) {
            return [p.round(x / 80), p.round(y / 80)];
          }

          nodeBin(node: any) {
            return this.bin(node.position.x, node.position.y);
          }

          adjacentBins(node: any) {
            const [x, y] = this.nodeBin(node);
            const bins = [];
            for (const dx of [-1, 0, 1]) {
              for (const dy of [-1, 0, 1]) {
                bins.push([x + dx, y + dy]);
              }
            }
            return bins;
          }

          binKey(bin: number[]) {
            return bin.join(",");
          }

          binnedNodes() {
            const bins: any = {};
            for (const node of this.nodes) {
              const binKey = this.binKey(this.nodeBin(node));
              if (!bins[binKey]) {
                bins[binKey] = [];
              }
              bins[binKey].push(node);
            }
            return bins;
          }

          update() {
            Matter.World.remove(engine.world, this.springs);
            this.springs = [];
            const bins = this.binnedNodes();

            for (const node of this.nodes) {
              const binsToCheck = this.adjacentBins(node);
              for (const bin of binsToCheck) {
                const key = this.binKey(bin);
                if (!bins[key]) continue;

                for (const other of bins[key]) {
                  if (other === node) continue;

                  this.springs.push(
                    Matter.Constraint.create({
                      bodyA: node,
                      pointA: { x: 0, y: 0 },
                      bodyB: other,
                      pointB: { x: 0, y: 0 },
                      stiffness: p.map(
                        Math.hypot(
                          node.position.x - other.position.x,
                          node.position.y - other.position.y
                        ),
                        0,
                        12 * BLOB_NODE_SIZE,
                        0.02,
                        0.03,
                        true
                      ),
                      damping: 0.001,
                      length: p.max(
                        2 * BLOB_NODE_SIZE,
                        Math.hypot(
                          node.position.x - other.position.x,
                          node.position.y - other.position.y
                        ) * 0.975
                      ),
                    })
                  );
                }
              }
            }
            Matter.World.add(engine.world, this.springs);
          }

          drawBlob() {
            const minX = Math.min(...this.nodes.map((n) => n.position.x)) - 4 * BLOB_NODE_SIZE;
            const maxX = Math.max(...this.nodes.map((n) => n.position.x)) + 4 * BLOB_NODE_SIZE;
            const minY = Math.min(...this.nodes.map((n) => n.position.y)) - 4 * BLOB_NODE_SIZE;
            const maxY = Math.max(...this.nodes.map((n) => n.position.y)) + 4 * BLOB_NODE_SIZE;
            const x = (maxX + minX) / 2;
            const y = (maxY + minY) / 2;
            const w = maxX - minX;
            const h = maxY - minY;

            this.nodes.forEach((node: any, i: number) => {
              this.tex.pixels[i * 4 + 0] = p.map(node.position.x, minX, maxX, 0, 255, true);
              this.tex.pixels[i * 4 + 1] = p.map(node.position.y, minY, maxY, 0, 255, true);
            });
            this.tex.updatePixels();

            p.push();
            p.translate(x, y);
            p.noStroke();
            p.shader(metaballShader);
            metaballShader.setUniform("bbox", [minX, minY, maxX, maxY]);
            metaballShader.setUniform("k", BLOB_NODE_SIZE * 3);
            metaballShader.setUniform("numNodes", this.nodes.length);
            metaballShader.setUniform("data", this.tex);
            metaballShader.setUniform("r", BLOB_NODE_R);
            metaballShader.setUniform("c", [p.red(this.c)/255, p.green(this.c)/255, p.blue(this.c)/255, p.alpha(this.c)/255]);
            metaballShader.setUniform("spheremap", spheremap);
            p.plane(w, h);
            p.pop();
          }
        }

        const setupScene = () => {
          engine = Matter.Engine.create();

          const ground = Matter.Bodies.rectangle(0, p.height / 2 + 30, p.width, 60, {
            isStatic: true,
          });
          const wallLeft = Matter.Bodies.rectangle(-p.width / 2 - 30, 0, 60, 3 * p.height, {
            isStatic: true,
          });
          const wallRight = Matter.Bodies.rectangle(p.width / 2 + 30, 0, 60, 3 * p.height, {
            isStatic: true,
          });
          Matter.World.add(engine.world, [ground, wallLeft, wallRight]);
        };

        const createProceduralSpheremap = () => {
          const img = p.createImage(256, 128);
          img.loadPixels();
          for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
              const index = (x + y * img.width) * 4;
              const nx = p.noise(x * 0.02, y * 0.02);
              const val = p.map(nx, 0, 1, 150, 255);
              img.pixels[index] = val * 0.8;
              img.pixels[index + 1] = val * 0.85;
              img.pixels[index + 2] = val * 0.9;
              img.pixels[index + 3] = 255;
            }
          }
          img.updatePixels();
          return img;
        };

        p.setup = () => {
          p.createCanvas(600, 600, p.WEBGL);

          // Create procedural spheremap as fallback
          spheremap = createProceduralSpheremap();

          // Try to load the external image
          p.loadImage(
            "https://deckard.openprocessing.org/user67809/visual2181338/h987a85d77bacbc3b232fb87ce6fe440a/dusseldorf_bridge.jpg",
            (img) => {
              spheremap = img;
            },
            () => {
              console.log("Using procedural spheremap");
            }
          );

          metaballShader = p.createShader(vert, frag);
          setupScene();
          blobs.push(new Blob(p.random(-1, 1) * 100, 50, 100, "#f3e17e"));
          blobs.push(new Blob(p.random(-1, 1) * 100, -150, 100, "#dd483c"));
          blobs.push(new Blob(p.random(-1, 1) * 100, -350, 50, "#4b8a5f"));
          blobs.push(new Blob(p.random(-1, 1) * 100, -550, 50, "#0d150b"));
        };

        p.draw = () => {
          p.background("#faf8e2");

          for (const blob of blobs) {
            blob.update();
          }
          Matter.Engine.update(engine, 1000 / 60);

          for (const blob of blobs) {
            blob.drawBlob();
          }
        };

        p.mousePressed = () => {
          if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            // Add new blob on click
            blobs.push(
              new Blob(
                p.mouseX - p.width / 2,
                p.mouseY - p.height / 2,
                p.random(50, 100),
                p.random(["#f3e17e", "#dd483c", "#4b8a5f", "#0d150b", "#8b5a3c"])
              )
            );
          }
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
    <div className="w-full h-screen flex items-center justify-center" style={{ background: "#faf8e2" }}>
      <div ref={containerRef} className="w-full h-full flex items-center justify-center" />
    </div>
  );
}
