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
        <span className="text-lg">{isAi ? "📨" : "⚠️"}</span>
        <span className="font-[family-name:var(--font-barlow)] font-bold text-[#3b82f6]">{isAi ? "+847" : "47"}</span>
        <span className="text-[#7a8ba5]">{isAi ? "emails clasificados hoy" : "emails sin leer"}</span>
      </div>
      <div className="hidden h-6 w-px bg-white/[0.06] md:block" />
      <div className="flex items-center gap-2 text-sm">
        <span className="text-lg">⚡</span>
        <span className="font-[family-name:var(--font-barlow)] font-bold text-[#3b82f6]">{isAi ? "<3s" : "24h"}</span>
        <span className="text-[#7a8ba5]">tiempo de clasificación</span>
      </div>
      <div className="hidden h-6 w-px bg-white/[0.06] md:block" />
      <div className="flex items-center gap-2 text-sm">
        <span className="text-lg">{isAi ? "🎯" : "❌"}</span>
        <span className="font-[family-name:var(--font-barlow)] font-bold text-[#3b82f6]">{isAi ? "0" : "8"}</span>
        <span className="text-[#7a8ba5]">urgencias perdidas</span>
      </div>
    </div>
  );
}
