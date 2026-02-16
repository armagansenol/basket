import Image from "next/image";
import BloodborneRunnerPreview from "@/components/bloodborne-runner-preview";

const sprites = [
  { file: "bloodborne-hunter-main-1.png", label: "Variant 1", selected: false },
  { file: "bloodborne-hunter-main-2.png", label: "Variant 2", selected: true },
  { file: "bloodborne-hunter-main-3.png", label: "Variant 3", selected: false },
  { file: "bloodborne-hunter-main-4.png", label: "Variant 4", selected: true },
];

export default function BloodborneSpriteShowcasePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_25%_20%,#2f2f36_0%,#16171c_45%,#0b0b0f_100%)] px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Game Asset Showcase</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Bloodborne-Style Main Character Sprites</h1>
          <p className="max-w-3xl text-sm text-zinc-300 sm:text-base">
            Generated concept sprites for a 2D platformer. Variants 2 and 4 are the selected outputs.
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          {sprites.map((sprite) => (
            <article
              key={sprite.file}
              className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium text-zinc-200">{sprite.label}</h2>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    sprite.selected
                      ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {sprite.selected ? "Selected" : "Generated"}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-black/40">
                <Image
                  src={`/imagegen/${sprite.file}`}
                  alt={sprite.label}
                  width={1024}
                  height={1536}
                  className="h-auto w-full object-contain"
                  priority={sprite.selected}
                />
              </div>

              <p className="mt-3 text-xs text-zinc-400">/imagegen/{sprite.file}</p>
            </article>
          ))}
        </section>

        <section className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-zinc-200">Running Right Spritesheet (8x1)</h2>
            <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300 ring-1 ring-emerald-500/30">
              New
            </span>
          </div>
          <BloodborneRunnerPreview />
          <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-black/40 p-2">
            <Image
              src="/imagegen/running-right/bloodborne-run-right-spritesheet-8x1.png"
              alt="Bloodborne run-right spritesheet"
              width={3072}
              height={576}
              className="h-auto min-w-[900px] max-w-none"
            />
          </div>
          <p className="text-xs text-zinc-400">/imagegen/running-right/bloodborne-run-right-spritesheet-8x1.png</p>
        </section>
      </div>
    </div>
  );
}
