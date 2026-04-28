"use client";

interface Props {
  scenarios: Record<string, { emoji: string; name: string; emails: unknown[] }>;
  currentScenario: string;
  onChange: (key: string) => void;
}

export default function ScenarioTabs({ scenarios, currentScenario, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7a8ba5]">Elige un escenario</p>
      <div
        className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible"
        role="tablist"
        aria-label="Escenarios disponibles"
      >
        {Object.entries(scenarios).map(([key, scenario]) => {
          const isActive = currentScenario === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(key)}
              className={`flex shrink-0 items-center gap-3 rounded-lg border p-3.5 text-left transition-all hover:-translate-y-0.5 md:w-full ${
                isActive
                  ? "border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-[#0a0a12]/95 shadow-[0_8px_24px_rgba(59,130,246,0.1)]"
                  : "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.05]"
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white/[0.04] text-2xl">
                {scenario.emoji}
              </span>
              <div>
                <span className="block text-sm font-bold text-white">{scenario.name}</span>
                <span className="block text-xs text-[#7a8ba5]">
                  {key === "ecommerce" && "Pedidos, reclamos y proveedores"}
                  {key === "consultora" && "Cotizaciones y agendamiento"}
                  {key === "dental" && "Citas y post-operatorio"}
                  {key === "restaurante" && "Reservas y pedidos"}
                  {key === "inmobiliaria" && "Visitas y contratos"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
