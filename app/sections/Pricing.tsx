"use client";

import { useRef } from "react";

import { motion, useInView } from "motion/react";

const plans = [
  {
    name: "Starter",
    description: "Ideal para empezar. Respuestas automáticas a las preguntas más frecuentes por WhatsApp.",
    setup: "Setup único $99.990",
    price: "$49.990",
    features: ["Agente WhatsApp 24/7", "Preguntas frecuentes", "Soporte por WhatsApp"],
    cta: "Agendar demo",
    featured: false,
  },
  {
    name: "Pro",
    description:
      "Lo más pedido. WhatsApp + catálogo + agendamiento + captura de leads + email inteligente.",
    setup: "Setup único $99.990",
    price: "$119.990",
    features: [
      "Todo en Starter",
      "Catálogo de productos",
      "Agendamiento automático",
      "Captura y calificación de leads",
      "Gestión automática de emails",
    ],
    cta: "Agendar demo",
    featured: true,
    badge: "Más popular",
  },
  {
    name: "Enterprise",
    description: "Soluciones a medida para empresas con operaciones complejas y múltiples sucursales.",
    setup: null,
    price: "A medida",
    features: [
      "Todo en Pro",
      "Automatización de procesos a medida",
      "Múltiples líneas de WhatsApp",
      "Integraciones con ERP / CRM",
      "Account manager dedicado",
      "SLA garantizado",
    ],
    cta: "Conversemos",
    featured: false,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="precios" className="py-24 md:py-28">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <h2 className="mb-4 font-[family-name:var(--font-barlow)] text-3xl font-extrabold leading-tight tracking-tight md:text-[2.4rem]">
          Planes simples. Resultados reales.
        </h2>
        <p className="mb-10 text-lg text-[#7a8ba5]">
          Todos los planes incluyen mensajes ilimitados, soporte y actualizaciones.
        </p>

        <div
          ref={ref}
          className="flex cursor-grab gap-5 overflow-x-auto pb-3 snap-x snap-mandatory md:cursor-default md:overflow-visible md:snap-none"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0, 0, 0.2, 1] as [number, number, number, number],
              }}
              className={`relative flex min-w-[300px] flex-1 snap-start flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.35)] ${
                plan.featured
                  ? "border-none bg-[#0f0f1a] shadow-[0_16px_40px_rgba(59,130,246,0.08)]"
                  : "border-white/[0.06] bg-[#0f0f1a]"
              }`}
            >
              {plan.featured && (
                <>
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] px-3.5 py-1 text-[11px] font-bold tracking-wide text-white">
                    {plan.badge}
                  </span>
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl p-[1.5px]"
                    style={{
                      background:
                        "linear-gradient(135deg, #3b82f6, #8b5cf6, #3b82f6)",
                      backgroundSize: "300% 300%",
                      animation: "gradientBorder 4s ease infinite",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                </>
              )}

              <h3 className="mb-2 font-[family-name:var(--font-barlow)] text-xl font-extrabold text-white">
                {plan.name}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-[#7a8ba5]">{plan.description}</p>

              <div className="mb-6">
                {plan.setup && (
                  <span className="mb-1 block text-xs text-[#7a8ba5]">{plan.setup}</span>
                )}
                <div className="flex items-baseline gap-1">
                  <span
                    className={`font-[family-name:var(--font-barlow)] text-[2.2rem] font-black leading-none tracking-tight ${
                      plan.price === "A medida"
                        ? "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent"
                        : "text-white"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.price !== "A medida" && (
                    <span className="text-sm text-[#7a8ba5]">/mes</span>
                  )}
                </div>
              </div>

              <ul className="mb-7 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="relative pl-5 text-sm text-[#ccc]">
                    <span className="absolute left-0 text-xs font-bold text-[#3b82f6]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.link/lp8er3"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto inline-flex w-full items-center justify-center rounded-[10px] py-3.5 text-sm font-semibold transition-all ${
                  plan.featured
                    ? "bg-[#3b82f6] text-white hover:bg-[#60a5fa]"
                    : "border border-white/10 text-white hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-[#7a8ba5]">
          * Todos los precios son por sucursal. ¿Tienes más de una? Escríbenos para un precio
          especial.
        </p>
      </div>
    </section>
  );
}
