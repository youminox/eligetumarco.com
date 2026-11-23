import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: `Política Editorial y Metodología de Comparación | EligeTuMarco.com`,
  description: `Cómo evaluamos y comparamos marcos digitales con Wi-Fi en EligeTuMarco.com según tamaño de pantalla, facilidad para abuelos, almacenamiento y app familiar. Dirigido por ${LEGAL_OWNER}.`,
  alternates: { canonical: `${SITE_URL}/politica-editorial/` },
};

export default function PoliticaEditorialPage() {
  return (
    <SimplePage
      title="Política Editorial y Metodología de Evaluación"
      crumb="Política editorial"
      href="/politica-editorial/"
      intro={`Nuestro protocolo técnico para analizar marcos de fotos digitales con Wi‑Fi pensados para padres y abuelos a distancia, bajo la dirección de ${LEGAL_OWNER} (${LEGAL_LOCATION}).`}
    >
      <h2>1. Nuestro Compromiso con las Familias a Distancia</h2>
      <p>
        Sabemos que cuando alguien compra un marco digital con Wi‑Fi en Amazon
        para enviarlo a sus padres o abuelos que viven lejos, el mayor temor es
        que el dispositivo resulte difícil de configurar o que exija pagar una
        suscripción mensual inesperada. Por ello, bajo la dirección editorial de{" "}
        <strong>{LEGAL_OWNER}</strong> (domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong>, contacto{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>), aplicamos una
        metodología estricta basada en cuatro pilares verificables.
      </p>

      <h2>2. Los 4 Criterios de Evaluación de EligeTuMarco.com</h2>
      <ol>
        <li>
          <strong>Calidad, Tamaño y Proporción de Pantalla:</strong> verificamos
          si el panel es verdaderamente IPS con 178° de visión lateral, su
          densidad de píxeles (HD 1280×800, Full HD 1920×1080 o 2K 1600×1200) y
          cómo maneja las fotos tomadas en vertical con el celular (proporción{" "}
          <code>4:3</code> nativa o emparejamiento inteligente{" "}
          <em>Smart Pairing</em> en pantallas <code>16:10</code>).
        </li>
        <li>
          <strong>Facilidad de Preconfiguración para Padres y Abuelos:</strong>{" "}
          priorizamos los modelos que pueden dejarse 100 % listos antes de que
          el adulto mayor los reciba (ya sea mediante código QR de regalo sin
          abrir la caja o pre-cargando la red Wi‑Fi, las fotos iniciales y el
          apagado automático nocturno).
        </li>
        <li>
          <strong>Almacenamiento y Transparencia en Suscripciones:</strong>{" "}
          distinguimos con claridad qué modelos ofrecen almacenamiento en la
          nube ilimitado y gratuito (<code>$0/mes</code>, como Aura) y cuáles
          integran <code>16 GB</code>, <code>32 GB</code> o <code>64 GB</code>{" "}
          de memoria interna con ranura MicroSD que siguen funcionando incluso
          si se corta el internet (como Frameo).
        </li>
        <li>
          <strong>Recepción de Fotos desde Varios Familiares:</strong> probamos
          la experiencia real de las aplicaciones móviles en iOS (iPhone/iPad) y
          Android, la facilidad para invitar a hermanos, nietos y tíos mediante
          un código familiar y las opciones de envío por correo electrónico.
        </li>
      </ol>

      <h2>3. Arquitectura Sin Canibalización y Revisión Continua</h2>
      <p>
        Cada una de las <strong>1,512 páginas</strong> de{" "}
        <strong>eligetumarco.com</strong> aborda una intención de búsqueda única
        y específica. Si detectas cualquier dato técnico que haya cambiado tras
        una actualización de firmware o de catálogo en Amazon, escríbenos a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> y actualizaremos la
        guía de inmediato.
      </p>
    </SimplePage>
  );
}
