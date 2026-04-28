"use client";

export default function LeadsPreview() {
  return (
    <div className="pointer-events-none mx-auto flex w-[210px] flex-col gap-2">
      {[
        { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", label: "Caliente", title: "Juan Pérez", desc: "Quiere cotizar terraza — WhatsApp" },
        { color: "#3b82f6", bg: "rgba(59,130,246,0.15)", label: "Tibio", title: "María Soto", desc: "Descargó catálogo — Web" },
        { color: "#a8a29e", bg: "rgba(168,162,158,0.1)", label: "Frío", title: "Pedro López", desc: "Solo preguntó precios — IG" },
      ].map((l, i) => (
        <div key={i} className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm" style={{ background: l.bg }}>👤</div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[11px] font-semibold text-white">{l.title}</div>
            <div className="truncate text-[9px] text-[#7a8ba5]">{l.desc}</div>
          </div>
          <div className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: l.bg, color: l.color }}>{l.label}</div>
        </div>
      ))}
    </div>
  );
}
