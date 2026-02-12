import GeometricGrid from "@/components/geometric-grid";

export default function GeometricGridPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">Geometric Grid</h1>
            <p className="text-neutral-400">
              Abstract geometric pattern grid with colored drop shadows and varied shapes.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden" style={{ background: "#fffafe" }}>
            <GeometricGrid />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Visual Elements</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong className="text-purple-400">7×7 Grid</strong> - 49 total shapes</li>
                <li>• <strong className="text-purple-400">15 Shape Types</strong> - Cycles through patterns</li>
                <li>• <strong className="text-purple-400">Drop Shadows</strong> - Colored offset fills</li>
                <li>• <strong className="text-purple-400">Black Outlines</strong> - Clean geometric borders</li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Color Palette</h2>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#f71735" }}></div>
                  <span className="text-sm text-neutral-300">Red</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#067bc2" }}></div>
                  <span className="text-sm text-neutral-300">Blue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#FFC247" }}></div>
                  <span className="text-sm text-neutral-300">Yellow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#3BD89F" }}></div>
                  <span className="text-sm text-neutral-300">Green</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#81cfe5" }}></div>
                  <span className="text-sm text-neutral-300">Cyan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#f654a9" }}></div>
                  <span className="text-sm text-neutral-300">Pink</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <h2 className="text-xl font-semibold mb-3 text-white">Technical Implementation</h2>
            <p className="text-neutral-300 mb-4">
              Created by Okazz. A generative art piece featuring a 7×7 grid of abstract geometric shapes.
              Each cell cycles through 15 distinct shape types (0-14), creating a varied pattern across the
              canvas. The shapes feature a layered visual style with colored drop shadows created by drawing
              filled shapes with a small offset, then overlaying black-outlined shapes.
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Shape Types:</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>Type 0:</strong> Circle with radial lines (compass)</li>
                <li>• <strong>Type 1:</strong> Two diagonal squares</li>
                <li>• <strong>Type 2:</strong> Right triangle</li>
                <li>• <strong>Type 3:</strong> Two circles with vertical lines</li>
                <li>• <strong>Type 4:</strong> Diamond with vertical lines</li>
                <li>• <strong>Type 5:</strong> L-shaped polygon</li>
                <li>• <strong>Type 6:</strong> Two overlapping circles</li>
                <li>• <strong>Type 7:</strong> Rectangle and square composition</li>
                <li>• <strong>Type 8:</strong> Circle with diagonal lines</li>
                <li>• <strong>Type 9:</strong> Semicircle arc with vertical line</li>
                <li>• <strong>Type 10:</strong> Four circles in cross pattern</li>
                <li>• <strong>Type 11:</strong> Two curved quarter-circle arcs</li>
                <li>• <strong>Type 12:</strong> Star/pentagram pattern</li>
                <li>• <strong>Type 13:</strong> Two circles with center line</li>
                <li>• <strong>Type 14:</strong> Yin-yang style curved arcs</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Drawing Technique:</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>Canvas:</strong> 900×900px with CENTER rectMode</li>
                <li>• <strong>Grid Size:</strong> 80% of canvas (720px)</li>
                <li>• <strong>Cell Size:</strong> 720 ÷ 7 ≈ 103px</li>
                <li>• <strong>Shape Size:</strong> 60% of cell (≈62px)</li>
                <li>• <strong>Shadow Offset:</strong> 5% of shape width (≈3px)</li>
                <li>• <strong>Stroke Weight:</strong> 3% of shape width (≈2px)</li>
                <li>• <strong>Layer Order:</strong> Color fill (offset) → Black outline (centered)</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-neutral-900 rounded border border-neutral-700">
              <p className="text-sm text-neutral-400 italic">
                By Okazz - A study in geometric abstraction with playful drop shadow effects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
