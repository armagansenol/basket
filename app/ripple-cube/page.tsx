import RippleCube from "@/components/ripple-cube";

export default function RippleCubePage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-neutral-900">Ripple Cube</h1>
            <p className="text-neutral-600">
              Interactive GLSL shader with rotating 3D cube and ripple wave effects.
            </p>
          </div>

          <div className="bg-black rounded-lg overflow-hidden">
            <RippleCube />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Interaction</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong className="text-purple-400">Click/Touch</strong> - Create ripple waves</li>
                <li>• <strong className="text-purple-400">Multiple Waves</strong> - Up to 20 simultaneous ripples</li>
                <li>• <strong className="text-purple-400">Watch</strong> - Cube rotates continuously</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Visual Elements</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong>3D Cube</strong> - Rotating with directional lighting</li>
                <li>• <strong>Wave Effects</strong> - Shader-based ripple distortion</li>
                <li>• <strong>Film Grain</strong> - Procedural noise overlay</li>
                <li>• <strong>Warm Tint</strong> - Subtle yellow color shift</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3 text-neutral-900">Technical Implementation</h2>
            <p className="text-neutral-700 mb-4">
              Built with p5.js WEBGL mode and custom GLSL shaders. The ripple effect is achieved through
              vertex displacement in the fragment shader, calculating wave propagation from click points.
              Each wave has a lifetime of 500 frames and uses exponential decay for amplitude. The cube
              is rendered to an offscreen buffer with Phong lighting, then composited with the shader effect.
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-900">Shader Features:</h3>
              <ul className="text-sm text-neutral-700 space-y-1 ml-4">
                <li>• <strong>Custom GLSL:</strong> Vertex + Fragment shaders</li>
                <li>• <strong>Wave Propagation:</strong> Radial sine wave from click point</li>
                <li>• <strong>Amplitude Decay:</strong> exp(-time/40) × 0.05/distance</li>
                <li>• <strong>Phase Calculation:</strong> length(v) × 80 - speed × time</li>
                <li>• <strong>Texture Distortion:</strong> UV shift based on wave normal</li>
                <li>• <strong>Grain Effect:</strong> 15% alpha blend with pseudorandom</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-900">Lighting Setup:</h3>
              <ul className="text-sm text-neutral-700 space-y-1 ml-4">
                <li>• <strong>Directional Light:</strong> (1, 1, -1) direction</li>
                <li>• <strong>Ambient Light:</strong> 0.5 intensity</li>
                <li>• <strong>Phong Shading:</strong> Diffuse + Specular components</li>
                <li>• <strong>Diffuse Factor:</strong> 0.73</li>
                <li>• <strong>Specular Factor:</strong> 2.0</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-900">Wave Parameters:</h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-neutral-700">
                <div><strong>Max Waves:</strong> 20</div>
                <div><strong>Lifetime:</strong> 500 frames</div>
                <div><strong>Speed:</strong> 1/5 (0.2)</div>
                <div><strong>Phase Multiplier:</strong> 80</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
