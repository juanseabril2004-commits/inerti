"use client";

import { motion } from "motion/react";
import { useChatDemo } from "../hooks/useChatDemo";
import DemoModeToggle from "./DemoModeToggle";
import LiveStats from "./LiveStats";
import RubroTabs from "./RubroTabs";
import WhatsAppPhone from "./WhatsAppPhone";
import Spotlight from "@/app/components/aceternity/Spotlight";
import Particles from "@/app/components/magicui/Particles";
import ShimmerButton from "@/app/components/magicui/ShimmerButton";
import BlurFade from "@/app/components/magicui/BlurFade";

export default function WhatsAppDemo() {
  const {
    currentRubro,
    demoMode,
    tryMode,
    messages,
    showTyping,
    showChips,
    availableChips,
    rubro,
    bodyRef,
    changeRubro,
    toggleDemoMode,
    toggleTryMode,
    handleChipClick,
    RUBROS,
  } = useChatDemo();

  const particleColor = demoMode === "ai" ? "#22c55e" : "#ef4444";

  return (
    <section className="relative overflow-hidden py-6 md:py-10">
      {/* Spotlight background */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={demoMode === "ai" ? "#22c55e" : "#ef4444"}
      />

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
              <RubroTabs
                rubros={RUBROS}
                currentRubro={currentRubro}
                onChange={changeRubro}
              />

              {/* Compact CTA with ShimmerButton */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-[12px]"
              >
                <p className="mb-4 text-sm leading-relaxed text-[#7a8ba5]">
                  ¿Quieres que tu negocio responda así?
                </p>
                <ShimmerButton
                  href="https://wa.link/lp8er3"
                  target="_blank"
                  rel="noopener noreferrer"
                  shimmerColor="#22c55e"
                  className="w-full text-sm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  Hablar con un asesor
                </ShimmerButton>
              </motion.div>
            </div>
          </BlurFade>

          {/* Phone with Particles */}
          <BlurFade delay={0.3} duration={0.5}>
            <div className="relative flex justify-center">
              {/* Particles behind phone */}
              <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl opacity-40">
                <Particles
                  quantity={20}
                  staticity={30}
                  ease={30}
                  color={particleColor}
                />
              </div>

              {rubro && (
                <WhatsAppPhone
                  rubroEmoji={rubro.emoji}
                  rubroName={rubro.name}
                  rubroStatus={rubro.status}
                  demoMode={demoMode}
                  tryMode={tryMode}
                  messages={messages}
                  showTyping={showTyping}
                  showChips={showChips}
                  chips={availableChips}
                  bodyRef={bodyRef}
                  onChipClick={handleChipClick}
                  onToggleTryMode={toggleTryMode}
                />
              )}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
