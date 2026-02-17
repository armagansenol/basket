import RaceTrack3D from "@/components/race-track-3d";

export default function RaceTrackPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-neutral-900">Race Track</h1>
            <p className="text-neutral-600">
              Animated racing visualization with curved lanes and colorful spheres.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <RaceTrack3D />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Features</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong className="text-purple-400">Canvas Animation</strong> - Smooth 60fps rendering</li>
                <li>• <strong className="text-purple-400">Curved Lanes</strong> - Bezier curve paths</li>
                <li>• <strong className="text-purple-400">Racing Spheres</strong> - 5 colored racers</li>
                <li>• <strong className="text-purple-400">Glow Effects</strong> - Radial gradients</li>
                <li>• <strong className="text-purple-400">Starfield</strong> - Animated background</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Racers</h2>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                  <span>Orange - Speed: Fast</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                  <span>Green - Speed: Medium</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                  <span>Pink - Speed: Very Fast</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span>Blue - Speed: Fast</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                  <span>Purple - Speed: Medium</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3 text-neutral-900">Implementation</h2>
            <p className="text-neutral-700 mb-4">
              The race track uses Canvas 2D API with cubic Bezier curves to create the curved racing lanes.
              Each racer follows its lane path with different speeds, creating a dynamic racing animation.
              Radial gradients provide glow effects for depth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
