"use client";

export default function CustomPreview() {
  return (
    <div className="pointer-events-none mx-auto flex w-[210px] flex-col items-center gap-3 py-2">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#ec4899]/20 to-[#8b5cf6]/20 text-4xl">
        ✨
      </div>
      <div className="text-center text-sm text-[#7a8ba5]">
        ¿Tu negocio tiene necesidades únicas?
        <br />
        <span className="font-semibold text-white">Diseñamos contigo.</span>
      </div>
      <div className="flex flex-col gap-2">
        {["Flujos personalizados", "Integraciones a medida", "IA entrenada para tu rubro", "Soporte dedicado"].map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-[11px] text-[#7a8ba5]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ec4899]" />
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}
