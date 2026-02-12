import TypewriterPoem from "@/components/typewriter-poem";

export default function TypewriterPoemPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">Typewriter Poem</h1>
            <p className="text-neutral-400">
              Flowing typewriter art displaying Yeats' "The Second Coming" with noise-based typography.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden" style={{ background: "#FBF6EE" }}>
            <TypewriterPoem />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Animation</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong className="text-purple-400">Flowing Motion</strong> - Continuous Perlin noise animation</li>
                <li>• <strong className="text-purple-400">Wave Pattern</strong> - Flame-like vertical gradient</li>
                <li>• <strong className="text-purple-400">Dynamic Sizing</strong> - Text size varies with noise</li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Visual Style</h2>
              <ul className="space-y-2 text-neutral-300">
                <li>• <strong>Monospace Font</strong> - Bold Courier typewriter aesthetic</li>
                <li>• <strong>Beige Background</strong> - #FBF6EE vintage paper</li>
                <li>• <strong>Grid Layout</strong> - 6px horizontal, 12px vertical spacing</li>
                <li>• <strong>Size Range</strong> - Dynamic from small to large</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <h2 className="text-xl font-semibold mb-3 text-white">The Poem</h2>
            <div className="mb-4 p-4 bg-neutral-900 rounded border border-neutral-700">
              <p className="text-neutral-300 italic mb-2">
                "The Second Coming" by William Butler Yeats (First Stanza):
              </p>
              <div className="text-sm text-neutral-400 space-y-2 font-serif">
                <p>Turning and turning in the widening gyre</p>
                <p>The falcon cannot hear the falconer;</p>
                <p>Things fall apart; the centre cannot hold;</p>
                <p>Mere anarchy is loosed upon the world,</p>
                <p>The blood-dimmed tide is loosed, and everywhere</p>
                <p>The ceremony of innocence is drowned;</p>
                <p>The best lack all conviction, while the worst</p>
                <p>Are full of passionate intensity.</p>
              </div>
            </div>

            <h3 className="font-semibold mb-2 text-white">Technical Implementation:</h3>
            <p className="text-neutral-300 mb-4">
              Created for #WCCChallenge "Typewriter Art" theme. Uses 3D Perlin noise to determine
              character sizes across a grid. Each character's size is calculated based on noise value
              at its position, with a vertical gradient (flaming) threshold that creates larger text
              at the top and smaller at the bottom, producing a flowing, flame-like visual effect.
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Noise Parameters:</h3>
              <ul className="text-sm text-neutral-300 space-y-1 ml-4">
                <li>• <strong>X Scale:</strong> 1/50 (horizontal smoothness)</li>
                <li>• <strong>Y Scale:</strong> 1/100 (vertical smoothness)</li>
                <li>• <strong>Time Scale:</strong> frameCount / 20 (animation speed)</li>
                <li>• <strong>Threshold (flaming):</strong> map(y, height, 0, 0.2, 0.8)</li>
                <li>• <strong>Small Size:</strong> noise × width/36</li>
                <li>• <strong>Large Size:</strong> noise × width/18</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">Grid Specifications:</h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-neutral-300">
                <div><strong>Horizontal Step:</strong> 6px</div>
                <div><strong>Vertical Step:</strong> 12px</div>
                <div><strong>Margin:</strong> 10px from edges</div>
                <div><strong>Character Loop:</strong> Poem repeats cyclically</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
