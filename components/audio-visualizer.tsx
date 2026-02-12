"use client";

import { useEffect, useRef } from "react";

export default function AudioVisualizer() {
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
        let canvas: any;
        let bgColor: any;
        let radialArcs: RadialArcs[] = [];
        let time = 0;

        // RadialArc Class
        class RadialArc {
          arcID: number;
          totalArcs: number;
          minRadius: number;
          maxRadius: number;
          arcRadius: number;
          maxStroke: number;
          minHue: number;
          maxHue: number;
          dataVal: number;
          centerX: number;
          centerY: number;
          arcMaxRadian: number;
          arcBaseline: number;
          arcStartRadian: number;
          arcEndRadian: number;

          constructor(
            id: number,
            arcs: number,
            minR: number,
            maxR: number,
            baseR: number,
            maxStr: number,
            minH: number,
            maxH: number
          ) {
            this.arcID = id;
            this.totalArcs = arcs;
            this.minRadius = minR;
            this.maxRadius = maxR;
            this.arcRadius =
              this.minRadius +
              ((this.maxRadius - this.minRadius) / this.totalArcs) * (this.arcID + 1);
            this.maxStroke = maxStr;
            this.minHue = minH;
            this.maxHue = maxH;
            this.dataVal = 0;
            this.centerX = p.width / 2;
            this.centerY = p.height / 2;
            this.arcMaxRadian = p.QUARTER_PI;
            this.arcBaseline = baseR;
            this.arcStartRadian = 0;
            this.arcEndRadian = 0;
          }

          setValue(d: number) {
            this.dataVal = d;
          }

          getValue() {
            return this.dataVal;
          }

          redrawFromData() {
            this.updateArc();
            this.drawArc();
          }

          updateArc() {
            this.arcEndRadian = this.arcBaseline + this.arcMaxRadian * this.dataVal;
            this.arcStartRadian = this.arcBaseline - this.arcMaxRadian * this.dataVal;
          }

          drawArc() {
            const dataColor = this.getDataHSBColor(this.dataVal);
            p.stroke(dataColor);
            p.strokeWeight(p.map(this.dataVal, 0, 1, 0, this.maxStroke));
            p.noFill();
            p.arc(
              this.centerX,
              this.centerY,
              this.arcRadius,
              this.arcStartRadian,
              this.arcEndRadian
            );
            p.arc(
              this.centerX,
              this.centerY,
              this.arcRadius,
              this.arcStartRadian - p.PI,
              this.arcEndRadian - p.PI
            );
          }

          getDataHSBColor(d: number) {
            const dataHue = p.map(d, 0, 1, this.minHue, this.maxHue);
            const dataSaturation = p.map(d, 0, 1, 100, 80);
            const dataBrightness = p.map(d, 0, 1, 10, 100);
            return p.color(dataHue, dataSaturation, dataBrightness);
          }
        }

        // RadialArcs Class
        class RadialArcs {
          radialArcCount: number;
          minRadius: number;
          maxRadius: number;
          radialArcs: RadialArc[];
          baselineR: number;
          maxStroke: number;
          minHue: number;
          maxHue: number;

          constructor(
            arcCount: number,
            minR: number,
            maxR: number,
            baseR: number,
            maxStr: number,
            minH: number,
            maxH: number
          ) {
            this.radialArcCount = arcCount;
            this.minRadius = minR;
            this.maxRadius = maxR;
            this.radialArcs = [];
            this.baselineR = baseR;
            this.maxStroke = maxStr;
            this.minHue = minH;
            this.maxHue = maxH;
            this.initArcs();
          }

          initArcs() {
            for (let a = 0; a < this.radialArcCount; a++) {
              this.radialArcs[a] = new RadialArc(
                a,
                this.radialArcCount,
                this.minRadius,
                this.maxRadius,
                this.baselineR,
                this.maxStroke,
                this.minHue,
                this.maxHue
              );
            }
          }

          updateArcs(d: number) {
            for (let a = this.radialArcs.length - 1; a >= 0; a--) {
              if (a > 0) {
                this.radialArcs[a].setValue(this.radialArcs[a - 1].getValue());
              } else {
                this.radialArcs[a].setValue(d);
              }
            }
          }

          drawArcs() {
            for (let a = 0; a < this.radialArcs.length; a++) {
              this.radialArcs[a].redrawFromData();
            }
          }
        }

        p.setup = () => {
          p.colorMode(p.HSB, 360, 100, 100);
          p.frameRate(60);
          canvas = p.createCanvas(800, 600);
          bgColor = p.color(0, 0, 0);
          p.background(bgColor);
          initRadialArcs();
        };

        p.draw = () => {
          p.background(bgColor);
          time += 0.02;
          updateRadialArcs();
          drawRadialArcs();
        };

        function initRadialArcs() {
          radialArcs[0] = new RadialArcs(40, p.height / 4, p.width, 0, 3, 330, 360);
          radialArcs[1] = new RadialArcs(60, p.height / 12, p.height, -p.HALF_PI, 1.5, 300, 330);
        }

        function updateRadialArcs() {
          radialArcs[0].updateArcs(getSimulatedData("bass"));
          radialArcs[1].updateArcs(getSimulatedData("treble"));
        }

        function drawRadialArcs() {
          radialArcs[0].drawArcs();
          radialArcs[1].drawArcs();
        }

        function getSimulatedData(freqType: "bass" | "treble") {
          // Simulate bass and treble frequencies with different characteristics
          if (freqType === "bass") {
            // Bass: slower, more powerful oscillations
            const bassPulse = Math.sin(time * 1.5) * 0.5 + 0.5;
            const bassNoise = p.noise(time * 0.5) * 0.5;
            return bassPulse * 0.7 + bassNoise * 0.3;
          } else {
            // Treble: faster, more erratic movements
            const treblePulse = Math.sin(time * 3.2) * 0.5 + 0.5;
            const trebleNoise = p.noise(time * 2.0) * 0.5;
            return treblePulse * 0.6 + trebleNoise * 0.4;
          }
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
