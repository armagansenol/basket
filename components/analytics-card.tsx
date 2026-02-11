"use client";

import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

export default function AnalyticsCard() {
  const chartData = [
    { date: "Nov 15", scone: 20, started: 15, completed: 10 },
    { date: "Dec 15", scone: 35, started: 25, completed: 30 },
    { date: "Jan 15", scone: 60, started: 45, completed: 55 },
    { date: "Feb 15", scone: 70, started: 55, completed: 75 },
  ];

  // Calculate path for each line
  const width = 320;
  const height = 80;
  const padding = 10;
  const maxValue = 80;

  const getPath = (dataKey: "scone" | "started" | "completed") => {
    const points = chartData.map((d, i) => {
      const x = padding + (i / (chartData.length - 1)) * (width - padding * 2);
      const y = height - padding - (d[dataKey] / maxValue) * (height - padding * 2);
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="w-full max-w-md">
      <div
        className="relative rounded-2xl overflow-hidden bg-neutral-900 p-5"
        style={{
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Gradient border at top */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: "linear-gradient(90deg, #f59e0b 0%, #3b82f6 50%, #a855f7 100%)",
          }}
        />

        {/* Rainbow gradient blur at top-right */}
        <div
          className="absolute top-0 right-0 w-64 h-32 opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle at center, #f59e0b 0%, #ec4899 25%, #8b5cf6 50%, #3b82f6 75%, transparent 100%)",
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {/* Three dots */}
          <button className="text-neutral-400 hover:text-neutral-300 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {/* Avatar group */}
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 border-2 border-neutral-900" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-neutral-900" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-neutral-900" />
          </div>

          {/* Toggle button */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors">
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-neutral-500" />
              <div className="w-1 h-1 rounded-full bg-neutral-500" />
              <div className="w-1 h-1 rounded-full bg-neutral-500" />
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs text-neutral-400">Scone</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">356</span>
              <span className="text-sm font-medium text-emerald-400">+32%</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs text-neutral-400">Started</span>
            </div>
            <div className="text-3xl font-bold text-white">64</div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-neutral-400">Completed</span>
            </div>
            <div className="text-3xl font-bold text-white">192</div>
          </div>
        </div>

        {/* Chart - Nested inset box */}
        <div
          className="relative rounded-xl p-4 -mx-1"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.4)',
          }}
        >
          <svg width="100%" height="100" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            {/* Blue line (Scone) */}
            <path
              d={getPath("scone")}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Orange/Red line (Started) */}
            <path
              d={getPath("started")}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Green line (Completed) */}
            <path
              d={getPath("completed")}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Cursor indicator at end */}
            <g transform={`translate(${width - padding}, ${height - padding - (75 / maxValue) * (height - padding * 2)})`}>
              <circle cx="0" cy="0" r="3" fill="#10b981" />
              <text
                x="8"
                y="4"
                fill="#10b981"
                fontSize="10"
                fontWeight="500"
              >
                7am
              </text>
            </g>
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2 px-2">
            {chartData.map((d) => (
              <span key={d.date} className="text-xs text-neutral-500">
                {d.date}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
