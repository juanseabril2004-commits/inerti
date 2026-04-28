"use client";

import { motion } from "motion/react";
import { useAssistantDemo } from "../hooks/useAssistantDemo";
import DemoModeToggle from "./DemoModeToggle";
import LiveStats from "./LiveStats";
import ScenarioTabs from "./ScenarioTabs";
import ChatApp from "./ChatApp";
import ManualMode from "./ManualMode";
import BlurFade from "@/app/components/magicui/BlurFade";
import ShimmerButton from "@/app/components/magicui/ShimmerButton";

export default function AssistantDemo() {
  const {
    currentScenario,
    demoMode,
    tryMode,
    messages,
    isAnimating,
    showTyping,
    showChips,
    availableChips,
    scenario,
    bodyRef,
    changeScenario,
    toggleDemoMode,
    handleChipClick,
    SCENARIOS,
  } = useAssistantDemo();

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
                  ¿Quieres tener a tu negocio en una mirada?
                </p>
                <ShimmerButton
                  href="https://wa.link/lp8er3"
                  target="_blank"
                  rel="noopener noreferrer"
                  shimmerColor="#8b5cf6"
                  className="w-full text-sm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                  Hablar con un asesor
                </ShimmerButton>
              </motion.div>
            </div>
          </BlurFade>

          {/* App */}
          <BlurFade delay={0.3} duration={0.5}>
            <div className="flex justify-center">
              {demoMode === "ai" ? (
                <ChatApp
                  messages={messages}
                  demoMode={demoMode}
                  showTyping={showTyping}
                  showChips={showChips}
                  chips={availableChips}
                  bodyRef={bodyRef}
                  onChipClick={handleChipClick}
                  scenarioName={scenario?.name || ""}
                  scenarioStatus={scenario?.status || ""}
                />
              ) : (
                <ManualMode messages={messages} />
              )}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
