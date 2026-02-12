import MetaballBlobs from "@/components/metaball-blobs";

export default function MetaballBlobsPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">Metaball Blobs</h1>
            <p className="text-neutral-400">
              Physics-based metaballs with custom GLSL shaders and sphere-mapped reflections.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden" style={{ background: "#faf8e2" }}>
            <MetaballBlobs />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Interaction</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong className="text-purple-400">Click</strong> - Add new random blob</li>
                <li>• <strong className="text-purple-400">Watch</strong> - Blobs fall and collide with physics</li>
                <li>• <strong className="text-purple-400">Merge</strong> - Metaballs smooth-blend together</li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Visual Features</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong>Sphere Mapping</strong> - Environment reflections</li>
                <li>• <strong>Smooth Union</strong> - Metaball blending shader</li>
                <li>• <strong>Phong Lighting</strong> - Directional light + normal mapping</li>
                <li>• <strong>Dynamic Springs</strong> - Blob cohesion</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <h2 className="text-xl font-semibold mb-3 text-white">Technical Implementation</h2>
            <p className="text-neutral-300 mb-4">
              Complex physics simulation using Matter.js with custom GLSL metaball shaders. Each blob consists
              of multiple physics nodes connected by dynamic spring constraints. Spatial binning optimizes
              collision detection. The metaball effect is achieved through smooth minimum (opSmoothUnion) in
              the fragment shader, calculating signed distance fields from all blob nodes. Environment mapping
              uses sphere-map reflections based on surface normals.
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Physics System:</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>Engine:</strong> Matter.js 2D physics</li>
                <li>• <strong>Blob Nodes:</strong> Circle bodies (radius 15px)</li>
                <li>• <strong>Node Spacing:</strong> Area-based distribution (20px size)</li>
                <li>• <strong>Spring Stiffness:</strong> 0.02-0.03 (distance-based)</li>
                <li>• <strong>Spring Damping:</strong> 0.001</li>
                <li>• <strong>Spatial Binning:</strong> 80px grid for optimization</li>
                <li>• <strong>Boundaries:</strong> Ground + left/right walls</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Shader Details:</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>Smooth Union:</strong> h = clamp(0.5 + 0.5×(d2-d1)/k, 0, 1)</li>
                <li>• <strong>SDF Calculation:</strong> Distance from all nodes with smooth blend</li>
                <li>• <strong>Normal Mapping:</strong> Cross product of position derivatives</li>
                <li>• <strong>Reflection Vector:</strong> Computed from camera ray + normal</li>
                <li>• <strong>Sphere Map Coords:</strong> Phi/theta from reflection vector</li>
                <li>• <strong>Lighting:</strong> Directional (-0.3, 0.9, 0) + ambient (0.85)</li>
                <li>• <strong>Data Texture:</strong> 20×20 texture storing node positions</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Default Blob Colors:</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#f3e17e" }}></div>
                  <span className="text-sm text-neutral-300">Yellow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#dd483c" }}></div>
                  <span className="text-sm text-neutral-300">Red</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#4b8a5f" }}></div>
                  <span className="text-sm text-neutral-300">Green</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ background: "#0d150b" }}></div>
                  <span className="text-sm text-neutral-300">Dark</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
