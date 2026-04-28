"use client";

import type { DemoMessage } from "../hooks/useAssistantDemo";

interface Props {
  messages: DemoMessage[];
}

export default function ManualMode({ messages }: Props) {
  return (
    <div className="grid w-full max-w-[860px] grid-cols-1 gap-4 md:grid-cols-2">
      {/* WhatsApp */}
      <div className="flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#0f0f1a] shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-gradient-to-b from-[#0c0c18] to-[#080810] px-4 py-3">
          <span className="text-lg">📱</span>
          <span className="text-sm font-bold text-white">WhatsApp Business</span>
          <span className="ml-auto rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-400">23</span>
        </div>
        <div className="flex h-[220px] flex-col gap-2 overflow-y-auto p-3">
          {messages.filter((m) => m.text.includes("WhatsApp") || m.text.includes("mensajes")).map((m) => (
            <div key={m.id} className="rounded-lg border border-red-500/10 bg-red-500/[0.04] p-2.5 text-xs text-red-300/80">
              {m.text}
            </div>
          ))}
          {messages.filter((m) => m.text.includes("WhatsApp") || m.text.includes("mensajes")).length === 0 && (
            <div className="flex h-full items-center justify-center text-xs text-[#7a8ba5]">Cargando...</div>
          )}
        </div>
      </div>

      {/* Gmail */}
      <div className="flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#0f0f1a] shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-gradient-to-b from-[#0c0c18] to-[#080810] px-4 py-3">
          <span className="text-lg">📧</span>
          <span className="text-sm font-bold text-white">Gmail</span>
          <span className="ml-auto rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-400">47</span>
        </div>
        <div className="flex h-[220px] flex-col gap-2 overflow-y-auto p-3">
          {messages.filter((m) => m.text.includes("Gmail") || m.text.includes("Email") || m.text.includes("email")).map((m) => (
            <div key={m.id} className="rounded-lg border border-amber-500/10 bg-amber-500/[0.04] p-2.5 text-xs text-amber-300/80">
              {m.text}
            </div>
          ))}
          {messages.filter((m) => m.text.includes("Gmail") || m.text.includes("Email") || m.text.includes("email")).length === 0 && (
            <div className="flex h-full items-center justify-center text-xs text-[#7a8ba5]">Cargando...</div>
          )}
        </div>
      </div>

      {/* Calendario */}
      <div className="flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#0f0f1a] shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-gradient-to-b from-[#0c0c18] to-[#080810] px-4 py-3">
          <span className="text-lg">🗓️</span>
          <span className="text-sm font-bold text-white">Calendario</span>
          <span className="ml-auto rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-400">6</span>
        </div>
        <div className="flex h-[220px] flex-col gap-2 overflow-y-auto p-3">
          {messages.filter((m) => m.text.includes("Calendario") || m.text.includes("Agenda") || m.text.includes("citas")).map((m) => (
            <div key={m.id} className="rounded-lg border border-blue-500/10 bg-blue-500/[0.04] p-2.5 text-xs text-blue-300/80">
              {m.text}
            </div>
          ))}
          {messages.filter((m) => m.text.includes("Calendario") || m.text.includes("Agenda") || m.text.includes("citas")).length === 0 && (
            <div className="flex h-full items-center justify-center text-xs text-[#7a8ba5]">Cargando...</div>
          )}
        </div>
      </div>

      {/* Excel / Notas */}
      <div className="flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#0f0f1a] shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-gradient-to-b from-[#0c0c18] to-[#080810] px-4 py-3">
          <span className="text-lg">📊</span>
          <span className="text-sm font-bold text-white">Excel / Notas</span>
          <span className="ml-auto rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-bold text-green-400">8</span>
        </div>
        <div className="flex h-[220px] flex-col gap-2 overflow-y-auto p-3">
          {messages.filter((m) => m.text.includes("Excel") || m.text.includes("Notas") || m.text.includes("inventario") || m.text.includes("pipeline")).map((m) => (
            <div key={m.id} className="rounded-lg border border-green-500/10 bg-green-500/[0.04] p-2.5 text-xs text-green-300/80">
              {m.text}
            </div>
          ))}
          {messages.filter((m) => m.text.includes("Excel") || m.text.includes("Notas") || m.text.includes("inventario") || m.text.includes("pipeline")).length === 0 && (
            <div className="flex h-full items-center justify-center text-xs text-[#7a8ba5]">Cargando...</div>
          )}
        </div>
      </div>
    </div>
  );
}
