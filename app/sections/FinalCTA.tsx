export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 text-center">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[600px] px-5">
        <h2 className="mb-4 font-[family-name:var(--font-barlow)] text-3xl font-extrabold leading-tight tracking-tight md:text-[2.4rem]">
          Tu negocio merece trabajar más inteligente.
        </h2>
        <p className="mb-10 text-lg text-[#7a8ba5]">
          Te mostramos cómo la IA se adapta a tu rubro. Sin compromiso.
        </p>
        <div className="flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center">
          <a
            href="https://wa.link/lp8er3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[10px] bg-[#3b82f6] px-9 py-4 text-lg font-semibold text-white shadow-[0_2px_8px_rgba(59,130,246,0.15)] transition-all hover:-translate-y-0.5 hover:bg-[#60a5fa] hover:shadow-[0_8px_24px_rgba(59,130,246,0.15)]"
          >
            Solicita tu demo gratis
          </a>
          <a
            href="#soluciones"
            className="inline-flex items-center justify-center rounded-[10px] border border-white/10 px-9 py-4 text-lg font-semibold text-[#7a8ba5] transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
          >
            Ver soluciones
          </a>
        </div>
      </div>
    </section>
  );
}
