import PosterWIStart from "@/components/poster-wistart";

export default function PosterWIStartPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">W-I-START Poster</h1>
            <p className="text-neutral-400">
              High-fidelity retro-futuristic poster with elliptical track geometry and grain texture.
            </p>
          </div>

          <div className="bg-neutral-900 p-8 rounded-lg flex items-center justify-center">
            <PosterWIStart />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Composition</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong className="text-purple-400">Elliptical Arcs</strong> - 9 parallel track lanes</li>
                <li>• <strong className="text-purple-400">8 Letter Tokens</strong> - "W I – S T A R T"</li>
                <li>• <strong className="text-purple-400">Diagonal Wedge</strong> - Hard-edged shadow plane</li>
                <li>• <strong className="text-purple-400">26 Confetti Dots</strong> - Scattered accents</li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Visual Details</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong>Film Grain Buffer</strong> - Pixel-level noise overlay</li>
                <li>• <strong>Linear Gradient</strong> - Indigo to ultramarine</li>
                <li>• <strong>Soft Vignette</strong> - Subtle edge darkening</li>
                <li>• <strong>Oval Shadows</strong> - Multi-layer translucent blur</li>
                <li>• <strong>Micro-bob Animation</strong> - Noise-based motion</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <h2 className="text-xl font-semibold mb-3 text-white">Technical Implementation</h2>
            <p className="text-neutral-300 mb-4">
              Built with p5.js instance mode using precise elliptical geometry. The track arcs are created
              with an off-canvas center point (1.28, 0.06) and parametric ellipse equations. Film grain is
              pre-rendered to an offscreen buffer for performance, then composited with OVERLAY blend mode.
              Token positions are calculated along specific lanes at precise angles (degrees). Responsive
              sizing maintains aspect ratio while scaling to container.
            </p>
            <div className="mt-4">
              <h3 className="font-semibold mb-3 text-white">Configuration Highlights:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-300">
                <div>
                  <span className="font-semibold text-purple-400">Lanes:</span> 9 arcs, 5.5% gap
                </div>
                <div>
                  <span className="font-semibold text-purple-400">Arc Range:</span> 150° to 285°
                </div>
                <div>
                  <span className="font-semibold text-purple-400">Track Stroke:</span> 0.22% of min dimension
                </div>
                <div>
                  <span className="font-semibold text-purple-400">Grain Density:</span> 3% coverage
                </div>
                <div>
                  <span className="font-semibold text-purple-400">Ellipse Center:</span> (128%, 6%) off-canvas
                </div>
                <div>
                  <span className="font-semibold text-purple-400">Token Size:</span> 7% of canvas
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-white">Letter Tokens:</h3>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-2 rounded bg-[#f3a21a] text-[#121739] font-bold text-sm">W</div>
                <div className="px-3 py-2 rounded bg-[#1dd6c1] text-[#121739] font-bold text-sm">I</div>
                <div className="px-3 py-2 rounded bg-[#ff2c68] text-[#121739] font-bold text-sm">–</div>
                <div className="px-3 py-2 rounded bg-[#ff4aa5] text-[#121739] font-bold text-sm">S</div>
                <div className="px-3 py-2 rounded bg-[#b070d8] text-[#121739] font-bold text-sm">T</div>
                <div className="px-3 py-2 rounded bg-[#f0b326] text-[#121739] font-bold text-sm">A</div>
                <div className="px-3 py-2 rounded bg-[#29c8b6] text-[#121739] font-bold text-sm">R</div>
                <div className="px-3 py-2 rounded bg-[#ff3b6c] text-[#121739] font-bold text-sm">T</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
