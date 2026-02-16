import MyTasksCard from "@/components/my-tasks-card";

export default function MyTasksPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#f5f5f5_0%,#ededed_45%,#e5e5e5_100%)] px-4 py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <MyTasksCard />
      </div>
    </div>
  );
}
