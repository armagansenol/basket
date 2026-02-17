import AsciiBlobs from "@/components/ascii-blobs";

export default function AsciiBlobsPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-neutral-900">ASCII Blobs</h1>
            <p className="text-neutral-600">
              Animated typewriter art with morphing metaball fields and ASCII characters.
            </p>
          </div>

          <div className="bg-neutral-100 p-8 rounded-lg">
            <AsciiBlobs />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Interaction</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong className="text-purple-400">Click Canvas</strong> - Restart with new blob positions</li>
                <li>• <strong className="text-purple-400">Watch</strong> - Blobs drift and morph continuously</li>
                <li>• <strong className="text-purple-400">Random Glitches</strong> - 0.5% chance per character</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Visual Elements</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong>80×80 Grid</strong> - Character field resolution</li>
                <li>• <strong>10 Blobs</strong> - Metaball field sources</li>
                <li>• <strong>Decorative Frame</strong> - "=" and "l" border characters</li>
                <li>• <strong>Georgia Font</strong> - Classic typewriter aesthetic</li>
                <li>• <strong>Cream Background</strong> - #F8F8DD vintage paper</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3 text-neutral-900">Technical Details</h2>
            <p className="text-neutral-700 mb-4">
              Based on 'ascii-blobs' by @cartocopia, combining "Morph" 🐙 and "Typewriter Art" ⌨ themes.
              Uses metaball field calculations where each blob contributes to a summed intensity field across
              the grid. Character selection is threshold-based: higher intensities show denser characters
              (@, %, #, +, ∙) while lower values remain empty space. Each blob has random drift rotation
              and constrained movement within grid bounds.
            </p>
            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-900">ASCII Character Mapping:</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm text-neutral-700 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">@</span>
                  <span>&gt; 11×blobs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">%</span>
                  <span>&gt; 10.5×blobs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">#</span>
                  <span>&gt; 10×blobs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">+</span>
                  <span>&gt; 9.5×blobs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">∙</span>
                  <span>&gt; 9×blobs</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-neutral-100 rounded border border-neutral-200">
              <p className="text-sm text-neutral-600 italic">
                "Check out the Birb's Nest Discord" - Original sketch by @cartocopia (2025-03-29)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
