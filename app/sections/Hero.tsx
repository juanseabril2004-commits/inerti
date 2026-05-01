"use client";

import BlurFade from "@/app/components/magicui/BlurFade";
import ShimmerButton from "@/app/components/magicui/ShimmerButton";
import Spotlight from "@/app/components/aceternity/Spotlight";

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pt-8 pb-24 md:pt-12 md:pb-28">
      {/* Spotlight effect */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="rgba(59,130,246,0.15)"
      />

      {/* Gradient mesh background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 70% at 80% 20%, rgba(139,92,246,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glowing orb */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-[1] h-[500px] w-[700px] animate-[orbPulse_6s_ease-in-out_infinite_alternate] blur-[60px] md:h-[600px] md:w-[900px]"
        style={{
          transform: "translate(-50%, -55%)",
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-[2] mx-auto flex max-w-[800px] flex-col items-center px-5 text-center">
        <BlurFade delay={0.1} duration={0.8} yOffset={8}>
          <h1 className="mb-7 font-[family-name:var(--font-barlow)] text-5xl font-black leading-[1.08] tracking-tight md:text-7xl lg:text-8xl">
            La <span className="gradient-text">IA que trabaja</span>
            <br />
            por tu negocio.
          </h1>
        </BlurFade>

        <BlurFade delay={0.4} duration={0.8} yOffset={8}>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[#7a8ba5]">
            Automatiza tu WhatsApp, captura leads, gestiona emails y optimiza procesos — con
            inteligencia artificial diseñada para negocios reales.
          </p>
        </BlurFade>

        <BlurFade delay={0.55} duration={0.8} yOffset={8}>
          <div className="flex flex-wrap justify-center gap-4">
            <ShimmerButton
              href="https://wa.link/lp8er3"
              target="_blank"
              rel="noopener noreferrer"
              shimmerColor="#8b5cf6"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Solicita tu demo gratis
            </ShimmerButton>
            <a
              href="#soluciones"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/10 px-9 py-4 text-lg font-semibold text-[#7a8ba5] transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
            >
              Ver soluciones
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </BlurFade>

        <BlurFade delay={0.7} duration={0.8} yOffset={8}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="flex -space-x-2">
              {["🔧", "🍽", "🐾", "🏠", "🦷"].map((emoji, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#050508] bg-[#0f0f1a] text-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div className="text-sm text-[#7a8ba5]">
              <span className="font-semibold text-white">Veterinarias e inmobiliarias</span> de Concepción ya usan INERTI
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
