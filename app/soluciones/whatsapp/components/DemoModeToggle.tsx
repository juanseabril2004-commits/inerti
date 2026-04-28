"use client";

import { motion } from "motion/react";
import type { DemoMode } from "../hooks/useChatDemo";

interface DemoModeToggleProps {
  demoMode: DemoMode;
  onToggle: (mode: DemoMode) => void;
}

export default function DemoModeToggle({ demoMode, onToggle }: DemoModeToggleProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onToggle("ai")}
        className={`relative flex items-center gap-2 overflow-hidden rounded-xl border px-5 py-3 text-sm font-semibold transition-all ${
          demoMode === "ai"
            ? "border-[#3b82f6] bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/15 text-white shadow-[0_4px_16px_rgba(59,130,246,0.15)]"
            : "border-white/[0.06] bg-white/[0.03] text-[#7a8ba5] hover:border-white/[0.12] hover:bg-white/[0.05]"
        }`}
      >
        <span>✅</span>
        <span>Con INERTI</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium">
          IA Activa
        </span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onToggle("traditional")}
        className={`relative flex items-center gap-2 overflow-hidden rounded-xl border px-5 py-3 text-sm font-semibold transition-all ${
          demoMode === "traditional"
            ? "border-[#ef4444] bg-gradient-to-br from-[#ef4444]/15 to-[#ef4444]/10 text-white shadow-[0_4px_16px_rgba(239,68,68,0.15)]"
            : "border-white/[0.06] bg-white/[0.03] text-[#7a8ba5] hover:border-white/[0.12] hover:bg-white/[0.05]"
        }`}
      >
        <span>❌</span>
        <span>Sin IA</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium">
          Atención Tradicional
        </span>
      </motion.button>
    </div>
  );
}
