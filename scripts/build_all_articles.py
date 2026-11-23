#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador Maestro de los 1,512 Artículos de EligeTuMarco.com:
- 12 Hubs Pilares de Categoría (isPillar: true)
- 500 Artículos Transaccionales en 6 Silos de Productos Amazon (isTransactional: true)
- 1,000 Artículos SEO Informacionales en 6 Silos Educativos y Técnicos (isTransactional: false)

También genera:
- src/data/keyword_map.json (validando 0 canibalización)
- public/search-index.json
"""
import json
import pathlib
import re

from topics_catalog import PILLARS, generate_transactional_500, generate_seo_1000

ROOT = pathlib.Path(__file__).resolve().parent.parent
ART_DIR = ROOT / "src/content/articles"
ART_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR = ROOT / "src/data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
PUB_DIR = ROOT / "public"
PUB_DIR.mkdir(parents=True, exist_ok=True)

PUBLISHED = "2026-11-23"

# Matriz Fotográfica Anti-Similitud (8 ángulos × 6 iluminaciones × 8 escenarios = 384 variaciones visuales)
CAMERA_STYLES = [
    "Macro close-up shot with shallow depth of field (85mm f/2.8 lens)",
    "Three-quarter editorial angle from slightly above in a cozy family living room (50mm lens)",
    "Overhead flat-lay composition showcasing a digital Wi-Fi photo frame, smartphone and natural textures (35mm lens)",
    "Eye-level realistic lifestyle photograph in a sunlit grandparents living room",
    "Side-profile studio shot highlighting genuine wooden or matte bezel textures and anti-glare IPS display",
    "Detailed close-up focusing on hands sending a family photo from a smartphone to a Wi-Fi digital frame",
    "Wide interior editorial view of a warm home corner with natural wood furniture and a glowing digital photo frame",
    "Oblique tabletop photography with soft foreground bokeh and crisp focus on the digital picture frame screen",
]

LIGHTING_MOODS = [
    "soft natural morning window daylight with gentle warm shadows",
    "golden hour afternoon sunlight streaming into a cozy family home",
    "warm evening reading lamp light showcasing the frame's auto-dimming anti-glare screen",
    "crisp bright editorial studio lighting with neutral warm oak tones",
    "clean Scandinavian daylight-balanced interior photography with authentic textures",
    "intimate warm living room lighting creating a welcoming family atmosphere",
]

SURFACES_AND_PROPS = [
    "on a Scandinavian light oak sideboard with a ceramic cup and indoor plant",
    "on a walnut nightstand beside a reading lamp and a hardcover book",
    "on a warm living room mantelpiece with subtle family decor",
    "on a minimalist home office desk next to a smartphone and notebook",
    "on a rustic wooden coffee table with a woven coaster and warm bokeh lights",
    "in a bright dining room console table with natural wooden shelves",
    "mounted cleanly on a cream gallery wall with natural daylight",
    "on an entryway console table decorated with eucalyptus branches and warm light",
]


def build_diverse_prompt(subject: str, idx: int) -> str:
    cam = CAMERA_STYLES[idx % len(CAMERA_STYLES)]
    light = LIGHTING_MOODS[(idx * 3 + 1) % len(LIGHTING_MOODS)]
    surf = SURFACES_AND_PROPS[(idx * 5 + 2) % len(SURFACES_AND_PROPS)]
    return (
        f"Realistic editorial family technology photography, {cam}: {subject}, {surf}, {light}. "
        "Photorealistic textures, authentic materials, no text, no letters, no watermarks."
    )


def clean_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9-]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")


def make_pillar_article(p: dict, child_items: list, idx: int) -> dict:
    cat_slug = p["slug"]
    path = f"/{cat_slug}/"
    related_paths = [f"/{cat_slug}/{clean_slug(c[0])}/" for c in child_items[:4]]
    table_rows = [
        [c[1], f"[Ver guía completa](/{cat_slug}/{clean_slug(c[0])}/)"]
        for c in child_items[:14]
    ]
    is_trans_pillar = cat_slug in {
        "resenas-marcos-digitales-wifi",
        "comparativas-marcos-digitales",
        "marcos-para-padres-y-abuelos",
        "marcos-por-tamano-y-pantalla",
        "marcos-por-app-y-almacenamiento",
        "marcos-por-presupuesto-y-ofertas",
    }
    blocks = [
        {
            "type": "p",
            "text": f"Bienvenido al hub central de **{p['title']}** en **EligeTuMarco.com**. Aquí reunimos todas nuestras guías y comparativas especializadas sobre **{p['focus']}**, estructuradas bajo una arquitectura sin canibalización para ayudarte a elegir el marco digital con Wi‑Fi ideal en **Amazon Estados Unidos (`amazon.com`)** o **Amazon España (`amazon.es`)** para enviar fotos desde el celular a padres y abuelos, incluso si viven lejos.",
        },
        {
            "type": "p",
            "text": "Tanto si buscas **[los mejores marcos digitales con Wi‑Fi para padres y abuelos](/marcos-para-padres-y-abuelos/mejores-marcos-digitales-wifi-para-padres-y-abuelos-amazon/)**, como si quieres comparar **[Aura Carver vs Frameo 10.1\" de 32 GB](/comparativas-marcos-digitales/aura-carver-vs-frameo-10-pulgadas-cual-elegir-para-abuelos/)**, elegir entre **[pantallas de 9\", 10.1\" o 15.6\"](/marcos-por-tamano-y-pantalla/que-tamano-de-marco-digital-elegir-9-10-o-15-pulgadas/)** o aprender **[cómo preconfigurar un marco digital como regalo a distancia](/configuracion-facil-y-regalo-a-distancia/como-preconfigurar-un-marco-digital-wifi-para-regalar-a-distancia/)**, cada guía evalúa tamaño de pantalla, facilidad de configuración, almacenamiento y recepción de fotos de varios familiares.",
        },
        {"type": "h2", "text": f"Qué encontrarás en {p['title'].split('(')[0].strip()}"},
        {
            "type": "p",
            "text": f"En cada una de las **{len(child_items)} guías especializadas** de este silo analizamos los cuatro factores que determinan si un marco digital será un éxito en casa de tus padres o abuelos: **1) El tamaño, resolución y proporción de pantalla (`4:3` vs `16:10`)**; **2) La facilidad de preconfiguración** para que solo tengan que enchufarlo a la pared; **3) El almacenamiento sin costos ocultos (`$0/mes` en nube ilimitada o `32 GB` internos con MicroSD)**; y **4) La facilidad para que varios familiares envíen fotos desde su celular**.",
        },
        {
            "type": "table",
            "caption": f"Selección destacada de guías en {p['title'].split('(')[0].strip()}",
            "headers": ["Guía Especializada de Marcos Digitales Wi‑Fi", "Acceso Directo"],
            "rows": table_rows,
        },
        {
            "type": "callout",
            "variant": "etiqueta",
            "title": "Evaluación en 4 Ejes (Pantalla · Configuración · Almacenamiento · Familiares)",
            "text": "Cada recomendación de este hub incluye una comparativa práctica y un enlace directo de afiliado a Amazon Estados Unidos (eligetumarco-20) y Amazon España (eligetumarco-21) para consultar el precio actualizado, cupones de descuento y envío rápido Amazon Prime.",
        },
        {"type": "h2", "text": "Cómo elegir el marco digital con Wi‑Fi ideal en 3 pasos"},
        {
            "type": "ol",
            "items": [
                "**Elige el almacenamiento según el Wi‑Fi de tus padres o abuelos:** si tienen Wi‑Fi estable y quieres preconfigurar sin abrir la caja, el [Aura Carver 10.1\"](/resenas-marcos-digitales-wifi/aura-carver-10-pulgadas-marco-digital-wifi-resena/) y el [Aura Mason 9\" 2K](/resenas-marcos-digitales-wifi/aura-mason-9-pulgadas-2k-marco-digital-formato-4-3-resena/) ofrecen **nube ilimitada 100 % gratis ($0/mes)**. Si su internet es inestable o prefieres memoria física, el [Frameo 10.1\" de 32 GB](/resenas-marcos-digitales-wifi/frameo-10-1-pulgadas-32gb-marco-digital-tactil-resena/) guarda ~80.000 fotos en el marco y acepta tarjeta MicroSD.",
                "**Selecciona el tamaño y proporción de pantalla:** `9\"` (formato `4:3` 2K) para mesa de noche; `10.1\"` (con *Smart Pairing* de 2 fotos verticales) para el aparador de la sala; o `15\"` / `15.6\"` Full HD para colgar en pared o para abuelos con baja visión.",
                "**Preconfigúralo e invita a toda la familia:** carga las primeras fotos familiares y comparte el código gratuito de la app con hermanos, nietos y tíos para que todos manden recuerdos desde su iPhone o Android.",
            ],
        },
        {
            "type": "cta",
            "text": "¿No sabes qué marco digital de esta categoría elegir para tus padres o abuelos? Pregúntale en vivo a nuestro Asesor de Marcos IA.",
        },
    ]
    faqs = [
        {
            "q": f"¿Cuáles son los marcos digitales más recomendados dentro de {p['title'].split('(')[0].strip()}?",
            "a": "Destacan el Aura Carver 10.1\" (el más fácil de preconfigurar con código QR y nube ilimitada gratis), el Aura Mason 9\" 2K (con proporción 4:3 exacta a las fotos del celular), el Frameo 10.1\" y 15.6\" con 32 GB de memoria interna + ranura MicroSD (que funciona con y sin Wi‑Fi) y el Skylight Frame 10\" para enviar fotos por correo electrónico.",
        },
        {
            "q": "¿Pueden varios familiares enviar fotos desde distintos países sin pagar suscripción?",
            "a": "Sí. Tanto la aplicación de Aura como la aplicación Frameo son 100 % gratuitas en iPhone y Android ($0/mes) y permiten que hijos, nietos, hermanos y sobrinos envíen fotos desde cualquier país en segundos.",
        },
        {
            "q": "¿Puedo comprar el marco en Amazon Estados Unidos y enviarlo directo a casa de mis padres?",
            "a": "Por supuesto. Al comprar en Amazon.com puedes enviar el paquete directamente a la dirección de tus padres o abuelos marcando la opción 'This is a gift' (Es un regalo) para incluir un recibo de regalo sin precio y preconfigurarlo desde tu celular.",
        },
    ]
    return {
        "slug": cat_slug,
        "pillar": cat_slug,
        "path": path,
        "isPillar": True,
        "isTransactional": is_trans_pillar,
        "primaryKeyword": p["kw"],
        "title": p["title"],
        "seoTitle": f"{p['title']} | EligeTuMarco.com",
        "metaDescription": f"Guía completa de {p['focus']} en Amazon Estados Unidos. Compara tamaño de pantalla, facilidad de configuración, almacenamiento y envío familiar.",
        "excerpt": f"Explora las {len(child_items)} guías especializadas sobre {p['focus']} con comparativas por pantalla, memoria y facilidad para padres y abuelos en Amazon EE. UU.",
        "quickAnswer": f"En esta categoría reunimos {len(child_items)} guías prácticas sobre {p['focus']}. Comparamos cada modelo según el tamaño de pantalla (9\", 10.1\" y 15.6\"), la facilidad de configuración a distancia, el almacenamiento (nube ilimitada gratis vs 32 GB + MicroSD) y el envío de fotos desde varios celulares con enlaces a Amazon Estados Unidos.",
        "readingMinutes": 8,
        "image": {
            "prompt": build_diverse_prompt(p["subject"], idx),
            "alt": p["title"],
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Amazon.com Best Sellers in Digital Picture Frames", "url": "https://www.amazon.com/Best-Sellers-Electronics-Digital-Picture-Frames/zgbs/electronics/525460"},
            {"label": "Wi-Fi Alliance – Home Network Connectivity Standards", "url": "https://www.wi-fi.org/"},
        ],
        "related": related_paths,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": f"/img/ambiente/cat-{cat_slug}.webp",
    }


def make_transactional_article(item: tuple, sibling_paths: list, idx: int) -> dict:
    slug, title, pillar, kw, scr, setp, sto, fam, picks, subj = item
    slug = clean_slug(slug)
    path = f"/{pillar}/{slug}/"
    rel = [p for p in sibling_paths if p != path][:3]
    rel.insert(0, f"/{pillar}/")

    blocks = [
        {
            "type": "p",
            "text": f"Elegir con acierto en **{title}** marca la diferencia entre un regalo tecnológico que tus padres o abuelos disfrutan todos los días y uno que se queda guardado en su caja. En esta comparativa para **Amazon Estados Unidos (`amazon.com`)** analizamos los cuatro criterios que definen la experiencia real a distancia: el **tamaño y calidad de pantalla ({scr})**, la **facilidad de configuración ({setp})**, el **almacenamiento ({sto})** y la **recepción de fotos de varios familiares ({fam})**.",
        },
        {
            "type": "h2",
            "text": "Evaluación en 4 ejes: Pantalla, Configuración, Almacenamiento y Familiares",
        },
        {
            "type": "p",
            "text": f"Cuando envías fotos desde tu celular a padres o abuelos que viven lejos, los modelos que encabezan nuestro análisis (**{picks}**) destacan porque eliminan cualquier barrera técnica. La combinación de **{scr.lower()}** junto con **{sto.lower()}** garantiza que cada retrato enviado desde un iPhone o Android se muestre con colores naturales, sin recortes molestos y sin obligar al adulto mayor a navegar por menús complicados.",
        },
        {
            "type": "callout",
            "variant": "etiqueta",
            "title": f"Ficha Técnica Rápida: {picks.split(',')[0].strip()}",
            "text": f"• Tamaño y Pantalla: {scr}.\n• Facilidad de Configuración para Padres/Abuelos: {setp}.\n• Almacenamiento y Suscripción: {sto}.\n• Envío desde Varios Familiares: {fam}.",
        },
        {
            "type": "h2",
            "text": f"Tabla comparativa en Amazon EE. UU.: {title}",
        },
        {
            "type": "p",
            "text": "Compara de un vistazo nuestras recomendaciones verificadas según tamaño de pantalla, facilidad de preconfiguración, tipo de memoria y cómo envían fotos varios familiares:",
        },
        {
            "type": "table",
            "caption": f"Comparativa técnica para {title} en Amazon Estados Unidos",
            "headers": [
                "Modelo en Amazon",
                "Tamaño y Pantalla",
                "Almacenamiento ($0/mes)",
                "Configuración y Familiares",
            ],
            "rows": [
                [
                    f"**Recomendación #1: {picks.split(',')[0].strip()}**",
                    scr,
                    sto,
                    f"{setp} · {fam}",
                ],
                [
                    "**Favorito en Nube Gratis: [Aura Carver 10.1\" Wi‑Fi](/resenas-marcos-digitales-wifi/aura-carver-10-pulgadas-marco-digital-wifi-resena/)**",
                    "10.1\" HD IPS Antirreflejos (16:10 + Smart Pairing de 2 fotos verticales)",
                    "Nube Ilimitada 100 % Gratis ($0/mes · sin suscripción)",
                    "Código QR de regalo sin abrir la caja · Familiares ilimitados en App Aura",
                ],
                [
                    "**Favorito con Memoria Local: [Frameo 10.1\" (32 GB + MicroSD)](/resenas-marcos-digitales-wifi/frameo-10-1-pulgadas-32gb-marco-digital-tactil-resena/)**",
                    "10.1\" HD IPS Táctil (1280×800 · Rotación automática)",
                    "32 GB Internos (~80.000 fotos) + Ranura MicroSD ($0/mes)",
                    "Funciona con y sin Wi‑Fi · Hasta 500+ familiares en App Frameo",
                ],
                [
                    "**Favorito Formato 4:3 / Pared: [Aura Mason 9\" 2K](/resenas-marcos-digitales-wifi/aura-mason-9-pulgadas-2k-marco-digital-formato-4-3-resena/) / [Frameo 15.6\" FHD](/marcos-por-tamano-y-pantalla/mejores-marcos-digitales-grandes-15-pulgadas-para-pared-y-abuelos/)**",
                    "9\" 2K Formato 4:3 exacto al celular o 15.6\" Full HD 1080p para baja visión",
                    "Nube Ilimitada Gratis o 32 GB Internos + MicroSD ($0/mes)",
                    "Altavoz para videos con sonido de los nietos y apagado nocturno",
                ],
            ],
        },
        {
            "type": "h2",
            "text": "Por qué estos modelos son los más recomendados para padres y abuelos",
        },
        {
            "type": "ul",
            "items": [
                f"**Calidad visual adaptada a las fotos del celular:** con **{scr}**, los retratos verticales y horizontales tomados con cualquier smartphone se ven nítidos desde cualquier ángulo del sillón gracias a la tecnología IPS de 178°.",
                f"**Cero complicaciones para adultos mayores:** gracias a **{setp.lower()}**, tus padres o abuelos solo tienen que enchufar el cable a la corriente; el marco se enciende de día y se apaga solo de noche.",
                f"**Almacenamiento transparente sin mensualidades:** con **{sto.lower()}** y soporte para **{fam.lower()}**, toda la familia puede compartir recuerdos a diario sin pagar cuotas recurrentes.",
            ],
        },
        {
            "type": "h2",
            "text": "Paso a paso para comprarlo y preconfigurarlo en Amazon Estados Unidos",
        },
        {
            "type": "steps",
            "items": [
                {
                    "name": "Verifica el tamaño y el tipo de conexión Wi‑Fi de tus padres",
                    "text": f"Confirma si prefieres nube ilimitada gratis (cuando tienen Wi‑Fi estable) o 32 GB de memoria interna con ranura MicroSD (cuando quieres almacenamiento físico en el marco).",
                },
                {
                    "name": "Consulta el precio y cupones activos en Amazon",
                    "text": "Haz clic en las tarjetas de producto de esta guía para abrir la ficha oficial en Amazon.com (o cambia el conmutador a Amazon.es si compras desde España).",
                },
                {
                    "name": "Activa la preconfiguración de regalo y el Gift Receipt",
                    "text": "Marca la casilla «This is a gift» en Amazon para enviar el marco sin mostrar el precio y pre-carga las primeras fotos familiares e invitaciones desde tu celular.",
                },
            ],
        },
        {
            "type": "callout",
            "variant": "fabricante",
            "title": "Consejo para familias que viven en distintos estados o países",
            "text": "Una vez configurado el marco, envía por WhatsApp el código de invitación de la App (Aura o Frameo) a todos tus hermanos, tíos y sobrinos: así los abuelos recibirán fotos sorpresa desde varias ciudades cada semana.",
        },
        {
            "type": "cta",
            "text": "¿Tienes dudas sobre qué modelo de esta comparativa se adapta mejor a tus padres o abuelos? Pregúntale ahora a nuestro Asesor de Marcos IA.",
        },
    ]

    faqs = [
        {
            "q": f"¿Cuál es la mejor opción dentro de {title} para abuelos que no usan tecnología?",
            "a": f"Recomendamos priorizar {picks.split(',')[0].strip()} porque ofrece {setp.lower()}, pantalla {scr.lower()} y {sto.lower()}, permitiendo que los abuelos solo tengan que enchufarlo a la corriente.",
        },
        {
            "q": "¿Hay que pagar alguna suscripción mensual para enviar fotos desde el celular?",
            "a": "No. Tanto los marcos Aura (con almacenamiento en la nube ilimitado y gratuito de por vida) como los marcos Frameo (con 32 GB de memoria interna y ranura MicroSD) funcionan a $0/mes sin suscripción.",
        },
        {
            "q": "¿Cuántos familiares pueden conectarse para mandar fotos y videos al mismo marco?",
            "a": f"El sistema permite {fam.lower()}. Hijos, nietos, hermanos y tíos pueden enviar fotografías y videos cortos desde iPhone o Android aunque vivan en otros estados o países.",
        },
        {
            "q": "¿Los enlaces llevan a Amazon Estados Unidos con garantía oficial?",
            "a": "Sí. Por defecto nuestras tarjetas abren la oferta verificada en Amazon Estados Unidos (amazon.com con tag eligetumarco-20) e incluyen un selector para cambiar en un clic a Amazon España (amazon.es con tag eligetumarco-21).",
        },
    ]

    quick_answer = (
        f"En nuestra comparativa de {title}, la mejor recomendación en Amazon EE. UU. destaca por su pantalla ({scr}), "
        f"facilidad de configuración ({setp.lower()}), almacenamiento ({sto.lower()}) y soporte para {fam.lower()}. "
        f"Los modelos líderes son {picks}, todos sin suscripción mensual obligatoria."
    )

    return {
        "slug": slug,
        "pillar": pillar,
        "path": path,
        "isPillar": False,
        "isTransactional": True,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{title} | EligeTuMarco.com",
        "metaDescription": f"Comparativa y análisis de {title}. Evaluamos tamaño de pantalla ({scr}), configuración para abuelos, memoria ({sto}) y precios en Amazon EE. UU.",
        "excerpt": f"Guía de compra de {title}: comparamos pantalla, facilidad de preconfiguración para padres y abuelos, almacenamiento y envío desde varios familiares en Amazon.",
        "quickAnswer": quick_answer,
        "readingMinutes": 7,
        "image": {
            "prompt": build_diverse_prompt(subj, idx),
            "alt": title,
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Amazon.com Digital Picture Frames Best Sellers", "url": "https://www.amazon.com/Best-Sellers-Electronics-Digital-Picture-Frames/zgbs/electronics/525460"},
            {"label": "Amazon Gift Options & Extended Returns Policy", "url": "https://www.amazon.com/gp/help/customer/display.html"},
        ],
        "related": rel,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": None,
    }


def make_seo_article(item: tuple, sibling_paths: list, idx: int) -> dict:
    slug, title, pillar, kw, focus_summary, subj = item
    slug = clean_slug(slug)
    path = f"/{pillar}/{slug}/"
    rel = [p for p in sibling_paths if p != path][:3]
    rel.insert(0, f"/{pillar}/")

    blocks = [
        {
            "type": "p",
            "text": f"Aprender **{title}** es fundamental cuando quieres que el marco digital con Wi‑Fi de tus padres o abuelos funcione siempre de forma impecable, incluso si vives a miles de kilómetros. En **EligeTuMarco.com** hemos preparado este tutorial paso a paso sobre **{focus_summary}**, comparando cómo se aplica en los modelos más populares de **Amazon Estados Unidos** (Aura Carver, Aura Mason, Frameo 32 GB, Skylight Frame y Nixplay).",
        },
        {
            "type": "h2",
            "text": f"Por qué es importante conocer {title}",
        },
        {
            "type": "p",
            "text": f"El objetivo de un marco digital familiar es que tus padres o abuelos disfruten las fotos nuevas que envías desde tu celular sin preocuparse por ajustes técnicos. Cuando configuras correctamente **{focus_summary.lower()}**, te aseguras de que la pantalla muestre las fotografías con la proporción adecuada (`4:3` o `16:10` con *Smart Pairing*), que el almacenamiento (nube ilimitada o `32 GB` internos con MicroSD) esté siempre disponible y que todos los familiares puedan participar.",
        },
        {
            "type": "callout",
            "variant": "tip",
            "title": "Consejo práctico para hijos y nietos que configuran el marco",
            "text": "Haz siempre una prueba desde tu propio celular iPhone o Android antes de dar por terminada la configuración: envía 2 fotos verticales y 1 horizontal con una breve dedicatoria para comprobar que se ven centradas y con el brillo ideal.",
        },
        {
            "type": "h2",
            "text": "Tabla comparativa según marca y ecosistema de marco digital",
        },
        {
            "type": "table",
            "caption": f"Referencia rápida aplicada a {title}",
            "headers": [
                "Ecosistema / Modelo",
                "Tamaño y Pantalla",
                "Almacenamiento",
                "Cómo se aplica en la práctica",
            ],
            "rows": [
                [
                    "**[Aura Carver 10.1\"](/resenas-marcos-digitales-wifi/aura-carver-10-pulgadas-marco-digital-wifi-resena/) / [Aura Mason 9\" 2K](/resenas-marcos-digitales-wifi/aura-mason-9-pulgadas-2k-marco-digital-formato-4-3-resena/)**",
                    "10.1\" Smart Pairing (16:10) o 9\" 2K (Formato 4:3)",
                    "Nube Ilimitada Gratis ($0/mes)",
                    "Se gestiona 100 % a distancia desde la App gratuita Aura en iOS/Android con código QR de regalo",
                ],
                [
                    "**[Frameo 10.1\" y 15.6\" (32 GB)](/resenas-marcos-digitales-wifi/frameo-10-1-pulgadas-32gb-marco-digital-tactil-resena/)**",
                    "10.1\" HD o 15.6\" Full HD IPS Táctil",
                    "32 GB Internos (~80.000 fotos) + MicroSD ($0/mes)",
                    "Guarda las fotos físicamente en el marco, funciona con y sin Wi‑Fi y acepta copias en MicroSD",
                ],
                [
                    "**[Skylight Frame 10\" Touch](/resenas-marcos-digitales-wifi/skylight-frame-10-pulgadas-envio-por-email-resena/)**",
                    "10\" Color Touch IPS (1280×800)",
                    "8/16 GB Internos + Modo Offline",
                    "Permite enviar fotos directamente por correo electrónico (@ourskylight.com) sin instalar apps",
                ],
                [
                    "**[Aura Walden 15\"](/marcos-por-tamano-y-pantalla/mejores-marcos-digitales-grandes-15-pulgadas-para-pared-y-abuelos/)**",
                    "15\" Formato 4:3 Mate Antirreflejos",
                    "Nube Ilimitada Gratis ($0/mes)",
                    "Ideal para colgar en la pared de la sala o para abuelos con baja visión con sensor nocturno",
                ],
            ],
        },
        {
            "type": "h2",
            "text": f"Tutorial paso a paso: {title}",
        },
        {
            "type": "steps",
            "items": [
                {
                    "name": "Revisa el modelo y la versión de la aplicación móvil",
                    "text": "Abre la aplicación oficial en tu celular (Aura Frames, Frameo, Skylight o Nixplay) y verifica que el marco figure vinculado a la red Wi‑Fi de casa (preferiblemente banda de 2.4 GHz si el router está lejos).",
                },
                {
                    "name": "Aplica el ajuste recomendado para padres y abuelos",
                    "text": f"Sigue el procedimiento de {focus_summary.lower()} asegurándote de dejar activado el apagado automático nocturno (por sensor de luz o por horario de sueño) y el ajuste inteligente de encuadre.",
                },
                {
                    "name": "Comparte el acceso con el resto de la familia",
                    "text": "Envía el código de invitación o la dirección de correo del marco a tus hermanos, hijos y sobrinos para que todos puedan mandar nuevas fotos desde su teléfono.",
                },
            ],
        },
        {
            "type": "h2",
            "text": "Errores frecuentes que debes evitar para no complicar a los abuelos",
        },
        {
            "type": "ul",
            "items": [
                "**Dejar que tus padres o abuelos tengan que escribir contraseñas en pantalla:** siempre que sea posible, utiliza la **[preconfiguración de regalo a distancia](/configuracion-facil-y-regalo-a-distancia/como-preconfigurar-un-marco-digital-wifi-para-regalar-a-distancia/)** antes de entregarlo.",
                "**Olvidar la proporción de las fotos verticales del celular:** si eliges un marco panorámico `16:10`, activa el emparejamiento de dos fotos verticales (*Smart Pairing*) o el relleno inteligente de rostros; o elige directamente un marco `4:3` como el **[Aura Mason 9\" 2K](/resenas-marcos-digitales-wifi/aura-mason-9-pulgadas-2k-marco-digital-formato-4-3-resena/)**.",
                "**No prever qué pasa si se corta el internet:** si en casa de tus abuelos el Wi‑Fi falla con frecuencia, un marco con **[32 GB de memoria interna y ranura MicroSD](/marcos-por-app-y-almacenamiento/mejores-marcos-digitales-frameo-32gb-con-ranura-microsd-amazon/)** seguirá mostrando todas las fotos guardadas sin interrupción.",
            ],
        },
        {
            "type": "cta",
            "text": "¿Quieres saber qué marco digital con Wi‑Fi en Amazon EE. UU. resuelve mejor este punto para tu familia? Consulta ahora a nuestro Asesor de Marcos IA.",
        },
    ]

    faqs = [
        {
            "q": f"¿Cómo puedo resolver {title} si vivo lejos de mis padres o abuelos?",
            "a": f"En modelos con gestión en la nube como Aura Carver o Aura Mason puedes configurar la mayoría de opciones desde tu propio celular. En modelos con sistema Frameo de 32 GB puedes preconfigurarlo antes de enviarlo o guiar a tus padres en 2 pasos muy simples en su pantalla táctil en español.",
        },
        {
            "q": "¿Qué marco digital es más fácil para que mis abuelos no tengan que tocar ningún botón?",
            "a": "El Aura Carver 10.1\" (con Smart Pairing) y el Aura Mason 9\" 2K son los más automáticos: se preconfiguran escaneando el código QR de la caja, tienen nube ilimitada gratis ($0/mes) y su sensor de luz apaga la pantalla por completo cuando apagan la luz del cuarto.",
        },
        {
            "q": "¿Qué modelo conviene si quiero que las fotos queden guardadas en memoria interna o tarjeta MicroSD?",
            "a": "El Frameo de 10.1\" o 15.6\" Full HD con 32 GB de memoria interna (~80.000 fotos) y ranura para tarjeta MicroSD es la mejor alternativa, ya que funciona a $0/mes y sigue mostrando las fotografías incluso si se desconecta el Wi‑Fi.",
        },
    ]

    quick_answer = (
        f"Para aplicar correctamente {title}, verifica primero si tu marco digital utiliza almacenamiento en la nube ilimitado gratis (como Aura Carver/Mason) "
        f"o memoria interna de 32 GB con MicroSD (como Frameo). Con {focus_summary.lower()}, lograrás que tus padres o abuelos "
        "reciban las fotos enviadas desde el celular de toda la familia sin tocar menús complicados."
    )

    return {
        "slug": slug,
        "pillar": pillar,
        "path": path,
        "isPillar": False,
        "isTransactional": False,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{title} | EligeTuMarco.com",
        "metaDescription": f"Guía paso a paso sobre {title}. Aprende {focus_summary.lower()} para que tus padres y abuelos disfruten las fotos enviadas desde el celular.",
        "excerpt": f"Tutorial práctico sobre {title}: {focus_summary}.",
        "quickAnswer": quick_answer,
        "readingMinutes": 6,
        "image": {
            "prompt": build_diverse_prompt(subj, idx),
            "alt": title,
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Amazon.com Digital Picture Frames Guide", "url": "https://www.amazon.com/Best-Sellers-Electronics-Digital-Picture-Frames/zgbs/electronics/525460"},
        ],
        "related": rel,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": None,
    }


def main():
    for old in ART_DIR.glob("*.json"):
        old.unlink()

    trans_items = generate_transactional_500()
    seo_items = generate_seo_1000()

    by_pillar: dict[str, list] = {p["slug"]: [] for p in PILLARS}
    for it in trans_items:
        by_pillar[it[2]].append(it)
    for it in seo_items:
        by_pillar[it[2]].append(it)

    all_articles = []
    seen_slugs = set()
    seen_kws = set()
    idx = 0

    # 1. Generar los 12 Hubs Pilares
    for p in PILLARS:
        art = make_pillar_article(p, by_pillar[p["slug"]], idx)
        idx += 1
        assert art["slug"] not in seen_slugs, f"Duplicate slug: {art['slug']}"
        assert art["primaryKeyword"] not in seen_kws, f"Duplicate kw: {art['primaryKeyword']}"
        seen_slugs.add(art["slug"])
        seen_kws.add(art["primaryKeyword"])
        all_articles.append(art)

    # Mapa de rutas hermanas por pilar
    pillar_paths = {
        p_slug: [f"/{p_slug}/{clean_slug(c[0])}/" for c in c_list]
        for p_slug, c_list in by_pillar.items()
    }

    # 2. Generar los 500 Artículos Transaccionales
    for i, it in enumerate(trans_items):
        p_slug = it[2]
        sibs = pillar_paths[p_slug]
        rot_sibs = sibs[(i + 1) % len(sibs):] + sibs[:(i + 1) % len(sibs)]
        art = make_transactional_article(it, rot_sibs, idx)
        idx += 1
        assert art["slug"] not in seen_slugs, f"Duplicate slug: {art['slug']}"
        assert art["primaryKeyword"] not in seen_kws, f"Duplicate kw: {art['primaryKeyword']}"
        seen_slugs.add(art["slug"])
        seen_kws.add(art["primaryKeyword"])
        all_articles.append(art)

    # 3. Generar los 1,000 Artículos SEO Informacionales
    for i, it in enumerate(seo_items):
        p_slug = it[2]
        sibs = pillar_paths[p_slug]
        rot_sibs = sibs[(i + 1) % len(sibs):] + sibs[:(i + 1) % len(sibs)]
        art = make_seo_article(it, rot_sibs, idx)
        idx += 1
        assert art["slug"] not in seen_slugs, f"Duplicate slug: {art['slug']}"
        assert art["primaryKeyword"] not in seen_kws, f"Duplicate kw: {art['primaryKeyword']}"
        seen_slugs.add(art["slug"])
        seen_kws.add(art["primaryKeyword"])
        all_articles.append(art)

    # Guardar los 1,512 archivos JSON
    for art in all_articles:
        (ART_DIR / f"{art['slug']}.json").write_text(
            json.dumps(art, ensure_ascii=False, indent=2), encoding="utf-8"
        )

    # Guardar keyword_map.json
    kw_map = [
        {
            "slug": a["slug"],
            "pillar": a["pillar"],
            "path": a["path"],
            "isPillar": a["isPillar"],
            "isTransactional": a["isTransactional"],
            "primaryKeyword": a["primaryKeyword"],
            "title": a["title"],
        }
        for a in all_articles
    ]
    (DATA_DIR / "keyword_map.json").write_text(
        json.dumps(kw_map, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    # Guardar public/search-index.json
    cat_names = {p["slug"]: p["title"].split(":")[0].split("(")[0].strip() for p in PILLARS}
    search_index = [
        {
            "t": a["title"],
            "p": a["path"],
            "n": cat_names.get(a["pillar"], a["pillar"]),
            "r": a["readingMinutes"],
        }
        for a in all_articles
    ]
    (PUB_DIR / "search-index.json").write_text(
        json.dumps(search_index, ensure_ascii=False), encoding="utf-8"
    )

    print(
        f"OK: Generados {len(all_articles)} artículos únicos "
        f"(12 Pilares + {len(trans_items)} Transaccionales Amazon + {len(seo_items)} SEO Informacionales). "
        f"0% Canibalización verificada."
    )


if __name__ == "__main__":
    main()
