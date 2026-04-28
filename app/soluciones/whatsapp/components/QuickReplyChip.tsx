"use client";

import { motion } from "motion/react";
import type { QuickReplyChip as QuickReplyChipType } from "../data";

interface QuickReplyChipProps {
  chip: QuickReplyChipType;
  onClick: (chip: QuickReplyChipType) => void;
  index: number;
}

export default function QuickReplyChip({ chip, onClick, index }: QuickReplyChipProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(chip)}
      className="cursor-pointer whitespace-nowrap rounded-full border border-[#3b82f6]/25 bg-[#3b82f6]/[0.08] px-4 py-2 text-[11px] font-semibold text-[#60a5fa] transition-colors hover:border-[#3b82f6]/50 hover:bg-[#3b82f6]/15 hover:text-white"
    >
      {chip.label}
    </motion.button>
  );
}
