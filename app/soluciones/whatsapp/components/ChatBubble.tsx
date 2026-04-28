"use client";

import { motion } from "motion/react";
import type { DemoMessage } from "../hooks/useChatDemo";

interface ChatBubbleProps {
  message: DemoMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isOut = message.type === "out";

  if (message.isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto max-w-[95%] text-center"
      >
        <div className="inline-block rounded-xl border border-dashed border-white/[0.12] bg-transparent px-4 py-2.5 text-[11px] italic leading-relaxed text-white/40">
          {message.text}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex max-w-[88%] ${isOut ? "self-end" : "self-start"}`}
    >
      <div
        className={`relative rounded-[10px] px-3 py-2 text-[12px] leading-relaxed ${
          isOut
            ? "rounded-tr-[3px] bg-[#0b4a3e] text-[#dceee8]"
            : "rounded-tl-[3px] bg-white/[0.06] text-[#e4e4e4]"
        }`}
      >
        <span className="whitespace-pre-wrap">{message.text}</span>
        {!message.isSystem && (
          <span className="ml-1.5 text-[9px] text-white/25">
            {message.time}
          </span>
        )}
      </div>
    </motion.div>
  );
}
