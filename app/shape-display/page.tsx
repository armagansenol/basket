import ShapeDisplay from "@/components/shape-display";

export default function ShapeDisplayPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">Shape Display</h1>
            <p className="text-neutral-400">
              Loading and displaying shape.png from the public folder using p5.js.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden bg-white">
            <ShapeDisplay />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Features</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong className="text-purple-400">Image Loading</strong> - Loads from /public folder</li>
                <li>• <strong className="text-purple-400">Centered Display</strong> - Image positioned at canvas center</li>
                <li>• <strong className="text-purple-400">Error Handling</strong> - Graceful loading feedback</li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Technical Details</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong>Canvas:</strong> 800×800px</li>
                <li>• <strong>Background:</strong> White (#ffffff)</li>
                <li>• <strong>Image Mode:</strong> CENTER</li>
                <li>• <strong>Source:</strong> /public/shape.png</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <h2 className="text-xl font-semibold mb-3 text-white">Implementation</h2>
            <p className="text-neutral-300 mb-4">
              This component demonstrates basic image loading and display in p5.js. The image is loaded
              in the preload() function to ensure it's available before drawing begins. The image is
              centered on the canvas using imageMode(CENTER) and positioned at the canvas center point.
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">p5.js Functions Used:</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>loadImage():</strong> Loads image file with success/error callbacks</li>
                <li>• <strong>preload():</strong> Ensures image loads before setup runs</li>
                <li>• <strong>imageMode():</strong> Sets image drawing mode to CENTER</li>
                <li>• <strong>image():</strong> Draws the loaded image at specified position</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
