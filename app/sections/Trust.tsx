"use client";

import { useRef } from "react";

import { motion, useInView } from "motion/react";

const trustItems = [
  {
    icon: "📅",
    title: "Sin contrato mínimo",
    text: "Mes a mes. Cancelas cuando quieras, sin penalizaciones ni preguntas.",
  },
  {
    icon: "💬",
    title: "Mensajes ilimitados",
    text: "Tu bot responde todas las conversaciones sin cobrarte por cada mensaje.",
  },
  {
    icon: "🔔",
    title: "Siempre te avisa",
    text: "Si no sabe responder, te notifica al instante para que tomes el control.",
  },
  {
    icon: "⚡",
    title: "Listo en días",
    text: "Nos encargamos de todo. Tu asistente opera en 3–5 días hábiles.",
  },
];

export default function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#3b82f6]">
          POR QUÉ INERTI
        </p>
        <h2 className="mb-10 font-[family-name:var(--font-barlow)] text-3xl font-extrabold leading-tight tracking-tight md:text-[2.4rem]">
          Sin letra chica. Sin sorpresas.
        </h2>

        <div ref={ref} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0, 0, 0.2, 1] as [number, number, number, number],
              }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-[12px] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12]"
            >
              <span className="mb-3 block text-[1.8rem]">{item.icon}</span>
              <h3 className="mb-2 font-[family-name:var(--font-barlow)] text-base font-bold text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#7a8ba5]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
