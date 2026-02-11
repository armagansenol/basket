"use client";

import { ChevronRight } from "lucide-react";

interface AnimatedCTAButtonProps {
  text?: string;
  onClick?: () => void;
}

export default function AnimatedCTAButton({
  text = "Start selling",
  onClick,
}: AnimatedCTAButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center gap-3 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 overflow-hidden"
      style={{
        boxShadow: '0 8px 16px -4px rgba(16, 185, 129, 0.4), 0 4px 8px -2px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Glassmorphism overlay */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 60%)',
        }}
      />

      <span className="relative z-10 text-base font-semibold text-gray-900">
        {text}
      </span>

      <div className="relative z-10 h-6 w-px bg-gray-900/20" />

      <div className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-gray-900/10 group-hover:bg-gray-900/15 transition-colors">
        <ChevronRight className="w-4 h-4 text-gray-900 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </button>
  );
}
