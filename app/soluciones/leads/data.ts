export type DemoMode = "ai" | "traditional";

export interface LeadItem {
  name: string;
  preview: string;
  source: string;
  score: number;
  temp: string;
  column: string;
  time: string;
  tags: string[];
  isSystem?: boolean;
}

export interface Scenario {
  emoji: string;
  name: string;
  leads: LeadItem[];
}

export const TAGS: Record<string, { label: string; className: string }> = {
  hot: { label: "🔥 Hot", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  warm: { label: "🌡️ Warm", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  cold: { label: "❄️ Cold", className: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
  whatsapp: { label: "💬 WhatsApp", className: "bg-green-500/10 text-green-400 border-green-500/20" },
  web: { label: "🌐 Web", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  instagram: { label: "📸 Instagram", className: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  form: { label: "📝 Form", className: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
};

export const SCENARIOS: Record<string, Scenario> = {
  inmobiliaria: {
    emoji: "🏠",
    name: "Inmobiliaria Raíces Sur",
    leads: [
      { name: "Andrés K.", preview: "Vi el departamento en Paicaví en su web. ¿Podría agendar una visita para este fin de semana?", source: "web", score: 92, temp: "hot", column: "listo", time: "1m", tags: ["hot", "web"] },
      { name: "Valentina N.", preview: "Hola, estoy buscando arriendo para estudiante cerca de la UdeC. ¿Tienen opciones?", source: "whatsapp", score: 78, temp: "warm", column: "calificado", time: "4m", tags: ["warm", "whatsapp"] },
      { name: "Roberto M.", preview: "Me interesa la casa en San Pedro. ¿Aceptan pie del 10%?", source: "form", score: 85, temp: "hot", column: "calificado", time: "8m", tags: ["hot", "form"] },
      { name: "Camila S.", preview: "Estoy cotizando en varias inmobiliarias. ¿Cuál es el precio final con gastos operacionales?", source: "instagram", score: 45, temp: "cold", column: "nuevo", time: "12m", tags: ["cold", "instagram"] },
      { name: "Diego P.", preview: "Necesito vender mi propiedad en Hualpén. ¿Hacen tasación gratuita?", source: "whatsapp", score: 88, temp: "hot", column: "listo", time: "15m", tags: ["hot", "whatsapp"] },
      { name: "Javiera L.", preview: "Vi su publicidad en Instagram. Me gustaría recibir el dossier de proyectos nuevos.", source: "instagram", score: 55, temp: "warm", column: "nuevo", time: "22m", tags: ["warm", "instagram"] },
    ],
  },
  automotriz: {
    emoji: "🚗",
    name: "Automotriz Surmotors",
    leads: [
      { name: "Felipe R.", preview: "Quiero agendar test drive del SUV nuevo. Tengo la cotización de la competencia.", source: "whatsapp", score: 95, temp: "hot", column: "listo", time: "2m", tags: ["hot", "whatsapp"] },
      { name: "María José T.", preview: "¿Tienen financiamiento para el sedan 2024? Cuota inicial de $2.000.000", source: "form", score: 82, temp: "warm", column: "calificado", time: "5m", tags: ["warm", "form"] },
      { name: "Carlos H.", preview: "Estoy comparando precios de mantención. ¿Tienen programa de servicio prepagado?", source: "web", score: 40, temp: "cold", column: "nuevo", time: "9m", tags: ["cold", "web"] },
      { name: "Daniela V.", preview: "Vi en Instagram que tienen bonificación. ¿Aplica para el modelo híbrido?", source: "instagram", score: 76, temp: "warm", column: "calificado", time: "14m", tags: ["warm", "instagram"] },
      { name: "Hugo S.", preview: "Necesito flota de 5 camionetas para mi empresa. ¿Tienen precio corporativo?", source: "whatsapp", score: 90, temp: "hot", column: "listo", time: "18m", tags: ["hot", "whatsapp"] },
      { name: "Paula G.", preview: "Mi auto tiene 3 años, ¿lo toman en parte de pago? Quiero cambiar a uno más grande.", source: "web", score: 68, temp: "warm", column: "nuevo", time: "25m", tags: ["warm", "web"] },
    ],
  },
  educacion: {
    emoji: "🎓",
    name: "Instituto Eduka",
    leads: [
      { name: "Laura M.", preview: "Quiero matricularme en el diplomado de Marketing Digital. ¿Hay cupos para julio?", source: "form", score: 94, temp: "hot", column: "listo", time: "1m", tags: ["hot", "form"] },
      { name: "Pedro A.", preview: "¿El curso de Programación tiene certificación? Y si trabajo, ¿hay horario vespertino?", source: "whatsapp", score: 72, temp: "warm", column: "calificado", time: "6m", tags: ["warm", "whatsapp"] },
      { name: "Sofía C.", preview: "Estoy cotizando entre 3 institutos. ¿Cuál es el valor con descuento por pago anticipado?", source: "web", score: 48, temp: "cold", column: "nuevo", time: "10m", tags: ["cold", "web"] },
      { name: "Joaquín B.", preview: "Vi su reel en Instagram. Me interesa el curso de Diseño UX. ¿Puedo pagar en cuotas?", source: "instagram", score: 81, temp: "warm", column: "calificado", time: "13m", tags: ["warm", "instagram"] },
      { name: "Ana P.", preview: "Soy egresada de otra carrera. ¿Puedo convalidar materias en el diplomado de Data?", source: "form", score: 87, temp: "hot", column: "listo", time: "17m", tags: ["hot", "form"] },
      { name: "Tomás R.", preview: "Me gustaría recibir el brochure completo de carreras técnicas. Gracias.", source: "web", score: 35, temp: "cold", column: "nuevo", time: "24m", tags: ["cold", "web"] },
    ],
  },
  dental: {
    emoji: "🦷",
    name: "Dental Sonría",
    leads: [
      { name: "Natalia F.", preview: "Tengo mucho dolor de muela. ¿Tienen hora para hoy o mañana? Pago particular.", source: "whatsapp", score: 96, temp: "hot", column: "listo", time: "1m", tags: ["hot", "whatsapp"] },
      { name: "Ricardo D.", preview: "Necesito presupuesto para implantes. ¿Tienen convenio con Seguro Médico Plus?", source: "form", score: 84, temp: "warm", column: "calificado", time: "5m", tags: ["warm", "form"] },
      { name: "Catalina M.", preview: "Vi su promoción de blanqueamiento en Instagram. ¿Aún está vigente?", source: "instagram", score: 58, temp: "warm", column: "nuevo", time: "11m", tags: ["warm", "instagram"] },
      { name: "Luis O.", preview: "Quiero agendar limpieza dental para toda mi familia (4 personas). ¿Hay descuento grupal?", source: "whatsapp", score: 79, temp: "warm", column: "calificado", time: "16m", tags: ["warm", "whatsapp"] },
      { name: "Fernanda F.", preview: "Me duele la encía desde ayer. ¿Es urgencia? ¿Cuánto cuesta la consulta?", source: "web", score: 91, temp: "hot", column: "listo", time: "19m", tags: ["hot", "web"] },
      { name: "Miguel Ángel", preview: "Solo consultando precios de ortodoncia invisible. Aún estoy decidiendo.", source: "web", score: 42, temp: "cold", column: "nuevo", time: "28m", tags: ["cold", "web"] },
    ],
  },
  muebles: {
    emoji: "🛋️",
    name: "Muebles El Roble",
    leads: [
      { name: "Patricia S.", preview: "Quiero comprar el comedor de 8 sillas. ¿Tienen stock? Necesito entrega para el sábado.", source: "whatsapp", score: 93, temp: "hot", column: "listo", time: "2m", tags: ["hot", "whatsapp"] },
      { name: "Esteban W.", preview: "¿Hacen muebles a medida? Necesito un closet empotrado de 3.20m de ancho.", source: "form", score: 80, temp: "warm", column: "calificado", time: "7m", tags: ["warm", "form"] },
      { name: "Daniela C.", preview: "Estoy viendo opciones de sofá cama. ¿Tienen catálogo completo en PDF?", source: "web", score: 50, temp: "cold", column: "nuevo", time: "11m", tags: ["cold", "web"] },
      { name: "Alejandro N.", preview: "Vi su publicación en Instagram del juego de terraza. ¿Aplica despacho gratis a San Pedro?", source: "instagram", score: 74, temp: "warm", column: "calificado", time: "15m", tags: ["warm", "instagram"] },
      { name: "Victoria P.", preview: "Necesito amoblar un departamento completo. ¿Tienen asesoría de interiorismo?", source: "whatsapp", score: 89, temp: "hot", column: "listo", time: "20m", tags: ["hot", "whatsapp"] },
      { name: "Bruno K.", preview: "Solo cotizando precios por ahora. Me contactaré en un par de meses.", source: "web", score: 30, temp: "cold", column: "nuevo", time: "26m", tags: ["cold", "web"] },
    ],
  },
};

export const TRADITIONAL_MESSAGES: LeadItem[] = [
  { name: "Sistema", preview: "Tienes 14 leads sin clasificar. 6 mensajes de WhatsApp no fueron respondidos.", source: "", score: 0, temp: "", column: "", time: "ahora", tags: [], isSystem: true },
  { name: "Sistema", preview: 'Lead "Andrés K. — visita fin de semana" lleva 3 días sin seguimiento asignado.', source: "", score: 0, temp: "", column: "", time: "ahora", tags: [], isSystem: true },
];

export const COLUMNS = [
  { key: "nuevo", label: "Nuevos", dotColor: "#60a5fa", dotGlow: "rgba(96,165,250,0.4)" },
  { key: "calificado", label: "Calificados", dotColor: "#fbbf24", dotGlow: "rgba(251,191,36,0.4)" },
  { key: "listo", label: "Listos para cerrar", dotColor: "#4ade80", dotGlow: "rgba(74,222,128,0.4)" },
] as const;
