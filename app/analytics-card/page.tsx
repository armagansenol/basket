import AnalyticsCard from "@/components/analytics-card";

export default function AnalyticsCardPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Analytics Card</h1>
            <p className="text-neutral-600">
              A beautiful dashboard card with stats and multi-line chart visualization.
            </p>
          </div>

          <div className="bg-neutral-800 p-12 rounded-lg flex items-center justify-center">
            <AnalyticsCard />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Design Features</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong>Gradient border</strong> - Colorful top accent</li>
                <li>• <strong>Dark theme</strong> - Modern dashboard aesthetic</li>
                <li>• <strong>Avatar group</strong> - Team member indicators</li>
                <li>• <strong>Stats display</strong> - Multiple metrics with trends</li>
                <li>• <strong>Multi-line chart</strong> - Data visualization</li>
                <li>• <strong>Interactive elements</strong> - Menu and toggle buttons</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Components</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>• <strong>Header</strong> - Three dots menu, avatars, toggle</li>
                <li>• <strong>Metrics</strong> - Scone (356 +32%), Started (64), Completed (192)</li>
                <li>• <strong>Chart</strong> - SVG-based line chart with 3 data series</li>
                <li>• <strong>Timeline</strong> - Date labels from Nov to Feb</li>
                <li>• <strong>Indicator</strong> - Time marker with label</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Use Cases</h2>
            <p className="text-neutral-700 mb-4">
              Perfect for dashboards, analytics pages, and data visualization interfaces. The card displays
              key metrics with trend indicators and historical data in an easy-to-read format.
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li>• Project management dashboards</li>
              <li>• Sales and revenue tracking</li>
              <li>• User engagement metrics</li>
              <li>• Performance monitoring</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
