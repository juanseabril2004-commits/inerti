"use client";

import type { DemoMessage } from "../hooks/useAssistantDemo";
import type { DemoMode, ChatMessage } from "../data";

function RichContent({ rich }: { rich: NonNullable<DemoMessage["rich"]> }) {
  return (
    <div className="flex flex-col gap-2">
      {rich.map((block, i) => {
        if (block.type === "stat") {
          return (
            <div key={i} className="flex items-center justify-between gap-3">
              <span className="text-xs text-[#7a8ba5]">{block.text}</span>
              <span className="font-[family-name:var(--font-barlow)] text-lg font-bold" style={{ color: block.color || "#fff" }}>
                {block.value}
              </span>
            </div>
          );
        }
        if (block.type === "heading") {
          return (
            <div key={i} className="mt-1 text-xs font-bold uppercase tracking-wide text-[#7a8ba5]">
              {block.text}
            </div>
          );
        }
        if (block.type === "separator") {
          return <div key={i} className="my-1 h-px bg-white/[0.06]" />;
        }
        if (block.type === "list") {
          return (
            <div key={i} className="flex flex-col gap-1.5">
              {block.items?.map((item, j) => (
                <div key={j} className="flex items-start gap-2 text-xs">
                  {item.icon && <span>{item.icon}</span>}
                  <span className="flex-1 text-white/90">{item.label}</span>
                  {item.value && <span className="shrink-0 text-[#7a8ba5]">{item.value}</span>}
                </div>
              ))}
            </div>
          );
        }
        if (block.type === "alert") {
          return (
            <div
              key={i}
              className="rounded-md border px-2.5 py-2 text-xs"
              style={{
                borderColor: `${block.color || "#fbbf24"}30`,
                background: `${block.color || "#fbbf24"}10`,
                color: block.color || "#fbbf24",
              }}
            >
              {block.text}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

interface Props {
  messages: DemoMessage[];
  demoMode: DemoMode;
  showTyping: boolean;
  showChips: boolean;
  chips: { q: string; a: ChatMessage }[];
  bodyRef: React.RefObject<HTMLDivElement | null>;
  onChipClick: (chip: { q: string; a: ChatMessage }) => void;
  scenarioName: string;
  scenarioStatus: string;
}

export default function ChatApp({
  messages,
  demoMode,
  showTyping,
  showChips,
  chips,
  bodyRef,
  onChipClick,
  scenarioName,
  scenarioStatus,
}: Props) {
  return (
    <div className="flex h-[560px] w-full max-w-[420px] flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0a0a12] shadow-[0_24px_64px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-gradient-to-b from-[#0c0c18] to-[#080810] px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/15 text-lg">
          🤖
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-white">INERTI Assistant</div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#7a8ba5]">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            {scenarioStatus}
          </div>
        </div>
      </div>

      {/* Body */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 text-center text-[11px] text-[#7a8ba5]">
          Hoy, {new Date().toLocaleDateString("es-CL", { day: "numeric", month: "short" })}
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 flex ${msg.type === "out" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.type === "out"
                  ? "bg-[#8b5cf6] text-white"
                  : msg.isSystem
                    ? "border border-dashed border-red-500/20 bg-red-500/[0.04] text-red-300/80"
                    : "border border-white/[0.06] bg-[#0f0f1a] text-white/90"
              }`}
            >
              {msg.text && <p className="mb-1.5">{msg.text}</p>}
              {msg.rich && <RichContent rich={msg.rich} />}
              <div className={`mt-1 text-right text-[10px] ${msg.type === "out" ? "text-violet-200/60" : "text-[#7a8ba5]"}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {showTyping && (
          <div className="mb-3 flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl border border-white/[0.06] bg-[#0f0f1a] px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8b5cf6]" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8b5cf6]" style={{ animationDelay: "200ms" }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8b5cf6]" style={{ animationDelay: "400ms" }} />
            </div>
          </div>
        )}

        {/* Quick reply chips */}
        {showChips && chips.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {chips.map((chip, i) => (
              <button
                key={i}
                onClick={() => onChipClick(chip)}
                className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1.5 text-xs font-medium text-violet-300 transition-all hover:bg-violet-500/20 hover:text-white"
              >
                {chip.q}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
