import HeroElectronOrbit from "@/components/hero-electron-orbit";

export default function HeroElectronPage() {
  return (
    <div className="min-h-screen bg-neutral-200 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-neutral-900">Hero Electron Orbit</h1>
          <p className="text-neutral-700">
            Recreated layered electron hero animation with staggered rotating orbit elements and center dot.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-300 bg-neutral-950 p-12">
          <HeroElectronOrbit />
        </div>
      </div>
    </div>
  );
}
