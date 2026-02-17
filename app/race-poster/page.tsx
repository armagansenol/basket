import RacePosterV2 from "@/components/race-poster-v2";

export default function RacePosterPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-neutral-900">Race Poster</h1>
            <p className="text-neutral-600">
              Minimalist retro-futuristic editorial poster with curved track, letter tokens, and subtle grain.
            </p>
          </div>

          <div className="bg-neutral-100 p-8 rounded-lg">
            <RacePosterV2 />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Composition</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong className="text-purple-400">9 Track Lanes</strong> - Warm yellow parallel arcs</li>
                <li>• <strong className="text-purple-400">8 Letter Tokens</strong> - "W-I-S-T-A-R-T"</li>
                <li>• <strong className="text-purple-400">Diagonal Shadow</strong> - Geometric lighting wedge</li>
                <li>• <strong className="text-purple-400">Confetti Dots</strong> - Cyan, yellow, red accents</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Effects & Animation</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong>Film Grain</strong> - Subtle noise texture</li>
                <li>• <strong>Indigo Gradient</strong> - Ultramarine background</li>
                <li>• <strong>Soft Shadows</strong> - Oval token shadows</li>
                <li>• <strong>Breathing Motion</strong> - Gentle token animation</li>
                <li>• <strong>Drifting Confetti</strong> - Noise-based movement</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3 text-neutral-900">Technical Details</h2>
            <p className="text-neutral-700 mb-4">
              High-fidelity recreation in p5.js instance mode. Uses concentric arc geometry with an off-canvas
              center point to create the curved running track effect. Film grain applied via particle system for
              authentic screen-printed poster texture. Subtle breathing animation uses Perlin noise for organic
              movement. All elements precisely layered: gradient → grain → confetti → shadow plane → track →
              token shadows → tokens → letters.
            </p>
            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-900">Letter Tokens:</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                       style={{ background: "hsl(25, 85%, 60%)", color: "hsl(240, 50%, 10%)" }}>W</div>
                  <span className="text-xs text-neutral-600">Orange</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                       style={{ background: "hsl(180, 75%, 60%)", color: "hsl(240, 50%, 10%)" }}>I</div>
                  <span className="text-xs text-neutral-600">Teal</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                       style={{ background: "hsl(330, 85%, 65%)", color: "hsl(240, 50%, 10%)" }}>-</div>
                  <span className="text-xs text-neutral-600">Pink</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                       style={{ background: "hsl(280, 75%, 60%)", color: "hsl(240, 50%, 10%)" }}>S</div>
                  <span className="text-xs text-neutral-600">Violet</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                       style={{ background: "hsl(350, 80%, 65%)", color: "hsl(240, 50%, 10%)" }}>T</div>
                  <span className="text-xs text-neutral-600">Red</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                       style={{ background: "hsl(25, 85%, 60%)", color: "hsl(240, 50%, 10%)" }}>A</div>
                  <span className="text-xs text-neutral-600">Orange</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                       style={{ background: "hsl(180, 75%, 60%)", color: "hsl(240, 50%, 10%)" }}>R</div>
                  <span className="text-xs text-neutral-600">Teal</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                       style={{ background: "hsl(330, 85%, 65%)", color: "hsl(240, 50%, 10%)" }}>T</div>
                  <span className="text-xs text-neutral-600">Pink</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
