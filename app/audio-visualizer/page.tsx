import AudioVisualizer from "@/components/audio-visualizer";

export default function AudioVisualizerPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-neutral-900">Audio Visualizer</h1>
            <p className="text-neutral-600">
              Radial arc visualization that reacts to bass and treble frequencies.
            </p>
          </div>

          <div className="bg-neutral-100 p-8 rounded-lg">
            <AudioVisualizer />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Animation</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong className="text-purple-400">Automatic</strong> - Plays continuously on load</li>
                <li>• <strong className="text-purple-400">Simulated Data</strong> - Bass and treble frequencies</li>
                <li>• <strong className="text-purple-400">Dynamic</strong> - Radial arcs react to generated values</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Features</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong>Procedural Animation</strong> - Noise-based simulation</li>
                <li>• <strong>Bass Arcs</strong> - 40 concentric arcs (pink→red)</li>
                <li>• <strong>Treble Arcs</strong> - 60 concentric arcs (purple→pink)</li>
                <li>• <strong>Dynamic Colors</strong> - HSB color mapping</li>
                <li>• <strong>Smooth Animation</strong> - 60fps rendering</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3 text-neutral-900">Technical Details</h2>
            <p className="text-neutral-700">
              Built with p5.js. Simulates bass and treble frequency data using sine waves and Perlin noise
              to create realistic audio-reactive patterns. The visualization maps simulated frequencies to
              radial arc patterns that expand and contract rhythmically. Each arc's color, stroke weight,
              and angle are dynamically calculated based on the generated data values.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
