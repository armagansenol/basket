import PaletteGenerator from "@/components/palette-generator";

export default function PaletteGeneratorPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-neutral-900">Palette Generator 🎨</h1>
            <p className="text-neutral-600">
              Interactive color palette generator using HSB color space and gradient sampling.
            </p>
          </div>

          <div className="bg-black rounded-lg overflow-hidden">
            <PaletteGenerator />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Controls</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong className="text-purple-400">Base Hue</strong> - Starting hue (0-360°)</li>
                <li>• <strong className="text-purple-400">Hue Offset</strong> - Gradient rotation (0-270)</li>
                <li>• <strong className="text-purple-400">Saturation</strong> - Color intensity (0-360)</li>
                <li>• <strong className="text-purple-400">Invert Button</strong> - Swap sampling coordinates</li>
                <li>• <strong className="text-purple-400">Copy Button</strong> - Copy hex codes to clipboard</li>
                <li>• <strong className="text-purple-400">Press Any Key</strong> - Toggle invert mode</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg border border-neutral-200">
              <h2 className="text-xl font-semibold mb-3 text-neutral-900">Visual Features</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong>360×360 Gradient</strong> - HSB color space visualization</li>
                <li>• <strong>8 Color Palette</strong> - Sampled along curve</li>
                <li>• <strong>Hex Codes</strong> - RGB hex format display</li>
                <li>• <strong>Preview Swatches</strong> - Labeled color samples</li>
                <li>• <strong>Stacked Display</strong> - Size-based arrangement</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg border border-neutral-200">
            <h2 className="text-xl font-semibold mb-3 text-neutral-900">Technical Implementation</h2>
            <p className="text-neutral-700 mb-4">
              Created for #genuary2025, day 16: "generative palette." Inspired by Greg Gunn's color palette
              article and @AaronReuland's Palette Generator 2.5. Uses HSB color mode (360°, 360, 360) to
              generate a gradient where each pixel's color is determined by its x/y coordinates. The gradient
              formula creates smooth transitions based on combined x+y offsets, allowing infinite color
              combinations from just three parameters.
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-900">Gradient Formula:</h3>
              <ul className="text-sm text-neutral-700 space-y-1 ml-4 font-mono">
                <li>• <strong>Hue:</strong> (baseHue + (x + y) × offset) % 360</li>
                <li>• <strong>Saturation:</strong> x × saturationMultiplier</li>
                <li>• <strong>Brightness:</strong> 360 - y</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-900">Sampling Pattern:</h3>
              <ul className="text-sm text-neutral-700 space-y-1 ml-4">
                <li>• <strong>8 Points:</strong> Sampled along quarter-circle arc</li>
                <li>• <strong>Arc Formula:</strong> i × HALF_PI / 9 (i = 1 to 8)</li>
                <li>• <strong>X Coordinate:</strong> -180 + 340 × cos(angle)</li>
                <li>• <strong>Y Coordinate:</strong> 180 - 340 × sin(angle)</li>
                <li>• <strong>Inverted:</strong> Swap cos/sin for different palette</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-900">UI Elements:</h3>
              <ul className="text-sm text-neutral-700 space-y-1 ml-4">
                <li>• <strong>Sliders:</strong> 360px width, real-time updates</li>
                <li>• <strong>Labels:</strong> Dynamic positioning, formatted values</li>
                <li>• <strong>Swatches:</strong> 8 labeled rectangles with hex codes</li>
                <li>• <strong>Gradient Display:</strong> Offscreen graphics (360×360)</li>
                <li>• <strong>Sampling Markers:</strong> Numbered circles on gradient</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-neutral-100 rounded border border-neutral-200">
              <p className="text-sm text-neutral-600 italic mb-2">
                Inspired by:
              </p>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Greg Gunn - "How to Make Your Own Color Palettes"</li>
                <li>• @AaronReuland - Palette Generator 2.5</li>
                <li>• #genuary2025 day 16 - "generative palette"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
