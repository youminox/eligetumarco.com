export const AMAZON_TAG_US = "eligetumarco-20";
export const AMAZON_TAG_ES = "eligetumarco-21";

export type AmazonStoreRegion = "US" | "ES";

export type AmazonCategoryType =
  | "cloud-unlimited"
  | "local-32gb-microsd"
  | "email-easy"
  | "large-screen"
  | "aspect-4-3"
  | "budget-value"
  | "accessory-storage";

export interface AmazonProductRecommendation {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  categoryType: AmazonCategoryType;
  specs?: {
    screenSize: string;
    setupEase: string;
    storageAndCost: string;
    familySharing: string;
  };
  asinUS?: string;
  asinES?: string;
  queryUS: string;
  queryES: string;
  ctaLabel: string;
}

/**
 * Genera el enlace oficial de afiliado Amazon según la región:
 * - EE. UU. / Latinoamérica / Global (US - Predeterminado): amazon.com con tag=eligetumarco-20
 * - España / Europa (ES): amazon.es con tag=eligetumarco-21
 */
export function buildAmazonUrl(
  product: AmazonProductRecommendation,
  region: AmazonStoreRegion
): string {
  if (region === "ES") {
    if (product.asinES) {
      return `https://www.amazon.es/dp/${product.asinES}?tag=${AMAZON_TAG_ES}`;
    }
    const q = encodeURIComponent(product.queryES);
    return `https://www.amazon.es/s?k=${q}&tag=${AMAZON_TAG_ES}`;
  }

  if (product.asinUS) {
    return `https://www.amazon.com/dp/${product.asinUS}?tag=${AMAZON_TAG_US}`;
  }
  const q = encodeURIComponent(product.queryUS);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG_US}`;
}

/**
 * Detecta automáticamente la región del visitante.
 * Por defecto prioriza Amazon Estados Unidos ("US") y activa "ES" si navega desde España/Europa.
 */
export function detectUserAmazonRegion(): AmazonStoreRegion {
  if (typeof window === "undefined") {
    return "US";
  }
  try {
    const saved = window.localStorage.getItem("etm_amazon_region");
    if (saved === "US" || saved === "ES") return saved;
  } catch {
    // ignore
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();
    if (
      tz === "Europe/Madrid" ||
      tz === "Atlantic/Canary" ||
      tz === "Europe/Ceuta" ||
      tz.startsWith("Europe/") ||
      lang === "es-es"
    ) {
      return "ES";
    }
    return "US";
  } catch {
    return "US";
  }
}

export const CATALOG: Record<string, AmazonProductRecommendation> = {
  AURA_CARVER_10_WIFI: {
    id: "aura-carver-10-wifi",
    badge: "🏆 #1 El Más Fácil para Padres y Abuelos · Nube Ilimitada Gratis",
    title:
      "Aura Carver 10.1\" HD Wi‑Fi Digital Picture Frame — Preconfiguración sin Abrir la Caja, Smart Pairing y Nube Ilimitada",
    subtitle:
      "¿Por qué es el favorito para enviar a padres y abuelos que viven lejos? Trae un código QR de regalo en la caja para que tú cargues las fotos, el mensaje de bienvenida y su Wi‑Fi desde tu celular: ellos solo lo enchufan a la corriente.",
    features: [
      "Pantalla panorámica IPS de 10.1\" (1280×800) con emparejamiento inteligente (Smart Pairing) que une 2 fotos verticales del celular lado a lado sin bordes negros",
      "Almacenamiento en la nube 100 % ilimitado y gratuito de por vida para más de 10.000 fotos y videos cortos",
      "Permite invitar a familiares ilimitados (hijos, nietos, hermanos en distintos países) mediante la App gratuita Aura para iPhone/Android o correo electrónico",
    ],
    categoryType: "cloud-unlimited",
    specs: {
      screenSize: "10.1\" HD IPS Antirreflejos (16:10 + Smart Pairing)",
      setupEase: "Ultra Fácil: Código QR de Regalo sin abrir la caja",
      storageAndCost: "Nube Ilimitada Gratis",
      familySharing: "Familiares Ilimitados vía App Aura (iOS/Android) y Email",
    },
    queryUS: "Aura Carver 10.1 WiFi Digital Picture Frame Free Unlimited Cloud Storage",
    queryES: "Aura Carver 10.1 marco de fotos digital WiFi almacenamiento ilimitado",
    ctaLabel: "Consultar Precio de Aura Carver 10.1\" en Amazon",
  },
  AURA_MASON_9_2K: {
    id: "aura-mason-9-2k",
    badge: "📐 Mejor Pantalla 2K Formato 4:3 (Rotación Vertical y Horizontal)",
    title:
      "Aura Mason 9\" 2K Full HD+ Wi‑Fi Digital Photo Frame — Proporción 4:3 Exacta a la Cámara del iPhone y Android",
    subtitle:
      "Ideal para quienes buscan la máxima nitidez fotográfica y quieren girar el marco en vertical o en horizontal: su pantalla 2K (1600×1200, 224 PPI) tiene la misma proporción 4:3 que los sensores de los smartphones modernos.",
    features: [
      "Proporción 4:3 nativa con resolución 2K (1600×1200 px): muestra las fotos de iPhone y Android a pantalla completa sin recortes ni barras laterales",
      "Se sostiene por sí solo en posición vertical (retrato) u horizontal (paisaje) y rota la imagen automáticamente gracias a su acelerómetro interno",
      "Incluye almacenamiento en la nube ilimitado gratis, altavoz integrado para videos de los nietos y sensor de luz que apaga el marco de noche",
    ],
    categoryType: "aspect-4-3",
    specs: {
      screenSize: "9\" 2K Full HD+ (1600×1200 · Formato 4:3 Rotable)",
      setupEase: "Preconfiguración de Regalo en 2 min desde tu celular",
      storageAndCost: "Nube Ilimitada Gratis + Audio para Videos",
      familySharing: "Familiares Ilimitados vía App Aura + Google Fotos / iCloud",
    },
    queryUS: "Aura Mason 9 inch 2K WiFi Digital Picture Frame Free Standing",
    queryES: "Aura Mason marco digital WiFi 2K rotacion automatica",
    ctaLabel: "Ver Precio de Aura Mason 9\" 2K en Amazon",
  },
  FRAMEO_AKIMART_10_32GB: {
    id: "frameo-akimart-10-32gb",
    badge: "💾 #1 Calidad-Precio con 32 GB Internos + MicroSD (Funciona con y sin Wi‑Fi)",
    title:
      "Frameo 10.1\" Wi‑Fi Digital Picture Frame IPS Touch Screen (32 GB de Memoria Interna + Ranura MicroSD)",
    subtitle:
      "La mejor elección cuando tus padres o abuelos tienen internet inestable o prefieres que las fotos queden guardadas físicamente dentro del marco: almacena hasta 80.000 fotos en sus 32 GB internos y sigue mostrándolas aunque se corte el Wi‑Fi.",
    features: [
      "32 GB de memoria flash interna integrada + ranura para tarjeta MicroSD, lo que permite pre-cargarle miles de fotos antes de regalarlo",
      "Usa la App oficial Frameo (iOS y Android) 100 % gratuita sin suscripción: cada familiar añade un código de 10 dígitos y envía fotos con dedicatoria escrita",
      "Pantalla táctil IPS HD de 10.1\" (1280×800) con interfaz en español, rotación automática vertical/horizontal y soporte para mesa o montaje en pared",
    ],
    categoryType: "local-32gb-microsd",
    specs: {
      screenSize: "10.1\" HD IPS Táctil (1280×800 · Mesa o Pared)",
      setupEase: "Fácil: Interfaz en español + Pre-carga de fotos y Wi‑Fi",
      storageAndCost: "32 GB Internos (~80.000 fotos) + MicroSD",
      familySharing: "Hasta 500+ familiares gratis con la App Frameo",
    },
    queryUS: "Frameo 10.1 Inch WiFi Digital Picture Frame 32GB IPS Touch Screen Auto Rotate",
    queryES: "Frameo 10.1 pulgadas marco digital WiFi 32GB pantalla tactil IPS",
    ctaLabel: "Ver Precio de Frameo 10.1\" (32 GB) en Amazon",
  },
  SKYLIGHT_FRAME_10_TOUCH: {
    id: "skylight-frame-10-touch",
    badge: "✉️ El Mejor para Enviar Fotos por Correo Electrónico sin Instalar Apps",
    title:
      "Skylight Frame 10\" Wi‑Fi Touch Digital Photo Frame — Envío Directo de Fotos por Email en Segundos",
    subtitle:
      "Perfecto para familias donde tíos, primos o abuelos prefieren no instalar aplicaciones en el teléfono: al activarlo creas una dirección de correo única (ej. abuelos@ourskylight.com) y cualquier foto adjunta aparece en la pantalla en menos de 60 segundos.",
    features: [
      "Envío universal por correo electrónico sin costo de suscripción para fotos: cualquier familiar puede mandar recuerdos desde su celular, tablet o computadora",
      "Botón de corazón en la pantalla táctil: cuando tus padres o abuelos tocan el corazón en una foto, tú recibes una notificación de agradecimiento",
      "Modo Regalo (Gift Mode) para precargar fotos antes de que lo abran y memoria interna que permite ver las fotos descargadas incluso en modo offline",
    ],
    categoryType: "email-easy",
    specs: {
      screenSize: "10\" IPS Color Touch Screen (1280×800 · 16:10)",
      setupEase: "Enchufar, elegir Wi‑Fi y enviar fotos a su correo único",
      storageAndCost: "8 GB / 16 GB Internos + Modo Offline (Email Gratis)",
      familySharing: "Envío por Email @ourskylight.com + App Skylight",
    },
    queryUS: "Skylight Frame 10 Inch WiFi Digital Picture Frame Email Photos Touch Screen",
    queryES: "Skylight Frame 10 pulgadas marco de fotos digital WiFi email",
    ctaLabel: "Consultar Precio de Skylight Frame 10\" en Amazon",
  },
  FRAMEO_15_6_FHD_LARGE: {
    id: "frameo-15-6-fhd-large",
    badge: "👵 Mejor Pantalla Grande 15.6\" Full HD para Abuelos con Baja Visión y Pared",
    title:
      "Frameo 15.6\" Large Full HD (1920×1080) Wi‑Fi Digital Photo Frame — 32 GB Internos, Mesa o Pared",
    subtitle:
      "Diseñado para padres y abuelos con presbicia o baja visión, o para colocar en la pared principal de la sala o comedor: su pantalla de 15.6 pulgadas ofrece más del doble de superficie visual que un marco de 10 pulgadas con resolución Full HD 1080p.",
    features: [
      "Panel IPS Full HD real (1920×1080 px) de 15.6\" con ángulo de visión de 178° para distinguir rostros y subtítulos claramente desde el sofá",
      "32 GB de almacenamiento interno más ranura para tarjeta MicroSD y puerto USB-C, sin ningún pago mensual ni suscripción obligatoria",
      "Recibe fotos y videos con sonido desde el celular de hijos y nietos en todo el mundo a través de la aplicación gratuita Frameo",
    ],
    categoryType: "large-screen",
    specs: {
      screenSize: "15.6\" Full HD IPS Táctil (1920×1080 · Mesa o Pared)",
      setupEase: "Letras grandes en español + Apagado nocturno programable",
      storageAndCost: "32 GB Internos + Ranura MicroSD / USB-C",
      familySharing: "Familiares Ilimitados vía App Frameo con subtítulos",
    },
    queryUS: "Frameo 15.6 Inch Large WiFi Digital Picture Frame 1920x1080 FHD IPS Touch Screen 32GB",
    queryES: "Frameo 15.6 pulgadas marco digital WiFi Full HD 1920x1080 32GB pared",
    ctaLabel: "Ver Precio de Frameo 15.6\" Full HD en Amazon",
  },
  AURA_WALDEN_15_WALL: {
    id: "aura-walden-15-wall",
    badge: "🖼️ Mejor Marco de Pared 15\" Gama Alta con Acabado Mate Antirreflejos",
    title:
      "Aura Walden 15\" Anti-Glare Mat Wi‑Fi Digital Frame — Formato 4:3 de Galería con Paspartú Texturizado",
    subtitle:
      "El regalo principal de lujo para aniversarios, Navidad o Día de la Madre: combina una pantalla de 15 pulgadas en proporción fotográfica 4:3 con cristal mate antirreflejos y un paspartú interior que hace que las fotos luzcan como impresiones de galería.",
    features: [
      "Pantalla de 15\" en proporción 4:3 (1600×1200) con revestimiento mate antirreflejos que elimina el brillo de ventanas y lámparas de sala",
      "Incluye herrajes para colgar en pared (vertical u horizontal) y soporte de aluminio para aparador o mesa",
      "Almacenamiento en la nube ilimitado y gratuito con preconfiguración remota desde la App Aura antes de que tus padres abran el regalo",
    ],
    categoryType: "large-screen",
    specs: {
      screenSize: "15\" Mate Antirreflejos (1600×1200 · Formato 4:3 Galería)",
      setupEase: "Ultra Fácil: Código de Regalo Aura + Sensor de Luz",
      storageAndCost: "Nube Ilimitada Gratis",
      familySharing: "Familiares Ilimitados vía App Aura, Web y Email",
    },
    queryUS: "Aura Walden 15 Inch WiFi Digital Picture Frame Anti Glare Mat Wall Mount",
    queryES: "Aura Walden 15 pulgadas marco de fotos digital WiFi pared mate",
    ctaLabel: "Ver Aura Walden 15\" de Galería en Amazon",
  },
  NIXPLAY_10_TOUCH_WIFI: {
    id: "nixplay-10-touch-wifi",
    badge: "📱 Excelente para Álbumes Familiares Compartidos y Sensor de Presencia",
    title:
      "Nixplay 10.1\" Smart Digital Picture Frame Wi‑Fi Touch — Preconfiguración de Regalo, App iOS/Android y Email",
    subtitle:
      "Una de las marcas pioneras en marcos conectados para abuelos: destaca por su función de Álbumes de Eventos Familiares (donde varios hijos suben fotos a una misma lista) y su sensor inteligente que enciende la pantalla cuando alguien entra a la habitación.",
    features: [
      "Preconfiguración Gift Setup en la app Nixplay: añade fotos, mensaje de regalo y miembros de la familia sin sacar el marco de su empaque",
      "Pantalla táctil HD IPS de 10.1\" con cable de alimentación que funciona a la vez como soporte flexible en vertical u horizontal",
      "Envío de fotos desde el celular mediante la App Nixplay (iOS/Android), correo electrónico e integración con Google Fotos",
    ],
    categoryType: "cloud-unlimited",
    specs: {
      screenSize: "10.1\" HD IPS Táctil (1280×800 · 16:10)",
      setupEase: "Preconfiguración en App + Sensor de encendido automático",
      storageAndCost: "Nube Nixplay + Caché interna para funcionamiento continuo",
      familySharing: "Listas compartidas entre hermanos y nietos (App + Email)",
    },
    queryUS: "Nixplay 10.1 Inch Touch Screen Digital Picture Frame WiFi Share Photos via App Email",
    queryES: "Nixplay 10.1 pulgadas marco digital de fotos WiFi pantalla tactil",
    ctaLabel: "Ver Precio de Nixplay 10.1\" Wi‑Fi en Amazon",
  },
  DRAGON_TOUCH_CLASSIC_10: {
    id: "dragon-touch-classic-10",
    badge: "💵 Mejor Marco Económico con Memoria Interna, MicroSD y USB",
    title:
      "Dragon Touch Classic 10 / Arzopa 10.1\" Wi‑Fi Digital Frame — Pantalla Táctil HD, Memoria Interna y Efecto Madera",
    subtitle:
      "La opción ideal cuando buscas gastar precio variable en Amazon en Amazon EE. UU. sin renunciar a conectividad Wi‑Fi: su borde con acabado de madera y paspartú blanco encaja en salas clásicas de padres y abuelos y acepta 4 métodos distintos de carga de fotos.",
    features: [
      "4 formas de recibir fotos: aplicación móvil gratuita (OurPhoto / Frameo), correo electrónico dedicado, tarjeta MicroSD y memoria USB-A",
      "Memoria interna de 16 GB / 32 GB capaz de guardar más de 40.000 fotos sin ningún costo mensual ni suscripción",
      "Interfaz táctil intuitiva en español con pronóstico del clima, reloj calendario opcional para adultos mayores y modo sueño nocturno",
    ],
    categoryType: "budget-value",
    specs: {
      screenSize: "10.1\" HD IPS Táctil con Borde Clásico de Madera",
      setupEase: "Menú en español con modo reloj/calendario para abuelos",
      storageAndCost: "16 GB / 32 GB Internos + MicroSD + USB",
      familySharing: "App Móvil Gratuita + Envío por Correo Electrónico",
    },
    queryUS: "Dragon Touch Classic 10 Digital Picture Frame WiFi IPS Touch Screen",
    queryES: "Dragon Touch Classic 10 marco de fotos digital WiFi tactil",
    ctaLabel: "Ver Marcos Digitales Wi‑Fi en Amazon",
  },
  ECHO_SHOW_8_10_PHOTOS: {
    id: "echo-show-8-10-photos",
    badge: "📞 Mejor 2-en-1: Marco Digital con Amazon Photos + Videollamadas a Abuelos",
    title:
      "Amazon Echo Show 8 / Echo Show 15 — Marco de Fotos con Amazon Photos, Alexa en Español y Videollamadas Drop In",
    subtitle:
      "¿Quieres enviarles fotos desde tu celular y además poder verlos en videollamada sin que ellos tengan que contestar ni tocar ningún botón? El Echo Show se convierte en un marco digital con el álbum familiar de Amazon Photos y permite usar Drop In con Alexa.",
    features: [
      "Modo Photo Frame integrado con Amazon Photos (almacenamiento de fotos ilimitado a máxima resolución incluido si tienes Amazon Prime)",
      "Función Drop In y videollamadas manos libres: habla y ve a tus padres o abuelos a distancia en cualquier momento con Alexa en español",
      "Recordatorios por voz de medicamentos, pronóstico del tiempo, música y pantalla con ajuste automático de color (Adaptive Color)",
    ],
    categoryType: "cloud-unlimited",
    specs: {
      screenSize: "8\" HD o 15.6\" Full HD de Pared · Adaptive Color",
      setupEase: "Control 100 % por voz con Alexa en español + Drop In",
      storageAndCost: "Amazon Photos (Ilimitado para miembros Amazon Prime)",
      familySharing: "Álbum Familiar Compartido en App Amazon Photos",
    },
    queryUS: "Amazon Echo Show 8 Smart Display with Alexa and Amazon Photos Digital Frame",
    queryES: "Amazon Echo Show 8 pantalla inteligente con Alexa y marco de fotos",
    ctaLabel: "Ver Amazon Echo Show con Marco de Fotos en Amazon",
  },
  SANDISK_MICROSD_CABLE_KIT: {
    id: "sandisk-microsd-cable-kit",
    badge: "🔌 Accesorio Recomendado: MicroSD 64/128 GB para Pre-cargar Miles de Fotos",
    title:
      "Tarjeta MicroSD SanDisk Ultra 64 GB / 128 GB Clase 10 A1 + Adaptador SD para Marcos Digitales Frameo, Kodak y Dragon Touch",
    subtitle:
      "El complemento perfecto al comprar cualquier marco con ranura MicroSD (como Frameo, Akimart, Arzopa o Dragon Touch): te permite copiar desde tu computadora o celular miles de fotos antiguas escaneadas y videos largos para que los abuelos los tengan siempre listos.",
    features: [
      "Velocidad UHS-I Clase 10 (hasta 140 MB/s) para que las presentaciones de fotos y videos Full HD carguen al instante sin parpadeos",
      "Permite hacer copias de seguridad completas (Backup) de todas las fotos que la familia ha enviado por Wi‑Fi al marco Frameo",
      "Incluye adaptador SD para insertar fácilmente en cualquier laptop Mac o Windows antes de envolver el marco de regalo",
    ],
    categoryType: "accessory-storage",
    specs: {
      screenSize: "Compatible con Marcos Frameo, Arzopa, Dragon Touch y Kodak",
      setupEase: "Plug & Play: inserta en la ranura trasera del marco",
      storageAndCost: "64 GB / 128 GB (+150.000 fotos o horas de video familiar)",
      familySharing: "Ideal para pre-cargar álbumes históricos y hacer Backup",
    },
    queryUS: "SanDisk 64GB Ultra microSDXC UHS-I Memory Card with Adapter for Digital Photo Frame",
    queryES: "SanDisk Ultra 64GB tarjeta microSDXC con adaptador para marco digital",
    ctaLabel: "Ver Tarjeta MicroSD SanDisk para Marco Digital en Amazon",
  },
};

export interface ContextualAmazonBundle {
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
  vsCompetitor?: AmazonProductRecommendation;
}

/**
 * Selecciona los 3 marcos digitales con Wi‑Fi de Amazon más relevantes según el slug, categoría y título de la página,
 * comparando tamaño de pantalla, facilidad de configuración para padres/abuelos, almacenamiento y envío desde varios familiares.
 */
export function getContextualAmazonProducts(
  slug: string,
  category: string,
  title?: string
): ContextualAmazonBundle {
  const text = `${slug} ${category} ${title || ""}`.toLowerCase();

  // 1. Pantallas Grandes 15", 15.6", 21.5", Pared o Baja Visión para Abuelos
  if (
    text.includes("15-pulgadas") ||
    text.includes("15-6") ||
    text.includes("21-pulgadas") ||
    text.includes("grande") ||
    text.includes("pared") ||
    text.includes("walden") ||
    text.includes("baja-vision") ||
    text.includes("vista-cansada") ||
    text.includes("lejos-del-sofa")
  ) {
    return {
      sectionTitle:
        "Top 3 en Amazon EE. UU.: Marcos Digitales Wi‑Fi de Pantalla Grande (15\" y 15.6\") para Sala, Pared y Baja Visión",
      sectionSubtitle:
        "Comparados por visibilidad a distancia para abuelos, acabado antirreflejos, almacenamiento (32 GB vs nube ilimitada) y envío desde el celular de toda la familia.",
      products: [
        CATALOG.FRAMEO_15_6_FHD_LARGE,
        CATALOG.AURA_WALDEN_15_WALL,
        CATALOG.ECHO_SHOW_8_10_PHOTOS,
      ],
      vsCompetitor: CATALOG.AURA_WALDEN_15_WALL,
    };
  }

  // 2. Proporción 4:3, Resolución 2K, Fotos Verticales del Celular, Aura Mason
  if (
    category === "guia-de-pantallas-resolucion-y-formatos" ||
    text.includes("4-3") ||
    text.includes("16-10") ||
    text.includes("2k") ||
    text.includes("mason") ||
    text.includes("vertical") ||
    text.includes("bordes-negros") ||
    text.includes("resolucion") ||
    text.includes("ips") ||
    text.includes("antirreflejo")
  ) {
    return {
      sectionTitle:
        "Selección Amazon: Los 3 Marcos con Mejor Pantalla IPS, Formato 4:3 y Emparejamiento de Fotos Verticales",
      sectionSubtitle:
        "Evita fotos recortadas o barras negras: compara el formato 4:3 2K nativo de Aura Mason frente al Smart Pairing de Aura Carver y el panel táctil IPS de Frameo.",
      products: [
        CATALOG.AURA_MASON_9_2K,
        CATALOG.AURA_CARVER_10_WIFI,
        CATALOG.FRAMEO_AKIMART_10_32GB,
      ],
      vsCompetitor: CATALOG.AURA_CARVER_10_WIFI,
    };
  }

  // 3. Envío por Correo Electrónico (Email), Skylight Frame, Familiares sin Apps
  if (
    text.includes("skylight") ||
    text.includes("correo") ||
    text.includes("email") ||
    text.includes("sin-app") ||
    text.includes("nixplay")
  ) {
    return {
      sectionTitle:
        "Los 3 Mejores Marcos Digitales en Amazon para Recibir Fotos por Correo Electrónico y App Familiar",
      sectionSubtitle:
        "Ideales cuando varios familiares quieren mandar fotos a padres y abuelos tanto por email directo como desde el celular en iPhone y Android.",
      products: [
        CATALOG.SKYLIGHT_FRAME_10_TOUCH,
        CATALOG.AURA_CARVER_10_WIFI,
        CATALOG.NIXPLAY_10_TOUCH_WIFI,
      ],
      vsCompetitor: CATALOG.AURA_CARVER_10_WIFI,
    };
  }

  // 4. Almacenamiento Local 32 GB, MicroSD, USB, Funciona sin Wi‑Fi, Frameo
  if (
    category === "almacenamiento-nube-microsd-y-privacidad" ||
    text.includes("microsd") ||
    text.includes("32gb") ||
    text.includes("32-gb") ||
    text.includes("16gb") ||
    text.includes("64gb") ||
    text.includes("memoria-interna") ||
    text.includes("sin-wifi") ||
    text.includes("sin-internet") ||
    text.includes("frameo") ||
    text.includes("akimart") ||
    text.includes("backup")
  ) {
    return {
      sectionTitle:
        "Top 3 en Amazon: Marcos Digitales con 32 GB de Memoria Interna + Ranura MicroSD (Funcionan con y sin Wi‑Fi)",
      sectionSubtitle:
        "Guarda hasta 80.000 fotos directamente en el marco sin pagar suscripciones mensuales y amplía la capacidad con tarjeta MicroSD.",
      products: [
        CATALOG.FRAMEO_AKIMART_10_32GB,
        CATALOG.FRAMEO_15_6_FHD_LARGE,
        CATALOG.SANDISK_MICROSD_CABLE_KIT,
      ],
      vsCompetitor: CATALOG.AURA_CARVER_10_WIFI,
    };
  }

  // 5. Marcos Económicos, Presupuesto, Ofertas Amazon
  if (
    category === "marcos-por-presupuesto-y-ofertas" ||
    text.includes("barato") ||
    text.includes("economico") ||
    text.includes("menos-de-50") ||
    text.includes("menos-de-70") ||
    text.includes("menos-de-80") ||
    text.includes("menos-de-100") ||
    text.includes("calidad-precio") ||
    text.includes("dragon-touch") ||
    text.includes("arzopa") ||
    text.includes("kodak")
  ) {
    return {
      sectionTitle:
        "Los 3 Marcos Digitales Wi‑Fi con Mejor Relación Calidad-Precio en Amazon EE. UU.",
      sectionSubtitle:
        "Modelos económicos y superventas con pantalla IPS táctil, 16/32 GB de memoria interna y aplicación gratuita para toda la familia.",
      products: [
        CATALOG.FRAMEO_AKIMART_10_32GB,
        CATALOG.DRAGON_TOUCH_CLASSIC_10,
        CATALOG.AURA_CARVER_10_WIFI,
      ],
      vsCompetitor: CATALOG.DRAGON_TOUCH_CLASSIC_10,
    };
  }

  // 6. Configuración de Regalo a Distancia, Padres y Abuelos Mayores, Preconfiguración sin Abrir la Caja
  if (
    category === "marcos-para-padres-y-abuelos" ||
    category === "configuracion-facil-y-regalo-a-distancia" ||
    text.includes("abuelo") ||
    text.includes("padre") ||
    text.includes("madre") ||
    text.includes("mama") ||
    text.includes("papa") ||
    text.includes("preconfigurar") ||
    text.includes("regalo") ||
    text.includes("distancia") ||
    text.includes("lejos") ||
    text.includes("80-anos") ||
    text.includes("adultos-mayores")
  ) {
    return {
      sectionTitle:
        "Los 3 Marcos Digitales Más Fáciles para Padres y Abuelos que Viven Lejos (Listos para Enchufar)",
      sectionSubtitle:
        "Preconfigúralos desde tu celular antes de que lleguen a su casa: comparados por tamaño de pantalla, facilidad de uso, almacenamiento y envío familiar.",
      products: [
        CATALOG.AURA_CARVER_10_WIFI,
        CATALOG.FRAMEO_AKIMART_10_32GB,
        CATALOG.FRAMEO_15_6_FHD_LARGE,
      ],
      vsCompetitor: CATALOG.FRAMEO_AKIMART_10_32GB,
    };
  }

  // 7. Default: Los 3 Mejores Marcos Digitales con Wi‑Fi en Amazon Estados Unidos
  return {
    sectionTitle:
      "Los 3 Mejores Marcos Digitales con Wi‑Fi en Amazon EE. UU. (Comparados por Pantalla, Configuración, Memoria y App Familiar)",
    sectionSubtitle:
      "Elige entre nube ilimitada gratis con preconfiguración sin abrir la caja (Aura Carver), pantalla 2K formato 4:3 (Aura Mason) o 32 GB internos con MicroSD (Frameo 10.1\").",
    products: [
      CATALOG.AURA_CARVER_10_WIFI,
      CATALOG.FRAMEO_AKIMART_10_32GB,
      CATALOG.AURA_MASON_9_2K,
    ],
    vsCompetitor: CATALOG.FRAMEO_AKIMART_10_32GB,
  };
}
