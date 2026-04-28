export type DemoMode = "ai" | "traditional";

export interface EmailTag {
  key: string;
  label: string;
  className: string;
}

export interface EmailItem {
  sender: string;
  initials: string;
  subject: string;
  preview: string;
  time: string;
  tags: string[];
  isSystem?: boolean;
}

export interface Scenario {
  emoji: string;
  name: string;
  emails: EmailItem[];
}

export const TAGS: Record<string, EmailTag> = {
  urgent: { key: "urgent", label: "Urgente", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  client: { key: "client", label: "Cliente", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  provider: { key: "provider", label: "Proveedor", className: "bg-green-500/10 text-green-400 border-green-500/20" },
  internal: { key: "internal", label: "Interno", className: "bg-gray-500/15 text-gray-400 border-gray-500/25" },
  spam: { key: "spam", label: "Spam", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  billing: { key: "billing", label: "Facturación", className: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  support: { key: "support", label: "Soporte", className: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  quote: { key: "quote", label: "Cotización", className: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
};

export const SCENARIOS: Record<string, Scenario> = {
  ecommerce: {
    emoji: "🛒",
    name: "Tienda Online",
    emails: [
      { sender: "Carla M.", initials: "CM", subject: "Mi pedido #8832 no llegó", preview: "Hola, hace 5 días que hice mi pedido y aún no llega. El tracking no muestra movimiento. Necesito una solución urgente.", time: "2m", tags: ["urgent", "client"] },
      { sender: "DistriTextil S.A.", initials: "DT", subject: "Factura mensual disponible", preview: "Adjuntamos la factura correspondiente al mes de abril. Fecha de vencimiento: 15 de mayo.", time: "5m", tags: ["provider", "billing"] },
      { sender: "Marketing", initials: "MK", subject: "Campaña fin de semana lista", preview: "El equipo creativo ya tiene los banners aprobados. Revisa los adjuntos y confirmá para publicar.", time: "8m", tags: ["internal"] },
      { sender: "sorpresagratis.com", initials: "SG", subject: "¡GANASTE un iPhone 15!!!", preview: "Felicidades, fuiste seleccionado. Hacé clic acá para reclamar tu premio ahora mismo.", time: "12m", tags: ["spam"] },
      { sender: "Juan P.", initials: "JP", subject: "¿Tienen talla M en stock?", preview: "Estoy buscando el polerón negro que vi en Instagram. ¿Tienen disponible en talla M?", time: "15m", tags: ["client"] },
      { sender: "Soporte Web", initials: "SW", subject: "Error en checkout reportado", preview: "Tres clientes reportaron que el botón de pago no funciona en Safari. Revisar con urgencia.", time: "18m", tags: ["urgent", "internal", "support"] },
      { sender: "ProveedorZap", initials: "PZ", subject: "Nuevo catálogo zapatos", preview: "Te enviamos el PDF con los nuevos modelos de la temporada primavera/verano con precios mayoristas.", time: "25m", tags: ["provider"] },
    ],
  },
  consultora: {
    emoji: "💼",
    name: "Consultora",
    emails: [
      { sender: "Rodrigo S.", initials: "RS", subject: "Cotización auditoría externa", preview: "Necesitamos una cotización para auditoría de procesos ISO 9001. ¿Podemos reunirnos esta semana?", time: "3m", tags: ["client", "quote"] },
      { sender: "Contabilidad", initials: "CT", subject: "Declaración IVA vence viernes", preview: "Recordatorio: la declaración de IVA de este período vence el viernes a las 23:59. Faltan 3 facturas por cargar.", time: "6m", tags: ["urgent", "internal", "billing"] },
      { sender: "Laura G.", initials: "LG", subject: "Agendar reunión próxima semana", preview: "Hola, quiero coordinar una reunión para revisar los avances del proyecto. ¿Tenés disponibilidad el martes o miércoles?", time: "9m", tags: ["client"] },
      { sender: "Capacitaciones Online", initials: "CO", subject: "50% OFF en cursos Excel", preview: "Aprovechá esta super oferta por tiempo limitado. Más de 200 cursos disponibles con certificación.", time: "14m", tags: ["spam"] },
      { sender: "Socio A.", initials: "SA", subject: "Revisar contrato nuevo cliente", preview: "El contrato con InnovaTech está listo para firmar. Por favor revisá las cláusulas 4 y 7 antes del cierre.", time: "17m", tags: ["urgent", "internal"] },
      { sender: "Felipe M.", initials: "FM", subject: "Consulta consultoría procesos", preview: "Me interesa el servicio de optimización de procesos que ofrecen. ¿Podemos agendar una llamada introductoria?", time: "22m", tags: ["client", "quote"] },
    ],
  },
  dental: {
    emoji: "🦷",
    name: "Clínica Dental",
    emails: [
      { sender: "María J.", initials: "MJ", subject: "Dolor después de extracción", preview: "Buenas, me extrajeron una muela ayer y hoy tengo mucho dolor e hinchazón. ¿Es normal? ¿Debo ir de urgencia?", time: "1m", tags: ["urgent", "client"] },
      { sender: "Laboratorio Dental Sur", initials: "LD", subject: "Coronas listas para retiro", preview: "Las coronas del paciente Muñoz están listas. Factura adjunta por $145.000. Pueden retirar en horario de atención.", time: "7m", tags: ["provider", "billing"] },
      { sender: "Dra. Rojas", initials: "DR", subject: "Reunión equipo médico jueves", preview: "Reunión de equipo este jueves a las 15:00. Tema: nuevos protocolos de esterilización. Confirmar asistencia.", time: "11m", tags: ["internal"] },
      { sender: "Ganá Ya", initials: "GY", subject: "¡Tratamiento dental gratis!", preview: "Sos el afortunado ganador de un blanqueamiento dental valorado en $300.000. Reclamá tu premio ahora.", time: "16m", tags: ["spam"] },
      { sender: "Pedro A.", initials: "PA", subject: "Agendar hora limpieza dental", preview: "Hola, quiero pedir hora para limpieza dental de rutina. Preferiblemente en la mañana. ¿Qué días tienen?", time: "19m", tags: ["client"] },
      { sender: "Seguro Médico Plus", initials: "SM", subject: "Pago reembolso procedimientos", preview: "Los reembolsos de los procedimientos realizados en marzo ya fueron procesados. Detalle adjunto.", time: "28m", tags: ["provider", "billing"] },
    ],
  },
  restaurante: {
    emoji: "🍽️",
    name: "Restaurante",
    emails: [
      { sender: "Camila R.", initials: "CR", subject: "Pedido delivery llegó incompleto", preview: "Pedí un menú familiar y llegó sin las bebidas. Además la comida estaba fría. Quiero el reembolso o un nuevo envío.", time: "2m", tags: ["urgent", "client"] },
      { sender: "DistriAlimentos", initials: "DA", subject: "Factura semanal y nuevos precios", preview: "Adjuntamos factura de insumos semanales. A partir de mayo habrá un ajuste del 8% en carnes y lácteos.", time: "6m", tags: ["provider", "billing"] },
      { sender: "Chef Marco", initials: "CM", subject: "Menú fin de semana listo", preview: "Ya diseñé las entradas y principales del menú de fin de semana. Necesito que revises los costos antes del viernes.", time: "10m", tags: ["internal"] },
      { sender: "GanaPremios", initials: "GP", subject: "¡Ganaste una parrilla nueva!", preview: "Felicidades, fuiste seleccionado entre nuestros suscriptores. Ingresá tus datos para recibir tu premio.", time: "13m", tags: ["spam"] },
      { sender: "Reservas Web", initials: "RW", subject: "Nueva reserva: mesa 8 personas", preview: "Confirmación de reserva para el sábado a las 21:00. Solicitan mesa en terraza y menú vegetariano para 2.", time: "17m", tags: ["client"] },
      { sender: "Proveedor Carnes", initials: "PC", subject: "Lomo vetado disponible mañana", preview: "Tenemos stock de lomo vetado importado. Precio por kg: $18.900. ¿Reservamos 10kg como siempre?", time: "24m", tags: ["provider"] },
    ],
  },
  inmobiliaria: {
    emoji: "🏠",
    name: "Inmobiliaria",
    emails: [
      { sender: "Andrés K.", initials: "AK", subject: "Cañería rota en depto arrendado", preview: "Se rompió la cañería del baño principal y hay filtración al departamento de abajo. Necesitamos un gasfiter YA.", time: "1m", tags: ["urgent", "client"] },
      { sender: "Notaría Pérez", initials: "NP", subject: "Escritura lista para firma", preview: "La escritura de la propiedad Barros Arana 540 ya está lista. Revisen los documentos adjuntos antes de la firma.", time: "8m", tags: ["provider"] },
      { sender: "Gerente Regional", initials: "GR", subject: "Informe de ventas mensual", preview: "Se requiere el informe de ventas y arriendos de abril para la reunión de directorio de mañana a las 9:00.", time: "12m", tags: ["urgent", "internal"] },
      { sender: "SorteosExpress", initials: "SE", subject: "¡Ganaste un depto en Miami!", preview: "Sos el ganador del sorteo internacional. Solo necesitás pagar el impuesto de traspaso para reclamar tu propiedad.", time: "15m", tags: ["spam"] },
      { sender: "Valentina N.", initials: "VN", subject: "Agendar visita depto Paicaví", preview: "Hola, vi el departamento en Paicaví en su web. ¿Podría agendar una visita para este fin de semana? Gracias.", time: "20m", tags: ["client"] },
      { sender: "Constructora Sur", initials: "CS", subject: "Cotización reparación fachada", preview: "Adjuntamos la cotización para la reparación de la fachada del edificio O'Higgins. Plazo estimado: 15 días hábiles.", time: "26m", tags: ["provider", "quote"] },
    ],
  },
};

export const TRADITIONAL_MESSAGES: EmailItem[] = [
  { sender: "Sistema", initials: "SY", subject: "Bandeja de entrada saturada", preview: "Tienes 47 emails sin leer. 8 mensajes tienen más de 3 días sin respuesta.", time: "ahora", tags: [], isSystem: true },
  { sender: "Sistema", initials: "SY", subject: "Email urgente sin leer hace 2 días", preview: 'El mensaje de "Andrés K. — Cañería rota" lleva 48 horas sin ser abierto.', time: "ahora", tags: [], isSystem: true },
];

export const FILTERS = [
  { key: "all", label: "Recibidos", icon: "📥" },
  { key: "urgent", label: "Urgentes", icon: "🔴" },
  { key: "client", label: "Clientes", icon: "👤" },
  { key: "provider", label: "Proveedores", icon: "🏭" },
  { key: "internal", label: "Internos", icon: "📢" },
  { key: "spam", label: "Spam", icon: "🚫" },
] as const;
