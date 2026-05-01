"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const basePlans = [
  {
    id: "basico",
    name: "Básico",
    description: "Ideal para empezar. Respuestas automáticas a las preguntas más frecuentes.",
    setup: "Setup único $99.990",
    price: "$49.990",
    features: [
      "Agente WhatsApp 24/7",
      "Preguntas frecuentes",
      "Soporte por WhatsApp",
    ],
    cta: "Agendar demo",
    featured: false,
    color: "#7a8ba5",
    glow: "rgba(122,139,165,0.12)",
  },
  {
    id: "estandar",
    name: "Estándar",
    description: "Lo más pedido. WhatsApp + catálogo + agendamiento + email inteligente.",
    setup: "Setup único $99.990",
    price: "$89.990",
    features: [
      "Todo en Básico",
      "Catálogo de productos",
      "Agendamiento automático",
      "Email inteligente",
    ],
    cta: "Agendar demo",
    featured: true,
    badge: "Más popular",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para negocios con alto volumen. Flujos personalizados y prioridad.",
    setup: "Setup único $99.990",
    price: "$149.990",
    features: [
      "Todo en Estándar",
      "Captura y calificación de leads",
      "Asistente de Telegram",
      "Flujos personalizados",
      "Soporte prioritario",
    ],
    cta: "Agendar demo",
    featured: false,
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    id: "amedida",
    name: "A medida",
    description: "Soluciones personalizadas para empresas con operaciones complejas y múltiples sucursales.",
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
    color: "#ec4899",
    glow: "rgba(236,72,153,0.15)",
  },
];

const BASE_LEN = basePlans.length;
const plans = [
  ...basePlans,
  ...basePlans,
  ...basePlans,
];
const BLOCK0_START = BASE_LEN;
const SAFE_START = BASE_LEN;
const SAFE_END = BASE_LEN * 2 - 1;

export default function Pricing() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(BLOCK0_START + 1);
  const [dims, setDims] = useState({ containerWidth: 0, cardWidth: 320, gap: 20 });
  const [noTransition, setNoTransition] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const lastWheelTime = useRef(0);
  const jumpTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate dimensions via ResizeObserver for accuracy during breakpoint transitions
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let roTimeout: ReturnType<typeof setTimeout> | null = null;
    const lastWidthRef = { current: 0 };
    const ro = new ResizeObserver((entries) => {
      if (roTimeout) clearTimeout(roTimeout);
      roTimeout = setTimeout(() => {
        for (const entry of entries) {
          const w = window.innerWidth;
          const cr = entry.contentRect;
          const containerW = cr.width;
          // Ignore height-only changes (Chrome mobile toolbar show/hide)
          if (Math.abs(containerW - lastWidthRef.current) < 1) return;
          lastWidthRef.current = containerW;

          const cardW = w < 768 ? Math.min(320, containerW * 0.82) : 340;
          const g = w < 768 ? 16 : 24;

          setDims((prev) => {
            if (
              prev.containerWidth === containerW &&
              prev.cardWidth === cardW &&
              prev.gap === g
            ) {
              return prev;
            }
            return { containerWidth: containerW, cardWidth: cardW, gap: g };
          });
        }
      }, 150);
    });

    ro.observe(wrapper);
    return () => {
      ro.disconnect();
      if (roTimeout) clearTimeout(roTimeout);
    };
  }, []);

  const centerOffset = dims.containerWidth > 0
    ? (dims.containerWidth - dims.cardWidth) / 2
    : 0;

  const translateX = centerOffset - (activeIndex * (dims.cardWidth + dims.gap));

  const doJump = useCallback((targetIndex: number) => {
    setNoTransition(true);
    setActiveIndex(targetIndex);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setNoTransition(false);
        setIsTransitioning(false);
      });
    });
  }, []);

  const scheduleJumpIfNeeded = useCallback((index: number) => {
    if (index >= SAFE_START && index <= SAFE_END) {
      setIsTransitioning(false);
      return;
    }
    const target = index < SAFE_START ? index + BASE_LEN : index - BASE_LEN;
    if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    jumpTimeoutRef.current = setTimeout(() => {
      doJump(target);
    }, 520);
  }, [doJump]);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    scheduleJumpIfNeeded(index);
  }, [isTransitioning, scheduleJumpIfNeeded]);

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    const nextIndex = activeIndex + 1;
    if (nextIndex >= plans.length) {
      doJump(BLOCK0_START);
    } else {
      goTo(nextIndex);
    }
  }, [activeIndex, isTransitioning, goTo, doJump]);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    const prevIndex = activeIndex - 1;
    if (prevIndex < 0) {
      doJump(BLOCK0_START + BASE_LEN - 1);
    } else {
      goTo(prevIndex);
    }
  }, [activeIndex, isTransitioning, goTo, doJump]);

  const goToRealIndex = (realIndex: number) => {
    const target = BLOCK0_START + realIndex;
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(target);
    scheduleJumpIfNeeded(target);
  };

  // Touch swipe
  const goNextRef = useRef(goNext);
  const goPrevRef = useRef(goPrev);
  useEffect(() => {
    goNextRef.current = goNext;
    goPrevRef.current = goPrev;
  }, [goNext, goPrev]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let direction: "none" | "horizontal" | "vertical" = "none";
    const SWIPE_THRESHOLD = 28;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      currentX = touch.clientX;
      direction = "none";
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      currentX = touch.clientX;
      const diffX = currentX - startX;
      const diffY = touch.clientY - startY;

      if (direction === "none" && (Math.abs(diffX) > 4 || Math.abs(diffY) > 4)) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
          direction = "horizontal";
        } else {
          direction = "vertical";
        }
      }

      if (direction === "horizontal") {
        e.preventDefault();
      }
    };

    const onTouchEnd = () => {
      if (direction === "horizontal") {
        const diff = currentX - startX;
        if (diff < -SWIPE_THRESHOLD) {
          goNextRef.current();
        } else if (diff > SWIPE_THRESHOLD) {
          goPrevRef.current();
        }
      }
      direction = "none";
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    };
  }, []);

  const realActiveIndex = activeIndex % BASE_LEN;

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    if (Math.abs(e.deltaX) < 45) return;
    const now = Date.now();
    if (now - lastWheelTime.current < 600) return;
    lastWheelTime.current = now;
    e.preventDefault();
    if (e.deltaX > 0) goNext();
    else goPrev();
  };

  return (
    <section id="precios" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -top-[200px] -right-[100px] h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-[1120px]">
        {/* Header */}
        <div className="px-5 md:px-8">
          <h2 className="mb-4 font-[family-name:var(--font-barlow)] text-3xl font-extrabold leading-tight tracking-tight md:text-[2.4rem]">
            Planes simples. Resultados reales.
          </h2>
          <p className="mb-12 max-w-xl text-lg leading-relaxed text-[#7a8ba5]">
            Todos los planes incluyen mensajes ilimitados, soporte y actualizaciones.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative select-none">
          {/* Prev arrow */}
          <button
            onClick={goPrev}
            className="absolute top-1/2 left-2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.08] bg-[rgba(5,5,8,0.8)] text-white backdrop-blur-md transition-all hover:scale-110 hover:border-white/[0.2] md:flex"
            aria-label="Anterior"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={goNext}
            className="absolute top-1/2 right-2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.08] bg-[rgba(5,5,8,0.8)] text-white backdrop-blur-md transition-all hover:scale-110 hover:border-white/[0.2] md:flex"
            aria-label="Siguiente"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Viewport */}
          <div
            ref={wrapperRef}
            className="overflow-hidden px-5 pt-10 md:px-8 md:pt-12"
            onWheel={onWheel}
          >
            {/* Track */}
            <div
              className="flex"
              style={{
                gap: dims.gap,
                transform: `translateX(${translateX}px)`,
                transition: noTransition ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "transform",
              }}
            >
              {plans.map((plan, i) => {
                const realIdx = i % BASE_LEN;
                const isCenter = realIdx === realActiveIndex;

                return (
                  <div
                    key={`${plan.id}-${i}`}
                    className="shrink-0"
                    style={{ width: dims.cardWidth }}
                  >
                    <div
                      className={`group relative flex h-full flex-col rounded-3xl border p-6 duration-500 md:p-8 ${plan.featured && isCenter ? "pt-10 md:pt-12" : ""}`}
                      style={{
                        borderColor: isCenter ? `${plan.color}35` : "rgba(255,255,255,0.06)",
                        background: isCenter
                          ? `linear-gradient(145deg, ${plan.glow}, transparent 60%), rgba(255,255,255,0.025)`
                          : "rgba(255,255,255,0.01)",
                        transform: isCenter ? "scale(1)" : "scale(0.94)",
                        opacity: isCenter ? 1 : 0.5,
                        transitionProperty: "transform, opacity",
                      }}
                    >
                      {plan.featured && isCenter && (
                        <>
                          <span
                            className="absolute -top-4 left-6 z-10 rounded-full px-3.5 py-1 text-[11px] font-bold tracking-wide text-white shadow-lg"
                            style={{ background: `linear-gradient(to right, ${plan.color}, ${plan.color}dd)` }}
                          >
                            {plan.badge}
                          </span>
                          <div
                            className="pointer-events-none absolute inset-0 rounded-3xl p-[1.5px]"
                            style={{
                              background: `linear-gradient(135deg, ${plan.color}, ${plan.color}aa, ${plan.color})`,
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
                      <p className="mb-6 text-sm leading-relaxed text-[#7a8ba5]">
                        {plan.description}
                      </p>

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
                            <span className="absolute left-0 text-xs font-bold" style={{ color: isCenter ? plan.color : "#3b82f6" }}>
                              ✓
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <a
                        href="https://wa.link/lp8er3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex w-full items-center justify-center rounded-xl py-3.5 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: isCenter ? plan.color : "rgba(255,255,255,0.06)",
                          color: isCenter ? "#fff" : "#7a8ba5",
                        }}
                      >
                        {plan.cta}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2.5 px-5 md:px-8">
          {basePlans.map((plan, i) => (
            <button
              key={plan.id}
              onClick={() => goToRealIndex(i)}
              className="relative h-2.5 rounded-full transition-all duration-300"
              style={{
                width: realActiveIndex === i ? 32 : 10,
                background: realActiveIndex === i ? plan.color : "rgba(255,255,255,0.15)",
              }}
              aria-label={`Ir a ${plan.name}`}
            />
          ))}
        </div>

        {/* Mobile hint */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#7a8ba5] md:hidden">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="M12 5l-7 7 7 7" />
          </svg>
          Desliza o toca las flechas
        </div>

        <p className="mt-6 text-center text-sm text-[#7a8ba5]">
          * Todos los precios son por sucursal. ¿Tienes más de una? Escríbenos para un precio
          especial.
        </p>
      </div>
    </section>
  );
}
