import type { Metadata, Viewport } from "next";
import { Barlow, Inter } from "next/font/google";
import "./globals.css";
import GlobalParticles from "@/app/components/GlobalParticles";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "INERTI — Soluciones de IA para tu negocio",
  description:
    "INERTI potencia tu PyME con inteligencia artificial: agente de WhatsApp 24/7, captura de leads, gestión automática de emails y automatización de procesos. Concepción, Chile.",
  metadataBase: new URL("https://inerti.cl"),
  openGraph: {
    title: "INERTI — Soluciones de IA para tu negocio",
    description:
      "Automatiza WhatsApp, captura leads, gestiona emails y optimiza procesos con IA diseñada para PyMEs chilenas.",
    type: "website",
    locale: "es_CL",
    url: "https://inerti.cl",
    images: ["https://inerti.cl/assets/inerti-header.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "INERTI — Soluciones de IA para tu negocio",
    description:
      "Automatiza WhatsApp, captura leads, gestiona emails y optimiza procesos con IA diseñada para PyMEs chilenas.",
    images: ["https://inerti.cl/assets/inerti-header.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${barlow.variable} ${inter.variable} antialiased dark`}
    >
      <body className="min-h-svh flex flex-col bg-[#050508] text-[#f0f2f5] font-[family-name:var(--font-inter)]">
        <GlobalParticles quantity={40} opacity={0.35} />
        {children}
      </body>
    </html>
  );
}
