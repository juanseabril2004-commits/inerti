"use client";

import type { DemoMode } from "../data";

interface Props {
  demoMode: DemoMode;
  onToggle: (mode: DemoMode) => void;
}

export default function DemoModeToggle({ demoMode, onToggle }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => onToggle("ai")}
        className={`relative flex items-center gap-2 overflow-hidden rounded-lg border px-5 py-3 font-semibold text-sm transition-all hover:-translate-y-0.5 ${
          demoMode === "ai"
            ? "border-[#8b5cf6] bg-gradient-to-br from-violet-500/20 to-purple-500/15 text-white shadow-[0_4px_16px_rgba(139,92,246,0.15)]"
            : "border-white/[0.06] bg-white/[0.03] text-[#7a8ba5] hover:border-white/[0.12] hover:bg-white/[0.05]"
        }`}
      >
        <span>✅</span>
        <span>Con INERTI</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium">IA Activa</span>
      </button>
      <button
        onClick={() => onToggle("traditional")}
        className={`relative flex items-center gap-2 overflow-hidden rounded-lg border px-5 py-3 font-semibold text-sm transition-all hover:-translate-y-0.5 ${
          demoMode === "traditional"
            ? "border-red-500 bg-gradient-to-br from-red-500/15 to-red-500/10 text-white shadow-[0_4px_16px_rgba(239,68,68,0.15)]"
            : "border-white/[0.06] bg-white/[0.03] text-[#7a8ba5] hover:border-white/[0.12] hover:bg-white/[0.05]"
        }`}
      >
        <span>❌</span>
        <span>Sin IA</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium">Gestión manual</span>
      </button>
    </div>
  );
}
