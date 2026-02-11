import Link from "next/link";
import { Mic, MousePointerClick, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Component Basket</h1>
          <p className="text-xl text-neutral-600">
            A collection of reusable components for building modern web applications.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/voice-recorder">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Mic className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Voice Recorder</h2>
              <p className="text-neutral-600">
                Audio recording component with playback controls.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/animated-cta-button">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <MousePointerClick className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Animated CTA Button</h2>
              <p className="text-neutral-600">
                Beautiful call-to-action button with hover effects.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/analytics-card">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Analytics Card</h2>
              <p className="text-neutral-600">
                Dashboard card with stats and multi-line chart.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <div className="p-6 border border-dashed rounded-lg bg-neutral-50 flex items-center justify-center">
            <div className="text-center text-neutral-400">
              <p className="text-sm">More components</p>
              <p className="text-sm">coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
