import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sync-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SITE = "https://eligetumarco.com";
const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"];
const AMAZON_TAG_US = "eligetumarco-20";
const AMAZON_TAG_ES = "eligetumarco-21";

export interface ArticleRow {
  slug: string;
  title: string;
  category: string;
  category_name: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: string | null;
  search_text: string | null;
}

export interface ArticleCard {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  url: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export interface AmazonProductCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  rating: string;
  reviewsCount: string;
  urlUS: string;
  urlES: string;
}

const AMAZON_PRODUCTS: Record<string, AmazonProductCard> = {
  "aura-carver-10-wifi": {
    id: "aura-carver-10-wifi",
    badge: "🏆 #1 El Más Fácil para Padres y Abuelos · Nube Ilimitada Gratis",
    title: "Aura Carver 10.1\" HD Wi‑Fi Digital Picture Frame — Preconfiguración de Regalo sin Abrir la Caja y Nube Ilimitada",
    subtitle:
      "Pantalla IPS antirreflejos de 10.1\" con Smart Pairing (muestra 2 fotos verticales juntas), almacenamiento en la nube ilimitado gratis y envío desde el celular de toda la familia.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Aura Carver 10.1 WiFi Digital Picture Frame Free Unlimited Cloud Storage")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Aura Carver 10.1 marco de fotos digital WiFi almacenamiento ilimitado")}&tag=${AMAZON_TAG_ES}`,
  },
  "aura-mason-9-2k": {
    id: "aura-mason-9-2k",
    badge: "📐 Mejor Pantalla 2K Formato 4:3 (Rotación Vertical y Horizontal)",
    title: "Aura Mason 9\" 2K Full HD+ Wi‑Fi Digital Photo Frame — Proporción 4:3 Exacta a las Fotos del Celular (iPhone y Android)",
    subtitle:
      "Resolución ultra nítida 2K (1600×1200) en formato 4:3 que evita barras negras, gira automáticamente en vertical u horizontal y se preconfigura a distancia.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Aura Mason 9 inch 2K WiFi Digital Picture Frame Free Standing")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Aura Mason marco digital WiFi 2K rotacion automatica")}&tag=${AMAZON_TAG_ES}`,
  },
  "frameo-akimart-10-32gb": {
    id: "frameo-akimart-10-32gb",
    badge: "💾 #1 Calidad-Precio con 32 GB Internos + MicroSD (Funciona con y sin Wi‑Fi)",
    title: "Frameo 10.1\" Wi‑Fi Digital Picture Frame IPS Touch Screen (32 GB de Memoria Interna + Ranura MicroSD)",
    subtitle:
      "Ideal cuando tus padres o abuelos tienen Wi‑Fi inestable: guarda hasta 80.000 fotos en sus 32 GB internos y recibe fotos/videos gratis con la App Frameo.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Frameo 10.1 Inch WiFi Digital Picture Frame 32GB IPS Touch Screen Auto Rotate")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Frameo 10.1 pulgadas marco digital WiFi 32GB pantalla tactil IPS")}&tag=${AMAZON_TAG_ES}`,
  },
  "skylight-frame-10-touch": {
    id: "skylight-frame-10-touch",
    badge: "✉️ El Mejor para Enviar Fotos por Correo Electrónico sin Instalar Apps",
    title: "Skylight Frame 10\" Wi‑Fi Touch Digital Photo Frame — Envío Directo de Fotos por Email en Segundos",
    subtitle:
      "Cada marco tiene su propio correo (@ourskylight.com) para que tíos, primos y familiares envíen fotos desde cualquier celular o PC sin descargar aplicaciones.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Skylight Frame 10 Inch WiFi Digital Picture Frame Email Photos Touch Screen")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Skylight Frame 10 pulgadas marco de fotos digital WiFi email")}&tag=${AMAZON_TAG_ES}`,
  },
  "frameo-15-6-fhd-large": {
    id: "frameo-15-6-fhd-large",
    badge: "👵 Mejor Pantalla Grande 15.6\" Full HD para Abuelos con Baja Visión y Pared",
    title: "Frameo 15.6\" Large Full HD (1920×1080) Wi‑Fi Digital Photo Frame — 32 GB Internos, Mesa o Pared",
    subtitle:
      "Pantalla gigante Full HD que permite a padres y abuelos ver cada rostro con claridad desde el sofá sin acercarse, con montaje VESA/pared y App Frameo gratuita.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Frameo 15.6 Inch Large WiFi Digital Picture Frame 1920x1080 FHD IPS Touch Screen 32GB")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Frameo 15.6 pulgadas marco digital WiFi Full HD 1920x1080 32GB pared")}&tag=${AMAZON_TAG_ES}`,
  },
  "aura-walden-15-wall": {
    id: "aura-walden-15-wall",
    badge: "🖼️ Mejor Marco de Pared 15\" Gama Alta con Acabado Mate Antirreflejos",
    title: "Aura Walden 15\" Anti-Glare Mat Wi‑Fi Digital Frame — Formato 4:3 de Galería con Paspartú Texturizado",
    subtitle:
      "Parece un cuadro impreso real gracias a su cristal mate sin reflejos y paspartú interior; incluye nube ilimitada gratis y kit para colgar en pared o poner en mesa.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Aura Walden 15 Inch WiFi Digital Picture Frame Anti Glare Mat Wall Mount")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Aura Walden 15 pulgadas marco de fotos digital WiFi pared mate")}&tag=${AMAZON_TAG_ES}`,
  },
  "nixplay-10-touch-wifi": {
    id: "nixplay-10-touch-wifi",
    badge: "📱 Excelente para Álbumes Familiares Compartidos y Sensor Inteligente",
    title: "Nixplay 10.1\" Smart Digital Picture Frame Wi‑Fi Touch — Preconfiguración de Regalo, App iOS/Android y Email",
    subtitle:
      "Permite crear listas de reproducción compartidas entre hermanos y nietos, preconfigurar el regalo en la app y encenderse automáticamente al detectar presencia.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Nixplay 10.1 Inch Touch Screen Digital Picture Frame WiFi Share Photos via App Email")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Nixplay 10.1 pulgadas marco digital de fotos WiFi pantalla tactil")}&tag=${AMAZON_TAG_ES}`,
  },
  "dragon-touch-classic-10": {
    id: "dragon-touch-classic-10",
    badge: "💵 Mejor Marco Económico con 16/32 GB, MicroSD y USB",
    title: "Dragon Touch Classic 10 / Arzopa 10.1\" Wi‑Fi Digital Frame — Pantalla Táctil HD, Memoria Interna y Efecto Madera",
    subtitle:
      "Opción accesible con estética cálida de portarretrato tradicional: admite envío por App, correo electrónico, tarjeta MicroSD y memoria USB sin cuotas mensuales.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Dragon Touch Classic 10 Digital Picture Frame WiFi IPS Touch Screen")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Dragon Touch Classic 10 marco de fotos digital WiFi tactil")}&tag=${AMAZON_TAG_ES}`,
  },
  "echo-show-8-10-photos": {
    id: "echo-show-8-10-photos",
    badge: "📞 Mejor 2-en-1: Marco Digital con Amazon Photos + Videollamadas a Abuelos",
    title: "Amazon Echo Show 8 / Echo Show 15 — Marco de Fotos con Amazon Photos, Alexa en Español y Videollamadas Drop In",
    subtitle:
      "Convierte la pantalla en un marco digital continuo con el álbum familiar de Amazon Photos y permite llamar en video a tus padres o abuelos sin que tengan que pulsar nada.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Amazon Echo Show 8 Smart Display with Alexa and Amazon Photos Digital Frame")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Amazon Echo Show 8 pantalla inteligente con Alexa y marco de fotos")}&tag=${AMAZON_TAG_ES}`,
  },
  "sandisk-microsd-cable-kit": {
    id: "sandisk-microsd-cable-kit",
    badge: "🔌 Accesorio Imprescindible: MicroSD 64/128 GB +Respaldo Local de Fotos",
    title: "Tarjeta MicroSD SanDisk Ultra 64 GB / 128 GB Clase 10 A1 + Adaptador SD para Marcos Digitales Frameo y Kodak",
    subtitle:
      "Ideal para pre-cargar miles de fotos antiguas escaneadas y videos familiares antes de entregar el marco a tus abuelos o ampliar la memoria de cualquier marco Frameo.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("SanDisk 64GB Ultra microSDXC UHS-I Memory Card with Adapter for Digital Photo Frame")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("SanDisk Ultra 64GB tarjeta microSDXC con adaptador para marco digital")}&tag=${AMAZON_TAG_ES}`,
  },
};

function calculateCostUsd(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  if (model.includes("mini")) {
    return Number(
      (promptTokens * 0.00000015 + completionTokens * 0.0000006).toFixed(6)
    );
  }
  return Number(
    (promptTokens * 0.0000025 + completionTokens * 0.00001).toFixed(6)
  );
}

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOPWORDS = new Set([
  "como",
  "cual",
  "cuales",
  "que",
  "quien",
  "donde",
  "cuando",
  "por",
  "para",
  "con",
  "sin",
  "una",
  "uno",
  "los",
  "las",
  "del",
  "al",
  "hola",
  "quiero",
  "puedo",
  "recomienda",
  "mejor",
  "mejores",
  "sobre",
  "mas",
  "muy",
  "tiene",
  "tengo",
  "marco",
  "marcos",
  "digital",
  "digitales",
  "fotos",
  "foto",
]);

function extractTokens(text: string): string[] {
  return norm(text)
    .split(" ")
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w));
}

let catalogCache: {
  at: number;
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
} | null = null;

async function loadCatalog(): Promise<{
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
}> {
  if (
    catalogCache &&
    Date.now() - catalogCache.at < 10 * 60 * 1000 &&
    catalogCache.rows.length > 0
  ) {
    return catalogCache;
  }
  const [batch1, batch2] = await Promise.all([
    supabase
      .from("eligetumarco_articles")
      .select(
        "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
      )
      .eq("active", true)
      .range(0, 999),
    supabase
      .from("eligetumarco_articles")
      .select(
        "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
      )
      .eq("active", true)
      .range(1000, 1999),
  ]);

  const rows: ArticleRow[] = [];
  const bySlug = new Map<string, ArticleRow>();
  for (const data of [batch1.data, batch2.data]) {
    if (Array.isArray(data)) {
      for (const r of data as ArticleRow[]) {
        if (!bySlug.has(r.slug)) {
          bySlug.set(r.slug, r);
          rows.push(r);
        }
      }
    }
  }
  catalogCache = { at: Date.now(), rows, bySlug };
  return catalogCache;
}

function toArticleCard(r: ArticleRow): ArticleCard {
  const img = r.featured_image || "/img/ambiente/home-hero-marcos.webp";
  const url =
    r.slug === r.category
      ? `${SITE}/${r.category}/`
      : `${SITE}/${r.category}/${r.slug}/`;
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    categoryName: r.category_name,
    url,
    image: img.startsWith("http") ? img : `${SITE}${img}`,
    readTime: r.read_time || "7 min",
    excerpt: (r.excerpt || "").slice(0, 145),
  };
}

function searchArticles(
  rows: ArticleRow[],
  userMessage: string,
  historyText: string,
  limit = 14
): ArticleRow[] {
  const primaryTokens = extractTokens(userMessage);
  const contextTokens = extractTokens(historyText).filter(
    (t) => !primaryTokens.includes(t)
  );
  const fullPhrase = norm(userMessage);

  const starterSlugs = [
    "mejores-marcos-digitales-wifi-para-padres-y-abuelos-amazon",
    "aura-carver-vs-frameo-10-pulgadas-cual-elegir-para-abuelos",
    "como-preconfigurar-un-marco-digital-wifi-para-regalar-a-distancia",
    "aura-carver-10-pulgadas-marco-digital-wifi-resena",
    "frameo-10-1-pulgadas-32gb-marco-digital-tactil-resena",
    "que-tamano-de-marco-digital-elegir-9-10-o-15-pulgadas",
  ];

  if (primaryTokens.length === 0 && contextTokens.length === 0) {
    const picked: ArticleRow[] = [];
    for (const s of starterSlugs) {
      const f = rows.find((r) => r.slug === s);
      if (f) picked.push(f);
    }
    return picked.length > 0 ? picked : rows.slice(0, 8);
  }

  const scored: Array<{ r: ArticleRow; score: number }> = [];
  for (const r of rows) {
    const titleNorm = norm(r.title);
    const catNorm = norm(`${r.category_name} ${r.category}`);
    const bodyNorm =
      r.search_text || `${titleNorm} ${catNorm} ${norm(r.excerpt || "")}`;

    let score = 0;
    if (fullPhrase.length >= 5 && titleNorm.includes(fullPhrase)) score += 45;

    let matchedPrimary = 0;
    for (const tok of primaryTokens) {
      if (titleNorm.includes(tok)) {
        score += 16;
        matchedPrimary++;
      } else if (catNorm.includes(tok)) {
        score += 9;
        matchedPrimary++;
      } else if (bodyNorm.includes(tok)) {
        score += 5;
        matchedPrimary++;
      }
    }
    if (matchedPrimary >= 2) score += matchedPrimary * 8;
    if (starterSlugs.includes(r.slug)) score += 5;

    for (const cTok of contextTokens.slice(-5)) {
      if (titleNorm.includes(cTok)) score += 3;
    }

    if (score > 0) scored.push({ r, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body =
      req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const mode = body.mode || (req.method === "GET" ? "config" : "chat");

    // 0. Seed / Sync articles endpoint
    if (mode === "seed_articles") {
      const syncKey = req.headers.get("x-sync-key") || "";
      if (syncKey !== "eligetumarco-sync-2026") {
        return json({ error: "No autorizado" }, 401);
      }
      const rows = Array.isArray(body.articles) ? body.articles : [];
      if (rows.length === 0) return json({ error: "Sin artículos" }, 400);
      const { error } = await supabase
        .from("eligetumarco_articles")
        .upsert(rows, { onConflict: "slug" });
      if (error) return json({ error: error.message }, 500);
      catalogCache = null;
      return json({ success: true, count: rows.length });
    }

    // 1. Load live config (Default: gpt-4o-mini as requested by user)
    const { data: configRow } = await supabase
      .from("eligetumarco_chat_config")
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    const config = configRow || {
      is_enabled: true,
      ai_model: "gpt-4o-mini",
      temperature: 0.35,
      max_messages_per_session: 30,
      daily_budget_usd: 5.0,
      welcome_message:
        "¡Hola! 🖼️📱 Soy tu Asesor de Marcos Digitales Wi‑Fi IA de EligeTuMarco.com (modelo mini rápido). Cuéntame para quién es el marco (padres o abuelos), qué tamaño de pantalla buscas y si prefieres nube ilimitada gratis o memoria interna de 32 GB, y te recomendaré el modelo ideal en Amazon Estados Unidos.",
      custom_instructions: "",
    };

    const activeModel = ALLOWED_MODELS.includes(config.ai_model)
      ? config.ai_model
      : "gpt-4o-mini";

    if (mode === "config" || req.method === "GET") {
      return json({
        is_enabled: config.is_enabled,
        welcome_message: config.welcome_message,
        ai_model: activeModel,
        max_messages_per_session: config.max_messages_per_session,
      });
    }

    // 2. Track click on an article or Amazon product
    if (mode === "track_click") {
      const {
        session_id,
        visitor_id,
        article_slug,
        article_title,
        category,
        target_url,
        page_url,
      } = body;
      if (target_url) {
        await supabase.from("eligetumarco_chat_clicks").insert({
          session_id: session_id || null,
          visitor_id: String(visitor_id || "anon").slice(0, 80),
          article_slug: article_slug ? String(article_slug).slice(0, 180) : null,
          article_title: article_title
            ? String(article_title).slice(0, 240)
            : null,
          category: category ? String(category).slice(0, 80) : null,
          target_url: String(target_url).slice(0, 500),
          page_url: page_url ? String(page_url).slice(0, 500) : null,
        });

        if (session_id) {
          const { data: sess } = await supabase
            .from("eligetumarco_chat_sessions")
            .select("clicks_count, clicked_urls")
            .eq("id", session_id)
            .maybeSingle();
          if (sess) {
            const urls = Array.isArray(sess.clicked_urls)
              ? sess.clicked_urls
              : [];
            if (!urls.includes(target_url)) urls.push(target_url);
            await supabase
              .from("eligetumarco_chat_sessions")
              .update({
                clicks_count: (sess.clicks_count || 0) + 1,
                clicked_urls: urls,
              })
              .eq("id", session_id);
          }
        }
      }
      return json({ success: true });
    }

    // 3. Chat Completion
    if (!config.is_enabled) {
      return json({
        reply: `En este momento el Asesor de Marcos Digitales Wi‑Fi IA está en mantenimiento breve. Puedes ver nuestras comparativas en [EligeTuMarco.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Mejores marcos para abuelos", "Aura Carver vs Frameo"],
        disabled: true,
      });
    }

    const userMessage = String(body.message || "").trim().slice(0, 1000);
    if (!userMessage) return json({ error: "Mensaje vacío" }, 400);

    const visitorId = String(
      body.visitor_id || "etm-" + crypto.randomUUID().slice(0, 8)
    ).slice(0, 80);
    const region = body.region === "ES" ? "ES" : "US";
    const storeName = region === "ES" ? "Amazon.es" : "Amazon.com";
    const pageUrl = String(body.page_url || SITE + "/").slice(0, 500);
    const userAgent = String(
      body.user_agent || req.headers.get("user-agent") || ""
    ).slice(0, 300);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    let sessionId: string | null = body.session_id || null;

    let existingSession: any = null;
    if (sessionId) {
      const { data: s } = await supabase
        .from("eligetumarco_chat_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      existingSession = s;
    }

    if (!existingSession) {
      const { data: created, error: createErr } = await supabase
        .from("eligetumarco_chat_sessions")
        .insert({
          visitor_id: visitorId,
          page_url: pageUrl,
          user_agent: userAgent,
          first_user_message: userMessage.slice(0, 250),
          last_user_message: userMessage.slice(0, 250),
          messages_count: 1,
          model_used: activeModel,
        })
        .select("*")
        .single();

      if (!createErr && created) {
        existingSession = created;
        sessionId = created.id;
      }
    }

    if (sessionId) {
      await supabase.from("eligetumarco_chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage,
      });
    }

    const catalog = await loadCatalog();
    const recentHistoryText = history
      .slice(-3)
      .map((h: any) => h?.content || "")
      .join(" ");
    const candidateRows = searchArticles(
      catalog.rows,
      userMessage,
      recentHistoryText,
      14
    );

    const candidatesPrompt =
      candidateRows.length > 0
        ? candidateRows
            .map((r) => {
              const u =
                r.slug === r.category
                  ? `${SITE}/${r.category}/`
                  : `${SITE}/${r.category}/${r.slug}/`;
              return `- SLUG: "${r.slug}" | TÍTULO: "${r.title}" | CATEGORÍA: ${r.category_name} | URL: ${u} | RESUMEN: ${(r.excerpt || "").slice(0, 140)}`;
            })
            .join("\n")
        : "No se encontraron artículos exactos con esos términos.";

    const amazonCatalogPrompt = Object.values(AMAZON_PRODUCTS)
      .map(
        (p) =>
          `- PRODUCT_ID: "${p.id}" | ${p.badge} | NOMBRE: "${p.title}" | DETALLE: ${p.subtitle} | URL_${region}: ${region === "ES" ? p.urlES : p.urlUS}`
      )
      .join("\n");

    const systemPrompt = `Eres el Asesor de Marcos Digitales Wi‑Fi IA Oficial de EligeTuMarco.com (${SITE}), la guía líder en español con más de 1,500 artículos para elegir marcos de fotos digitales con Wi‑Fi que permiten enviar fotos desde el celular a padres y abuelos, incluso si viven lejos (fundado por Carlos Lingan Borja, info@charlielingan.com).

Tu doble misión es:
1. RESPONDER TODAS LAS DUDAS DEL USUARIO comparando modelos con rigor práctico según estos 4 criterios:
   - TAMAÑO DE PANTALLA Y PROPORCIÓN: 9" (2K formato 4:3 exacto a fotos de celular), 10.1" (el estándar favorito 16:10 con Smart Pairing de 2 fotos verticales juntas) y 15"/15.6" Full HD (ideal para colgar en pared o para abuelos con baja visión).
   - FACILIDAD DE CONFIGURACIÓN: cómo preconfigurar el marco antes de regalarlo (sin abrir la caja con el código QR de Aura, o pre-cargando el Wi‑Fi y las fotos) para que los padres o abuelos solo tengan que enchufarlo a la corriente.
   - ALMACENAMIENTO Y SUSCRIPCIÓN: diferencia entre nube ilimitada 100 % gratuita sin suscripción frente a memoria interna de 32 GB (~80.000 fotos) + ranura MicroSD que sigue mostrando fotos aunque se corte el Wi‑Fi.
   - ENVÍO DE FOTOS DESDE VARIOS FAMILIARES: cómo hijos, nietos, hermanos y tíos envían fotos y videos desde iPhone o Android a miles de kilómetros usando la App gratuita (Aura, Frameo, Nixplay) o por correo electrónico directo (Skylight Frame).
   - Enlaza en tu respuesta a entre 1 y 3 guías de nuestro listado inferior usando Markdown exacto: [Título](${SITE}/categoria/slug/) e incluye sus slugs en "recommended_slugs".
2. AYUDAR ACTIVAMENTE A QUE COMPREN EL MARCO DIGITAL EN AMAZON (${storeName}):
   - Recomienda siempre 1 o 2 marcos exactos de nuestro CATÁLOGO AMAZON OFICIAL de abajo.
   - Incluye en tu texto un enlace Markdown directo al producto en ${storeName} usando su URL_${region} exacta y añade entre 1 y 2 IDs en "recommended_product_ids".

CATÁLOGO AMAZON OFICIAL (${storeName}):
${amazonCatalogPrompt}

ARTÍCULOS ENCONTRADOS EN ELIGETUMARCO.COM:
${candidatesPrompt}

Responde ÚNICAMENTE con un objeto JSON válido con estas 4 llaves exactas:
{
  "reply": "Tu respuesta cálida y experta en español comparando tamaño de pantalla, facilidad para padres/abuelos, almacenamiento y envío desde varios familiares, con enlaces Markdown a nuestras guías y al marco en ${storeName}",
  "recommended_slugs": ["slug-1", "slug-2"],
  "recommended_product_ids": ["aura-carver-10-wifi", "frameo-akimart-10-32gb"],
  "suggested_options": ["Opción 1", "Opción 2", "Opción 3"]
}`;

    const chatMessages: any[] = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      if (
        h &&
        (h.role === "user" || h.role === "assistant") &&
        typeof h.content === "string"
      ) {
        chatMessages.push({ role: h.role, content: h.content.slice(0, 1200) });
      }
    }
    chatMessages.push({ role: "user", content: userMessage });

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: activeModel,
          messages: chatMessages,
          temperature: Number(config.temperature) || 0.35,
          max_tokens: 900,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!openaiRes.ok) {
      throw new Error("OpenAI status " + openaiRes.status);
    }

    const openaiData = await openaiRes.json();
    const rawContent = openaiData.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = {
        reply: rawContent,
        recommended_slugs: candidateRows.slice(0, 2).map((r) => r.slug),
        recommended_product_ids: ["aura-carver-10-wifi"],
        suggested_options: [
          "¿Aura Carver o Frameo 10.1\" para mis abuelos?",
          "Cómo preconfigurar un marco para enviarlo lejos",
          "Marcos de 15 pulgadas para abuelos con baja visión",
        ],
      };
    }

    const slugs: string[] = Array.isArray(parsed.recommended_slugs)
      ? parsed.recommended_slugs.slice(0, 3)
      : [];
    const recommendedArticles: ArticleCard[] = slugs
      .map((s) => catalog.bySlug.get(s))
      .filter((r): r is ArticleRow => Boolean(r))
      .map(toArticleCard);

    const productIds: string[] = Array.isArray(parsed.recommended_product_ids)
      ? parsed.recommended_product_ids.slice(0, 2)
      : ["aura-carver-10-wifi"];
    const recommendedProducts: AmazonProductCard[] = productIds
      .map((id) => AMAZON_PRODUCTS[id])
      .filter((p): p is AmazonProductCard => Boolean(p));

    const suggestedOptions: string[] = Array.isArray(parsed.suggested_options)
      ? parsed.suggested_options
          .slice(0, 3)
          .map((s: unknown) => String(s).slice(0, 72))
      : [];

    const replyText: string =
      parsed.reply ||
      `Te recomiendo revisar nuestra guía principal de [Mejores Marcos Digitales con Wi‑Fi para Padres y Abuelos en Amazon](${SITE}/marcos-para-padres-y-abuelos/mejores-marcos-digitales-wifi-para-padres-y-abuelos-amazon/).`;

    const promptTokens = openaiData.usage?.prompt_tokens || 0;
    const completionTokens = openaiData.usage?.completion_tokens || 0;
    const totalTokens =
      openaiData.usage?.total_tokens || promptTokens + completionTokens;
    const costUsd = calculateCostUsd(
      activeModel,
      promptTokens,
      completionTokens
    );

    if (sessionId && existingSession) {
      await supabase.from("eligetumarco_chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: replyText,
        recommended_articles: recommendedArticles,
        suggested_options: suggestedOptions,
        model: activeModel,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd: costUsd,
      });

      const prevRecs: string[] = Array.isArray(
        existingSession.recommended_articles
      )
        ? existingSession.recommended_articles
        : [];
      for (const ra of recommendedArticles) {
        if (!prevRecs.includes(ra.title)) prevRecs.push(ra.title);
      }
      for (const rp of recommendedProducts) {
        const label = `[Amazon] ${rp.title}`;
        if (!prevRecs.includes(label)) prevRecs.push(label);
      }

      await supabase
        .from("eligetumarco_chat_sessions")
        .update({
          last_user_message: userMessage.slice(0, 250),
          messages_count: (existingSession.messages_count || 1) + 2,
          recommended_articles: prevRecs.slice(0, 30),
          prompt_tokens: (existingSession.prompt_tokens || 0) + promptTokens,
          completion_tokens:
            (existingSession.completion_tokens || 0) + completionTokens,
          total_tokens: (existingSession.total_tokens || 0) + totalTokens,
          estimated_cost_usd: Number(
            (Number(existingSession.estimated_cost_usd || 0) + costUsd).toFixed(
              6
            )
          ),
          model_used: activeModel,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    }

    await supabase.from("token_usage").insert({
      source: "eligetumarco.com",
      content_type: "ai_chat",
      model: activeModel,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      images_generated: 0,
      estimated_cost_usd: costUsd,
      slug: sessionId || visitorId,
    });

    return json({
      session_id: sessionId,
      reply: replyText,
      recommended_articles: recommendedArticles,
      recommended_products: recommendedProducts,
      suggested_options: suggestedOptions,
      model: activeModel,
    });
  } catch (err: any) {
    return json(
      {
        error: err.message || "Error interno",
        reply: `Puedes explorar nuestras más de 1,500 guías de marcos digitales en [EligeTuMarco.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Intentar de nuevo"],
      },
      500
    );
  }
});
