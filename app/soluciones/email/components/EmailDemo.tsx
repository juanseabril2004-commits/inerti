"use client";

import { motion } from "motion/react";
import { useEmailDemo } from "../hooks/useEmailDemo";
import DemoModeToggle from "./DemoModeToggle";
import LiveStats from "./LiveStats";
import ScenarioTabs from "./ScenarioTabs";
import EmailApp from "./EmailApp";
import BlurFade from "@/app/components/magicui/BlurFade";
import ShimmerButton from "@/app/components/magicui/ShimmerButton";

export default function EmailDemo() {
  const {
    currentScenario,
    demoMode,
    emails,
    isAnimating,
    activeFilter,
    progress,
    statusText,
    statusType,
    tagCounts,
    scenario,
    listRef,
    changeScenario,
    toggleDemoMode,
    applyFilter,
    SCENARIOS,
    TAGS,
    FILTERS,
  } = useEmailDemo();

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
                  ¿Quieres que tu bandeja de entrada se gestione sola?
                </p>
                <ShimmerButton
                  href="https://wa.link/lp8er3"
                  target="_blank"
                  rel="noopener noreferrer"
                  shimmerColor="#3b82f6"
                  className="w-full text-sm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 7L2 7" />
                  </svg>
                  Hablar con un asesor
                </ShimmerButton>
              </motion.div>
            </div>
          </BlurFade>

          {/* Email App */}
          <BlurFade delay={0.3} duration={0.5}>
            <div className="flex justify-center">
              <EmailApp
                emails={emails}
                demoMode={demoMode}
                activeFilter={activeFilter}
                tagCounts={tagCounts}
                progress={progress}
                statusText={statusText}
                statusType={statusType}
                listRef={listRef}
                onFilterChange={applyFilter}
                tags={TAGS}
                filters={FILTERS}
              />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
