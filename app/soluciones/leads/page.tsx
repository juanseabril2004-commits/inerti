import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FloatingButtons from "@/app/components/FloatingButtons";
import Link from "next/link";
import LeadsDemo from "./components/LeadsDemo";

export const metadata: Metadata = {
  title: "Demo Captura de Leads — INERTI",
  description:
    "Mira en vivo cómo la IA de INERTI identifica, califica y organiza tus leads automáticamente desde WhatsApp, web y redes sociales.",
};

export default function LeadsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="pb-6 pt-24 md:pt-32">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#7a8ba5] transition-colors hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Volver a inicio
            </Link>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.1em] text-[#f59e0b]">
              🎯 Nuevo módulo
            </span>
            <h1 className="mb-6 font-[family-name:var(--font-barlow)] text-4xl font-black leading-[1.08] tracking-tight md:text-6xl">
              Captura de <span className="gradient-text">Leads</span> con IA
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#7a8ba5]">
              Elige un rubro y mira cómo la IA identifica, califica y organiza tus prospectos
              automáticamente. Listos para cerrar.
            </p>
          </div>
        </section>

        {/* Interactive Demo */}
        <LeadsDemo />

        {/* Benefits */}
        <section className="border-t border-white/[0.06] py-20 md:py-24">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                { icon: "🎯", title: "Calificación automática", text: "La IA lee cada conversación y asigna score sin que hagas nada." },
                { icon: "🔔", title: "Sin leads perdidos", text: "Todos entran al funnel, sin importar el canal de origen." },
                { icon: "💼", title: "Listos para cerrar", text: "Llegan con contexto, intención y prioridad ya definidos." },
              ].map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center backdrop-blur-[12px] transition-all hover:border-white/[0.1] hover:bg-white/[0.04]"
                >
                  <span className="mb-3 block text-3xl">{b.icon}</span>
                  <h3 className="mb-2 font-[family-name:var(--font-barlow)] text-base font-bold text-white">
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#7a8ba5]">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="mx-auto max-w-[600px] px-5">
            <h2 className="mb-4 font-[family-name:var(--font-barlow)] text-2xl font-extrabold text-white md:text-3xl">
              ¿Quieres esto para tu negocio?
            </h2>
            <p className="mb-8 text-[#7a8ba5]">
              Te mostramos cómo se adapta a tu operación específica. Sin compromiso.
            </p>
            <a
              href="https://wa.link/lp8er3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-[10px] bg-[#3b82f6] px-9 py-4 text-lg font-semibold text-white shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#60a5fa]"
            >
              Quiero esto para mi negocio
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
