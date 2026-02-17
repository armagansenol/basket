import PersonalityTest from "@/components/personality-test";

export default function PersonalityTestPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Personality Test</h1>
            <p className="text-neutral-600">
              Interactive radio input form with 2D metaball background that morphs based on selections.
            </p>
          </div>

          <div className="bg-neutral-100 p-12 rounded-lg flex items-center justify-center">
            <PersonalityTest />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong>Metaball Shader</strong> - WebGL-based morphing background</li>
                <li>• <strong>Dynamic Mapping</strong> - Metaballs follow selected options</li>
                <li>• <strong>Smooth Morphing</strong> - Real-time shape changes</li>
                <li>• <strong>Interactive</strong> - Click any option to change selection</li>
                <li>• <strong>Visual Feedback</strong> - Orange highlights for selections</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">How It Works</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• Each selected radio button acts as a metaball center</li>
                <li>• Shader calculates influence using 1/distance² formula</li>
                <li>• Threshold creates the blob surface</li>
                <li>• Soft glow extends beyond the main shape</li>
                <li>• Positions update in real-time on selection</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Metaball Algorithm</h2>
            <p className="text-neutral-700 mb-4">
              The metaball effect is achieved using the classic implicit surface equation where each
              point's influence is inversely proportional to the square of its distance. Multiple
              influence fields combine to create organic, blob-like shapes that merge seamlessly.
            </p>
            <div className="bg-neutral-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre className="text-cyan-400">{`// Metaball equation
for each point:
  influence = radius² / distance²
  sum += influence

surface = sum >= threshold`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
