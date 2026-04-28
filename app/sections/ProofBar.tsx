"use client";

import { useRef } from "react";

import { motion, useInView } from "motion/react";

const proofs = [
  { value: "24/7", label: "Sin horarios" },
  { value: "< 5 seg", label: "Primera respuesta" },
  { value: "∞", label: "Sin límite de mensajes" },
  { value: "$0", label: "Costo por conversación" },
];

export default function ProofBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="relative border-y border-white/[0.06] bg-[#0a0a12] py-11"
    >
      <div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-7 px-5 text-center md:grid-cols-4 md:px-8">
        {proofs.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.15,
              ease: [0, 0, 0.2, 1] as [number, number, number, number],
            }}
            className="py-2"
          >
            <span className="block font-[family-name:var(--font-barlow)] text-[1.8rem] font-black tracking-tight text-white">
              {item.value}
            </span>
            <span className="mt-1 block text-sm text-[#7a8ba5]">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
