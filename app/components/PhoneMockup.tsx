"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface PhoneMockupProps {
  className?: string;
}

export default function PhoneMockup({ className = "" }: PhoneMockupProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative mx-auto w-[280px] md:w-[320px] ${className}`}
    >
      {/* Phone frame */}
      <div
        className="relative overflow-hidden rounded-[40px] border-[6px] border-[#1a1a2e] bg-[#080810] shadow-2xl"
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 z-20 h-6 w-28 -translate-x-1/2 rounded-b-xl bg-[#1a1a2e]" />

        {/* Status bar */}
        <div className="flex items-center justify-between bg-[#06080c] px-5 pt-8 pb-2 text-[11px] text-white/40">
          <span>10:23</span>
          <div className="flex items-center gap-1">
            <span className="text-[8px]">●●●●○</span>
            <span>🔋</span>
          </div>
        </div>

        {/* WA Header */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-gradient-to-b from-[#080c14] to-[#060a10] px-3 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(59,130,246,0.1)] text-lg">
            🔩
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Ferretería Don Pato</div>
            <div className="flex items-center gap-1 text-[11px] text-[#7a8ba5]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
              En línea
            </div>
          </div>
        </div>

        {/* Chat preview */}
        <div
          className="flex min-h-[380px] flex-col gap-2 px-3 py-4"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(20,20,30,0.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            backgroundColor: "#080810",
          }}
        >
          <div className="flex max-w-[88%] self-end">
            <div className="rounded-[10px] rounded-tr-[3px] bg-[#0b4a3e] px-3 py-2 text-[12px] leading-relaxed text-[#dceee8]">
              Buenas, necesito materiales para hacer una terraza
              <span className="ml-1.5 text-[9px] text-white/25">10:21 ✓✓</span>
            </div>
          </div>
          <div className="flex max-w-[88%] self-start">
            <div className="rounded-[10px] rounded-tl-[3px] bg-white/[0.06] px-3 py-2 text-[12px] leading-relaxed text-[#e4e4e4]">
              Hola 👋 Con gusto te ayudo. ¿Cuántos m² tiene la terraza aproximadamente?
              <span className="ml-1.5 text-[9px] text-white/25">10:21</span>
            </div>
          </div>
          <div className="flex max-w-[88%] self-end">
            <div className="rounded-[10px] rounded-tr-[3px] bg-[#0b4a3e] px-3 py-2 text-[12px] leading-relaxed text-[#dceee8]">
              Como 20 metros cuadrados
              <span className="ml-1.5 text-[9px] text-white/25">10:22 ✓✓</span>
            </div>
          </div>
          <div className="flex max-w-[90%] self-start">
            <div className="rounded-[10px] rounded-tl-[3px] bg-white/[0.06] px-3 py-2 text-[12px] leading-relaxed text-[#e4e4e4]">
              Para 20 m² te recomiendo:
              <br />– Tablas pino cepillado 2x6&quot;: $4.200 c/u
              <br />– Tornillos galvanizados 3&quot;: $3.500
              <br />– Impermeabilizante Sika 4L: $18.900
              <br />
              <br />
              Total estimado: ~$160.000
              <span className="ml-1.5 text-[9px] text-white/25">10:22</span>
            </div>
          </div>
          {/* Typing indicator */}
          <div className="flex max-w-[88%] self-start">
            <div className="flex items-center gap-1 rounded-[10px] rounded-tl-[3px] bg-white/[0.06] px-3 py-2.5">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:0.16s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:0.32s]" />
            </div>
          </div>
        </div>
      </div>

      {/* Glow behind phone */}
      <div
        className="absolute -inset-4 -z-10 rounded-[50px] opacity-40 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
