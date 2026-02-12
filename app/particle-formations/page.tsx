import ParticleFormations from "@/components/particle-formations";

export default function ParticleFormationsPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">Particle Formations</h1>
            <p className="text-neutral-400">
              1000 particles morphing between mathematical formations with smooth steering behavior.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden" style={{ background: "#0a0a1e" }}>
            <ParticleFormations />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Interaction</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong className="text-purple-400">Click Anywhere</strong> - Cycle to next formation</li>
                <li>• <strong className="text-purple-400">6 Formations</strong> - Spiral, Flower, Lissajous, Circle, Heart, Bezier</li>
                <li>• <strong className="text-purple-400">Smooth Transitions</strong> - Particles steer towards targets</li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Visual Features</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong>1000 Particles</strong> - White dots of varying sizes</li>
                <li>• <strong>Trail Effect</strong> - Semi-transparent background</li>
                <li>• <strong>Speed Fading</strong> - Alpha based on velocity</li>
                <li>• <strong>Responsive</strong> - Adapts to window size</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <h2 className="text-xl font-semibold mb-3 text-white">Technical Implementation</h2>
            <p className="text-neutral-300 mb-4">
              A particle system demonstrating autonomous agent steering behavior and mathematical curve
              generation. Each particle uses arrival behavior (Reynolds steering) to smoothly approach its
              target position in the current formation. The system cycles through six different mathematical
              patterns, each defined by parametric equations.
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Formation Patterns:</h3>
              <ul className="text-sm text-neutral-300 space-y-2 ml-4">
                <li>
                  • <strong>Spiral:</strong><br/>
                  <span className="text-neutral-400 ml-2">
                    Archimedean spiral with 5 complete rotations. Angle and radius both increase linearly
                    with particle index. Formula: r = (i/n) × maxRadius, θ = (i/n) × 10π
                  </span>
                </li>
                <li>
                  • <strong>Flower (Rose Curve):</strong><br/>
                  <span className="text-neutral-400 ml-2">
                    8-petaled rose using polar equation r = sin(4θ). Creates symmetric petal pattern
                    around center. Formula: x = sin(4θ)cos(θ), y = sin(4θ)sin(θ)
                  </span>
                </li>
                <li>
                  • <strong>Lissajous Curve:</strong><br/>
                  <span className="text-neutral-400 ml-2">
                    Parametric curve with random frequency ratios (a, b) and phase shift (δ).
                    Formula: x = sin(aθ + δ), y = sin(bθ)
                  </span>
                </li>
                <li>
                  • <strong>Circle:</strong><br/>
                  <span className="text-neutral-400 ml-2">
                    Simple circular distribution. Formula: x = r×cos(θ), y = r×sin(θ)
                  </span>
                </li>
                <li>
                  • <strong>Heart:</strong><br/>
                  <span className="text-neutral-400 ml-2">
                    Cardioid curve using parametric heart equation. Formula: x = 16sin³(θ),
                    y = 13cos(θ) - 5cos(2θ) - 2cos(3θ) - cos(4θ)
                  </span>
                </li>
                <li>
                  • <strong>Bezier Curve:</strong><br/>
                  <span className="text-neutral-400 ml-2">
                    Cubic Bezier with random control points. Formula: B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Steering Behavior (Arrival):</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>Desired Velocity:</strong> Vector from current position to target</li>
                <li>• <strong>Speed Reduction:</strong> Slows down when within 100px of target</li>
                <li>• <strong>Steering Force:</strong> desired - current velocity</li>
                <li>• <strong>Force Limits:</strong> maxForce = 1.0, maxSpeed = 10.0</li>
                <li>• <strong>Smooth Motion:</strong> Velocity and force accumulation with limits</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Visual Effects:</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>Particle Size:</strong> Random between 1-3 pixels</li>
                <li>• <strong>Background:</strong> RGB(10, 10, 30) with alpha 50 for trail effect</li>
                <li>• <strong>Alpha Mapping:</strong> speed 0-10 → alpha 50-255</li>
                <li>• <strong>Frame Rate:</strong> Unlimited (browser dependent)</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Performance:</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>Particle Count:</strong> 1000 agents</li>
                <li>• <strong>Per Frame:</strong> 1000 vector calculations + 1000 draw calls</li>
                <li>• <strong>Optimization:</strong> Simple particle system, no collision detection</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-neutral-900 rounded border border-neutral-700">
              <p className="text-sm text-neutral-400 italic">
                Demonstrates autonomous agent behavior and mathematical curve generation through
                Reynolds steering algorithms
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
