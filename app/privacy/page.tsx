import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FloatingButtons from "@/app/components/FloatingButtons";

export const metadata: Metadata = {
  title: "Privacidad, Condiciones del Servicio y Eliminación de Datos — INERTI",
  description:
    "Documento legal de INERTI con Política de Privacidad, Condiciones del Servicio y procedimiento de Eliminación de Datos de Usuario.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-6">
        <section className="pb-8 pt-24 md:pt-32">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#3b82f6]">
              LEGAL
            </p>
            <h1 className="mb-3 font-[family-name:var(--font-barlow)] text-4xl font-black leading-[1.08] tracking-tight md:text-6xl">
              Privacidad, Condiciones del Servicio y Eliminación de Datos
            </h1>
            <p className="mb-5 text-[#7a8ba5]">Última actualización: 5 de abril de 2026</p>
            <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[#7a8ba5]">
              En esta página reunimos los tres documentos que normalmente solicitan plataformas e
              integraciones: Política de Privacidad, Condiciones del Servicio y procedimiento de
              Eliminación de Datos de Usuario.
            </p>
            <div className="mb-10 flex flex-wrap gap-2.5">
              <a
                href="#privacy"
                className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-2 text-sm font-semibold text-[#7a8ba5] transition-colors hover:border-[rgba(59,130,246,0.45)] hover:bg-[rgba(59,130,246,0.08)] hover:text-white"
              >
                Política de Privacidad
              </a>
              <a
                href="#terms"
                className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-2 text-sm font-semibold text-[#7a8ba5] transition-colors hover:border-[rgba(59,130,246,0.45)] hover:bg-[rgba(59,130,246,0.08)] hover:text-white"
              >
                Condiciones del Servicio
              </a>
              <a
                href="#data-deletion"
                className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-2 text-sm font-semibold text-[#7a8ba5] transition-colors hover:border-[rgba(59,130,246,0.45)] hover:bg-[rgba(59,130,246,0.08)] hover:text-white"
              >
                Eliminación de Datos
              </a>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-[860px] px-5 md:px-8">
            <article className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#0f0f1a] to-[#0a0a12] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.24)] md:p-10">
              <section id="privacy">
                <h2 className="mb-6 font-[family-name:var(--font-barlow)] text-[1.7rem] font-extrabold text-white">
                  Política de Privacidad
                </h2>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Inerti es una plataforma tecnológica multicliente orientada a la operación de
                  asistentes conversacionales para negocios, actualmente centrada en WhatsApp. Inerti
                  no es una red social, no es un marketplace y no presta servicios médicos ni
                  veterinarios. Asimismo, Inerti no realiza diagnósticos médicos ni diagnósticos
                  veterinarios. Su función es actuar como proveedor tecnológico para asistir la
                  atención conversacional y operativa de sus clientes.
                </p>

                <div className="mb-6 rounded-lg border border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.08)] p-4 text-[#d0e4f5]">
                  Nota importante: cuando una persona interactúa con un bot de un negocio cliente de
                  Inerti, parte del tratamiento de datos puede realizarse también por cuenta de ese
                  negocio, el cual puede definir finalidades propias y contar con políticas o
                  condiciones adicionales aplicables a los servicios que presta.
                </div>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  1. Identidad del responsable
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Para efectos de esta Política, "Inerti" se refiere a la plataforma, marca y
                  operación tecnológica identificada comercialmente como Inerti, accesible a través de
                  sus canales digitales y del correo de contacto{" "}
                  <a href="mailto:hola@inerti.cl" className="text-[#3b82f6] underline underline-offset-[3px]">
                    hola@inerti.cl
                  </a>
                  .
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  2. Datos que recopilamos
                </h3>
                <ul className="mb-4 list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  <li>datos de identificación y contacto, como nombre y número de teléfono asociado a WhatsApp;</li>
                  <li>contenido de mensajes entrantes y salientes;</li>
                  <li>historial de conversaciones;</li>
                  <li>estado conversacional y contexto operativo necesario para responder;</li>
                  <li>datos entregados por la persona usuaria para solicitar atención, reservar horas, coordinar visitas o gestionar consultas;</li>
                  <li>datos necesarios para agendamiento, como disponibilidad, fecha, hora, observaciones y referencias operativas;</li>
                  <li>información sobre handoffs o derivaciones a atención humana;</li>
                  <li>eventos de uso, logs técnicos, metadatos operativos e información de actividad;</li>
                  <li>preferencias o instrucciones entregadas durante la conversación;</li>
                  <li>datos de mascotas cuando ello sea pertinente al servicio solicitado al negocio cliente; y</li>
                  <li>otra información que la persona decida entregar voluntariamente en la conversación o a través de formularios, canales de contacto o integraciones habilitadas.</li>
                </ul>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  3. Finalidades del tratamiento
                </h3>
                <ul className="mb-4 list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  <li>operar asistentes conversacionales y procesar mensajes entrantes y salientes;</li>
                  <li>interpretar consultas y generar respuestas automatizadas o asistidas;</li>
                  <li>mantener el contexto de la conversación y el estado operativo de cada interacción;</li>
                  <li>facilitar agendamientos, reservas, solicitudes de atención y otras acciones operativas solicitadas por la persona usuaria;</li>
                  <li>derivar conversaciones a personal humano cuando corresponda;</li>
                  <li>registrar eventos de uso, monitorear funcionamiento y resolver incidentes;</li>
                  <li>administrar la plataforma en un entorno multicliente y separar lógicamente la información de cada cliente;</li>
                  <li>mejorar la calidad, continuidad, seguridad, trazabilidad y desempeño del servicio;</li>
                  <li>prevenir abusos, uso indebido, fraude, accesos no autorizados o fallas operativas;</li>
                  <li>dar soporte a los negocios clientes que utilizan Inerti;</li>
                  <li>cumplir requerimientos contractuales, operativos o administrativos aplicables; y</li>
                  <li>atender solicitudes, consultas o ejercicios de derechos relacionados con datos personales.</li>
                </ul>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  4. Base o fundamento del tratamiento
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Inerti trata información con base en fundamentos generales y prudentes, según el
                  contexto, entre ellos: la entrega voluntaria de datos por parte de la persona
                  usuaria al interactuar con el canal o asistente; la necesidad de procesar la
                  información para prestar, mantener o habilitar el servicio solicitado; la necesidad
                  de ejecutar actividades operativas propias de la plataforma, incluyendo seguridad,
                  continuidad y soporte; el interés legítimo de mantener y mejorar un servicio
                  tecnológico seguro, funcional y trazable, siempre dentro de límites razonables; el
                  cumplimiento de obligaciones contractuales o requerimientos aplicables a la relación
                  con nuestros clientes y proveedores; y otras bases admitidas por la normativa
                  aplicable, cuando corresponda.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  5. Integraciones y terceros
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Para operar la plataforma, Inerti puede utilizar servicios e integraciones de
                  terceros, incluyendo, entre otros: <strong>Meta / WhatsApp Cloud API</strong>, para
                  la recepción y envío de mensajes por WhatsApp; <strong>OpenAI</strong>, para
                  funciones de interpretación, procesamiento del lenguaje y generación de respuestas;{" "}
                  <strong>Google Calendar</strong>, para procesos de agendamiento cuando un cliente
                  habilita dicha integración; y proveedores de infraestructura, almacenamiento,
                  monitoreo, seguridad, soporte técnico o analítica operativa.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  6. Conservación de la información
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Conservamos la información por el tiempo que resulte razonablemente necesario para:
                  operar y mantener el servicio; conservar contexto conversacional e historial
                  operativo; gestionar agendamientos, derivaciones y soporte; atender requerimientos de
                  clientes, usuarios o incidentes; resguardar trazabilidad, seguridad y continuidad del
                  sistema; y cumplir exigencias contractuales, administrativas o legales aplicables.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  7. Seguridad
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Inerti adopta medidas técnicas, organizativas y operativas razonables para proteger
                  la información contra pérdida, uso indebido, acceso no autorizado, divulgación,
                  alteración o destrucción. Estas medidas pueden incluir: controles de acceso;
                  segregación lógica entre clientes o tenants; registro de eventos y monitoreo;
                  resguardo de credenciales y permisos; prácticas de respaldo y continuidad operativa;
                  y revisión y mejora de procesos internos.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  8. Derechos de los usuarios
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Las personas titulares de datos pueden solicitar, según corresponda y conforme a la
                  normativa aplicable: información sobre el tratamiento de sus datos; acceso a los
                  datos personales que les conciernen; rectificación o actualización de información
                  inexacta; eliminación, supresión o bloqueo cuando proceda; oposición o limitación
                  del tratamiento en determinados casos; y revisión de derivaciones o canales de
                  atención aplicables.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  9. Datos de menores
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  La plataforma Inerti no está diseñada principalmente para recopilar datos de menores
                  de edad de manera intencional. Si una interacción involucra datos de menores, ello
                  normalmente ocurrirá en el contexto del servicio prestado por un negocio cliente y
                  bajo responsabilidad compartida con dicho negocio, según el caso.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  10. Cambios a esta política
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Inerti puede actualizar esta Política de Privacidad para reflejar cambios en la
                  operación de la plataforma, nuevas integraciones, mejoras de seguridad, cambios
                  regulatorios o ajustes en nuestros procesos. La versión vigente será la publicada en
                  el sitio web o canal correspondiente, indicando la fecha de última actualización.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  11. Contacto
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Para consultas sobre esta Política de Privacidad o sobre el tratamiento de datos
                  personales vinculado a Inerti, puedes contactarnos en{" "}
                  <a href="mailto:hola@inerti.cl" className="text-[#3b82f6] underline underline-offset-[3px]">
                    hola@inerti.cl
                  </a>
                  .
                </p>
              </section>

              <section id="terms" className="mt-10 border-t border-white/[0.06] pt-10">
                <h2 className="mb-6 font-[family-name:var(--font-barlow)] text-[1.7rem] font-extrabold text-white">
                  Condiciones del Servicio
                </h2>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Estas Condiciones del Servicio regulan el acceso y uso del sitio web de Inerti, de
                  la plataforma tecnológica de asistentes conversacionales y de las funcionalidades,
                  integraciones y herramientas asociadas que Inerti pone a disposición de sus
                  clientes.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  1. Naturaleza del servicio
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Inerti presta servicios tecnológicos de automatización conversacional y soporte
                  operativo para negocios. Inerti no presta directamente los servicios comerciales,
                  profesionales, médicos, veterinarios o inmobiliarios ofrecidos por sus clientes, ni
                  reemplaza el criterio profesional, operativo o comercial de dichos clientes.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  2. Uso permitido
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  El uso del sitio y de la plataforma debe realizarse de manera lícita, responsable y
                  compatible con su finalidad. No está permitido: usar la plataforma para actividades
                  ilícitas, fraudulentas, engañosas o abusivas; intentar acceder sin autorización a
                  sistemas, cuentas, credenciales o datos de terceros; interferir con la seguridad,
                  disponibilidad o funcionamiento del servicio; utilizar la plataforma para enviar
                  contenido malicioso, spam o automatizaciones no autorizadas; o atribuir a Inerti
                  responsabilidad por decisiones comerciales, operativas o profesionales tomadas por
                  negocios clientes.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  3. Relación con negocios clientes
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Cuando una persona interactúa con un bot operado por Inerti para un negocio
                  cliente, la relación principal respecto del servicio final normalmente se mantiene
                  con ese negocio. Dicho cliente puede establecer condiciones, políticas, horarios,
                  criterios de atención, precios, disponibilidad, agendamiento o derivación propios.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  4. Exactitud y disponibilidad
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Inerti procura que la plataforma funcione de manera continua y razonablemente
                  confiable. Sin embargo, no garantiza disponibilidad ininterrumpida, ausencia
                  absoluta de errores, ni respuesta instantánea en todos los casos. La operación puede
                  verse afectada por mantenimiento, fallas técnicas, servicios de terceros,
                  conectividad o eventos fuera de nuestro control razonable.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  5. Integraciones y terceros
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Parte del funcionamiento de Inerti depende de servicios de terceros, incluyendo
                  proveedores de mensajería, modelos de inteligencia artificial, calendarios,
                  infraestructura y almacenamiento. El uso de esas integraciones puede estar sujeto
                  además a los términos, políticas y limitaciones de dichos terceros.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  6. Limitación del servicio
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Inerti no garantiza que toda respuesta automatizada sea suficiente para resolver
                  situaciones complejas. En particular, Inerti no realiza diagnósticos médicos ni
                  veterinarios, no sustituye atención profesional especializada y no asegura la
                  concreción de ventas, reservas, tratamientos, visitas o contrataciones.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  7. Propiedad y uso del contenido
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  El diseño, marca, estructura del servicio y componentes propios de Inerti están
                  protegidos por las reglas aplicables de propiedad intelectual y uso comercial. El
                  uso del sitio o de la plataforma no implica cesión de derechos sobre dichos
                  elementos, salvo autorización expresa.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  8. Suspensión o cambios
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Inerti podrá actualizar, modificar, restringir o suspender total o parcialmente
                  funcionalidades del servicio por razones técnicas, operativas, comerciales, de
                  seguridad o de cumplimiento, procurando actuar de manera razonable.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  9. Responsabilidad
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  En la máxima medida permitida por la normativa aplicable, Inerti no será
                  responsable por pérdidas indirectas, interrupciones atribuibles a terceros,
                  decisiones tomadas por negocios clientes, uso indebido de credenciales, ni por
                  información incorrecta proporcionada por usuarios o clientes a la plataforma.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  10. Contacto sobre condiciones
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Si tienes dudas sobre estas Condiciones del Servicio, puedes escribir a{" "}
                  <a href="mailto:hola@inerti.cl" className="text-[#3b82f6] underline underline-offset-[3px]">
                    hola@inerti.cl
                  </a>
                  .
                </p>
              </section>

              <section id="data-deletion" className="mt-10 border-t border-white/[0.06] pt-10">
                <h2 className="mb-6 font-[family-name:var(--font-barlow)] text-[1.7rem] font-extrabold text-white">
                  Eliminación de Datos de Usuario
                </h2>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Si deseas solicitar la eliminación de datos personales tratados por Inerti, puedes
                  hacerlo escribiendo a{" "}
                  <a href="mailto:hola@inerti.cl" className="text-[#3b82f6] underline underline-offset-[3px]">
                    hola@inerti.cl
                  </a>{" "}
                  con el asunto <strong>"Solicitud de eliminación de datos"</strong>.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  1. Información recomendada para la solicitud
                </h3>
                <ul className="mb-4 list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  <li>nombre de la persona solicitante;</li>
                  <li>número de WhatsApp asociado a la conversación;</li>
                  <li>nombre del negocio con el que interactuó el usuario;</li>
                  <li>fecha aproximada de la interacción; y</li>
                  <li>cualquier antecedente adicional que permita identificar el registro.</li>
                </ul>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  2. Qué haremos al recibir la solicitud
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Inerti revisará la solicitud, podrá pedir antecedentes razonables para verificar
                  identidad o contexto, y evaluará si los datos son tratados directamente por Inerti,
                  por cuenta de un negocio cliente, o por ambos. Cuando corresponda, coordinaremos la
                  gestión con el negocio cliente involucrado.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  3. Alcance de la eliminación
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Cuando proceda, la eliminación podrá abarcar: historiales de conversación
                  almacenados por Inerti; datos operativos de agendamiento o atención; estado
                  conversacional y referencias asociadas al usuario; eventos y registros vinculados
                  razonablemente a la cuenta o interacción; y otros datos personales tratados por
                  Inerti que ya no sea necesario conservar.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  4. Excepciones y retención limitada
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  En ciertos casos, parte de la información podrá mantenerse bloqueada o conservada
                  por un tiempo adicional cuando exista una razón técnica, de seguridad,
                  trazabilidad, prevención de fraude, respaldo, cumplimiento contractual o
                  requerimiento legal aplicable.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  5. Importante sobre negocios clientes
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Si los datos fueron recopilados en el contexto de la atención prestada por un
                  negocio cliente, ese negocio también puede conservar o tratar información bajo sus
                  propias políticas y obligaciones. Por eso, en algunos casos será necesario solicitar
                  la eliminación tanto a Inerti como al negocio correspondiente.
                </p>

                <h3 className="mb-3 mt-8 font-[family-name:var(--font-barlow)] text-[1.3rem] font-extrabold text-white">
                  6. Canal de contacto
                </h3>
                <p className="mb-4 text-[0.98rem] leading-relaxed text-[#7a8ba5]">
                  Para solicitudes de eliminación de datos, escríbenos a{" "}
                  <a href="mailto:hola@inerti.cl" className="text-[#3b82f6] underline underline-offset-[3px]">
                    hola@inerti.cl
                  </a>
                  .
                </p>
              </section>
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
