"use client";

import type { CSSProperties } from "react";

const orbitItems = [
  { delay: "0s", tilt: "0deg" },
  { delay: "-0.4s", tilt: "-60deg" },
  { delay: "-0.8s", tilt: "-120deg" },
];

type OrbitStyle = CSSProperties & {
  "--start-angle": string;
  "--orbit-radius": string;
  "--tilt": string;
};

function OrbitLayer({ blurred = false }: { blurred?: boolean }) {
  return (
    <div className={`hero-electron-layer ${blurred ? "blur-[3px] opacity-70" : ""}`}>
      {orbitItems.map((item, index) => {
        const style: OrbitStyle = {
          animationDelay: item.delay,
          "--start-angle": "225deg",
          "--orbit-radius": "92px",
          "--tilt": item.tilt,
        };

        return (
          <div
            key={`${item.delay}-${index}`}
            style={style}
            className="hero-electron-item h-[17.5px] w-[37.5px]"
          />
        );
      })}

      <div className="hero-electron-center-dot" />
    </div>
  );
}

export default function HeroElectronOrbit() {
  return (
    <div className="hero-electron relative mx-auto mb-18 h-64 w-64">
      <OrbitLayer blurred />
      <OrbitLayer />
    </div>
  );
}
