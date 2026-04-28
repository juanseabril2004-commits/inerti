export type DemoMode = "ai" | "traditional";

export interface ChatMessage {
  type: "out" | "in";
  text: string;
  isSystem?: boolean;
  rich?: RichBlock[];
}

export interface RichBlock {
  type: "heading" | "stat" | "list" | "alert" | "separator";
  text?: string;
  value?: string;
  items?: { icon?: string; label: string; value?: string }[];
  color?: string;
}

export interface Scenario {
  emoji: string;
  name: string;
  status: string;
  welcome: string;
  messages: ChatMessage[];
  chips: { q: string; a: ChatMessage }[];
}

export const SCENARIOS: Record<string, Scenario> = {
  tienda: {
    emoji: "🛒",
    name: "Tienda Online",
    status: "40 ventas hoy",
    welcome: "Buenos días 👋 Resumen de hoy: 40 pedidos, 3 urgencias de proveedores y 2 reclamos de delivery.",
    messages: [
      { type: "out", text: "¿Cuántas ventas tuvimos hoy?" },
      {
        type: "in",
        text: "",
        rich: [
          { type: "stat", text: "Ventas hoy", value: "40", color: "#4ade80" },
          { type: "stat", text: "Ingreso estimado", value: "$1.240.000", color: "#4ade80" },
          { type: "separator" },
          { type: "heading", text: "Top productos" },
          { type: "list", items: [
            { icon: "🔥", label: "Polerón Negro Talla M", value: "12 vendidos" },
            { icon: "⭐", label: "Zapatillas Running", value: "8 vendidos" },
            { icon: "👕", label: "Pack 3 Poleras", value: "5 vendidos" },
          ]},
        ],
      },
      { type: "out", text: "¿Y consultas sin responder?" },
      {
        type: "in",
        text: "",
        rich: [
          { type: "stat", text: "Consultas sin responder", value: "7", color: "#fbbf24" },
          { type: "alert", text: "3 preguntan por stock de talla M. 2 consultan despacho a Regiones. 1 reclamo por demora.", color: "#fbbf24" },
        ],
      },
      { type: "out", text: "¿Emails urgentes?" },
      {
        type: "in",
        text: "",
        rich: [
          { type: "alert", text: "🔴 Cañería rota en depto arrendado — Andrés K. (lleva 2 días sin respuesta)", color: "#ef4444" },
          { type: "alert", text: "🟡 DistriTextil — Factura vence mañana", color: "#fbbf24" },
          { type: "alert", text: "🟢 Soporte Web — Error en checkout resuelto", color: "#4ade80" },
        ],
      },
    ],
    chips: [
      { q: "¿Pedidos pendientes?", a: { type: "in", text: "📦 8 pedidos pendientes de despacho. 3 van a Regiones y requieren coordinación. 1 pedido está en bodega desde ayer por falta de stock." } },
      { q: "¿Producto más buscado?", a: { type: "in", text: "🔥 El Polerón Negro Talla M es el más consultado (23 mensajes hoy). Te quedan solo 3 unidades en stock." } },
      { q: "¿Reclamos?", a: { type: "in", text: "⚠️ 2 reclamos de delivery: 1 llegó incompleto (Camila R.) y 1 con comida fría. Ambos piden reembolso o reenvío." } },
    ],
  },
  dental: {
    emoji: "🦷",
    name: "Clínica Dental",
    status: "6 citas mañana",
    welcome: "Buenos días 🦷 Mañana tienes 6 citas. 1 urgencia post-operatorio sin seguimiento y 2 cotizaciones de implantes pendientes.",
    messages: [
      { type: "out", text: "¿Citas de mañana?" },
      {
        type: "in",
        text: "",
        rich: [
          { type: "stat", text: "Citas mañana", value: "6", color: "#60a5fa" },
          { type: "separator" },
          { type: "heading", text: "Próximas citas" },
          { type: "list", items: [
            { icon: "🕘", label: "09:00 — María J. (Limpieza)", value: "" },
            { icon: "🕥", label: "10:30 — Pedro A. (Extracción)", value: "" },
            { icon: "🕐", label: "13:00 — Natalia F. (Revisión implante)", value: "" },
            { icon: "🕒", label: "15:00 — Dra. Rojas (Reunión equipo)", value: "" },
            { icon: "🕔", label: "17:00 — Ricardo D. (Presupuesto)", value: "" },
            { icon: "🕕", label: "18:00 — Laura G. (Blanqueamiento)", value: "" },
          ]},
        ],
      },
      { type: "out", text: "¿Urgencias sin responder?" },
      {
        type: "in",
        text: "",
        rich: [
          { type: "alert", text: "🚨 María J. reporta dolor e hinchazón post-extracción. Lleva 4 horas sin respuesta.", color: "#ef4444" },
          { type: "alert", text: "⚠️ Fernanda F. tiene dolor de encía desde ayer. Pregunta si es urgencia.", color: "#fbbf24" },
        ],
      },
      { type: "out", text: "¿Cotizaciones pendientes?" },
      {
        type: "in",
        text: "",
        rich: [
          { type: "stat", text: "Cotizaciones pendientes", value: "3", color: "#fbbf24" },
          { type: "list", items: [
            { icon: "💰", label: "Implantes x2 — Ricardo D.", value: "$2.800.000" },
            { icon: "💰", label: "Ortodoncia invisible — Miguel Ángel", value: "$3.200.000" },
            { icon: "💰", label: "Limpieza familiar — Luis O.", value: "$120.000" },
          ]},
        ],
      },
    ],
    chips: [
      { q: "¿Pacientes post-operatorio?", a: { type: "in", text: "🩹 2 pacientes post-operatorio: María J. (extracción ayer, reporta dolor) y Natalia F. (implante, control en 48h)." } },
      { q: "¿Insumos bajos?", a: { type: "in", text: "📦 Coronas temporales quedan 3 unidades. Laboratorio Dental Sur tiene las coronas de Muñoz listas para retiro." } },
      { q: "¿Seguros por cobrar?", a: { type: "in", text: "💳 Seguro Médico Plus procesó reembolsos de marzo. $890.000 pendientes de cobro." } },
    ],
  },
  restaurante: {
    emoji: "🍽️",
    name: "Restaurante",
    status: "12 reservas sábado",
    welcome: "Buenos días 🍽️ Este fin de semana tienes 12 reservas. 1 pedido delivery con reclamo y 2 proveedores con nuevos precios.",
    messages: [
      { type: "out", text: "¿Reservas del finde?" },
      {
        type: "in",
        text: "",
        rich: [
          { type: "stat", text: "Reservas sábado", value: "12", color: "#60a5fa" },
          { type: "stat", text: "Reservas domingo", value: "8", color: "#60a5fa" },
          { type: "separator" },
          { type: "heading", text: "Solicitudes especiales" },
          { type: "list", items: [
            { icon: "🎂", label: "Mesa 4 (sáb 21h)", value: "Cumpleaños, torta propia" },
            { icon: "🌱", label: "Mesa 8 (sáb 21h)", value: "2 vegetarianos, 1 celíaco" },
            { icon: "👶", label: "Mesa 3 (dom 13h)", value: "Silla alta bebé" },
          ]},
        ],
      },
      { type: "out", text: "¿Plato más pedido esta semana?" },
      {
        type: "in",
        text: "",
        rich: [
          { type: "stat", text: "Lomo vetado", value: "34 pedidos", color: "#4ade80" },
          { type: "stat", text: "Pulpo a la gallega", value: "28 pedidos", color: "#4ade80" },
          { type: "stat", text: "Tiramisú", value: "41 postres", color: "#f472b6" },
        ],
      },
      { type: "out", text: "¿Reclamos y proveedores?" },
      {
        type: "in",
        text: "",
        rich: [
          { type: "alert", text: "🔴 Camila R. — Pedido incompleto sin bebidas + comida fría. Pide reembolso.", color: "#ef4444" },
          { type: "alert", text: "🟡 DistriAlimentos — Ajuste 8% en carnes y lácteos desde mayo.", color: "#fbbf24" },
          { type: "alert", text: "🟢 Chef Marco — Menú fin de semana listo, espera aprobación de costos.", color: "#4ade80" },
        ],
      },
    ],
    chips: [
      { q: "¿Stock crítico?", a: { type: "in", text: "⚠️ Lomo vetado: solo 4kg disponibles. Proveedor Carnes tiene stock mañana a $18.900/kg. Queso parmesano: 500g restantes." } },
      { q: "¿Personal mañana?", a: { type: "in", text: "👥 6 mozos + 2 cocineros + 1 barman confirmados. Juan (parrillero) pidió cambio de turno." } },
      { q: "¿Delivery promedio?", a: { type: "in", text: "🛵 23 pedidos delivery hoy. Tiempo promedio 38 min. 2 pedidos tardaron más de 50 min (reclamos)." } },
    ],
  },
  consultora: {
    emoji: "💼",
    name: "Consultora",
    status: "3 propuestas activas",
    welcome: "Buenos días 💼 Tienes 3 propuestas activas, 2 reuniones esta semana y 1 declaración de IVA que vence viernes.",
    messages: [
      { type: "out", text: "¿Estado de propuestas?" },
      {
        type: "in",
        text: "",
        rich: [
          { type: "stat", text: "Propuestas activas", value: "3", color: "#60a5fa" },
          { type: "stat", text: "Potencial ingreso", value: "$12.4M", color: "#4ade80" },
          { type: "separator" },
          { type: "heading", text: "Pipeline" },
          { type: "list", items: [
            { icon: "🟢", label: "Auditoría ISO 9001 — Rodrigo S.", value: "$4.2M (90% probabilidad)" },
            { icon: "🟡", label: "Optimización procesos — Felipe M.", value: "$3.8M (60% probabilidad)" },
            { icon: "🔴", label: "Capacitación Excel — Capacitaciones Online", value: "$1.5M (20% probabilidad)" },
          ]},
        ],
      },
      { type: "out", text: "¿Reuniones de esta semana?" },
      {
        type: "in",
        text: "",
        rich: [
          { type: "heading", text: "Esta semana" },
          { type: "list", items: [
            { icon: "📅", label: "Martes 10:00 — Rodrigo S. (Cierre auditoría)", value: "" },
            { icon: "📅", label: "Miércoles 15:00 — Laura G. (Revisión avances)", value: "" },
            { icon: "📅", label: "Jueves 09:00 — Reunión equipo médico", value: "" },
          ]},
        ],
      },
      { type: "out", text: "¿Alertas contables?" },
      {
        type: "in",
        text: "",
        rich: [
          { type: "alert", text: "🔴 Declaración IVA vence viernes 23:59. Faltan 3 facturas por cargar.", color: "#ef4444" },
          { type: "alert", text: "🟡 Socio A. — Contrato InnovaTech listo para firmar. Revisar cláusulas 4 y 7.", color: "#fbbf24" },
        ],
      },
    ],
    chips: [
      { q: "¿Tareas del equipo?", a: { type: "in", text: "👥 Marketing terminó banners. Contabilidad cargó 12 de 15 facturas. Socio A. revisa contrato hoy a las 18h." } },
      { q: "¿Leads nuevos?", a: { type: "in", text: "🎯 4 leads nuevos esta semana: 2 de WhatsApp (calificados), 1 de formulario web (en evaluación), 1 de Instagram (solo cotizando)." } },
      { q: "¿Facturas por cobrar?", a: { type: "in", text: "💰 $8.3M en facturas por cobrar. La más antigua: Cliente XYZ ($1.2M, venció hace 22 días)." } },
    ],
  },
};

export const TRADITIONAL_MESSAGES: Record<string, ChatMessage[]> = {
  tienda: [
    { type: "in", text: "📱 WhatsApp Business: 23 mensajes sin leer. 3 clientes preguntan por stock de talla M.", isSystem: true },
    { type: "in", text: "📧 Gmail: 47 emails. 2 urgentes de proveedores + 1 reclamo de delivery.", isSystem: true },
    { type: "in", text: "📊 Excel de ventas: última actualización hace 3 días. No sabes cuánto vendiste hoy.", isSystem: true },
    { type: "in", text: "🗓️ Calendario: 2 envíos pendientes de coordinación. Ninguno tiene seguimiento.", isSystem: true },
  ],
  dental: [
    { type: "in", text: "📱 WhatsApp: 8 mensajes de pacientes. 1 urgencia post-operatorio sin revisar.", isSystem: true },
    { type: "in", text: "📧 Email: 12 correos. Laboratorio Dental Sur envió factura de coronas.", isSystem: true },
    { type: "in", text: "🗓️ Agenda papel: 6 citas mañana, pero 2 se cruzan en horario. Nadie avisó.", isSystem: true },
    { type: "in", text: "📝 Notas adhesivas: 3 cotizaciones pendientes. No sabes cuáles son urgentes.", isSystem: true },
  ],
  restaurante: [
    { type: "in", text: "📱 WhatsApp: 15 mensajes. 2 reservas nuevas, 1 reclamo de delivery sin responder.", isSystem: true },
    { type: "in", text: "📧 Email: DistriAlimentos subió precios 8%. ¿Ya actualizaste el menú?", isSystem: true },
    { type: "in", text: "📊 Excel inventario: última actualización hace 1 semana. Sin stock de lomo.", isSystem: true },
    { type: "in", text: "🗓️ Calendario personal: 12 reservas sábado, pero no sabes quién pidió vegetarianos.", isSystem: true },
  ],
  consultora: [
    { type: "in", text: "📧 Gmail: 31 emails. Declaración IVA vence viernes y faltan 3 facturas.", isSystem: true },
    { type: "in", text: "📱 WhatsApp: 6 mensajes de clientes. 1 propuesta que debe cerrarse esta semana.", isSystem: true },
    { type: "in", text: "📊 Excel pipeline: 3 propuestas activas. ¿Cuál tiene más probabilidad de cierre? Nadie sabe.", isSystem: true },
    { type: "in", text: "🗓️ Calendario: 3 reuniones esta semana. Una tiene conflicto de horario.", isSystem: true },
  ],
};
