import BunnyEarCactus from "@/components/bunny-ear-cactus";

export default function BunnyEarCactusPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">Bunny Ear Cactus 🌵</h1>
            <p className="text-neutral-400">
              Generative art featuring recursive cactus growth on a sandy desert background.
            </p>
          </div>

          <div className="bg-neutral-900 rounded-lg overflow-hidden">
            <BunnyEarCactus />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Interaction</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong className="text-purple-400">Click Canvas</strong> - Generate new cactus</li>
                <li>• <strong className="text-purple-400">Random Growth</strong> - Each cactus is unique</li>
                <li>• <strong className="text-purple-400">Branching</strong> - Recursive leaf structure</li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Visual Elements</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong>Sand Background</strong> - 280k particles, elliptical distribution</li>
                <li>• <strong>Cactus Leaves</strong> - Green ellipses with texture noise</li>
                <li>• <strong>Procedural Texture</strong> - Perlin noise overlay</li>
                <li>• <strong>Desert Palette</strong> - Warm beige and green tones</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <h2 className="text-xl font-semibold mb-3 text-white">Technical Details</h2>
            <p className="text-neutral-300 mb-4">
              Created for #WCCChallenge "Sand ⏳" (2024.8.31) by TKt | 陳建中 Tân Kiàn-tiong (rainsr7235).
              Uses recursive algorithms to grow bunny-ear-shaped cactus segments. The sand background
              employs power distribution (t=1 and t=-1) to create natural-looking particle scatter with
              elliptical bounds. Each cactus leaf is textured with HSB color variation using Gaussian
              randomization for organic appearance.
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Growth Algorithm:</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>Recursion Depth:</strong> 3-4 levels (random)</li>
                <li>• <strong>Branching Probability:</strong> 70% chance per level</li>
                <li>• <strong>Branch Patterns:</strong> Either dual-split or single continuation</li>
                <li>• <strong>Size Reduction:</strong> 70-90% of parent size</li>
                <li>• <strong>Rotation Range:</strong> -0.5 to 0.5 radians</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Sand Rendering:</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>Particle Count:</strong> 280,000 total (2 layers of 140k)</li>
                <li>• <strong>Distribution:</strong> Power-law (t=1 outer, t=-1 inner)</li>
                <li>• <strong>Wave Effect:</strong> sin(r×50) vertical offset</li>
                <li>• <strong>Ellipse Ratio:</strong> 200×70 (wider than tall)</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-neutral-900 rounded border border-neutral-700">
              <p className="text-sm text-neutral-400 italic">
                "Bunny Ear Cactus is so cute 😍" - Original sketch by TKt (rainsr7235)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
