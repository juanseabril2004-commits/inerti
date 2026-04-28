"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import QuickReplyChip from "./QuickReplyChip";
import type { DemoMessage } from "../hooks/useChatDemo";
import type { QuickReplyChip as QuickReplyChipType } from "../data";

interface WhatsAppPhoneProps {
  rubroEmoji: string;
  rubroName: string;
  rubroStatus: string;
  demoMode: "ai" | "traditional";
  tryMode: boolean;
  messages: DemoMessage[];
  showTyping: boolean;
  showChips: boolean;
  chips: QuickReplyChipType[];
  bodyRef: React.RefObject<HTMLDivElement | null>;
  onChipClick: (chip: QuickReplyChipType) => void;
  onToggleTryMode: () => void;
}

export default function WhatsAppPhone({
  rubroEmoji,
  rubroName,
  rubroStatus,
  demoMode,
  tryMode,
  messages,
  showTyping,
  showChips,
  chips,
  bodyRef,
  onChipClick,
  onToggleTryMode,
}: WhatsAppPhoneProps) {
  const phoneRef = useRef<HTMLDivElement>(null);

  // 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Auto-scroll when messages change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, showTyping, bodyRef]);

  const statusText = demoMode === "ai" ? rubroStatus : "Fuera de horario";
  const statusDotColor = demoMode === "ai" ? "bg-[#22c55e]" : "bg-[#ef4444]";

  return (
    <div className="mx-auto w-full max-w-[380px] md:max-w-[400px]">
      <motion.div
        ref={phoneRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className="relative flex flex-col overflow-hidden rounded-[40px] border-2 border-white/[0.06] bg-[#0a0a14] p-2 shadow-2xl">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 z-20 h-5 w-28 -translate-x-1/2 rounded-b-xl bg-[#0a0a14]" />

          <div className="relative flex flex-col overflow-hidden rounded-[28px] bg-[#080810]">
            {/* Status bar */}
            <div className="flex items-center justify-between bg-[#06080c] px-5 pt-8 pb-1.5 text-[11px] text-white/40">
              <span>10:23</span>
              <div className="flex items-center gap-1">
                <span className="text-[8px]">●●●●○</span>
                <span>🔋</span>
              </div>
            </div>

            {/* WA Header */}
            <div className="flex items-center gap-2.5 border-b border-white/[0.06] bg-gradient-to-b from-[#080c14] to-[#060a10] px-3 py-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(59,130,246,0.1)] text-lg">
                {rubroEmoji}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{rubroName}</div>
                <div className="flex items-center gap-1 text-[11px] text-[#7a8ba5]">
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${statusDotColor}`} />
                  {statusText}
                </div>
              </div>
            </div>

            {/* Chat body — fixed height, scrolls internally */}
            <div
              ref={bodyRef}
              className="flex h-[360px] flex-col gap-2 overflow-y-auto px-3 py-4 md:h-[420px]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(20,20,30,0.5) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                backgroundColor: "#080810",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.1) transparent",
              }}
            >
              <AnimatePresence>
                {messages.map((msg) => (
                  <ChatBubble key={msg.id} message={msg} />
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {showTyping && <TypingIndicator />}
              </AnimatePresence>
            </div>

            {/* Chips bar — fixed height to keep phone stable */}
            <div className="h-[88px] border-t border-white/[0.06] bg-[rgba(12,12,22,0.8)] px-3 py-2.5">
              <AnimatePresence>
                {showChips && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-wrap content-start gap-2"
                  >
                    {chips.map((chip, i) => (
                      <QuickReplyChip
                        key={chip.label}
                        chip={chip}
                        onClick={onChipClick}
                        index={i}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div className="flex items-center gap-2 border-t border-white/[0.06] bg-[#0c0c16] px-3 py-2">
              <div className="flex-1 rounded-full border border-white/[0.06] bg-white/[0.04] px-4 py-2 text-center text-[12px] text-white/20">
                {tryMode ? "Elige una opción arriba ☝️" : "Elige un rubro para ver la demo"}
              </div>
            </div>

            {/* Try mode button */}
            {demoMode === "ai" && (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onToggleTryMode}
                className={`flex w-full shrink-0 items-center justify-center gap-2 border-t py-3.5 text-sm font-semibold transition-all ${
                  tryMode
                    ? "border-[#3b82f6]/20 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)]"
                    : "border-[#3b82f6]/20 bg-gradient-to-r from-[#3b82f6]/15 to-[#8b5cf6]/10 text-[#60a5fa] hover:from-[#3b82f6] hover:to-[#8b5cf6] hover:text-white"
                }`}
              >
                {tryMode ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18" /><path d="M6 6l12 12" />
                    </svg>
                    Salir del modo prueba
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    Pruébalo tú mismo
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Glow behind phone */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[60px] opacity-30 blur-3xl"
        style={{
          background:
            demoMode === "ai"
              ? "radial-gradient(circle at center, rgba(34,197,94,0.25) 0%, rgba(59,130,246,0.15) 40%, transparent 70%)"
              : "radial-gradient(circle at center, rgba(239,68,68,0.2) 0%, rgba(100,100,100,0.1) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
