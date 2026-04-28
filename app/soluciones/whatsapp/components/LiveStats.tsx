"use client";

import { motion, AnimatePresence } from "motion/react";
import type { DemoMode } from "../hooks/useChatDemo";

interface LiveStatsProps {
  demoMode: DemoMode;
}

export default function LiveStats({ demoMode }: LiveStatsProps) {
  const isAi = demoMode === "ai";

  const stats = [
    {
      icon: isAi ? "💬" : "⚠️",
      value: isAi ? "+1,200" : "⚠️ 30 sin respuesta",
      label: isAi ? "conversaciones hoy" : "",
      alert: !isAi,
    },
    {
      icon: "⚡",
      value: isAi ? "<2s" : "24-48h",
      label: "tiempo de respuesta",
      alert: false,
    },
    {
      icon: isAi ? "🟢" : "🔴",
      value: isAi ? "24/7" : "Fuera de horario",
      label: isAi ? "siempre disponible" : "",
      alert: false,
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-4 backdrop-blur-[12px] md:gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`flex items-center gap-2 ${stat.alert ? "text-[#ef4444]" : ""}`}>
            <AnimatePresence mode="wait">
              <motion.span
                key={`${demoMode}-${stat.icon}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className={`text-base ${stat.alert ? "animate-pulse" : ""}`}
              >
                {stat.icon}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                key={`${demoMode}-${stat.value}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25 }}
                className={`font-[family-name:var(--font-barlow)] text-sm font-bold ${
                  stat.alert ? "text-[#ef4444]" : "text-[#3b82f6]"
                }`}
              >
                {stat.value}
              </motion.span>
            </AnimatePresence>
            {stat.label && (
              <span className="text-[11px] text-[#7a8ba5]">{stat.label}</span>
            )}
          </div>
          {i < stats.length - 1 && (
            <div className="hidden h-5 w-px bg-white/[0.08] md:block" />
          )}
        </div>
      ))}
    </div>
  );
}
