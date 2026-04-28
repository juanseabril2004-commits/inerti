"use client";

import { useState } from "react";

export default function AssistantPreview() {
  const [now] = useState(new Date());
  const time = now.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
  return (
    <div className="pointer-events-none mx-auto w-[210px] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0f0f1a] to-[#080810] p-4 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[10px] font-bold text-white">Resumen del día</div>
        <div className="text-[9px] text-[#7a8ba5]" suppressHydrationWarning>{time}</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Ventas hoy", value: "$284K", change: "+12%", changeColor: "#22c55e" },
          { label: "Mensajes", value: "47", change: "3 sin resp.", changeColor: "#f59e0b" },
          { label: "Citas mañana", value: "8", change: "2 por conf.", changeColor: "#f59e0b" },
          { label: "Leads nuevos", value: "15", change: "5 calif.", changeColor: "#22c55e" },
        ].map((m, i) => (
          <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5">
            <div className="text-[9px] text-[#7a8ba5]">{m.label}</div>
            <div className="text-base font-black text-white">{m.value}</div>
            <div className="text-[9px]" style={{ color: m.changeColor }}>{m.change}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.08)] px-3 py-2">
        <div className="text-[9px] text-[#a78bfa]">💡 Acción sugerida</div>
        <div className="text-[10px] text-white">Responder 3 mensajes urgentes antes de las 14:00</div>
      </div>
    </div>
  );
}
