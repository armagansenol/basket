"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { ArrowUpRight, Clock3, MapPin, Zap } from "lucide-react";

const barCount = 28;
const filledBars = 8;

export default function BikeStatusCard() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const barStyles = useMemo(() => {
    return Array.from({ length: barCount }).map((_, i) => {
      if (hoverIndex === null) {
        return {
          scale: 1,
          color: i < filledBars ? "#171717" : "#e5e5e5",
        };
      }

      const distance = Math.abs(i - hoverIndex);
      const primary = Math.exp(-(distance * distance) / 8);
      const ripple = Math.exp(-(distance * distance) / 22) * Math.cos(distance * 2.4) * 0.08;
      const shrink = Math.max(0, primary * 0.62 + ripple);
      const glow = Math.max(0, 1 - distance / 8);

      const color = i < filledBars
        ? `hsl(${215 + glow * 20} 72% ${18 + glow * 18}%)`
        : `hsl(${214 + glow * 22} 22% ${89 - glow * 12}%)`;

      return {
        scale: Math.max(0.3, 1 - shrink),
        color,
      };
    });
  }, [hoverIndex]);

  const updateHoverIndex = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, x / rect.width));
    const index = ratio * (barCount - 1);
    setHoverIndex(index);
  };

  return (
    <div className="bike-card-float w-full max-w-[760px] rounded-[34px] border border-neutral-200 bg-[#f4f4f4] p-3 shadow-[0_14px_36px_rgba(0,0,0,0.08)] motion-reduce:animate-none">
      <div className="relative overflow-hidden rounded-[26px] border border-neutral-200 bg-[#efefef]">
        <span className="bike-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <div className="flex items-start justify-between border-b border-neutral-200 bg-[#f7f7f7] p-5">
          <div>
            <h2 className="text-[38px] font-semibold leading-none tracking-tight text-neutral-900">Cruiser ST</h2>
            <p className="mt-2 text-[18px] font-medium text-neutral-400">4729402043</p>
          </div>

          <div className="flex gap-2 pt-1">
            <InfoPill icon={<MapPin className="h-4 w-4" />} text="65km" />
            <InfoPill icon={<Clock3 className="h-4 w-4" />} text="42m" />
            <InfoPill icon={<Zap className="h-4 w-4" />} text="150w" />
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1.2fr]">
          <div className="border-r border-neutral-200 bg-[#f7f7f7] p-6">
            <div className="mx-auto max-w-[420px]">
              <BikeDrawing />
            </div>

            <div className="mt-7">
              <div
                className="group/bars relative flex items-end gap-[6px]"
                onMouseMove={updateHoverIndex}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {Array.from({ length: barCount }).map((_, i) => (
                  <span
                    key={i}
                    className="inline-flex origin-center items-end transition-transform duration-200 ease-out motion-reduce:transition-none"
                    style={{
                      transform: `scaleY(${barStyles[i].scale})`,
                      transitionDelay:
                        hoverIndex === null ? `${i * 10}ms` : `${Math.min(Math.abs(i - hoverIndex) * 18, 150)}ms`,
                    }}
                  >
                    <span
                      className="bike-bar-breathe h-14 w-2.5 rounded-full transition-[background-color,box-shadow] duration-300 motion-reduce:animate-none"
                      style={{
                        animationDelay: `${i * 55}ms`,
                        backgroundColor: barStyles[i].color,
                        boxShadow:
                          hoverIndex === null
                            ? "none"
                            : `0 0 ${6 + Math.max(0, 1 - Math.abs(i - hoverIndex) / 8) * 8}px rgba(96,165,250,0.35)`,
                      }}
                    />
                  </span>
                ))}

                <span className="absolute left-[19%] top-[-16px] rounded-full bg-white px-2 py-1 text-xs font-semibold text-neutral-700 shadow bike-badge-pulse motion-reduce:animate-none">
                  27%
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-7 bg-[#f3f3f3] p-6">
            <div className="bike-dial-spin relative flex h-52 w-52 items-center justify-center rounded-full border border-neutral-200 bg-[#f6f6f6] shadow-[inset_0_0_0_8px_#f1f1f1,inset_0_0_0_2px_#e7e7e7,0_10px_18px_rgba(0,0,0,0.06)] motion-reduce:animate-none">
              <span className="absolute right-11 top-11 h-8 w-1 rotate-[-42deg] rounded-full bg-neutral-500" />
              <ArrowUpRight className="h-12 w-12 text-neutral-500" strokeWidth={2.2} />
            </div>

            <span className="rounded-full border border-neutral-200 bg-[#f8f8f8] px-5 py-2 text-lg font-medium text-neutral-600 bike-badge-pulse motion-reduce:animate-none">
              15ft away
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="bike-pill-pulse inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-[#f2f2f2] px-3 py-1.5 text-sm font-semibold text-neutral-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] motion-reduce:animate-none">
      {icon}
      {text}
    </span>
  );
}

function BikeDrawing() {
  return (
    <svg viewBox="0 0 520 240" className="h-auto w-full">
      <circle cx="118" cy="165" r="68" fill="none" stroke="#2d2d2d" strokeWidth="10" className="bike-wheel-spin origin-[118px_165px] motion-reduce:animate-none" />
      <circle cx="398" cy="165" r="68" fill="none" stroke="#2d2d2d" strokeWidth="10" className="bike-wheel-spin origin-[398px_165px] motion-reduce:animate-none" />
      <circle cx="257" cy="161" r="22" fill="none" stroke="#2d2d2d" strokeWidth="10" />

      <path d="M118 165 L193 85 L300 85 L257 161 L165 161 Z" fill="none" stroke="#232323" strokeWidth="11" />
      <path d="M257 161 L337 161 L398 165" fill="none" stroke="#232323" strokeWidth="10" />
      <path d="M300 85 L332 60" fill="none" stroke="#232323" strokeWidth="10" />
      <path d="M332 60 L350 60" fill="none" stroke="#232323" strokeWidth="10" />
      <path d="M188 84 L168 56 L194 56" fill="none" stroke="#232323" strokeWidth="10" />

      <rect x="337" y="48" width="8" height="36" rx="4" fill="#232323" />
      <rect x="185" y="42" width="8" height="40" rx="4" fill="#232323" />

      <g className="bike-wheel-spin origin-[118px_165px] motion-reduce:animate-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 20;
          const lx = 118 + Math.cos(angle) * 62;
          const ly = 165 + Math.sin(angle) * 62;
          return <line key={`l-${i}`} x1={118} y1={165} x2={lx} y2={ly} stroke="#606060" strokeWidth="2" />;
        })}
      </g>

      <g className="bike-wheel-spin origin-[398px_165px] motion-reduce:animate-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 20;
          const rx = 398 + Math.cos(angle) * 62;
          const ry = 165 + Math.sin(angle) * 62;
          return <line key={`r-${i}`} x1={398} y1={165} x2={rx} y2={ry} stroke="#606060" strokeWidth="2" />;
        })}
      </g>
    </svg>
  );
}
