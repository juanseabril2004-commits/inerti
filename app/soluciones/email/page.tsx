import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FloatingButtons from "@/app/components/FloatingButtons";
import Link from "next/link";
import EmailDemo from "./components/EmailDemo";

export const metadata: Metadata = {
  title: "Demo Email Inteligente — INERTI",
  description:
    "Mira en vivo cómo la IA de INERTI clasifica, responde y gestiona tu bandeja de entrada automáticamente. Elige un escenario y pruébalo.",
};

export default function EmailPage() {
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
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.1em] text-[#3b82f6]">
              ✉️ Nuevo módulo
            </span>
            <h1 className="mb-6 font-[family-name:var(--font-barlow)] text-4xl font-black leading-[1.08] tracking-tight md:text-6xl">
              Email <span className="gradient-text">Inteligente</span> con IA
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#7a8ba5]">
              Elige un escenario y mira cómo la IA clasifica, prioriza y responde tu correo
              automáticamente. Sin que tú levantes un dedo.
            </p>
          </div>
        </section>

        {/* Interactive Demo */}
        <EmailDemo />

        {/* Benefits */}
        <section className="border-t border-white/[0.06] py-20 md:py-24">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                { icon: "🏷️", title: "Clasificación automática", text: "Cada email llega etiquetado por urgencia, tipo y remitente. Sin que tú hagas nada." },
                { icon: "✍️", title: "Respuestas inteligentes", text: "La IA responde consultas frecuentes, confirma citas y deriva lo complejo a ti." },
                { icon: "🎯", title: "Nada se pierde", text: "Los urgentes se priorizan, el spam se filtra y lo interno se organiza solo." },
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
