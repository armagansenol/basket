import BikeStatusCard from "@/components/bike-status-card";

export default function BikeStatusCardPage() {
  return (
    <div className="min-h-screen bg-[#e9e9e9] px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900">Bike Status Card</h1>
          <p className="mt-2 text-neutral-600">
            Clean status panel with bike preview, metrics, battery progress and direction dial.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <BikeStatusCard />
        </div>
      </div>
    </div>
  );
}
