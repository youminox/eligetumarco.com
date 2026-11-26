import fs from "node:fs";
import path from "node:path";
import categories from "@/data/categories.json";
import keywordMap from "@/data/keyword_map.json";

export const SITE_URL = "https://eligetumarco.com";
export const SITE_NAME = "EligeTuMarco.com";
export const LEGAL_OWNER = "CARLOS LINGAN BORJA";
export const LEGAL_LOCATION = "Lima, Perú";
export const LEGAL_EMAIL = "info@charlielingan.com";
export const LEGAL_LINE =
  "Titular del sitio web: CARLOS LINGAN BORJA, domiciliado en Lima, Perú · Correo electrónico: info@charlielingan.com";
export const FRAME_DISCLAIMER =
  "las marcas comerciales mencionadas (Amazon, Aura, Aura Frames, Carver, Mason, Walden, Frameo, Akimart, Skylight, Nixplay, Dragon Touch, Arzopa, Kodak, Cozyla, Echo Show, Alexa, Apple, iPhone, iCloud, Google Fotos, SanDisk, entre otras) pertenecen a sus respectivos propietarios; este portal realiza comparativas independientes de marcos digitales con Wi‑Fi según tamaño de pantalla, facilidad de configuración, almacenamiento y recepción de fotos de varios familiares, y participa en el Programa de Afiliados de Amazon";
export const PUBLISHED = "2026-11-23";
export const VERIFIED_LABEL = "23/11/2026";
export const CHAT_ENDPOINT =
  "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/eligetumarco-chat";

export type Block =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | {
      type: "callout";
      variant: "etiqueta" | "fabricante" | "aviso" | "tip";
      title?: string;
      text: string;
    }
  | { type: "steps"; items: { name: string; text: string }[] }
  | { type: "cta"; text: string };

export type Article = {
  slug: string;
  pillar: string;
  path: string;
  isPillar: boolean;
  isTransactional?: boolean;
  primaryKeyword: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  quickAnswer: string;
  readingMinutes: number;
  image: { prompt: string; alt: string };
  blocks: Block[];
  faqs: { q: string; a: string }[];
  sources?: { label: string; url: string }[];
  related: string[];
  datePublished: string;
  dateModified: string;
  imageUrl: string | null;
};

export type Category = (typeof categories)[number];

const DIR = path.join(process.cwd(), "src/content/articles");
const PUBLIC = path.join(process.cwd(), "public");
let cache: Article[] | null = null;

function isValidArticle(a: Partial<Article>): a is Article {
  return Boolean(
    a && a.slug && a.pillar && a.path && a.title && Array.isArray(a.blocks)
  );
}

const PILLAR_SCENE_POOLS: Record<string, string[]> = {
  "resenas-marcos-digitales-wifi": [
    "cat-resenas-marcos-digitales-wifi",
    "scene-resenas-2",
    "scene-resenas-3",
    "scene-resenas-4",
    "home-aura-nube",
    "home-frameo-32gb",
  ],
  "comparativas-marcos-digitales": [
    "cat-comparativas-marcos-digitales",
    "scene-comparativas-2",
    "scene-comparativas-3",
    "scene-comparativas-4",
    "home-formato-4-3",
    "home-tamanos-pantalla",
  ],
  "marcos-para-padres-y-abuelos": [
    "cat-marcos-para-padres-y-abuelos",
    "scene-abuelos-2",
    "scene-abuelos-3",
    "scene-abuelos-4",
    "home-abuelos-lejos",
    "home-preconfiguracion-regalo",
  ],
  "marcos-por-tamano-y-pantalla": [
    "cat-marcos-por-tamano-y-pantalla",
    "scene-pantalla-2",
    "scene-pantalla-3",
    "scene-pantalla-4",
    "home-tamanos-pantalla",
    "home-formato-4-3",
  ],
  "marcos-por-app-y-almacenamiento": [
    "cat-marcos-por-app-y-almacenamiento",
    "scene-app-2",
    "scene-app-3",
    "scene-app-4",
    "home-aura-nube",
    "home-frameo-32gb",
    "home-varios-familiares",
  ],
  "marcos-por-presupuesto-y-ofertas": [
    "cat-marcos-por-presupuesto-y-ofertas",
    "scene-presupuesto-2",
    "scene-presupuesto-3",
    "scene-presupuesto-4",
    "home-hero-marcos",
    "home-frameo-32gb",
  ],
  "configuracion-facil-y-regalo-a-distancia": [
    "cat-configuracion-facil-y-regalo-a-distancia",
    "scene-configuracion-2",
    "scene-configuracion-3",
    "scene-configuracion-4",
    "home-preconfiguracion-regalo",
    "home-abuelos-lejos",
  ],
  "enviar-fotos-desde-el-celular-y-familia": [
    "cat-enviar-fotos-desde-el-celular-y-familia",
    "scene-celular-2",
    "scene-celular-3",
    "scene-celular-4",
    "home-varios-familiares",
    "home-abuelos-lejos",
  ],
  "guia-de-pantallas-resolucion-y-formatos": [
    "cat-guia-de-pantallas-resolucion-y-formatos",
    "scene-formatos-2",
    "scene-formatos-3",
    "scene-formatos-4",
    "home-formato-4-3",
    "home-tamanos-pantalla",
  ],
  "almacenamiento-nube-microsd-y-privacidad": [
    "cat-almacenamiento-nube-microsd-y-privacidad",
    "scene-almacenamiento-2",
    "scene-almacenamiento-3",
    "scene-almacenamiento-4",
    "home-frameo-32gb",
    "home-aura-nube",
  ],
  "solucion-de-problemas-wifi-y-apps": [
    "cat-solucion-de-problemas-wifi-y-apps",
    "scene-wifi-2",
    "scene-wifi-3",
    "scene-wifi-4",
    "home-varios-familiares",
  ],
  "ideas-de-fotografia-familiar-y-decoracion": [
    "cat-ideas-de-fotografia-familiar-y-decoracion",
    "scene-decoracion-2",
    "scene-decoracion-3",
    "scene-decoracion-4",
    "home-abuelos-lejos",
    "og-default",
  ],
};

function resolveArticleImage(a: Article): string {
  const imgArt = path.join(PUBLIC, "img/articulos", `${a.slug}.webp`);
  if (fs.existsSync(imgArt)) {
    return `/img/articulos/${a.slug}.webp`;
  }
  const imgAmb = path.join(PUBLIC, "img/ambiente", `cat-${a.pillar}.webp`);
  return fs.existsSync(imgAmb)
    ? `/img/ambiente/cat-${a.pillar}.webp`
    : `/img/ambiente/og-default.webp`;
}

export function getAllContent(): Article[] {
  if (cache) return cache;
  const order = keywordMap.map((k: { path: string }) => k.path);
  const files = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))
    : [];
  const list: Article[] = [];
  const seen = new Set<string>();
  const pillarCountMap = new Map<string, number>();
  for (const f of files) {
    try {
      const a = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
      if (!isValidArticle(a) || seen.has(a.path)) continue;
      seen.add(a.path);
      const imageUrl = resolveArticleImage(a);
      list.push({
        ...a,
        isPillar: Boolean(a.isPillar),
        isTransactional: Boolean(a.isTransactional),
        image:
          a.image && a.image.alt ? a.image : { prompt: "", alt: a.title },
        faqs: Array.isArray(a.faqs) ? a.faqs : [],
        related: Array.isArray(a.related) ? a.related : [],
        quickAnswer: a.quickAnswer || a.excerpt || "",
        excerpt: a.excerpt || a.metaDescription || "",
        seoTitle: a.seoTitle || a.title,
        metaDescription: a.metaDescription || a.excerpt || "",
        datePublished: a.datePublished || PUBLISHED,
        dateModified: a.dateModified || PUBLISHED,
        imageUrl,
      });
    } catch {
      // ignore invalid json during generation
    }
  }
  list.sort((x, y) => {
    const ix = order.indexOf(x.path);
    const iy = order.indexOf(y.path);
    if (ix === -1 && iy === -1) return x.path.localeCompare(y.path);
    if (ix === -1) return 1;
    if (iy === -1) return -1;
    return ix - iy;
  });
  cache = list;
  return list;
}

export const getCategories = (): Category[] => categories;
export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
export const getPillar = (slug: string) =>
  getAllContent().find((a) => a.isPillar && a.pillar === slug);
export const getArticle = (pillar: string, slug: string) =>
  getAllContent().find(
    (a) => !a.isPillar && a.pillar === pillar && a.slug === slug
  );
export const getArticlesIn = (pillar: string) =>
  getAllContent().filter((a) => !a.isPillar && a.pillar === pillar);
export const getByPath = (p: string) =>
  getAllContent().find((a) => a.path === p);

export function safeHref(p: string): string {
  if (getByPath(p)) return p;
  const pillar = p.split("/").filter(Boolean)[0];
  if (pillar && getCategory(pillar)) return `/${pillar}/`;
  return "/";
}

export function ambient(
  name: string,
  fallback = "/img/ambiente/home-hero-marcos.webp"
): string {
  const rel = `/img/ambiente/${name}.webp`;
  return fs.existsSync(path.join(PUBLIC, rel)) ? rel : fallback;
}

export const hasAmbient = (name: string) =>
  fs.existsSync(path.join(PUBLIC, `/img/ambiente/${name}.webp`));

export const OG_DEFAULT = () =>
  ambient("og-default", "/img/ambiente/home-hero-marcos.webp");

export function absolute(url: string) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function trimTitle(t: string) {
  return t.replace(/\s*\|\s*EligeTuMarco(?:\.com)?\s*$/i, "");
}

export const organizationLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon.svg`,
  founder: { "@id": `${SITE_URL}/#carlos` },
  email: LEGAL_EMAIL,
  description:
    "Guía en español para elegir marcos digitales con Wi‑Fi que permitan enviar fotos desde el celular a padres y abuelos, incluso si viven lejos. Compara modelos según el tamaño de pantalla, la facilidad de configuración, el almacenamiento y la posibilidad de recibir fotos de varios familiares en Amazon Estados Unidos.",
};

export const personLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#carlos`,
  name: LEGAL_OWNER,
  email: LEGAL_EMAIL,
  jobTitle: "Fundador & Editor Jefe de EligeTuMarco.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
  url: `${SITE_URL}/sobre-nosotros/`,
};
