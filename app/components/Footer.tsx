import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-9">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-5 md:px-8">
        <div className="flex-shrink-0">
          <Image
            src="/assets/inerti-wordmark.png"
            alt="INERTI"
            width={160}
            height={52}
            className="h-[38px] w-auto object-contain opacity-80"
          />
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-xs text-[#7a8ba5]">Concepción, Chile · Siempre presente</p>
          <a
            href="mailto:hola@inerti.cl"
            className="text-xs text-[#7a8ba5] transition-colors hover:text-[#3b82f6]"
          >
            hola@inerti.cl
          </a>
          <Link
            href="/privacy"
            className="text-xs text-[#7a8ba5] transition-colors hover:text-[#3b82f6]"
          >
            Política de Privacidad
          </Link>
        </div>

        <p className="text-[11px] text-[#444]">© 2026 INERTI</p>
      </div>
    </footer>
  );
}
