"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const frames = Array.from({ length: 8 }, (_, i) => `/imagegen/running-right/frames/frame-${String(i + 1).padStart(2, "0")}.png`);

export default function BloodborneRunnerPreview() {
  const [frame, setFrame] = useState(0);
  const currentSrc = useMemo(() => frames[frame], [frame]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 90);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="rounded-lg border border-zinc-800 bg-black/50 p-4">
      <div className="mx-auto w-full max-w-[240px]">
        <Image
          src={currentSrc}
          alt={`Bloodborne running frame ${frame + 1}`}
          width={1024}
          height={1536}
          className="h-auto w-full object-contain"
          priority
        />
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900" />
      <p className="mt-2 text-center text-xs text-zinc-400">Animated preview ({frame + 1}/8)</p>
    </div>
  );
}
