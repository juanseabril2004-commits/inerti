"use client";

import { motion } from "motion/react";
import { useLeadsDemo } from "../hooks/useLeadsDemo";
import DemoModeToggle from "./DemoModeToggle";
import LiveStats from "./LiveStats";
import ScenarioTabs from "./ScenarioTabs";
import LeadsApp from "./LeadsApp";
import BlurFade from "@/app/components/magicui/BlurFade";
import ShimmerButton from "@/app/components/magicui/ShimmerButton";

export default function LeadsDemo() {
  const {
    currentScenario,
    demoMode,
    leads,
    isAnimating,
    progress,
    statusText,
    statusType,
    columnCounts,
    scenario,
    changeScenario,
    toggleDemoMode,
    SCENARIOS,
    TAGS,
    COLUMNS,
  } = useLeadsDemo();

  return (
    <section className="relative overflow-hidden py-6 md:py-10">
      <div className="relative mx-auto max-w-[1120px] px-5 md:px-8">
        {/* Controls */}
        <BlurFade delay={0.1} duration={0.5}>
          <div className="mb-6 flex flex-col gap-5">
            <DemoModeToggle demoMode={demoMode} onToggle={toggleDemoMode} />
            <LiveStats demoMode={demoMode} />
          </div>
        </BlurFade>

        {/* Layout */}
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[340px_1fr] lg:grid-cols-[360px_1fr] lg:gap-14">
          {/* Sidebar */}
          <BlurFade delay={0.2} duration={0.5}>
            <div className="flex flex-col gap-5">
              <ScenarioTabs
                scenarios={SCENARIOS}
                currentScenario={currentScenario}
                onChange={changeScenario}
              />

              {/* Compact CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-[12px]"
              >
                <p className="mb-4 text-sm leading-relaxed text-[#7a8ba5]">
                  ¿Quieres que tu negocio capture leads así?
                </p>
                <ShimmerButton
                  href="https://wa.link/lp8er3"
                  target="_blank"
                  rel="noopener noreferrer"
                  shimmerColor="#f59e0b"
                  className="w-full text-sm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                  </svg>
                  Hablar con un asesor
                </ShimmerButton>
              </motion.div>
            </div>
          </BlurFade>

          {/* Leads App */}
          <BlurFade delay={0.3} duration={0.5}>
            <div className="flex justify-center">
              <LeadsApp
                leads={leads}
                demoMode={demoMode}
                columnCounts={columnCounts}
                progress={progress}
                statusText={statusText}
                statusType={statusType}
                tags={TAGS}
                columns={COLUMNS}
              />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
