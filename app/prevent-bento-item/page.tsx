import PreventBentoItem from "@/components/prevent-bento-item";

export default function PreventBentoItemPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-neutral-900">Prevent Bento Item</h1>
            <p className="text-neutral-600">
              A bento grid card with WebGL shader-based ripple animation.
            </p>
          </div>

          <div className="bg-neutral-100 p-12 rounded-lg flex items-center justify-center">
            <PreventBentoItem />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Features</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong className="text-cyan-600">WebGL Shader Animation</strong> - Real-time ripple effect</li>
                <li>• <strong className="text-cyan-600">Light Theme</strong> - Modern clean aesthetic</li>
                <li>• <strong className="text-cyan-600">Alert Badges</strong> - Warning indicators</li>
                <li>• <strong className="text-cyan-600">Shield Icon</strong> - Central security visual</li>
                <li>• <strong className="text-cyan-600">Interactive Controls</strong> - Menu and play button</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Technical Details</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong>WebGL</strong> - Hardware-accelerated rendering</li>
                <li>• <strong>GLSL Shaders</strong> - Custom fragment shader for ripples</li>
                <li>• <strong>Animation</strong> - Smooth 60fps continuous animation</li>
                <li>• <strong>Blending</strong> - Screen blend mode for overlay effect</li>
                <li>• <strong>Performance</strong> - Optimized for low GPU usage</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3 text-neutral-900">Shader Implementation</h2>
            <p className="text-neutral-700 mb-4">
              The ripple effect is created using WebGL fragment shaders with sine waves emanating from the center.
              Multiple overlapping ripples with different phases create a dynamic, organic animation that fades
              towards the edges.
            </p>
            <div className="bg-neutral-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre className="text-cyan-400">{`// Fragment shader excerpt
float ripple1 = sin((dist - u_time * 0.3) * 15.0);
float ripple2 = sin((dist - u_time * 0.3 + 0.5) * 15.0);
float ripple3 = sin((dist - u_time * 0.3 + 1.0) * 15.0);`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
