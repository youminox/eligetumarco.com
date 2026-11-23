import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";
import { AMAZON_TAG_US, AMAZON_TAG_ES } from "@/lib/amazon";

export const metadata: Metadata = {
  title: `Política de Cookies | EligeTuMarco.com (${LEGAL_OWNER})`,
  description: `Información sobre el uso de cookies técnicas, almacenamiento local y enlaces de afiliados de Amazon en eligetumarco.com (${LEGAL_OWNER}, ${LEGAL_LOCATION}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-cookies/` },
};

export default function PoliticaCookiesPage() {
  return (
    <SimplePage
      title="Política de Cookies"
      crumb="Política de cookies"
      href="/politica-de-cookies/"
      intro={`Explicación transparente sobre el uso de almacenamiento local del navegador y cookies de terceros en EligeTuMarco.com, operado por ${LEGAL_OWNER} (${LEGAL_LOCATION}).`}
    >
      <h2>1. ¿Qué son las Cookies y el Almacenamiento Local?</h2>
      <p>
        Las cookies y el almacenamiento local (<code>localStorage</code>) son
        pequeños archivos de texto que tu navegador guarda en tu dispositivo
        para recordar tus preferencias (como tu tienda de Amazon preferida o el
        historial de tu conversación actual en el Asesor IA).
      </p>

      <h2>2. Qué Utilizamos en EligeTuMarco.com</h2>
      <ul>
        <li>
          <strong>Preferencia de Tienda Amazon (<code>etm_amazon_region</code>):</strong>{" "}
          recuerda si prefieres ver los precios de marcos digitales en{" "}
          <strong>Amazon Estados Unidos (US)</strong> o en{" "}
          <strong>Amazon España (ES)</strong>.
        </li>
        <li>
          <strong>Sesión del Asesor de Marcos Digitales IA (<code>etm_chat_session</code> y <code>etm_visitor</code>):</strong>{" "}
          permite mantener el hilo de tus preguntas mientras navegas entre
          diferentes comparativas del sitio.
        </li>
        <li>
          <strong>Cookies de Afiliación de Amazon:</strong> cuando haces clic en
          un botón hacia <code>Amazon.com</code> (tag{" "}
          <code>{AMAZON_TAG_US}</code>) o <code>Amazon.es</code> (tag{" "}
          <code>{AMAZON_TAG_ES}</code>), Amazon instala su cookie oficial de
          afiliado para reconocer que la visita proviene de{" "}
          <strong>eligetumarco.com</strong>.
        </li>
      </ul>

      <h2>3. Cómo Gestionar o Eliminar las Cookies</h2>
      <p>
        Puedes borrar o bloquear las cookies y el almacenamiento local en
        cualquier momento desde la configuración de privacidad de Chrome,
        Safari, Firefox o Edge. Si tienes cualquier consulta adicional, puedes
        contactar al titular del sitio, <strong>{LEGAL_OWNER}</strong> (
        {LEGAL_LOCATION}), escribiendo a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
