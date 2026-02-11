import AnimatedCTAButton from "@/components/animated-cta-button";

export default function AnimatedCTAButtonPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Animated CTA Button</h1>
            <p className="text-neutral-600">
              A beautiful call-to-action button with hover animations and icon.
            </p>
          </div>

          <div className="bg-white p-16 rounded-lg shadow-sm flex items-center justify-center">
            <AnimatedCTAButton />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Design Features</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong>Emerald green</strong> - Vibrant, eye-catching color</li>
                <li>• <strong>Pill shape</strong> - Fully rounded corners</li>
                <li>• <strong>Icon with divider</strong> - Clean separation with chevron</li>
                <li>• <strong>Soft shadow</strong> - Elevated appearance</li>
                <li>• <strong>Hover effects</strong> - Smooth transitions</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Variants</h2>
              <div className="space-y-4">
                <div>
                  <AnimatedCTAButton text="Get started" />
                </div>
                <div>
                  <AnimatedCTAButton text="Learn more" />
                </div>
                <div>
                  <AnimatedCTAButton text="Start selling" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Usage</h2>
            <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`<AnimatedCTAButton
  text="Start selling"
  onClick={() => console.log('Clicked!')}
/>`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
