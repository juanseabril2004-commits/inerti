"use client";

import { useRef, useState } from "react";

import { motion, useInView } from "motion/react";

const faqs = [
  {
    q: "¿Mis clientes notarán que es un bot?",
    a: "El asistente responde de forma natural y personalizada según tu negocio. La mayoría de los clientes no notan la diferencia, y si necesitan hablar contigo directamente, el asistente los deriva sin problema.",
  },
  {
    q: "¿Qué pasa si no sabe responder?",
    a: "Si recibe una pregunta que no puede resolver, te avisa de inmediato para que tú tomes el control. Nunca inventará información.",
  },
  {
    q: "¿Cómo actualizo precios o inventario?",
    a: "Te damos acceso a un panel simple donde puedes actualizar precios, productos y respuestas cuando quieras. También podemos hacerlo por ti si lo prefieres.",
  },
  {
    q: "¿Necesito cambiar mi número de WhatsApp?",
    a: "No. El asistente funciona con tu número actual de WhatsApp Business. No necesitas crear una cuenta nueva ni cambiar nada.",
  },
  {
    q: "¿Hay contrato mínimo?",
    a: "No. Puedes cancelar cuando quieras. Sin contratos largos, sin penalizaciones.",
  },
  {
    q: "¿Cuánto tarda la instalación?",
    a: "En general el asistente queda listo en 3–5 días hábiles después de la reunión inicial. Nosotros nos encargamos de todo.",
  },
  {
    q: "¿Funciona con mi número de WhatsApp actual?",
    a: "Sí. Puedes mantener tu número actual. El asistente se conecta a través de la API oficial de WhatsApp Business, así que tu número sigue siendo el mismo para tus clientes.",
  },
  {
    q: "¿Necesito saber de tecnología para usarlo?",
    a: "No. Nosotros configuramos todo. Tú solo necesitas avisarnos cuando cambian los precios o el inventario, y eso lo puedes hacer desde un formulario simple o mandándonos un mensaje por WhatsApp.",
  },
  {
    q: "¿Qué incluye la captura de leads?",
    a: "Nuestro sistema identifica automáticamente a los prospectos más interesados desde WhatsApp y formularios web, los califica según su intención de compra y te los entrega listos para cerrar la venta.",
  },
  {
    q: "¿Cómo funciona la gestión automática de emails?",
    a: "La IA lee, clasifica y responde tus correos electrónicos según reglas que definimos juntos. Los correos urgentes te llegan como notificación y los rutinarios se resuelven solos.",
  },
  {
    q: "¿Puedo empezar con un módulo y agregar más después?",
    a: "Sí. Puedes empezar solo con el agente de WhatsApp y luego activar captura de leads, email inteligente o automatización de procesos cuando lo necesites. Tu plan se ajusta a tu ritmo.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-28">
      <div className="mx-auto max-w-[700px] px-5 md:px-8">
        <h2 className="mb-10 font-[family-name:var(--font-barlow)] text-3xl font-extrabold leading-tight tracking-tight md:text-[2.4rem]">
          Preguntas frecuentes
        </h2>

        <div ref={ref} className="divide-y divide-white/[0.06]">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0, 0, 0.2, 1] as [number, number, number, number],
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left font-[family-name:var(--font-barlow)] text-base font-semibold text-white transition-colors hover:text-[#60a5fa]"
              >
                <span>{faq.q}</span>
                <span
                  className={`ml-4 shrink-0 text-xl text-[#7a8ba5] transition-all duration-300 ${
                    openIndex === i ? "rotate-45 text-[#3b82f6]" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-400"
                style={{
                  maxHeight: openIndex === i ? "250px" : "0px",
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p className="pb-5 text-sm leading-relaxed text-[#7a8ba5]">{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
