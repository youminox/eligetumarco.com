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
  title: `Divulgación de Afiliados de Amazon | EligeTuMarco.com (${LEGAL_OWNER})`,
  description: `Declaración transparente sobre enlaces de afiliados de Amazon Estados Unidos (${AMAZON_TAG_US}) y Amazon España (${AMAZON_TAG_ES}) en eligetumarco.com (${LEGAL_OWNER}).`,
  alternates: { canonical: `${SITE_URL}/divulgacion-de-afiliados/` },
};

export default function DivulgacionAfiliadosPage() {
  return (
    <SimplePage
      title="Divulgación de Afiliados de Amazon"
      crumb="Divulgación de afiliados"
      href="/divulgacion-de-afiliados/"
      intro="Transparencia total sobre cómo se financia EligeTuMarco.com a través del Programa de Afiliados de Amazon sin ningún costo adicional para nuestros lectores."
    >
      <h2>1. Declaración Oficial de Afiliado de Amazon</h2>
      <p>
        <strong>EligeTuMarco.com</strong>, sitio web titularidad de{" "}
        <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong> (correo electrónico:{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>), participa en el{" "}
        <strong>Amazon Services LLC Associates Program</strong> (Estados Unidos)
        y en el <strong>Programa de Afiliados de Amazon EU</strong> (España).
      </p>
      <p>
        En calidad de Afiliado de Amazon, obtenemos ingresos por las compras
        adscritas que cumplen los requisitos aplicables a través de nuestros
        identificadores oficiales de rastreo:
      </p>
      <ul>
        <li>
          🇺🇸 <strong>Amazon Estados Unidos (Amazon.com — Foco Principal):</strong>{" "}
          <code>{AMAZON_TAG_US}</code>
        </li>
        <li>
          🇪🇸 <strong>Amazon España (Amazon.es):</strong>{" "}
          <code>{AMAZON_TAG_ES}</code>
        </li>
      </ul>

      <h2>2. ¿Cuesta Más Comprar con Nuestros Enlaces?</h2>
      <p>
        <strong>No, jamás.</strong> El precio que pagas en Amazon es exactamente
        el mismo que si entraras escribiendo la dirección directamente en tu
        navegador. La pequeña comisión que recibe{" "}
        <strong>EligeTuMarco.com</strong> la abona Amazon de su propio margen y
        nos permite mantener actualizadas nuestras{" "}
        <strong>1,512 guías y comparativas</strong> en español y ofrecer de
        forma gratuita nuestro <strong>Asesor de Marcos Digitales IA</strong>.
      </p>

      <h2>3. Independencia Editorial en Nuestras Comparativas</h2>
      <p>
        Ningún fabricante de marcos digitales paga por aparecer en primer lugar
        en nuestras listas. Evaluamos cada modelo (Aura Carver, Aura Mason,
        Aura Walden, Frameo, Skylight, Nixplay, Dragon Touch, Arzopa, Kodak) con
        los mismos cuatro criterios objetivos:
      </p>
      <ol>
        <li>
          <strong>Tamaño, resolución y proporción de pantalla</strong> (4:3 vs
          16:10 y paneles IPS antirreflejos).
        </li>
        <li>
          <strong>Facilidad de configuración</strong> para que padres y abuelos
          mayores solo tengan que enchufar el marco a la corriente.
        </li>
        <li>
          <strong>Almacenamiento real sin costos sorpresa</strong> (nube
          ilimitada gratuita frente a 32 GB de memoria interna con ranura
          MicroSD).
        </li>
        <li>
          <strong>Facilidad para recibir fotos de varios familiares</strong>{" "}
          desde celulares iPhone y Android o por correo electrónico.
        </li>
      </ol>
      <p>
        Para cualquier consulta sobre nuestra política de afiliación, puedes
        escribir a <strong>{LEGAL_OWNER}</strong> en{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
