"use client";

export default function EmailPreview() {
  return (
    <div className="pointer-events-none mx-auto w-[210px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080810] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-gradient-to-b from-[#080c14] to-[#060a10] px-3 py-2">
        <div className="text-[11px] font-semibold text-white">Bandeja</div>
        <div className="text-[9px] font-semibold text-[#3b82f6]">3 nuevos</div>
      </div>
      <div className="flex flex-col divide-y divide-white/[0.04]">
        {[
          { border: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Urgente", labelColor: "#ef4444", title: "Pedido urgente", desc: "Necesito entrega mañana" },
          { border: "#3b82f6", bg: "rgba(59,130,246,0.12)", label: "Normal", labelColor: "#3b82f6", title: "Cotización enviada", desc: "Gracias, quedo atento" },
          { border: "transparent", bg: "white/[0.04]", label: "Spam", labelColor: "#7a8ba5", title: "Newsletter", desc: "Ofertas de la semana" },
        ].map((e, i) => (
          <div key={i} className="flex items-center gap-2.5 px-3 py-2.5" style={{ borderLeftWidth: 2, borderLeftColor: e.border, borderLeftStyle: "solid" }}>
            <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: e.border === "transparent" ? "transparent" : e.border }} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[10px] font-medium text-white">{e.title}</div>
              <div className="truncate text-[9px] text-[#7a8ba5]">{e.desc}</div>
            </div>
            <div className="shrink-0 rounded px-1.5 py-0.5 text-[8px] font-bold" style={{ background: e.bg, color: e.labelColor }}>{e.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
