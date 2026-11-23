import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import ArticleCard from "@/components/ArticleCard";
import ReadingProgress from "@/components/ReadingProgress";
import SplitHeading from "@/components/SplitHeading";
import OpenChatButton from "@/components/OpenChatButton";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { JsonLd } from "@/components/Breadcrumbs";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import FrameConnectionDiagramSvg from "@/components/home/FrameConnectionDiagramSvg";
import FrameCriteriaOrbit, {
  type OrbitItem,
} from "@/components/home/FrameCriteriaOrbit";
import MetricsCounters, {
  type MetricItem,
} from "@/components/home/MetricsCounters";
import ScreenComparisonSlider from "@/components/home/ScreenComparisonSlider";
import MomentsCarousel, { type Moment } from "@/components/home/MomentsCarousel";
import FrameFinderBlock, {
  type FrameTier,
} from "@/components/home/FrameFinderBlock";
import {
  getContextualAmazonProducts,
  AMAZON_TAG_US,
  AMAZON_TAG_ES,
} from "@/lib/amazon";
import {
  SITE_URL,
  OG_DEFAULT,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  FRAME_DISCLAIMER,
  ambient,
  getAllContent,
  getArticlesIn,
  getByPath,
  getCategories,
  safeHref,
  type Article,
} from "@/lib/content";

export const metadata: Metadata = {
  title:
    "EligeTuMarco.com: Guía de Marcos Digitales con Wi‑Fi para Enviar Fotos desde el Celular a Padres y Abuelos en Amazon EE. UU.",
  description:
    "Guía en español para elegir marcos digitales con Wi‑Fi que permitan enviar fotos desde el celular a padres y abuelos, incluso si viven lejos. Compara modelos según el tamaño de pantalla, la facilidad de configuración, el almacenamiento y la posibilidad de recibir fotos de varios familiares en Amazon Estados Unidos.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title:
      "EligeTuMarco.com: Cómo Elegir Marcos Digitales con Wi‑Fi para Padres y Abuelos a Distancia",
    description:
      "Más de 1,500 guías para comparar marcos digitales con Wi‑Fi en Amazon EE. UU. por tamaño de pantalla, preconfiguración de regalo, almacenamiento en la nube o 32 GB y envío desde varios familiares.",
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "Marco digital con Wi-Fi en la sala de los abuelos mostrando fotos enviadas desde el celular por hijos y nietos",
      },
    ],
  },
};

const FAQ = [
  {
    q: "¿Cuál es el mejor marco digital con Wi‑Fi para padres y abuelos que viven lejos y no dominan la tecnología?",
    a: "Si tus padres o abuelos tienen Wi‑Fi estable en casa y quieres la máxima facilidad, el #1 en Amazon Estados Unidos es el Aura Carver 10.1\" (o Aura Mason 9\" 2K): incluye un código QR de regalo en la caja para que tú configures su red Wi‑Fi, las primeras fotos y un mensaje de bienvenida desde tu celular sin abrir el empaque, con almacenamiento en la nube ilimitado 100 % gratuito ($0/mes). Si en cambio su internet es inestable o se corta a menudo, la mejor elección es el Frameo de 10.1\" o 15.6\" con 32 GB de memoria interna + ranura MicroSD, porque guarda hasta 80.000 fotos físicamente dentro del marco.",
  },
  {
    q: "¿Cómo puedo enviar fotos desde mi celular iPhone o Android a un marco digital en otro estado o país?",
    a: "Todos los marcos digitales con Wi‑Fi recomendados (Aura, Frameo, Skylight y Nixplay) funcionan a través de internet sin importar la distancia geográfica. Puedes estar en Miami, Madrid, Ciudad de México o Lima y enviar una foto desde tu iPhone o Android; en menos de 15 segundos aparecerá en la sala de tus padres o abuelos a miles de kilómetros, sin costos de roaming ni tarifas internacionales.",
  },
  {
    q: "¿Pueden varios familiares (hijos, nietos, hermanos y tíos) enviar fotos al mismo marco digital?",
    a: "Sí. En modelos como Aura Carver/Mason y Frameo 10.1\"/15.6\" puedes compartir un código o enlace de invitación gratuito con todos los miembros de la familia (invitados ilimitados en Aura y más de 500 familiares en Frameo). Además, en modelos como Skylight Frame o Aura también se pueden enviar fotos por correo electrónico directo para aquellos familiares que prefieren no instalar aplicaciones.",
  },
  {
    q: "¿Qué tamaño y proporción de pantalla conviene elegir: 9\" (4:3), 10.1\" (16:10) o 15.6\" Full HD?",
    a: "Las cámaras de iPhone y Android toman fotos en proporción 4:3. Por eso: 1) Los marcos de 9\" o 9.7\" formato 4:3 (como el Aura Mason 2K) y el Aura Walden de 15\" (4:3) muestran las fotos del celular sin barras negras ni recortes; 2) Los marcos panorámicos de 10.1\" (16:10) son el tamaño más versátil para mesa o aparador, y en el Aura Carver la función Smart Pairing junta automáticamente 2 fotos verticales lado a lado; 3) Los marcos grandes de 15.6\" Full HD (como Frameo 15.6\") son ideales para colgar en pared o para abuelos con baja visión que miran el marco desde el sillón.",
  },
  {
    q: "¿Hay que pagar una suscripción mensual para usar un marco digital con Wi‑Fi?",
    a: "No si eliges la marca correcta. Tanto Aura Frames (almacenamiento en la nube 100 % ilimitado y gratuito de por vida para fotos y videos cortos) como los marcos con sistema Frameo (32 GB de memoria interna + tarjeta MicroSD y envíos ilimitados desde la App Frameo) tienen costo mensual cero ($0/mes). En nuestra guía señalamos siempre qué modelos funcionan sin suscripción y cuáles tienen planes opcionales.",
  },
  {
    q: "¿Cómo funciona la preconfiguración de regalo antes de enviar el marco a casa de mis padres o abuelos?",
    a: "Existen dos métodos: 1) Preconfiguración remota sin abrir la caja (Aura Frames y Nixplay): escaneas o ingresas el código de regalo en tu app al comprarlo en Amazon, subes las fotos familiares e invitas a tus hermanos antes de que el paquete llegue a tus abuelos; 2) Preconfiguración física (Frameo / Dragon Touch): recibes el marco en tu casa, lo conectas, cargas miles de fotos en sus 32 GB o en una tarjeta MicroSD, guardas el nombre y clave del Wi‑Fi de tus padres y lo vuelves a guardar en su caja listo para enchufar.",
  },
];

const CLAIMS = [
  "Envía Fotos desde el Celular a Padres y Abuelos Lejos",
  "Compara Tamaño de Pantalla: 9\", 10.1\" y 15.6\" Full HD",
  "Preconfiguración de Regalo: Tus Abuelos Solo Lo Enchufan",
  "Nube Ilimitada Gratis ($0/mes) vs 32 GB Internos + MicroSD",
  "Recibe Fotos de Varios Familiares (Hijos, Nietos y Hermanos)",
  "Proporción 4:3 Exacta al Celular y Smart Pairing 16:10",
  "Sensor de Luz con Apagado Automático por la Noche",
  "Enlaces Verificados en Amazon Estados Unidos y España",
];

const CLAIMS_2 = [
  "Aura Carver 10.1\" (#1 Nube Ilimitada Gratis + Smart Pairing)",
  "Aura Mason 9\" 2K (Formato 4:3 Rotación Vertical y Horizontal)",
  "Frameo 10.1\" 32 GB Touch (Funciona Con y Sin Wi‑Fi + MicroSD)",
  "Skylight Frame 10\" (Envío Directo por Correo Electrónico)",
  "Frameo 15.6\" Full HD (Pantalla Grande para Pared y Baja Visión)",
  "Aura Walden 15\" Mate Antirreflejos (Acabado Galería 4:3)",
  "Envío Rápido Amazon Prime + Recibo de Regalo sin Precio",
  "Más de 1,500 Guías en Español Sin Canibalización",
];

const ICONS: Record<string, string> = {
  frame: "🖼️",
  scale: "⚖️",
  heart: "👵",
  screen: "📐",
  cloud: "☁️",
  tag: "💵",
  gift: "🎁",
  phone: "📱",
  sparkles: "✨",
  shield: "🛡️",
  wifi: "📶",
  camera: "📸",
};

export default function Home() {
  const cats = getCategories();
  const all = getAllContent();
  const heroImg = ambient(
    "home-hero-marcos",
    "/img/ambiente/home-hero-marcos.webp"
  );

  const orbit: OrbitItem[] = [
    {
      k: "abuelos",
      name: "Para Padres y Abuelos",
      img: null,
      icon: "👵",
      role: "Máxima Facilidad · Preconfigurado para Solo Enchufar a la Pared",
      d: "Cómo elegir un marco que no exija saber de tecnología: tú lo dejas preconfigurado desde tu celular con las primeras fotos y el apagado nocturno automático para que tus padres o abuelos solo disfruten los recuerdos.",
      href: safeHref(
        "/marcos-para-padres-y-abuelos/mejores-marcos-digitales-wifi-para-padres-y-abuelos-amazon/"
      ),
    },
    {
      k: "tamanos",
      name: "Tamaño: 9\", 10.1\" o 15.6\"",
      img: null,
      icon: "📐",
      role: "9\" Mesa de Noche · 10.1\" Aparador de Sala · 15.6\" Pared y Baja Visión",
      d: "Comparamos qué diagonal en pulgadas conviene según la distancia a la que se sientan tus padres o abuelos: 10.1 pulgadas es el estándar más regalado, mientras que 15 y 15.6 pulgadas permiten ver rostros nítidos desde el sofá.",
      href: safeHref(
        "/marcos-por-tamano-y-pantalla/que-tamano-de-marco-digital-elegir-9-10-o-15-pulgadas/"
      ),
    },
    {
      k: "formato43",
      name: "Proporción 4:3 vs 16:10",
      img: null,
      icon: "🖼️",
      role: "Cómo se Ven las Fotos Verticales y Horizontales de iPhone y Android",
      d: "La cámara de tu celular toma fotos en proporción 4:3. Te explicamos cuándo elegir un panel 4:3 nativo (Aura Mason 2K / Aura Walden) y cuándo aprovechar el modo Smart Pairing (Aura Carver 16:10) que muestra dos fotos verticales juntas.",
      href: safeHref(
        "/guia-de-pantallas-resolucion-y-formatos/proporcion-4-3-vs-16-10-en-marcos-digitales-fotos-de-celular/"
      ),
    },
    {
      k: "nubegratis",
      name: "Nube Ilimitada ($0/mes)",
      img: null,
      icon: "☁️",
      role: "Aura Carver · Aura Mason · Aura Walden (Sin Suscripción Mensual)",
      d: "Almacena más de 10.000 fotos y videos en la nube sin pagar ni un centavo al mes y sin ocupar memoria interna, siempre que en casa de tus padres haya conexión Wi‑Fi activa.",
      href: safeHref(
        "/marcos-por-app-y-almacenamiento/mejores-marcos-digitales-con-nube-ilimitada-gratis-sin-suscripcion/"
      ),
    },
    {
      k: "memoria32gb",
      name: "32 GB + MicroSD (Offline)",
      img: null,
      icon: "💾",
      role: "Frameo 10.1\" y 15.6\" · Funciona Incluso si se Corta el Wi‑Fi",
      d: "Guarda hasta 80.000 fotos físicamente dentro de sus 32 GB de memoria flash y permite insertar tarjeta MicroSD o USB: la opción número uno si el internet de tus abuelos es inestable.",
      href: safeHref(
        "/marcos-por-app-y-almacenamiento/mejores-marcos-digitales-frameo-32gb-con-ranura-microsd-amazon/"
      ),
    },
    {
      k: "familiares",
      name: "Fotos de Varios Familiares",
      img: null,
      icon: "👨‍👩‍👧‍👦",
      role: "Hijos, Nietos, Hermanos y Tíos Enviando desde Distintos Países",
      d: "Cómo invitar a toda la familia mediante un código gratuito en la App (iOS y Android) para que cada nieto e hijo mande fotos con subtítulos y videos cortos desde su propio celular.",
      href: safeHref(
        "/enviar-fotos-desde-el-celular-y-familia/como-varios-familiares-pueden-enviar-fotos-al-mismo-marco-digital/"
      ),
    },
    {
      k: "email",
      name: "Envío por Email (Sin Apps)",
      img: null,
      icon: "✉️",
      role: "Skylight Frame 10\" & Aura · Envía Fotos Adjuntas a un Correo Único",
      d: "Ideal para tíos o familiares que no quieren instalar aplicaciones: basta con enviar un correo electrónico con las fotos adjuntas a la dirección privada del marco y aparecen en segundos.",
      href: safeHref(
        "/marcos-por-app-y-almacenamiento/mejores-marcos-digitales-para-enviar-fotos-por-correo-electronico/"
      ),
    },
    {
      k: "preconfigurar",
      name: "Preconfigurar a Distancia",
      img: null,
      icon: "🎁",
      role: "Código QR de Regalo sin Abrir la Caja · Envío Directo Amazon EE. UU.",
      d: "Guía paso a paso para comprar el marco en Amazon Estados Unidos, pre-cargar las fotos familiares y enviarlo directo a la puerta de tus padres en otro estado o ciudad listo para usar.",
      href: safeHref(
        "/configuracion-facil-y-regalo-a-distancia/como-preconfigurar-un-marco-digital-wifi-para-regalar-a-distancia/"
      ),
    },
  ];

  const metrics: MetricItem[] = [
    {
      v: 1512,
      dec: 0,
      u: "guías",
      l: "Artículos en español sin canibalización",
      pct: 100,
      note: "1,000 artículos SEO + 500 guías Amazon + 12 hubs pilares",
    },
    {
      v: 0,
      dec: 0,
      u: "US$/mes",
      l: "Suscripción mensual en Aura y Frameo",
      pct: 100,
      note: "Nube ilimitada gratis en Aura y 32 GB gratis en Frameo",
    },
    {
      v: 32,
      dec: 0,
      u: "GB",
      l: "Memoria interna para ~80.000 fotos",
      pct: 96,
      note: "Almacenamiento local en Frameo + ranura MicroSD hasta 128 GB",
    },
    {
      v: 10.1,
      dec: 1,
      u: "pulg.",
      l: "Tamaño favorito para sala y aparador",
      pct: 95,
      note: "Equilibrio ideal entre visibilidad y espacio (con opción 15.6\")",
    },
    {
      v: 178,
      dec: 0,
      u: "grados",
      l: "Ángulo de visión IPS antirreflejos",
      pct: 98,
      note: "Colores reales desde cualquier sillón de la sala de los abuelos",
    },
    {
      v: 4.8,
      dec: 1,
      u: "★",
      l: "Valoración media en Amazon EE. UU.",
      pct: 96,
      note: "Modelos verificados con decenas de miles de reseñas reales",
    },
  ];

  const moments: Moment[] = [
    {
      img: ambient("home-abuelos-lejos", heroImg),
      t: "Abuelos que Viven Lejos",
      d: "Qué marco elegir para que reciban fotos diarias de sus nietos desde otro estado o país sin tocar un solo menú.",
      href: safeHref(
        "/marcos-para-padres-y-abuelos/mejores-marcos-digitales-wifi-para-padres-y-abuelos-amazon/"
      ),
      alt: "Abuelos sonriendo en su sala al ver una foto nueva de sus nietos en un marco digital con Wi-Fi",
    },
    {
      img: ambient("home-preconfiguracion-regalo", heroImg),
      t: "Preconfigurar sin Abrir la Caja",
      d: "Cómo funciona el código QR de regalo de Aura Frames para que el marco llegue a casa de tus padres ya cargado con fotos.",
      href: safeHref(
        "/configuracion-facil-y-regalo-a-distancia/como-preconfigurar-un-marco-digital-wifi-para-regalar-a-distancia/"
      ),
      alt: "Manos escaneando con el celular el código de regalo de un marco digital Wi-Fi antes de enviarlo",
    },
    {
      img: ambient("home-aura-nube", heroImg),
      t: "Aura Carver vs Frameo 32 GB",
      d: "El gran duelo en Amazon EE. UU.: ¿te conviene más la nube ilimitada gratis de Aura o los 32 GB internos con MicroSD de Frameo?",
      href: safeHref(
        "/comparativas-marcos-digitales/aura-carver-vs-frameo-10-pulgadas-cual-elegir-para-abuelos/"
      ),
      alt: "Comparativa lado a lado de dos marcos digitales con Wi-Fi sobre una mesa de madera de roble",
    },
    {
      img: ambient("home-formato-4-3", heroImg),
      t: "Fotos Verticales sin Bordes Negros",
      d: "Por qué el formato 4:3 (Aura Mason 2K) y el modo Smart Pairing (Aura Carver) aprovechan al 100 % las fotos tomadas con el celular.",
      href: safeHref(
        "/guia-de-pantallas-resolucion-y-formatos/proporcion-4-3-vs-16-10-en-marcos-digitales-fotos-de-celular/"
      ),
      alt: "Marco digital mostrando dos fotografías verticales del celular emparejadas lado a lado con nitidez IPS",
    },
    {
      img: ambient("home-varios-familiares", heroImg),
      t: "Fotos de Todos los Hijos y Nietos",
      d: "Cómo invitar a hermanos, tíos y primos en iPhone y Android o enviar fotos por correo electrónico (Skylight Frame).",
      href: safeHref(
        "/enviar-fotos-desde-el-celular-y-familia/como-varios-familiares-pueden-enviar-fotos-al-mismo-marco-digital/"
      ),
      alt: "Varios familiares enviando fotografías desde sus teléfonos celulares al marco digital de los abuelos",
    },
    {
      img: ambient("home-tamanos-pantalla", heroImg),
      t: "Pantallas Grandes de 15\" y 15.6\"",
      d: "Los mejores marcos Full HD y formato galería de 15 pulgadas para colgar en pared o para abuelos con baja visión.",
      href: safeHref(
        "/marcos-por-tamano-y-pantalla/mejores-marcos-digitales-grandes-15-pulgadas-para-pared-y-abuelos/"
      ),
      alt: "Marco digital grande de 15 pulgadas colgado en la pared de una sala luminosa mostrando un retrato familiar",
    },
    {
      img: ambient("home-frameo-32gb", heroImg),
      t: "Si tus Abuelos Tienen Mal Wi‑Fi",
      d: "Por qué los marcos con 32 GB internos y ranura MicroSD siguen mostrando todas las fotos aunque se caiga el internet.",
      href: safeHref(
        "/marcos-por-app-y-almacenamiento/mejores-marcos-digitales-frameo-32gb-con-ranura-microsd-amazon/"
      ),
      alt: "Detalle lateral de un marco digital con memoria interna de 32 GB y ranura para tarjeta MicroSD",
    },
  ];

  const finderOptions: FrameTier[] = [
    {
      key: "aura-carver-facil-nube",
      label: "1. Más Fácil + Nube Ilimitada (Aura 10.1\")",
      screenSpec: "10.1\" HD IPS Antirreflejos (16:10 + Smart Pairing)",
      storageSpec: "Nube Ilimitada 100 % Gratis ($0/mes · sin suscripción)",
      familyApp: "Familiares Ilimitados vía App Aura (iOS/Android) y Email",
      img: ambient("home-aura-nube", heroImg),
      alt: "Marco digital Aura Carver de 10.1 pulgadas con emparejamiento de dos fotos verticales y nube ilimitada",
      idealFor:
        "Padres y abuelos con Wi‑Fi en casa cuando quieres preconfigurar el regalo desde tu celular sin abrir la caja (código QR) y que las fotos verticales del teléfono se emparejen solas sin barras negras.",
      reviewHref: safeHref(
        "/resenas-marcos-digitales-wifi/aura-carver-10-pulgadas-marco-digital-wifi-resena/"
      ),
      productKey: "AURA_CARVER_10_WIFI",
    },
    {
      key: "frameo-32gb-microsd",
      label: "2. 32 GB Internos + MicroSD (Frameo 10.1\")",
      screenSpec: "10.1\" HD IPS Táctil (1280×800 ·Rotación Automática)",
      storageSpec: "32 GB Internos (~80.000 fotos) + MicroSD ($0/mes)",
      familyApp: "Hasta 500+ familiares gratis en la App Frameo con subtítulos",
      img: ambient("home-frameo-32gb", heroImg),
      alt: "Marco digital táctil Frameo de 10.1 pulgadas con 32 GB de memoria interna y ranura MicroSD",
      idealFor:
        "Padres o abuelos cuyo Wi‑Fi a veces se desconecta, o familias que prefieren que las fotos y videos queden guardados físicamente dentro del marco (y poder llevarles una tarjeta MicroSD llena de recuerdos).",
      reviewHref: safeHref(
        "/resenas-marcos-digitales-wifi/frameo-10-1-pulgadas-32gb-marco-digital-tactil-resena/"
      ),
      productKey: "FRAMEO_AKIMART_10_32GB",
    },
    {
      key: "aura-mason-4-3-2k",
      label: "3. Pantalla 2K Formato 4:3 (Aura Mason 9\")",
      screenSpec: "9\" 2K Full HD+ (1600×1200 · Formato 4:3 Vertical/Horizontal)",
      storageSpec: "Nube Ilimitada Gratis ($0/mes) + Altavoz para Videos",
      familyApp: "Familiares Ilimitados vía App Aura + Google Fotos / iCloud",
      img: ambient("home-formato-4-3", heroImg),
      alt: "Marco digital Aura Mason de 9 pulgadas con resolución 2K y proporción 4:3 idéntica a las fotos del celular",
      idealFor:
        "Quienes buscan la máxima nitidez de imagen (224 píxeles por pulgada) en la proporción 4:3 exacta de la cámara del iPhone/Android y quieren girar el marco libremente en vertical o en horizontal.",
      reviewHref: safeHref(
        "/resenas-marcos-digitales-wifi/aura-mason-9-pulgadas-2k-marco-digital-formato-4-3-resena/"
      ),
      productKey: "AURA_MASON_9_2K",
    },
    {
      key: "pantalla-grande-15-abuelos",
      label: "4. Pantalla Grande 15.6\" (Pared / Baja Visión)",
      screenSpec: "15.6\" Full HD IPS Táctil (1920×1080 · Mesa o Pared)",
      storageSpec: "32 GB Internos + Ranura MicroSD y USB-C ($0/mes)",
      familyApp: "Familiares Ilimitados vía App Frameo desde cualquier país",
      img: ambient("home-tamanos-pantalla", heroImg),
      alt: "Marco digital grande de 15.6 pulgadas Full HD en sala de abuelos para ver fotos de lejos",
      idealFor:
        "Abuelos con baja visión o presbicia que quieren distinguir cada rostro sin acercarse ni ponerse las gafas de lectura, o para colgar como cuadro familiar principal en la pared de la sala.",
      reviewHref: safeHref(
        "/marcos-por-tamano-y-pantalla/mejores-marcos-digitales-grandes-15-pulgadas-para-pared-y-abuelos/"
      ),
      productKey: "FRAMEO_15_6_FHD_LARGE",
    },
  ];

  const POPULAR_PATHS = [
    "/marcos-para-padres-y-abuelos/mejores-marcos-digitales-wifi-para-padres-y-abuelos-amazon/",
    "/comparativas-marcos-digitales/aura-carver-vs-frameo-10-pulgadas-cual-elegir-para-abuelos/",
    "/resenas-marcos-digitales-wifi/aura-carver-10-pulgadas-marco-digital-wifi-resena/",
    "/resenas-marcos-digitales-wifi/frameo-10-1-pulgadas-32gb-marco-digital-tactil-resena/",
    "/configuracion-facil-y-regalo-a-distancia/como-preconfigurar-un-marco-digital-wifi-para-regalar-a-distancia/",
    "/marcos-por-tamano-y-pantalla/que-tamano-de-marco-digital-elegir-9-10-o-15-pulgadas/",
  ];
  const popular: Article[] = POPULAR_PATHS.map((p) => getByPath(p)).filter(
    Boolean
  ) as Article[];
  for (const a of all) {
    if (popular.length >= 6) break;
    if (!a.isPillar && !popular.includes(a)) popular.push(a);
  }

  const homeAmazon = getContextualAmazonProducts(
    "home",
    "marcos-para-padres-y-abuelos",
    "Mejores Marcos Digitales con Wi-Fi para Enviar Fotos desde el Celular a Padres y Abuelos en Amazon Estados Unidos"
  );

  return (
    <>
      <ReadingProgress />
      <Header variant="dark" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/#webpage`,
              url: `${SITE_URL}/`,
              name: "EligeTuMarco.com: Guía en Español para Elegir Marcos Digitales con Wi‑Fi para Padres y Abuelos en Amazon EE. UU.",
              inLanguage: "es",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              primaryImageOfPage: `${SITE_URL}${heroImg}`,
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />
      <main>
        {/* 1–2. Hero 3D Tilt + Partículas + Buscador */}
        <Hero heroImage={heroImg} />

        {/* 3. Doble Cinta Marquee en sentido opuesto */}
        <div className="relative border-b border-[var(--line)] bg-white py-5">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track font-display text-lg font-bold text-fxink/80"
                aria-hidden={k === 1}
              >
                {CLAIMS.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-br from-fxlime to-fxblue" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee reverse mt-3" aria-hidden>
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track text-sm font-semibold uppercase tracking-[0.14em] text-prune/80"
              >
                {CLAIMS_2.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-drinklight" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. ¿Cómo elegir un marco digital Wi-Fi para padres y abuelos? + Mosaico Spotlight (.spot) */}
        <section id="como-funciona" className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Guía Independiente en Español · Amazon Estados Unidos
              </span>
              <SplitHeading
                text="Comparamos cada marco digital según"
                accent={{
                  text: "pantalla, facilidad de configuración, almacenamiento y envío familiar",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Un marco digital con Wi‑Fi acorta cualquier distancia cuando
                permite que{" "}
                <strong className="text-fxink">
                  hijos, nietos y hermanos envíen fotos desde su celular en
                  segundos
                </strong>{" "}
                y que{" "}
                <strong className="text-fxink">
                  tus padres o abuelos las vean aparecer en su sala sin tener
                  que configurar nada
                </strong>
                . Analizamos cada modelo en cuatro criterios técnicos reales y
                te damos acceso directo para consultar el precio y comprar en{" "}
                <strong className="text-fxblue">Amazon Estados Unidos</strong>.
              </p>
              <div
                className="mt-6 rounded-2xl border border-amber-300/60 bg-amber-50/70 p-5"
                data-reveal
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-900">
                  🖼️ Los 4 criterios que comparamos en cada recomendación
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.95rem] text-fxink">
                  <li>
                    • <strong>1. Tamaño y proporción de pantalla:</strong>{" "}
                    modelos de <strong>9&quot; (2K formato 4:3)</strong>, el
                    estándar de <strong>10.1&quot; (16:10 con Smart Pairing)</strong>{" "}
                    y pantallas grandes de{" "}
                    <strong>15&quot; y 15.6&quot; Full HD</strong> para pared o
                    abuelos con baja visión.
                  </li>
                  <li>
                    • <strong>2. Facilidad de configuración a distancia:</strong>{" "}
                    cómo preconfigurar el marco con{" "}
                    <strong>código QR sin abrir la caja (Aura)</strong> o
                    dejarlo listo con el Wi‑Fi y apagado nocturno automático
                    para que tus padres solo lo enchufen.
                  </li>
                  <li>
                    • <strong>3. Almacenamiento sin suscripción ($0/mes):</strong>{" "}
                    diferencia entre{" "}
                    <strong>nube ilimitada gratuita (Aura Carver/Mason)</strong>{" "}
                    y{" "}
                    <strong>
                      32 GB de memoria interna + MicroSD (Frameo)
                    </strong>{" "}
                    que sigue funcionando aunque se corte el internet.
                  </li>
                  <li>
                    • <strong>4. Recibir fotos de varios familiares:</strong>{" "}
                    apps gratuitas para iPhone y Android (
                    <strong>Aura, Frameo, Nixplay</strong>) y envío directo por{" "}
                    <strong>correo electrónico (Skylight Frame)</strong>.
                  </li>
                </ul>
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/marcos-para-padres-y-abuelos/mejores-marcos-digitales-wifi-para-padres-y-abuelos-amazon/"
                  className="btn btn-buy shine"
                  data-magnetic
                >
                  Top Marcos para Padres y Abuelos
                </Link>
                <Link
                  href="/comparativas-marcos-digitales/aura-carver-vs-frameo-10-pulgadas-cual-elegir-para-abuelos/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Aura Carver vs Frameo 32GB
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-3xl shadow-[0_30px_60px_-35px_rgba(30,15,5,0.6)]"
                data-reveal
              >
                <Image
                  src={ambient("home-abuelos-lejos", heroImg)}
                  alt="Padres y abuelos viendo en su marco digital con Wi-Fi las fotos enviadas desde el celular por sus hijos y nietos"
                  fill
                  sizes="(max-width:1024px) 100vw, 600px"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-fxink">
                  De tu celular en cualquier país a la sala de tus padres en
                  segundos
                </span>
              </div>
              {[
                [
                  "📐",
                  "Tamaño de Pantalla",
                  "Comparamos 9\", 10.1\" y 15.6\", paneles IPS antirreflejos de 178° y proporción 4:3 vs 16:10.",
                ],
                [
                  "👵",
                  "Fácil Configuración",
                  "Preconfiguración remota por QR o pre-carga de Wi‑Fi para que los abuelos solo lo enchufen.",
                ],
                [
                  "☁️",
                  "Almacenamiento $0/mes",
                  "Nube ilimitada gratuita (Aura) frente a 32 GB internos (~80.000 fotos) + MicroSD (Frameo).",
                ],
                [
                  "👨‍👩‍👧‍👦",
                  "Varios Familiares",
                  "Invita gratis a hijos, nietos y hermanos desde iPhone, Android o por correo electrónico.",
                ],
              ].map(([e, t, d], i) => (
                <div
                  key={t}
                  className="card spot p-5"
                  data-reveal
                  data-reveal-delay={String(i)}
                >
                  <p className="text-2xl" aria-hidden>
                    {e}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight">
                    {t}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ScrollStory: Del celular de los hijos a la sala de los abuelos en 4 pasos */}
        <ScrollStory />

        {/* 6. La Ciencia de la Pantalla y Conexión Familiar (FrameConnectionDiagramSvg) */}
        <section className="relative isolate overflow-hidden bg-[#17110d] py-24 text-white">
          <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-fxblue/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-prune/40 blur-3xl" />
          <div className="hero-grid opacity-50" />
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Ingeniería Visual y Simplicidad para Adultos Mayores
              </span>
              <SplitHeading
                text="Por qué la proporción de pantalla y el almacenamiento"
                accent={{
                  text: "cambian por completo la experiencia de tus padres",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-white/75" data-reveal>
                Más del 85 % de las fotos familiares actuales se toman en{" "}
                <strong className="text-white">
                  vertical con el celular (proporción 4:3)
                </strong>
                . En un marco digital barato sin ajuste inteligente, esas fotos
                aparecen con enormes barras negras o con las cabezas recortadas.
                Por eso priorizamos modelos con{" "}
                <strong className="text-white">panel 4:3 nativo</strong> o con{" "}
                <strong className="text-white">
                  emparejamiento inteligente (Smart Pairing)
                </strong>{" "}
                que muestra dos fotos verticales juntas.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3" data-reveal>
                {[
                  ["📱", "Fotos Celular 4:3"],
                  ["☁️", "Nube o 32 GB"],
                  ["🌙", "Sensor Nocturno"],
                ].map(([e, t]) => (
                  <div key={t} className="glass p-4 text-center">
                    <p className="text-2xl" aria-hidden>
                      {e}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{t}</p>
                  </div>
                ))}
              </div>
              <div className="glass mt-6 p-5 text-sm text-white/75" data-reveal>
                <strong className="text-white">
                  ¿Cómo evitar que la luz del marco moleste de noche a tus
                  padres o abuelos?
                </strong>{" "}
                Tanto los marcos <strong>Aura</strong> (con sensor de luz
                ambiental automático que apaga la pantalla al apagar la lámpara)
                como los marcos <strong>Frameo y Skylight</strong> (con horario
                de sueño programable, ej. de 22:00 a 07:00) se apagan y
                encienden solos todos los días sin tocar ningún botón.
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href={safeHref(
                    "/guia-de-pantallas-resolucion-y-formatos/proporcion-4-3-vs-16-10-en-marcos-digitales-fotos-de-celular/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Guía: Formato 4:3 vs 16:10
                </Link>
                <Link
                  href={safeHref(
                    "/configuracion-facil-y-regalo-a-distancia/como-preconfigurar-un-marco-digital-wifi-para-regalar-a-distancia/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Cómo preconfigurar antes de regalar
                </Link>
              </div>
            </div>
            <div data-reveal>
              <FrameConnectionDiagramSvg />
            </div>
          </div>
        </section>

        {/* 7. Órbita interactiva de los 8 criterios y selecciones */}
        <section className="wrap py-24">
          <FrameCriteriaOrbit items={orbit} center={heroImg} />
        </section>

        {/* 8. Contadores animados + Tabla comparativa por Pantalla, Configuración, Almacenamiento y Familiares */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#17110d] via-[#0d1614] to-[#231109] py-24 text-white">
          <div className="hero-aurora opacity-40" />
          <div className="wrap relative grid items-start gap-12 lg:grid-cols-[1.18fr_1fr]">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Comparativa Técnica en Amazon Estados Unidos
              </span>
              <SplitHeading
                text="Compara los marcos #1 según"
                accent={{
                  text: "pantalla, configuración, memoria y app familiar",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-4 max-w-xl text-white/70" data-reveal>
                Verificamos la diagonal real en pulgadas, la resolución IPS, si
                requiere o no suscripción mensual y cuántos familiares pueden
                enviar fotos desde su celular.
              </p>
              <div className="mt-8">
                <MetricsCounters data={metrics} />
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/marcos-para-padres-y-abuelos/mejores-marcos-digitales-wifi-para-padres-y-abuelos-amazon/"
                  className="btn btn-lime shine text-sm"
                  data-magnetic
                >
                  Ranking para Padres y Abuelos
                </Link>
                <Link
                  href="/comparativas-marcos-digitales/aura-carver-vs-frameo-10-pulgadas-cual-elegir-para-abuelos/"
                  className="btn btn-glass text-sm"
                  data-magnetic
                >
                  Comparativa: Aura vs Frameo vs Skylight
                </Link>
              </div>
            </div>

            <div
              className="rounded-3xl border border-white/15 bg-white/95 p-5 sm:p-6 text-fxink shadow-2xl"
              data-reveal
            >
              <span className="inline-block rounded-full bg-fxsky px-3 py-1 text-xs font-extrabold text-fxbluedeep">
                📊 Tabla Comparativa de Marcos Digitales Wi‑Fi en Amazon EE. UU.
              </span>
              <h3 className="mt-2 font-display text-xl font-extrabold">
                Top 6 Modelos por Pantalla, Configuración y Memoria
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--line)] bg-fxsky text-fxink font-display">
                      <th className="p-2.5">Marco Digital</th>
                      <th className="p-2.5">Pantalla</th>
                      <th className="p-2.5">Almacenamiento</th>
                      <th className="p-2.5">Envío Familiar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    <tr>
                      <td className="p-2.5 font-bold">Aura Carver 10.1&quot;</td>
                      <td className="p-2.5">10.1&quot; HD (Smart Pair)</td>
                      <td className="p-2.5 font-semibold text-emerald-800">
                        Nube Ilimitada ($0)
                      </td>
                      <td className="p-2.5">App Aura + QR Regalo</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Aura Mason 9&quot; 2K</td>
                      <td className="p-2.5">9&quot; 2K (Formato 4:3)</td>
                      <td className="p-2.5 font-semibold text-emerald-800">
                        Nube Ilimitada ($0)
                      </td>
                      <td className="p-2.5">App Aura (Ilimitados)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Frameo 10.1&quot; Touch</td>
                      <td className="p-2.5">10.1&quot; HD IPS Táctil</td>
                      <td className="p-2.5 font-semibold text-amber-900">
                        32 GB + MicroSD ($0)
                      </td>
                      <td className="p-2.5">App Frameo (500+)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Skylight Frame 10&quot;</td>
                      <td className="p-2.5">10&quot; IPS Táctil</td>
                      <td className="p-2.5 font-semibold text-sky-900">
                        8/16 GB + Offline
                      </td>
                      <td className="p-2.5">Email Directo + App</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Frameo 15.6&quot; FHD</td>
                      <td className="p-2.5">15.6&quot; 1080p Pared</td>
                      <td className="p-2.5 font-semibold text-amber-900">
                        32 GB + MicroSD ($0)
                      </td>
                      <td className="p-2.5">App Frameo + Videos</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Aura Walden 15&quot;</td>
                      <td className="p-2.5">15&quot; 4:3 Mate Galería</td>
                      <td className="p-2.5 font-semibold text-emerald-800">
                        Nube Ilimitada ($0)
                      </td>
                      <td className="p-2.5">App Aura + QR Regalo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[11px] text-[var(--muted)]">
                Nota: todos los modelos pueden comprarse en{" "}
                <strong>Amazon Estados Unidos</strong> con opción de{" "}
                <strong>envío directo como regalo (Gift Receipt)</strong> a la
                casa de tus padres o abuelos.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Comparador interactivo Antes ↔ Después (Nube Ilimitada Aura vs 32 GB Internos + MicroSD Frameo) */}
        <section className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                La Decisión Más Importante Antes de Comprar
              </span>
              <SplitHeading
                text="¿Nube ilimitada gratis (Aura) o"
                accent={{
                  text: "32 GB de memoria interna con MicroSD (Frameo)?",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <p className="text-lg text-[var(--muted)]" data-reveal>
              Arrastra el control para comparar las dos arquitecturas líderes en
              Amazon EE. UU. Si tus padres tienen{" "}
              <strong className="text-fxink">
                Wi‑Fi estable y quieres preconfigurar sin abrir la caja
              </strong>
              , elige <strong>Aura</strong>. Si su{" "}
              <strong className="text-fxink">
                internet se corta o quieres guardar las fotos físicamente en 32
                GB + MicroSD
              </strong>
              , elige <strong>Frameo</strong>.
            </p>
          </div>
          <div data-reveal>
            <ScreenComparisonSlider />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              [
                "Sin abrir la caja",
                "Preconfigura con el código QR de regalo desde tu celular",
                ambient("home-preconfiguracion-regalo", heroImg),
              ],
              [
                "Fotos de celular 4:3",
                "Formato 4:3 nativo o Smart Pairing de 2 fotos verticales",
                ambient("home-formato-4-3", heroImg),
              ],
              [
                "Toda la familia unida",
                "Hijos, nietos y hermanos enviando fotos desde cualquier país",
                ambient("home-varios-familiares", heroImg),
              ],
            ].map(([t, d, src], i) => (
              <div
                key={t}
                className="card spot overflow-hidden"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={src}
                    alt={`${t}: ${d}`}
                    fill
                    sizes="(max-width:640px) 100vw, 380px"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center gap-4 p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-fxblue to-prune font-display font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold leading-tight">
                      {t}
                    </p>
                    <p className="text-sm text-[var(--muted)]">{d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Carrusel de Situaciones Familiares Reales (MomentsCarousel) */}
        <section className="overflow-hidden bg-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Casos Reales de Familias a Distancia
              </span>
              <SplitHeading
                text="Situaciones cotidianas y"
                accent={{
                  text: "cómo elegir el marco exacto",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <MomentsCarousel items={moments} />
          </div>
        </section>

        {/* 11. Selector Interactivo de Marcos + Vitrina de Afiliados Amazon */}
        <section id="recomendador" className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Recomendador Interactivo en Amazon EE. UU.
              </span>
              <SplitHeading
                text="Elige según la prioridad"
                accent={{
                  text: "de tus padres o abuelos.",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <ul className="grid gap-2 text-[var(--muted)]" data-reveal>
              {[
                "Compara tamaño de pantalla (9\", 10.1\" y 15.6\") y formato 4:3 vs 16:10",
                "Modelos $0/mes sin suscripción obligatoria (nube ilimitada o 32 GB)",
                "Apps gratuitas en español para que envíen fotos hijos, nietos y tíos",
                "Enlaces directos a Amazon Estados Unidos con envío rápido Prime",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-fxlime/20 text-sm text-[#065f46]">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <FrameFinderBlock options={finderOptions} />
          </div>

          <div className="mt-12" data-reveal>
            <AmazonAffiliateBox
              variant="showcase"
              sectionTitle={homeAmazon.sectionTitle}
              sectionSubtitle={homeAmazon.sectionSubtitle}
              products={homeAmazon.products}
              source="home-main-showcase"
            />
          </div>
        </section>

        {/* 12. Bento Grid de los 12 Silos de Categorías + Lo Más Consultado */}
        <section className="bg-gradient-to-b from-white to-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Arquitectura SEO de 1,512 Guías Especializadas
              </span>
              <SplitHeading
                text="Todo sobre marcos digitales Wi‑Fi,"
                accent={{
                  text: "ordenado en 12 categorías sin canibalización",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <div className="grid auto-rows-[minmax(190px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
              {cats.map((c, i) => {
                const count = getArticlesIn(c.slug).length;
                const big = i === 0;
                const wide = i === 1 || i === 2 || i === 6;
                return (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className={`card spot group flex flex-col p-7 ${
                      big
                        ? "spot-dark border-transparent bg-gradient-to-br from-[#17110d] via-[#065f46] to-[#9a3412] text-white md:col-span-2 lg:row-span-2"
                        : ""
                    } ${wide ? "lg:col-span-2" : ""}`}
                    data-reveal
                    data-reveal-delay={String(i % 4)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${
                          big ? "bg-white/15" : "bg-fxsky"
                        }`}
                        aria-hidden
                      >
                        {ICONS[c.icon] || "🖼️"}
                      </span>
                      {count > 0 && (
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            big ? "text-fxlime" : "text-fxbluedeep"
                          }`}
                        >
                          {count} guías
                        </span>
                      )}
                    </div>
                    <h3
                      className={`mt-5 font-display font-extrabold ${
                        big ? "text-3xl sm:text-4xl" : "text-2xl"
                      }`}
                    >
                      {c.name}
                    </h3>
                    <p
                      className={`mt-2 ${
                        big ? "text-white/80" : "text-[var(--muted)]"
                      }`}
                    >
                      {c.description}
                    </p>
                    {big && (
                      <ul className="mt-6 space-y-2 text-sm text-white/85">
                        {getArticlesIn(c.slug)
                          .slice(0, 5)
                          .map((a) => (
                            <li key={a.path}>→ {a.title}</li>
                          ))}
                      </ul>
                    )}
                    <span
                      className={`mt-auto pt-5 font-semibold ${
                        big ? "text-white" : "text-fxbluedeep"
                      }`}
                    >
                      Explorar categoría →
                    </span>
                  </Link>
                );
              })}
            </div>
            {popular.length > 0 && (
              <div className="mt-16">
                <h3
                  className="font-display text-2xl font-extrabold sm:text-3xl"
                  data-reveal
                >
                  Las guías y comparativas más consultadas
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {popular.slice(0, 6).map((a) => (
                    <div key={a.path} data-reveal>
                      <ArticleCard a={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 13. Criterios de Transparencia Editorial y Verificación Técnica */}
        <section className="wrap py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Metodología de Análisis Independiente
              </span>
              <SplitHeading
                text="Especificaciones verificadas,"
                accent={{
                  text: "sin letras pequeñas ni suscripciones sorpresa",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Muchos marcos digitales anuncian «Wi‑Fi y alta definición», pero
                ocultan paneles TN con mal ángulo de visión o aplicaciones que
                cobran por subir videos. En <strong>EligeTuMarco.com</strong>{" "}
                separamos los datos técnicos comprobables de las promesas
                publicitarias.
              </p>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/politica-editorial/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Nuestra política editorial
                </Link>
                <Link
                  href="/divulgacion-de-afiliados/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Divulgación de afiliados Amazon
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card spot p-6" data-reveal>
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#065f46]">
                  ✓ Lo que verificamos en cada modelo
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>
                    • Resolución real en píxeles (1280×800, 1920×1080 o 2K
                    1600×1200) y panel IPS 178°
                  </li>
                  <li>
                    • Proporción 4:3 vs 16:10 para fotos verticales de iPhone y
                    Android
                  </li>
                  <li>
                    • Facilidad real de preconfiguración para padres y abuelos a
                    distancia
                  </li>
                  <li>
                    • Si funciona 100 % gratis ($0/mes) en la nube o con 32 GB
                    internos + MicroSD
                  </li>
                </ul>
              </div>
              <div
                className="card spot p-6"
                data-reveal
                data-reveal-delay="1"
              >
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                  ⚠️ Lo que advertimos antes de comprar
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>
                    • Si un marco en la nube (como Aura) requiere conexión
                    Wi‑Fi permanente
                  </li>
                  <li>
                    • Qué funciones están incluidas gratis y cuáles pertenecen a
                    un plan Plus opcional
                  </li>
                  <li>
                    • Compatibilidad con redes Wi‑Fi de 2.4 GHz vs 5 GHz en casa
                    de los abuelos
                  </li>
                  <li>
                    • Enlaces transparentes a Amazon EE. UU. ({AMAZON_TAG_US}) y
                    España ({AMAZON_TAG_ES})
                  </li>
                </ul>
              </div>
              <div className="card spot p-5 sm:col-span-2 bg-fxsky/70" data-reveal>
                <p className="text-xs font-bold text-fxink">
                  Titularidad y Responsabilidad Editorial: {LEGAL_OWNER} ({LEGAL_LOCATION}) ·{" "}
                  <a
                    href={`mailto:${LEGAL_EMAIL}`}
                    className="text-fxblue underline"
                  >
                    {LEGAL_EMAIL}
                  </a>
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  En este sitio web {FRAME_DISCLAIMER}.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 14. Preguntas Frecuentes (FAQ) */}
        <section className="wrap pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Preguntas frecuentes
              </span>
              <SplitHeading
                text="Respuestas claras antes de elegir tu marco"
                className="section-title mt-3"
              />
              <p className="mt-4 text-[var(--muted)]" data-reveal>
                ¿Tienes una duda específica sobre el Wi‑Fi de tus padres, el
                tamaño de pantalla o cómo enviar fotos desde varios países?
                Nuestro Asesor IA te responde al instante.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-reveal>
                <OpenChatButton
                  label="Preguntar al Asesor IA"
                  className="btn btn-buy shine"
                />
                <Link
                  href={safeHref(
                    "/configuracion-facil-y-regalo-a-distancia/como-preconfigurar-un-marco-digital-wifi-para-regalar-a-distancia/"
                  )}
                  className="btn btn-ghost"
                >
                  Guía de configuración
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="card card-static group p-5 open:shadow-lg"
                  data-reveal
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxbluedeep transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 15. CTA Final */}
        <section className="wrap pb-6">
          <div className="relative isolate overflow-hidden rounded-[36px] bg-gradient-to-br from-[#17110d] via-[#065f46] to-[#9a3412] px-6 py-14 text-white sm:px-14 sm:py-20">
            <Image
              src={heroImg}
              alt=""
              fill
              sizes="1200px"
              className="-z-[2] object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="hero-grid opacity-60" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-drinklight/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-fxlime/25 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
              <div className="text-center lg:text-left">
                <SplitHeading
                  text="Acerca tus recuerdos a padres y abuelos,"
                  accent={{
                    text: "incluso si viven a miles de kilómetros",
                    className: "text-fxlime",
                  }}
                  className="text-4xl font-extrabold sm:text-5xl"
                />
                <p className="mt-4 text-lg text-white/85">
                  Elige el marco digital con Wi‑Fi ideal según tamaño de
                  pantalla, facilidad de preconfiguración, almacenamiento sin
                  cuotas y envío de fotos desde el celular de toda la familia en
                  Amazon Estados Unidos.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href="/marcos-para-padres-y-abuelos/mejores-marcos-digitales-wifi-para-padres-y-abuelos-amazon/"
                    className="btn btn-lime shine text-base"
                    data-magnetic
                  >
                    Ver los Mejores Marcos en Amazon
                  </Link>
                  <OpenChatButton
                    label="Hablar con el Asesor IA"
                    className="btn btn-glass text-base"
                    magnetic
                  />
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[380px]">
                <div className="absolute inset-[12%] rounded-full bg-white/20 blur-3xl" />
                <div className="float-y relative aspect-[16/10] w-full overflow-hidden rounded-3xl border-2 border-white/25 shadow-2xl">
                  <Image
                    src={heroImg}
                    alt="Marco digital con Wi-Fi mostrando fotografías familiares enviadas desde el celular"
                    fill
                    sizes="380px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ClientEffects stickySource="home-sticky" />
    </>
  );
}
