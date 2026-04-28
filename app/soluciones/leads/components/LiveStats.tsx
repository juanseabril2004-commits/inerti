"use client";

import type { DemoMode } from "../data";

interface Props {
  demoMode: DemoMode;
}

export default function LiveStats({ demoMode }: Props) {
  const isAi = demoMode === "ai";

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] px-6 py-4 backdrop-blur-[12px]">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-lg">{isAi ? "🎯" : "⚠️"}</span>
        <span className="font-[family-name:var(--font-barlow)] font-bold text-[#3b82f6]">{isAi ? "+32" : "14"}</span>
        <span className="text-[#7a8ba5]">{isAi ? "leads capturados hoy" : "leads sin clasificar"}</span>
      </div>
      <div className="hidden h-6 w-px bg-white/[0.06] md:block" />
      <div className="flex items-center gap-2 text-sm">
        <span className="text-lg">⚡</span>
        <span className="font-[family-name:var(--font-barlow)] font-bold text-[#3b82f6]">{isAi ? "<5s" : "48h"}</span>
        <span className="text-[#7a8ba5]">tiempo de calificación</span>
      </div>
      <div className="hidden h-6 w-px bg-white/[0.06] md:block" />
      <div className="flex items-center gap-2 text-sm">
        <span className="text-lg">{isAi ? "✅" : "❌"}</span>
        <span className="font-[family-name:var(--font-barlow)] font-bold text-[#3b82f6]">{isAi ? "0" : "5"}</span>
        <span className="text-[#7a8ba5]">leads perdidos</span>
      </div>
    </div>
  );
}
