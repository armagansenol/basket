import PointNetwork from "@/components/point-network";

export default function PointNetworkPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">Point Network</h1>
            <p className="text-neutral-400">
              Generative network visualization with connected points and noise-based background pattern.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden bg-neutral-900">
            <PointNetwork />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Interaction</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong className="text-purple-400">Click Anywhere</strong> - Generate new pattern</li>
                <li>• <strong className="text-purple-400">Randomized Colors</strong> - Palette shuffled each time</li>
                <li>• <strong className="text-purple-400">Unique Networks</strong> - Different layout every regeneration</li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Visual Features</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong>110 Random Points</strong> - Scattered across canvas</li>
                <li>• <strong>Connection Lines</strong> - Links within 150px distance</li>
                <li>• <strong>Variable Width</strong> - Line thickness based on distance</li>
                <li>• <strong>Noise Background</strong> - Perlin noise dot pattern</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <h2 className="text-xl font-semibold mb-3 text-white">Technical Implementation</h2>
            <p className="text-neutral-300 mb-4">
              A generative art piece exploring network connectivity and organic patterns. The composition
              layers three visual elements: a Perlin noise-based dot grid background, curved connection
              lines between nearby points, and circular nodes at each point. The palette is shuffled at
              initialization, creating different color schemes with each generation.
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Layer System:</h3>
              <ul className="text-sm text-neutral-300 space-y-2 ml-4">
                <li>
                  • <strong>Layer 1 - Background Dots:</strong><br/>
                  <span className="text-neutral-400 ml-2">
                    150×150 grid of circles with Perlin noise determining size. Offset pattern creates
                    visual texture. Uses palette[0] for background color and palette[1] for dots.
                  </span>
                </li>
                <li>
                  • <strong>Layer 2 - Dark Overlay:</strong><br/>
                  <span className="text-neutral-400 ml-2">
                    Semi-transparent black layer (alpha: 50) dims the background pattern for contrast.
                  </span>
                </li>
                <li>
                  • <strong>Layer 3 - Connection Lines:</strong><br/>
                  <span className="text-neutral-400 ml-2">
                    Curved shapes connecting points within 150px. Width varies from 0.1%-2% of distance.
                    Uses curveVertex for smooth, organic shapes. Color: palette[2].
                  </span>
                </li>
                <li>
                  • <strong>Layer 4 - Node Circles:</strong><br/>
                  <span className="text-neutral-400 ml-2">
                    Circles at each point with random diameters (1-20px). Color: palette[2].
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Connection Algorithm:</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>Point Distribution:</strong> 110 points randomly placed at -10% to 110% of canvas (allows edge overflow)</li>
                <li>• <strong>Distance Check:</strong> For each point pair, if distance ≤ 150px, draw connection</li>
                <li>• <strong>Line Width:</strong> w = distance × random(0.001, 0.02)</li>
                <li>• <strong>Perpendicular Calculation:</strong> Angle perpendicular to line direction</li>
                <li>• <strong>Shape Points:</strong> 4 corners offset by width/2 perpendicular to line</li>
                <li>• <strong>Curve Shape:</strong> curveVertex creates smooth path through 9 control points</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Perlin Noise Background:</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>Grid:</strong> 150×150 = 22,500 dots</li>
                <li>• <strong>Noise Scale:</strong> 0.0006 (creates smooth, organic variations)</li>
                <li>• <strong>Size Range:</strong> 0 to 1.5× cell width</li>
                <li>• <strong>Offset Pattern:</strong> Even rows shifted down by half cell height</li>
                <li>• <strong>Cell Size:</strong> 800 ÷ 150 ≈ 5.33px</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Color Palette:</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#ff0000" }}></div>
                  <span className="text-sm text-neutral-300">Red</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#00ff00" }}></div>
                  <span className="text-sm text-neutral-300">Green</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#0000ff" }}></div>
                  <span className="text-sm text-neutral-300">Blue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#00ffff" }}></div>
                  <span className="text-sm text-neutral-300">Cyan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#ff00ff" }}></div>
                  <span className="text-sm text-neutral-300">Magenta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#ffff00" }}></div>
                  <span className="text-sm text-neutral-300">Yellow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded border border-neutral-600" style={{ background: "#ffffff" }}></div>
                  <span className="text-sm text-neutral-300">White</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded border border-neutral-600" style={{ background: "#000000" }}></div>
                  <span className="text-sm text-neutral-300">Black</span>
                </div>
              </div>
              <p className="text-xs text-neutral-400 mt-3">
                Palette is shuffled at each generation. palette[0] = background, palette[1] = dots, palette[2] = network
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">MyLine Function - Curved Connection:</h3>
              <pre className="text-xs text-neutral-400 p-3 bg-neutral-900 rounded border border-neutral-700 overflow-x-auto">
{`1. Calculate perpendicular angle to line
2. Find 4 corner points (width/2 offset perpendicular)
3. Find center point between endpoints
4. Use curveVertex to create smooth shape:
   - Start at p4
   - Curve through p1 → center → p2 → p3
   - Back through center → p4 → p1 → center
   - Creates organic, ribbon-like connection`}
              </pre>
            </div>

            <div className="mt-4 p-4 bg-neutral-900 rounded border border-neutral-700">
              <p className="text-sm text-neutral-400 italic">
                A study in network visualization with organic aesthetics and layered composition
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
