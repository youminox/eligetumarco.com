import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: `Política de Privacidad y Protección de Datos | EligeTuMarco.com (${LEGAL_OWNER})`,
  description: `Política de privacidad de eligetumarco.com. Responsable del tratamiento: ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION}, correo electrónico ${LEGAL_EMAIL}.`,
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad/` },
};

export default function PoliticaPrivacidadPage() {
  return (
    <SimplePage
      title="Política de Privacidad"
      crumb="Política de privacidad"
      href="/politica-de-privacidad/"
      intro={`En EligeTuMarco.com respetamos tu privacidad. Conoce cómo protegemos los datos de navegación y consultas conforme a los estándares internacionales bajo la responsabilidad de ${LEGAL_OWNER}.`}
    >
      <h2>1. Responsable del Tratamiento de los Datos</h2>
      <ul>
        <li>
          <strong>Responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico de contacto y privacidad:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
        <li>
          <strong>Sitio web:</strong> {SITE_URL}
        </li>
      </ul>

      <h2>2. Qué Datos Recopilamos y Con Qué Finalidad</h2>
      <p>
        <strong>EligeTuMarco.com</strong> es un portal informativo y comparativo
        de acceso libre que no exige registro de cuenta ni solicita datos
        bancarios o de tarjetas de crédito. Únicamente tratamos la siguiente
        información:
      </p>
      <ul>
        <li>
          <strong>Consultas en el Asesor de Marcos Digitales IA (Chat Online):</strong>{" "}
          cuando utilizas nuestro asistente virtual para pedir recomendaciones
          de marcos digitales con Wi‑Fi, se almacena un identificador de sesión
          anónimo, la consulta realizada y los artículos o productos sugeridos
          con el único propósito de responder tus inquietudes y mejorar la
          calidad editorial del portal. Recomendamos no introducir datos
          personales sensibles en el chat.
        </li>
        <li>
          <strong>Comunicaciones por correo electrónico:</strong> si nos
          escribes a <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>,
          utilizaremos tu dirección de correo exclusivamente para responder tu
          consulta.
        </li>
        <li>
          <strong>Datos técnicos de navegación y atribución de afiliados:</strong>{" "}
          al hacer clic en un enlace hacia Amazon Estados Unidos o Amazon
          España, Amazon utiliza cookies propias para atribuir la referencia de
          afiliado sin ningún costo para el usuario.
        </li>
      </ul>

      <h2>3. Base Legítima y Conservación</h2>
      <p>
        La base legal para el tratamiento es el consentimiento del usuario al
        interactuar con el chat online o al enviarnos un correo electrónico, así
        como el interés legítimo de mantener la seguridad y el funcionamiento
        técnico del portal. Los registros anónimos de conversación se conservan
        únicamente durante el tiempo necesario para fines de control de calidad
        y auditoría técnica.
      </p>

      <h2>4. Derechos del Usuario (Acceso, Rectificación y Supresión)</h2>
      <p>
        En cualquier momento puedes ejercer tus derechos de acceso,
        rectificación, limitación, oposición o eliminación de cualquier dato
        enviando una solicitud por correo electrónico a{" "}
        <strong>{LEGAL_OWNER}</strong> ({LEGAL_LOCATION}) a la dirección{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
