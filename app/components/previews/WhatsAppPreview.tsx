"use client";

export default function WhatsAppPreview() {
  return (
    <div className="pointer-events-none mx-auto w-[210px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080810] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-gradient-to-b from-[#080c14] to-[#060a10] px-3 py-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(34,197,94,0.15)] text-sm">🔩</div>
        <div>
          <div className="text-[11px] font-semibold text-white">Ferretería Don Pato</div>
          <div className="flex items-center gap-1 text-[9px] text-[#22c55e]">
            <span className="inline-block h-1 w-1 rounded-full bg-[#22c55e]" />En línea
          </div>
        </div>
      </div>
      <div className="flex min-h-[120px] flex-col gap-1.5 px-2.5 py-2.5">
        <div className="self-end max-w-[85%] rounded-lg rounded-tr-sm bg-[#0b4a3e] px-2.5 py-1.5 text-[10px] leading-relaxed text-[#dceee8]">
          ¿Tienen tablas de pino 2x6?
        </div>
        <div className="self-start max-w-[90%] rounded-lg rounded-tl-sm bg-white/[0.06] px-2.5 py-1.5 text-[10px] leading-relaxed text-[#e4e4e4]">
          Sí 👋 Tenemos tablas pino cepillado a $4.200 c/u. ¿Cuántas necesitas?
        </div>
        <div className="self-end max-w-[85%] rounded-lg rounded-tr-sm bg-[#0b4a3e] px-2.5 py-1.5 text-[10px] leading-relaxed text-[#dceee8]">
          20 unidades para una terraza
        </div>
        <div className="flex self-start max-w-[55%] items-center gap-1 rounded-lg rounded-tl-sm bg-white/[0.06] px-3 py-2">
          <span className="h-1 w-1 rounded-full bg-white/50" />
          <span className="h-1 w-1 rounded-full bg-white/50" />
          <span className="h-1 w-1 rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  );
}
