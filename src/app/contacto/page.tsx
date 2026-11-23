import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import OpenChatButton from "@/components/OpenChatButton";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: `Contacto Oficial | EligeTuMarco.com (${LEGAL_EMAIL})`,
  description: `Ponte en contacto con ${LEGAL_OWNER} (${LEGAL_LOCATION}), titular de eligetumarco.com, escribiendo a ${LEGAL_EMAIL} o consulta en vivo a nuestro Asesor de Marcos Digitales IA.`,
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function ContactoPage() {
  return (
    <SimplePage
      title="Contacto Oficial y Asesoría de Marcos Digitales"
      crumb="Contacto"
      href="/contacto/"
      intro={`¿Tienes alguna consulta editorial, comercial o legal, o necesitas ayuda para elegir un marco digital con Wi‑Fi para tus padres o abuelos? Aquí tienes nuestros canales directos.`}
    >
      <h2>1. Datos de Contacto del Titular</h2>
      <ul>
        <li>
          <strong>Titular del sitio web:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>2. Respuesta Inmediata con Nuestro Asesor de Marcos IA</h2>
      <p>
        Si buscas una recomendación inmediata para saber qué marco digital
        comprar en <strong>Amazon Estados Unidos</strong> o{" "}
        <strong>Amazon España</strong> según el tamaño de pantalla, la facilidad
        de configuración para adultos mayores, el almacenamiento (nube ilimitada
        vs 32 GB) o cómo enviar fotos desde el celular de varios familiares,
        puedes abrir ahora mismo nuestro chat interactivo:
      </p>
      <div className="my-6">
        <OpenChatButton
          label="Abrir Asesor de Marcos Digitales IA Ahora"
          className="btn btn-buy shine"
        />
      </div>

      <h2>3. Consultas Editoriales y Legales</h2>
      <p>
        Para sugerencias de nuevos modelos, correcciones técnicas, asuntos de
        privacidad o solicitudes legales dirigidas a{" "}
        <strong>{LEGAL_OWNER}</strong> ({LEGAL_LOCATION}), escríbenos a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> y te responderemos a
        la brevedad.
      </p>
    </SimplePage>
  );
}
