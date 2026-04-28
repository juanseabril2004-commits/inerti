import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FloatingButtons from "@/app/components/FloatingButtons";

export const metadata: Metadata = {
  title: "Blog — INERTI",
  description: "Artículos, guías y recursos sobre inteligencia artificial para PyMEs chilenas.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="pb-8 pt-24 md:pt-32">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#3b82f6]">
              BLOG
            </p>
            <h1 className="mb-6 font-[family-name:var(--font-barlow)] text-4xl font-black leading-[1.08] tracking-tight md:text-6xl">
              Recursos para tu <span className="gradient-text">negocio</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#7a8ba5]">
              Artículos, guías y estrategias sobre inteligencia artificial, automatización y
              crecimiento para PyMEs chilenas.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Cómo elegir un agente de WhatsApp para tu negocio",
                  excerpt:
                    "Guía práctica para evaluar proveedores de IA conversacional en Chile: qué preguntar, qué evitar y cómo medir resultados.",
                  date: "Abril 2026",
                },
                {
                  title: "5 señales de que tu negocio necesita automatización",
                  excerpt:
                    "Si reconoces alguna de estas situaciones, es momento de considerar un asistente virtual para tu atención al cliente.",
                  date: "Marzo 2026",
                },
                {
                  title: "IA para PyMEs: mitos y realidades",
                  excerpt:
                    "Desmentimos las ideas equivocadas más comunes sobre implementar inteligencia artificial en negocios pequeños y medianos.",
                  date: "Marzo 2026",
                },
              ].map((post) => (
                <div
                  key={post.title}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-[12px] transition-all hover:-translate-y-1 hover:border-white/[0.12]"
                >
                  <span className="mb-3 block text-xs text-[#7a8ba5]">{post.date}</span>
                  <h3 className="mb-3 font-[family-name:var(--font-barlow)] text-lg font-bold text-white transition-colors group-hover:text-[#3b82f6]">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#7a8ba5]">{post.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
