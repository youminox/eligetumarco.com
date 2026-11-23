import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  FRAME_DISCLAIMER,
} from "@/lib/content";
import { AMAZON_TAG_US, AMAZON_TAG_ES } from "@/lib/amazon";

export const metadata: Metadata = {
  title: `Aviso Legal y Condiciones de Uso | EligeTuMarco.com (${LEGAL_OWNER})`,
  description: `Aviso legal, titularidad e información corporativa de eligetumarco.com. Sitio web perteneciente a ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION}, contacto ${LEGAL_EMAIL}.`,
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
};

export default function AvisoLegalPage() {
  return (
    <SimplePage
      title="Aviso Legal y Condiciones de Uso"
      crumb="Aviso legal"
      href="/aviso-legal/"
      intro={`Información legal oficial y condiciones generales de uso del portal EligeTuMarco.com, perteneciente a ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION}.`}
    >
      <h2>1. Datos Identificativos del Titular de la Web</h2>
      <p>
        En cumplimiento con las disposiciones vigentes sobre servicios de la
        sociedad de la información, comercio electrónico y transparencia digital
        internacional, se informa a los usuarios y lectores que el presente
        sitio web <strong>eligetumarco.com</strong> es propiedad y está operado
        por:
      </p>
      <ul>
        <li>
          <strong>Titular del sitio web:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio legal:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico de contacto oficial:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
        <li>
          <strong>Dominio principal:</strong> {SITE_URL}
        </li>
      </ul>

      <h2>2. Objeto y Naturaleza del Sitio Web</h2>
      <p>
        <strong>EligeTuMarco.com</strong> es una guía editorial independiente en
        español dedicada a ayudar a las familias a elegir{" "}
        <strong>
          marcos digitales con Wi‑Fi que permitan enviar fotos desde el celular
          a padres y abuelos, incluso si viven lejos
        </strong>
        . En nuestras comparativas evaluamos los modelos según el{" "}
        <strong>tamaño y proporción de pantalla</strong>, la{" "}
        <strong>facilidad de configuración</strong>, el{" "}
        <strong>almacenamiento (nube ilimitada vs memoria interna)</strong> y la{" "}
        <strong>posibilidad de recibir fotos de varios familiares</strong>.
      </p>
      <p>
        Cada recomendación incluye enlaces de afiliado hacia{" "}
        <strong>Amazon Estados Unidos (Amazon.com)</strong> —y opcionalmente{" "}
        <strong>Amazon España (Amazon.es)</strong>— para consultar precios
        actualizados y realizar la compra directamente en la plataforma segura
        de Amazon.
      </p>

      <h2>3. Participación en el Programa de Afiliados de Amazon</h2>
      <p>
        <strong>{LEGAL_OWNER}</strong> participa en el Programa de Afiliados de
        Amazon Services LLC Associates Program (ID de seguimiento EE. UU.:{" "}
        <code>{AMAZON_TAG_US}</code>) y en el Programa de Afiliados de Amazon EU
        (ID de seguimiento España: <code>{AMAZON_TAG_ES}</code>), programas de
        publicidad para afiliados diseñados para ofrecer a sitios web un modo de
        obtener comisiones publicitarias mediante enlaces a{" "}
        <code>Amazon.com</code> y <code>Amazon.es</code>.
      </p>
      <p>
        El precio de los productos en Amazon no sufre ningún incremento para el
        lector por acceder a través de nuestros enlaces. En este sitio web{" "}
        {FRAME_DISCLAIMER}.
      </p>

      <h2>4. Propiedad Intelectual e Industrial</h2>
      <p>
        Todos los contenidos originales de <strong>eligetumarco.com</strong>{" "}
        (textos comparativos, guías de configuración, tablas técnicas,
        infografías SVG, código fuente y fotografías generadas para el portal)
        están protegidos por las normas nacionales e internacionales de
        propiedad intelectual y pertenecen a <strong>{LEGAL_OWNER}</strong>.
        Queda prohibida su reproducción total o parcial sin autorización expresa
        por escrito solicitada a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>

      <h2>5. Limitación de Responsabilidad</h2>
      <p>
        Los precios, ofertas, disponibilidad de stock y tiempos de envío
        mostrados en Amazon pueden variar en tiempo real según la tienda de
        destino. El usuario debe verificar siempre las condiciones finales en la
        página oficial de producto en Amazon antes de completar su pedido. Para
        cualquier consulta legal o notificación, puede escribir directamente a{" "}
        <strong>{LEGAL_OWNER}</strong> al correo{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
