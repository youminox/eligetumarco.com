import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: `Sobre Nosotros | EligeTuMarco.com (${LEGAL_OWNER})`,
  description: `Conoce la misión de EligeTuMarco.com, la guía en español fundada por ${LEGAL_OWNER} (${LEGAL_LOCATION}) para elegir marcos digitales con Wi-Fi para padres y abuelos.`,
  alternates: { canonical: `${SITE_URL}/sobre-nosotros/` },
};

export default function SobreNosotrosPage() {
  return (
    <SimplePage
      title="Sobre Nosotros: Acercando a Padres y Abuelos con sus Familias"
      crumb="Sobre nosotros"
      href="/sobre-nosotros/"
      intro="EligeTuMarco.com nació para resolver un problema real de millones de familias hispanas: cómo compartir las fotos del día a día con padres y abuelos que viven lejos sin complicarles la vida con la tecnología."
    >
      <h2>1. Nuestra Misión</h2>
      <p>
        Hoy tomamos miles de fotos y videos de nuestros hijos, viajes y momentos
        cotidianos con el celular, pero la mayoría se quedan guardados en la
        memoria del teléfono o pasan fugazmente por un chat de WhatsApp que los
        abuelos muchas veces no saben abrir. Un{" "}
        <strong>marco digital con Wi‑Fi bien elegido y preconfigurado</strong>{" "}
        convierte cualquier rincón de la sala o mesa de noche de tus padres y
        abuelos en una ventana viva donde aparecen los recuerdos de toda la
        familia sin que ellos tengan que tocar un solo botón.
      </p>

      <h2>2. Quién Está Detrás de EligeTuMarco.com</h2>
      <p>
        <strong>EligeTuMarco.com</strong> es un proyecto fundado y dirigido por{" "}
        <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong>, especialista en comercio electrónico,
        arquitectura SEO y análisis de tecnología de consumo útil para el hogar.
      </p>
      <ul>
        <li>
          <strong>Fundador y Editor Responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Ubicación:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Contacto directo:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>3. Qué Encontrarás en Nuestro Portal</h2>
      <ul>
        <li>
          <strong>500 Guías Transaccionales y Comparativas de Amazon:</strong>{" "}
          reseñas individuales, duelos cara a cara (Aura vs Frameo vs Skylight
          vs Nixplay) y selecciones por tamaño de pantalla (9&quot;, 10.1&quot;,
          15.6&quot;), presupuesto y perfil de los abuelos.
        </li>
        <li>
          <strong>1,000 Guías SEO Paso a Paso:</strong> tutoriales para
          preconfigurar marcos como regalo a distancia, enviar fotos desde
          iPhone y Android, invitar a varios familiares, elegir la proporción{" "}
          <code>4:3</code> o <code>16:10</code> y resolver cualquier duda de
          Wi‑Fi.
        </li>
        <li>
          <strong>Asesor de Marcos Digitales IA en Vivo:</strong> un asistente
          inteligente gratuito entrenado con nuestras 1,512 guías para ayudarte
          a elegir el marco exacto en menos de un minuto.
        </li>
      </ul>
    </SimplePage>
  );
}
