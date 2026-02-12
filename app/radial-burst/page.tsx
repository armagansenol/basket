import RadialBurst from "@/components/radial-burst";

export default function RadialBurstPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">Radial Burst</h1>
            <p className="text-neutral-400">
              Generative art with radial point distribution and asymmetric density.
            </p>
          </div>

          <div className="bg-neutral-900 p-8 rounded-lg">
            <RadialBurst />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Pattern</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong className="text-purple-400">12 Layers</strong> - Concentric rings of points</li>
                <li>• <strong className="text-purple-400">Random Distribution</strong> - Power-based density</li>
                <li>• <strong className="text-purple-400">Asymmetric</strong> - Angle-dependent variation</li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Features</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong>Static Generation</strong> - Rendered once on load</li>
                <li>• <strong>Radial Symmetry</strong> - Circular burst pattern</li>
                <li>• <strong>Density Gradient</strong> - From outer to inner rings</li>
                <li>• <strong>Dark Aesthetic</strong> - Minimal black background</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <h2 className="text-xl font-semibold mb-3 text-white">Technical Details</h2>
            <p className="text-neutral-300">
              Built with p5.js. Uses polar coordinates and power distribution to create organic-looking
              radial patterns. Each point's radius is calculated using a power function with random values,
              creating denser clusters toward the center. The pattern includes asymmetry based on the angle
              relative to π, adding visual interest and directionality to the burst.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
