"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import WhatsAppPreview from "@/app/components/previews/WhatsAppPreview";
import LeadsPreview from "@/app/components/previews/LeadsPreview";
import EmailPreview from "@/app/components/previews/EmailPreview";
import AssistantPreview from "@/app/components/previews/AssistantPreview";
import CustomPreview from "@/app/components/previews/CustomPreview";

const baseSolutions = [
  {
    id: "whatsapp",
    title: "Agente de WhatsApp",
    subtitle: "Tu negocio nunca duerme",
    description: "Responde, agenda y vende por WhatsApp 24/7. Tus clientes obtienen atención instantánea mientras tú descansas.",
    href: "/soluciones/whatsapp/",
    color: "#22c55e",
    glow: "rgba(34,197,94,0.15)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    preview: WhatsAppPreview,
    badge: "★ Más popular",
  },
  {
    id: "leads",
    title: "Captura de Leads",
    subtitle: "Nunca pierdas un cliente",
    description: "Identifica, califica y organiza prospectos automáticamente desde WhatsApp, web y redes sociales.",
    href: "/soluciones/leads/",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    preview: LeadsPreview,
  },
  {
    id: "email",
    title: "Email Inteligente",
    subtitle: "Bandeja cero, estrés cero",
    description: "Clasifica, responde y deriva correos automáticamente. Los urgentes te llegan, el resto se resuelve solo.",
    href: "/soluciones/email/",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" />
      </svg>
    ),
    preview: EmailPreview,
  },
  {
    id: "asistente",
    title: "Asistente Personal",
    subtitle: "Tu negocio en una mirada",
    description: "Tu IA privada que resume ventas, mensajes, citas y leads cada mañana. Te avisa lo importante antes de que lo pidas.",
    href: "/soluciones/asistente/",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.15)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
    preview: AssistantPreview,
  },
  {
    id: "custom",
    title: "Soluciones Personalizadas",
    subtitle: "Hecho a tu medida",
    description: "¿Ninguna solución estándar cubre lo que necesitas? Cuéntanos tu negocio y diseñamos una IA a medida para ti.",
    href: "https://wa.link/lp8er3",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.15)",
    external: true,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    preview: CustomPreview,
    ctaLabel: "Contanos tu negocio",
  },
];

const BASE_LEN = baseSolutions.length;
// Triple buffer: [-1] [0] [+1] — enough for swipe transitions
const solutions = [
  ...baseSolutions, // block -1 (0-4)
  ...baseSolutions, // block 0  (5-9) START
  ...baseSolutions, // block +1 (10-14)
];
const BLOCK0_START = BASE_LEN; // 5
const SAFE_START = BASE_LEN; // 5
const SAFE_END = BASE_LEN * 2 - 1; // 9

export default function Solutions() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(BLOCK0_START);
  const [dims, setDims] = useState({ containerWidth: 0, cardWidth: 320, gap: 20 });
  const [noTransition, setNoTransition] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Touch/drag state (refs to avoid React re-renders during scroll)
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const dragCurrentX = useRef(0);
  const dragCurrentY = useRef(0);
  const hasMoved = useRef(false);
  const isVerticalScroll = useRef(false);
  const lastWheelTime = useRef(0);
  const jumpTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate dimensions
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const containerW = wrapperRef.current?.clientWidth || w;
      const cardW = w < 768 ? Math.min(320, containerW * 0.82) : 400;
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
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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
    // We're outside the safe 3-block zone, jump back one block
    const target = index < SAFE_START ? index + BASE_LEN : index - BASE_LEN;
    if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    jumpTimeoutRef.current = setTimeout(() => {
      doJump(target);
    }, 520); // slightly after CSS transition (500ms)
  }, [doJump]);

  // Navigation
  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    scheduleJumpIfNeeded(index);
  }, [isTransitioning, scheduleJumpIfNeeded]);

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    const nextIndex = activeIndex + 1;
    if (nextIndex >= solutions.length) {
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

  // Touch / Mouse drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    dragCurrentX.current = e.clientX;
    dragCurrentY.current = e.clientY;
    hasMoved.current = false;
    isVerticalScroll.current = false;
    isDraggingRef.current = false;
    const el = e.currentTarget as HTMLElement;
    el.style.cursor = "grabbing";
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (isVerticalScroll.current) return;

    dragCurrentX.current = e.clientX;
    dragCurrentY.current = e.clientY;
    const diffX = dragCurrentX.current - dragStartX.current;
    const diffY = dragCurrentY.current - dragStartY.current;

    // On first meaningful movement, decide direction (low threshold for responsiveness)
    if (!hasMoved.current && (Math.abs(diffX) > 4 || Math.abs(diffY) > 4)) {
      hasMoved.current = true;
      if (Math.abs(diffY) > Math.abs(diffX)) {
        // Vertical — release capture so browser scrolls natively
        isVerticalScroll.current = true;
        isDraggingRef.current = false;
        const el = e.currentTarget as HTMLElement;
        el.style.cursor = "grab";
        el.releasePointerCapture?.(e.pointerId);
        return;
      }
      // Horizontal
      isDraggingRef.current = true;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = e.currentTarget as HTMLElement;
    el.style.cursor = "grab";

    if (isVerticalScroll.current || !isDraggingRef.current) {
      isDraggingRef.current = false;
      return;
    }

    isDraggingRef.current = false;
    const diff = dragCurrentX.current - dragStartX.current;
    const threshold = Math.min(40, Math.max(24, dims.cardWidth * 0.10));
    if (diff < -threshold) {
      goNext();
    } else if (diff > threshold) {
      goPrev();
    }
  };

  const onPointerLeave = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      (e.currentTarget as HTMLElement).style.cursor = "grab";
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  // Cleanup jump timeout
  useEffect(() => {
    return () => {
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    };
  }, []);

  const realActiveIndex = activeIndex % BASE_LEN;

  const onWheel = (e: React.WheelEvent) => {
    // Only react to clearly horizontal gestures
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
    <section id="soluciones" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -top-[200px] -right-[100px] h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-[1120px]">
        {/* Header */}
        <div className="px-5 md:px-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#3b82f6]">
            SOLUCIONES
          </p>
          <h2 className="mb-4 font-[family-name:var(--font-barlow)] text-3xl font-extrabold leading-tight tracking-tight md:text-[2.4rem]">
            Soluciones que trabajan mientras tú no.
          </h2>
          <p className="mb-12 max-w-xl text-lg leading-relaxed text-[#7a8ba5]">
            Desliza o usa las flechas para explorar. Cada módulo se adapta a tu negocio.
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
            className="overflow-hidden px-5 md:px-8"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerLeave}
            onWheel={onWheel}
            style={{
              cursor: "grab",
              touchAction: "pan-y",
              overscrollBehaviorX: "contain",
            }}
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
              {solutions.map((item, i) => {
                const Preview = item.preview;
                const realIdx = i % BASE_LEN;
                const isCenter = realIdx === realActiveIndex;

                return (
                  <div
                    key={`${item.id}-${i}`}
                    className="shrink-0"
                    style={{ width: dims.cardWidth }}
                  >
                    <div
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-6 duration-500 md:p-8"
                      style={{
                        borderColor: isCenter ? `${item.color}35` : "rgba(255,255,255,0.06)",
                        background: isCenter
                          ? `linear-gradient(145deg, ${item.glow}, transparent 60%), rgba(255,255,255,0.025)`
                          : "rgba(255,255,255,0.01)",
                        transform: isCenter ? "scale(1)" : "scale(0.94)",
                        opacity: isCenter ? 1 : 0.5,
                        transitionProperty: "transform, opacity",
                      }}
                    >
                      <div>
                        <div className="mb-6 flex items-start justify-between">
                          <div
                            className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300"
                            style={{ background: isCenter ? item.glow : "rgba(255,255,255,0.04)", color: isCenter ? item.color : "#7a8ba5" }}
                          >
                            {item.icon}
                          </div>
                          {item.badge && isCenter && (
                            <span className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide" style={{ background: item.glow, color: item.color }}>
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <div className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: isCenter ? item.color : "#7a8ba5" }}>
                          {item.subtitle}
                        </div>
                        <h3 className="mb-3 font-[family-name:var(--font-barlow)] text-2xl font-bold text-white md:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mb-6 text-sm leading-relaxed text-[#7a8ba5] md:text-base">
                          {item.description}
                        </p>

                        <div className="mb-6 flex justify-center">
                          <Preview />
                        </div>
                      </div>

                      <div className="mt-auto">
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            style={{ background: isCenter ? item.color : "rgba(255,255,255,0.06)", color: isCenter ? "#fff" : "#7a8ba5" }}
                          >
                            {item.ctaLabel || "Ver cómo funciona"}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                            </svg>
                          </a>
                        ) : item.href.startsWith("/") ? (
                          <Link
                            href={item.href}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            style={{ background: isCenter ? item.color : "rgba(255,255,255,0.06)", color: isCenter ? "#fff" : "#7a8ba5" }}
                          >
                            Ver cómo funciona
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                            </svg>
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            style={{ background: isCenter ? item.color : "rgba(255,255,255,0.06)", color: isCenter ? "#fff" : "#7a8ba5" }}
                          >
                            Ver cómo funciona
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2.5 px-5 md:px-8">
          {baseSolutions.map((item, i) => (
            <button
              key={item.id}
              onClick={() => goToRealIndex(i)}
              className="relative h-2.5 rounded-full transition-all duration-300"
              style={{
                width: realActiveIndex === i ? 32 : 10,
                background: realActiveIndex === i ? item.color : "rgba(255,255,255,0.15)",
              }}
              aria-label={`Ir a ${item.title}`}
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
      </div>
    </section>
  );
}
