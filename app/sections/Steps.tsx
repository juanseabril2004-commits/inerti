"use client";

import { useRef } from "react";

import { motion, useInView } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Reunión de 30 minutos",
    detail:
      "Nos cuentas cómo funciona tu negocio, qué preguntan tus clientes y qué quieres automatizar.",
  },
  {
    number: "02",
    title: "Configuramos todo por ti",
    detail:
      "Cargamos tu inventario, redactamos las respuestas y conectamos la IA a tus canales.",
  },
  {
    number: "03",
    title: "Pruebas y ajustes",
    detail:
      "Simulas ser cliente, revisas el tono y las respuestas. Ajustamos hasta que quede perfecto.",
  },
  {
    number: "04",
    title: "Tu IA entra en funciones",
    detail:
      "En 3–5 días hábiles tu negocio responde solo. Tú solo recibes los casos que importan.",
  },
];

export default function Steps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <h2 className="mb-6 font-[family-name:var(--font-barlow)] text-3xl font-extrabold leading-tight tracking-tight md:text-[2.4rem]">
          Lo instalamos. Tú solo recibes clientes.
        </h2>

        <div className="mb-9 inline-flex items-center gap-2.5 rounded-[10px] border border-[rgba(59,130,246,0.15)] bg-[rgba(59,130,246,0.08)] px-4 py-3">
          <span className="text-lg">🖥</span>
          <span className="text-sm font-semibold text-[#7a8ba5]">
            Setup 100% virtual — no necesitas ir a ningún lado ni perder tiempo de tu negocio.
          </span>
        </div>

        <div ref={ref} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0, 0, 0.2, 1] as [number, number, number, number],
              }}
              className="flex items-baseline gap-5"
            >
              <span
                className="shrink-0 bg-gradient-to-b from-[rgba(59,130,246,0.25)] to-[rgba(139,92,246,0.08)] bg-clip-text font-[family-name:var(--font-barlow)] text-[3.2rem] font-black leading-none text-transparent md:text-[4rem]"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                {step.number}
              </span>
              <div className="flex flex-col gap-1.5">
                <p className="font-[family-name:var(--font-barlow)] text-base font-semibold leading-snug text-white">
                  {step.title}
                </p>
                <p className="text-sm leading-relaxed text-[#7a8ba5]">{step.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
