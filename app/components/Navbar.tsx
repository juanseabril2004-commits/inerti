"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#soluciones", label: "Soluciones" },
  { href: "#demo-rubros", label: "Demo" },
  { href: "#precios", label: "Precios" },
  { href: "/blog", label: "Blog" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navbarHeight = 64;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 16;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-[100] border-b border-white/[0.06] transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(5,5,8,0.92)] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          : "bg-[rgba(5,5,8,0.7)]"
      } backdrop-blur-[16px]`}
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex-shrink-0" aria-label="INERTI inicio">
          <Image
            src="/assets/inerti-wordmark.png"
            alt="INERTI"
            width={120}
            height={40}
            className="h-[26px] w-auto object-contain"
            priority
          />
        </Link>

        <div
          className={`items-center gap-8 ${
            menuOpen
              ? "fixed inset-0 z-[105] flex flex-col justify-center bg-[rgba(5,5,8,0.97)] backdrop-blur-[24px]"
              : "hidden md:flex"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative text-sm font-medium transition-colors duration-300 hover:text-white ${
                menuOpen ? "text-2xl font-bold text-white" : "text-[#7a8ba5]"
              } group`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-[#3b82f6] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.link/lp8er3"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center rounded-[10px] bg-[#3b82f6] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(59,130,246,0.15)] transition-all hover:bg-[#60a5fa] hover:shadow-[0_8px_24px_rgba(59,130,246,0.15)] md:inline-flex"
          >
            Agendar demo
          </a>
          <button
            className="relative z-[110] flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
