"use client";

import { motion } from "motion/react";

interface RubroTabsProps {
  rubros: Record<string, { emoji: string; name: string; status: string }>;
  currentRubro: string;
  onChange: (key: string) => void;
}

export default function RubroTabs({ rubros, currentRubro, onChange }: RubroTabsProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7a8ba5]">
        Elige un rubro
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide md:flex-col">
        {Object.entries(rubros).map(([key, rubro]) => {
          const isActive = currentRubro === key;
          return (
            <motion.button
              key={key}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(key)}
              className={`flex min-w-[220px] shrink-0 cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-300 md:w-full md:min-w-0 ${
                isActive
                  ? "border-[#3b82f6]/50 bg-gradient-to-br from-[#3b82f6]/10 to-[#0a0a12] shadow-[0_8px_24px_rgba(59,130,246,0.1)]"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-xl">
                {rubro.emoji}
              </div>
              <div className="min-w-0">
                <span className="block text-[13px] font-bold text-white">
                  {rubro.name}
                </span>
                <span className="block text-[11px] text-[#7a8ba5]">
                  {rubro.status}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
