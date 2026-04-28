import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import Hero from "./sections/Hero";
import ProofBar from "./sections/ProofBar";
import Solutions from "./sections/Solutions";
import Problems from "./sections/Problems";
import Trust from "./sections/Trust";
import Steps from "./sections/Steps";
import Pricing from "./sections/Pricing";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProofBar />
        <Solutions />
        <Problems />
        <Trust />
        <Steps />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingButtons />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "INERTI",
            description:
              "Soluciones de inteligencia artificial para PyMEs chilenas: agente de WhatsApp, captura de leads, gestión de emails y automatización de procesos.",
            url: "https://inerti.cl",
            logo: "https://inerti.cl/assets/inerti-header.png",
            image: "https://inerti.cl/assets/inerti-header.png",
            email: "hola@inerti.cl",
            telephone: "+56958049391",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Concepción",
              addressCountry: "CL",
            },
            areaServed: {
              "@type": "Country",
              name: "Chile",
            },
            priceRange: "$49.990 - $119.990 CLP/mes",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "¿Mis clientes notarán que es un bot?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "El asistente responde de forma natural y personalizada según tu negocio. La mayoría de los clientes no notan la diferencia.",
                },
              },
              {
                "@type": "Question",
                name: "¿Qué pasa si no sabe responder?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Si recibe una pregunta que no puede resolver, te avisa de inmediato para que tú tomes el control. Nunca inventará información.",
                },
              },
              {
                "@type": "Question",
                name: "¿Cómo actualizo precios o inventario?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Te damos acceso a un panel simple donde puedes actualizar precios, productos y respuestas cuando quieras.",
                },
              },
              {
                "@type": "Question",
                name: "¿Necesito cambiar mi número de WhatsApp?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. El asistente funciona con tu número actual de WhatsApp Business.",
                },
              },
              {
                "@type": "Question",
                name: "¿Hay contrato mínimo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Puedes cancelar cuando quieras. Sin contratos largos, sin penalizaciones.",
                },
              },
              {
                "@type": "Question",
                name: "¿Cuánto tarda la instalación?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "En general el asistente queda listo en 3–5 días hábiles después de la reunión inicial.",
                },
              },
              {
                "@type": "Question",
                name: "¿Puedo empezar con un módulo y agregar más después?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sí. Puedes empezar solo con el agente de WhatsApp y luego activar captura de leads, email inteligente o automatización de procesos.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
