import MotionGrid from "@/components/motion-grid";

export default function MotionGridPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-neutral-900">Motion Grid</h1>
            <p className="text-neutral-600">
              Animated 6×6 grid with 4 distinct looping motion patterns and smooth easing.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden bg-black">
            <MotionGrid />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Animation Features</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong className="text-purple-400">4 Motion Types</strong> - Cycling patterns</li>
                <li>• <strong className="text-purple-400">Ease In/Out Quint</strong> - Smooth transitions</li>
                <li>• <strong className="text-purple-400">120 Frame Loops</strong> - 60 frames each phase</li>
                <li>• <strong className="text-purple-400">Random Rotation</strong> - 0°, 90°, 180°, 270°</li>
                <li>• <strong className="text-purple-400">Color Lerping</strong> - Smooth color transitions</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Color Palette</h2>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#235789" }}></div>
                  <span className="text-sm text-neutral-700">Blue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#c1292e" }}></div>
                  <span className="text-sm text-neutral-700">Red</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#f1d302" }}></div>
                  <span className="text-sm text-neutral-700">Yellow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#ffffff" }}></div>
                  <span className="text-sm text-neutral-700">White</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#d67ab1" }}></div>
                  <span className="text-sm text-neutral-700">Pink</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#2e933c" }}></div>
                  <span className="text-sm text-neutral-700">Green</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#e4572e" }}></div>
                  <span className="text-sm text-neutral-700">Orange</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#17bebb" }}></div>
                  <span className="text-sm text-neutral-700">Cyan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3 text-neutral-900">Technical Implementation</h2>
            <p className="text-neutral-700 mb-4">
              Created by Okazz. An exploration of looping motion graphics with four distinct animation
              patterns in a 6×6 grid. Each cell uses canvas clipping to constrain shapes within square
              bounds, randomly rotates at setup, and cycles through two-color animations. The timing system
              uses a 120-frame loop split into two 60-frame phases, with easeInOutQuint providing smooth,
              natural motion curves.
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-900">Motion Types:</h3>
              <ul className="text-sm text-neutral-700 space-y-2 ml-4">
                <li>
                  • <strong>Motion01 - Quarter Circle Morph:</strong><br/>
                  <span className="text-neutral-600 ml-2">
                    Four quarter circles that collapse inward while color-lerping, then shift outward.
                    Uses arc() primitives positioned at corners.
                  </span>
                </li>
                <li>
                  • <strong>Motion02 - Hexagonal Slide:</strong><br/>
                  <span className="text-neutral-600 ml-2">
                    Six triangular petals arranged in a hexagon that slide from outside to center,
                    alternating between two colors. Rotates TAU/6 per petal.
                  </span>
                </li>
                <li>
                  • <strong>Motion03 - Staggered Rectangles:</strong><br/>
                  <span className="text-neutral-600 ml-2">
                    Three horizontal bars that slide in with 5-frame delays (t: 5, 10, 15), then
                    slide out in reverse directions. Two colors alternate.
                  </span>
                </li>
                <li>
                  • <strong>Motion04 - Overlapping Circles:</strong><br/>
                  <span className="text-neutral-600 ml-2">
                    Two circles grow from zero while shifting inward, then shrink while shifting
                    outward. Small offset creates overlap effect.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-900">Animation System:</h3>
              <ul className="text-sm text-neutral-700 space-y-1 ml-4">
                <li>• <strong>Frame Timeline:</strong> 0-60 (phase 1) → 60-120 (phase 2) → reset</li>
                <li>• <strong>Easing Function:</strong> easeInOutQuint (quintic in/out)</li>
                <li>• <strong>Color Interpolation:</strong> lerpColor() for smooth gradients</li>
                <li>• <strong>Value Interpolation:</strong> lerp() for position/size</li>
                <li>• <strong>Normalization:</strong> norm() converts frame ranges to 0-1</li>
                <li>• <strong>Canvas Clipping:</strong> ctx.clip() constrains drawing to square</li>
                <li>• <strong>Random Init:</strong> New colors and rotation on loop restart</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-900">Grid Configuration:</h3>
              <ul className="text-sm text-neutral-700 space-y-1 ml-4">
                <li>• <strong>Canvas:</strong> 900×900px with CENTER rectMode</li>
                <li>• <strong>Grid Size:</strong> 90% of canvas (810px)</li>
                <li>• <strong>Cell Count:</strong> 6×6 = 36 cells</li>
                <li>• <strong>Cell Size:</strong> 810 ÷ 6 = 135px</li>
                <li>• <strong>Shape Size:</strong> 50% of cell (67.5px)</li>
                <li>• <strong>Pattern Cycle:</strong> Motion types repeat every 4 cells</li>
                <li>• <strong>Color Assignment:</strong> Random pairs per cell (no duplicates)</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-900">Easing Formula:</h3>
              <pre className="text-sm text-neutral-600 p-3 bg-neutral-100 rounded border border-neutral-200 overflow-x-auto">
{`easeInOutQuint(x) {
  if (x < 0.5) return 16 * x^5
  else return 1 - (-2x + 2)^5 / 2
}`}
              </pre>
            </div>

            <div className="mt-4 p-4 bg-neutral-100 rounded border border-neutral-200">
              <p className="text-sm text-neutral-600 italic">
                By Okazz - A study in rhythmic motion design with clipped geometric animations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
