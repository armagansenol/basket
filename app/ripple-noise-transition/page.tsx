import RippleNoiseTransition from "@/components/ripple-noise-transition";

export default function RippleNoiseTransitionPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_15%,#f5f5f5_0%,#e8e8e8_45%,#dedede_100%)] px-4 py-10 text-zinc-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">WebGPU Shader Demo</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Ripple + Noise Image Transition</h1>
          <p className="max-w-3xl text-sm text-zinc-700 sm:text-base">
            A TSL-based shader transition between two images. A radial ripple front drives the wipe,
            while animated noise adds turbulent distortion around the edge.
          </p>
        </header>

        <RippleNoiseTransition imageA="/img/t-1.jpg" imageB="/img/t-2.jpg" />

        <section className="rounded-xl border border-zinc-200 bg-white/80 p-5 text-sm text-zinc-700">
          <p>
            This transition is fully automatic and always expands from the center to the outer edge,
            looping continuously between image A and image B.
          </p>
        </section>
      </div>
    </div>
  );
}
