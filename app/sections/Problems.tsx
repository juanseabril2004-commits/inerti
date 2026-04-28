"use client";

import { useRef } from "react";

import { motion, useInView } from "motion/react";

const problems = [
  {
    icon: "📱",
    title: "Mensajes sin responder",
    text: "Mientras atiendes clientes, los mensajes se acumulan en WhatsApp, email y redes sociales.",
  },
  {
    icon: "🌙",
    title: "Fuera de horario = ventas perdidas",
    text: "Te contactan cuando estás cerrado y se van con la competencia.",
  },
  {
    icon: "🔁",
    title: "Tareas repetitivas consumen tu día",
    text: "Precios, stock, horarios, confirmaciones… todos los días lo mismo, en todos los canales.",
  },
  {
    icon: "📈",
    title: "No puedes escalar sin contratar",
    text: "Crecer significa más personas. Pero automatizar con IA es más inteligente y más barato.",
  },
];

export default function Problems() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <h2 className="mb-12 font-[family-name:var(--font-barlow)] text-3xl font-extrabold leading-tight tracking-tight md:text-[2.4rem]">
          Tu negocio pierde oportunidades cada día.
        </h2>

        <div ref={ref} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {problems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0, 0, 0.2, 1] as [number, number, number, number],
              }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-[12px] transition-all duration-300 hover:-translate-y-[3px] hover:border-white/[0.12] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
            >
              <span className="mb-3 block text-2xl">{item.icon}</span>
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
