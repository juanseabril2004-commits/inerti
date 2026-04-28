"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import { motion, useInView } from "motion/react";

const demos = [
  { id: "ferreteria", emoji: "🔩", title: "Ferretería Don Pato", copy: "Precio + stock en segundos" },
  { id: "veterinaria", emoji: "🐾", title: "Veterinaria Huellitas Sur", copy: "Agenda automática" },
  { id: "taller", emoji: "🔧", title: "Taller El Volante", copy: "Cotiza sin soltar la herramienta" },
  { id: "restaurante", emoji: "🍽", title: "Cocinería La Esquina", copy: "Menú y delivery rápido" },
  { id: "dental", emoji: "🦷", title: "Dental Sonría", copy: "Horas sin llamar" },
  { id: "inmobiliaria", emoji: "🏠", title: "Inmobiliaria Raíces Sur", copy: "Arriendos y visitas al instante" },
];

const conversations: Record<string, { side: "out" | "in"; text: string }[]> = {
  ferreteria: [
    { side: "out", text: "Buenas, necesito materiales para hacer una terraza de madera" },
    { side: "in", text: "Hola 👋 Con gusto te ayudo. ¿Cuántos m² tiene la terraza aproximadamente?" },
    { side: "out", text: "Como 20 metros cuadrados" },
    { side: "in", text: "Para 20 m² te recomiendo:\n– Tablas pino cepillado 2x6\": $4.200 c/u (necesitarías ~28 unidades)\n– Tornillos galvanizados 3\": $3.500 la caja de 100\n– Impermeabilizante Sika 4L: $18.900\n\nTotal estimado: ~$160.000. ¿Quieres que reserve los materiales?" },
    { side: "out", text: "Sí, y ¿tienen servicio de corte?" },
    { side: "in", text: "Sí 🪚 El corte tiene un valor de $500 por corte. ¿Para cuándo necesitas los materiales?" },
    { side: "out", text: "Para el sábado" },
    { side: "in", text: "Perfecto. Reservo los materiales a tu nombre hasta el sábado a las 13:00. ¿A qué nombre queda la reserva?" },
    { side: "out", text: "A nombre de Carlos Muñoz" },
    { side: "in", text: "✅ Listo Carlos. Reserva confirmada para el sábado. Pregunta por los materiales en mesón al llegar. ¿Algo más en lo que pueda ayudarte?" },
  ],
  veterinaria: [
    { side: "out", text: "Hola, mi perro está rascándose mucho, ¿puede ser alergia?" },
    { side: "in", text: "Hola 🐶 El rascado frecuente puede tener varias causas: alergias, hongos, parásitos externos o dermatitis. Lo mejor es una revisión presencial para que el veterinario evalúe bien. ¿Quieres agendar una consulta?" },
    { side: "out", text: "Sí, ¿cuánto sale la consulta?" },
    { side: "in", text: "La consulta de dermatología vale $18.000. Si viene con muestra de pelo o costra, el análisis adicional es $12.000. ¿Qué raza y edad tiene tu perro?" },
    { side: "out", text: "Es un golden de 3 años, se llama Bruno" },
    { side: "in", text: "Perfecto 🐕 Tenemos hora disponible mañana jueves 10:30 o el viernes a las 16:00. ¿Cuál te acomoda más?" },
    { side: "out", text: "El viernes 16:00" },
    { side: "in", text: "✅ Bruno queda agendado el viernes a las 16:00 con la Dra. Campos. Te mando la dirección por acá. ¿Necesitas algo más?" },
    { side: "out", text: "Muchas gracias" },
    { side: "in", text: "Con gusto 😊 Si Bruno empeora antes del viernes, escríbenos y buscamos hora de urgencia. ¡Hasta el viernes!" },
  ],
  taller: [
    { side: "out", text: "Hola, mi auto hace un ruido raro al frenar, como si raspara" },
    { side: "in", text: "Ese sonido suele ser desgaste de pastillas de freno o disco rayado. Puede ser peligroso ignorarlo. ¿Qué auto tienes (marca, modelo y año)?" },
    { side: "out", text: "Toyota Corolla 2019" },
    { side: "in", text: "Para un Corolla 2019:\n– Cambio pastillas delanteras: $45.000–$65.000\n– Si los discos están rayados, reemplazo: $90.000–$130.000\n\nPara saber qué necesita exactamente hay que revisarlo. ¿Cuándo puedes traerlo?" },
    { side: "out", text: "¿Mañana está bien?" },
    { side: "in", text: "Sí 🔧 Mañana tenemos a las 10:00 y a las 14:30. ¿Cuál te sirve?" },
    { side: "out", text: "A las 10 mejor" },
    { side: "in", text: "✅ Reservado para mañana a las 10:00. La revisión de frenos no tiene costo. Si hay que hacer trabajo, te presupuestamos antes de tocar nada. ¿A qué nombre queda?" },
    { side: "out", text: "Miguel Soto" },
    { side: "in", text: "Listo Miguel 👍 Mañana a las 10:00 en Taller El Volante. Te esperamos." },
  ],
  restaurante: [
    { side: "out", text: "¿Hacen delivery para 4 personas para el almuerzo?" },
    { side: "in", text: "Hola 👋 Sí hacemos delivery al mediodía. ¿A qué sector de Concepción? Así te confirmo si llegamos y el tiempo estimado." },
    { side: "out", text: "Barros Arana con Aníbal Pinto" },
    { side: "in", text: "Sí llegamos ahí, en aprox 35–45 min 🛵 El menú de hoy es:\n– Cazuela de vacuno: $5.500\n– Pollo al jugo con arroz: $5.200\n– Pastel de choclo: $5.800\nTodos incluyen ensalada y bebida." },
    { side: "out", text: "¿Tienen opciones vegetarianas?" },
    { side: "in", text: "Sí 🥗 Hoy tenemos lentejas guisadas con arroz a $4.800 y ensalada completa (tomate, lechuga, palta) a $3.200. ¿Te mando los 4 menús o mezclan opciones?" },
    { side: "out", text: "3 pollo al jugo y 1 lentejas" },
    { side: "in", text: "Anotado ✅ 3 pollo al jugo + 1 lentejas = $20.800 total. ¿Pagan contra entrega en efectivo o transferencia?" },
    { side: "out", text: "Transferencia" },
    { side: "in", text: "Perfecto. Te mando los datos bancarios ahora. El pedido sale en 20 min y llega en ~40 min 🕐 ¿Confirmas la dirección exacta?" },
  ],
  dental: [
    { side: "out", text: "Hola, quiero agendar una limpieza dental" },
    { side: "in", text: "Hola 😊 Con gusto. ¿Es tu primera vez con nosotros o ya eres paciente?" },
    { side: "out", text: "Primera vez" },
    { side: "in", text: "Bienvenido 🦷 Para pacientes nuevos hacemos primero una evaluación inicial ($15.000) donde el dentista revisa y diseña tu plan de tratamiento. La limpieza viene después. ¿Te parece?" },
    { side: "out", text: "Perfecto, ¿cuándo tienen hora?" },
    { side: "in", text: "Esta semana tenemos el jueves 11:00 y el viernes 15:30. ¿Cuál prefieres?" },
    { side: "out", text: "El jueves 11" },
    { side: "in", text: "✅ Agendado para el jueves a las 11:00. ¿A qué nombre? Te mandamos recordatorio 24 horas antes." },
    { side: "out", text: "Ana Pérez" },
    { side: "in", text: "Listo Ana 👍 Te esperamos el jueves. Recuerda venir con tu carnet. ¡Hasta pronto!" },
  ],
  inmobiliaria: [
    { side: "out", text: "Hola, busco un depto en arriendo en el centro de Concepción" },
    { side: "in", text: "Hola 👋 Con gusto te ayudo. ¿Cuántos dormitorios necesitas y cuál es tu presupuesto mensual aproximado?" },
    { side: "out", text: "2 dormitorios, máximo $450.000" },
    { side: "in", text: "Tenemos 3 opciones disponibles en esa zona:\n– Depto Barros Arana 540: 2D/1B, 55 m², $420.000/mes\n– Depto Caupolicán 312: 2D/2B, 62 m², $445.000/mes\n– Depto O'Higgins 890: 2D/1B, 48 m², $380.000/mes\n\nTodos incluyen estacionamiento. ¿Te interesa agendar una visita?" },
    { side: "out", text: "El de Caupolicán se ve bien, ¿puedo verlo?" },
    { side: "in", text: "Claro 🏠 Tenemos disponibilidad para visita mañana a las 11:00 o el sábado a las 10:30. ¿Cuál te acomoda?" },
    { side: "out", text: "El sábado a las 10:30" },
    { side: "in", text: "✅ Visita agendada para el sábado a las 10:30 en Caupolicán 312. Te mando la ubicación exacta por acá. ¿A qué nombre queda?" },
    { side: "out", text: "Camila Rojas" },
    { side: "in", text: "Perfecto Camila 👍 Te esperamos el sábado. Lleva tu carnet y si tienes liquidaciones de sueldo, tráelas por si decides avanzar. ¡Nos vemos!" },
  ],
};

const timeTemplates = ["10:21", "10:21", "10:22", "10:22", "10:23", "10:23", "10:24", "10:24", "10:25", "10:25"];

export default function WhatsAppDemo() {
  const [activeDemo, setActiveDemo] = useState("ferreteria");
  const [messages, setMessages] = useState<{ side: "out" | "in"; text: string; time: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });
  const bodyRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const scrollToBottom = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  const playConversation = useCallback(
    (demoId: string, instant = false) => {
      clearTimeouts();
      const conv = conversations[demoId];
      if (!conv) return;

      if (instant) {
        setMessages(
          conv.map((m, i) => ({
            ...m,
            time: timeTemplates[Math.min(i, timeTemplates.length - 1)],
          }))
        );
        setIsTyping(false);
        return;
      }

      setMessages([]);
      setIsTyping(false);
      let delay = 180;

      conv.forEach((msg, index) => {
        const time = timeTemplates[Math.min(index, timeTemplates.length - 1)];

        if (msg.side === "out") {
          const t = setTimeout(() => {
            setMessages((prev) => [...prev, { ...msg, time }]);
            scrollToBottom();
          }, delay);
          timeoutsRef.current.push(t);
          delay += 900;
        } else {
          const t1 = setTimeout(() => {
            setIsTyping(true);
            scrollToBottom();
            const t2 = setTimeout(() => {
              setIsTyping(false);
              setMessages((prev) => [...prev, { ...msg, time }]);
              scrollToBottom();
            }, 780);
            timeoutsRef.current.push(t2);
          }, delay);
          timeoutsRef.current.push(t1);
          delay += 1680;
        }
      });
    },
    [clearTimeouts, scrollToBottom]
  );

  useEffect(() => {
    if (isInView && !hasPlayed) {
      setHasPlayed(true);
      playConversation(activeDemo);
    }
  }, [isInView, hasPlayed, activeDemo, playConversation]);

  const handleTabChange = (demoId: string) => {
    setActiveDemo(demoId);
    playConversation(demoId, false);
  };

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  const active = demos.find((d) => d.id === activeDemo)!;

  return (
    <section id="demo-rubros" ref={sectionRef} className="py-24 md:py-28">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#3b82f6]">
          DEMO POR RUBRO
        </p>
        <h2 className="mb-4 font-[family-name:var(--font-barlow)] text-3xl font-extrabold leading-tight tracking-tight md:text-[2.4rem]">
          Así responde tu WhatsApp cuando tú no estás.
        </h2>
        <p className="mb-10 text-lg text-[#7a8ba5]">
          Elige un rubro y mira una conversación típica automática.
        </p>

        <div className="grid gap-4 md:grid-cols-[320px_1fr] md:gap-7">
          {/* Tabs */}
          <div className="flex gap-2.5 overflow-x-auto pb-1.5 snap-x snap-proximity md:flex-col md:overflow-visible md:pb-0">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => handleTabChange(demo.id)}
                className={`flex snap-start flex-col gap-1.5 rounded-[10px] border p-4 text-left transition-all duration-300 md:w-full ${
                  activeDemo === demo.id
                    ? "border-[rgba(59,130,246,0.5)] bg-gradient-to-b from-[rgba(59,130,246,0.12)] to-[rgba(10,10,18,0.98)] shadow-[0_8px_24px_rgba(59,130,246,0.1)]"
                    : "border-white/[0.06] bg-white/[0.03] hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-white/[0.055]"
                }`}
                role="tab"
                aria-selected={activeDemo === demo.id}
              >
                <span className="text-sm font-bold leading-snug">
                  {activeDemo === demo.id && `${demo.emoji} `}
                  {demo.title}
                </span>
                <span className="text-xs text-[#7a8ba5]">{demo.copy}</span>
              </button>
            ))}
          </div>

          {/* Phone mockup */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0f0f1a] shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
            {/* Status bar */}
            <div className="flex items-center justify-between bg-[#06080c] px-3.5 py-1 text-[11px] text-white/40">
              <span>10:23</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] tracking-tight">●●●●○</span>
                <span>🔋</span>
              </div>
            </div>

            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-white/[0.06] bg-gradient-to-b from-[#080c14] to-[#060a10] px-3.5 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(59,130,246,0.1)] text-lg">
                {active.emoji}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{active.title}</div>
                <div className="flex items-center gap-1 text-[11px] text-[#7a8ba5]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                  {active.copy}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={bodyRef}
              className="flex min-h-[460px] flex-col gap-2 overflow-y-auto bg-[#080810] px-3 py-4"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(20,20,30,0.5) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                  className={`flex max-w-[88%] ${
                    msg.side === "out" ? "self-end" : "self-start"
                  }`}
                >
                  <div
                    className={`relative rounded-[10px] px-3 py-2 text-[13px] leading-relaxed whitespace-pre-line ${
                      msg.side === "out"
                        ? "rounded-tr-[3px] bg-[#0b4a3e] text-[#dceee8]"
                        : "rounded-tl-[3px] bg-white/[0.06] text-[#e4e4e4]"
                    }`}
                  >
                    {msg.text}
                    <span className="ml-2 text-[9px] text-white/25">
                      {msg.time} {msg.side === "out" && "✓✓"}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex max-w-[88%] self-start">
                  <div className="flex items-center gap-1 rounded-[10px] rounded-tl-[3px] bg-white/[0.06] px-3 py-2.5">
                    <span className="h-1.5 w-1.5 animate-[typingPulse_1s_infinite_ease-in-out] rounded-full bg-white/60" />
                    <span className="h-1.5 w-1.5 animate-[typingPulse_1s_infinite_ease-in-out] rounded-full bg-white/60 [animation-delay:0.16s]" />
                    <span className="h-1.5 w-1.5 animate-[typingPulse_1s_infinite_ease-in-out] rounded-full bg-white/60 [animation-delay:0.32s]" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
