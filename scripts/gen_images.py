#!/usr/bin/env python3
"""
Genera imágenes fotorrealistas y diversas para eligetumarco.com vía la Edge Function eligetumarco-images
(Supabase charlielingan → OpenAI ChatGPT Image API con quality="medium") y las comprime en WebP
ligeros (<= 68 KB, estrictamente < 100 KB) en public/img/.

Uso:
  python3 scripts/gen_images.py home        # genera las 56 imágenes de la Home/silos/escenas + artículos top
  python3 scripts/gen_images.py articles    # genera imágenes individuales por artículo
  python3 scripts/gen_images.py one <slug> "<prompt>"
"""
import json, sys, io, pathlib, urllib.request, concurrent.futures as cf
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/eligetumarco-images"
TOKEN = "eligetumarco-img-2026"
RAW = ROOT / "scripts/.cache/raw"
RAW.mkdir(parents=True, exist_ok=True)

# 56 escenas fotográficas diversas (diferentes ángulos, tamaños de pantalla, formatos 4:3 vs 16:10, abuelos, celulares e iluminación para evitar repetición visual)
HOME_PROMPTS = {
    "home-hero-marcos": "Three-quarter editorial studio photograph of a warm modern grandparents living room oak sideboard featuring a 10.1-inch Wi-Fi digital photo frame displaying a vivid portrait of grandchildren alongside a smartphone sending a photo, soft morning sunlight",
    "og-default": "Inviting sunlit family living room table displaying three Wi-Fi digital photo frames (9-inch 4:3, 10.1-inch 16:10 and 15.6-inch) showing crisp family memories next to a smartphone and gift box",
    "home-abuelos-lejos": "Eye-level realistic lifestyle photograph of smiling Hispanic grandparents sitting on a cozy sofa looking happily at a new photo of their grandchildren on a Wi-Fi digital photo frame on a wooden console table",
    "home-preconfiguracion-regalo": "Overhead close-up of hands holding a smartphone scanning a gift setup QR code on a sleek digital photo frame gift box on a light oak desk with satin ribbon",
    "home-aura-nube": "Three-quarter studio view of a modern 10.1-inch matte charcoal Wi-Fi digital photo frame on a Scandinavian oak shelf displaying two vertical smartphone portraits paired side-by-side",
    "home-frameo-32gb": "Detailed close-up of a 10.1-inch touchscreen Wi-Fi digital photo frame with a warm wood bezel on a living room table beside a microSD memory card and a smartphone running a photo app",
    "home-formato-4-3": "Side-by-side editorial comparison of a 9-inch 4:3 2K digital photo frame in portrait mode and a 10.1-inch 16:10 landscape frame displaying family photos without black bars",
    "home-varios-familiares": "Warm family scene showing two smartphones sending vacation and baby photos wirelessly to a glowing digital photo frame on a dining room sideboard",
    "home-tamanos-pantalla": "Wide interior view of a 15.6-inch Full HD digital Wi-Fi photo frame mounted on a cream living room wall above a sideboard where a 10.1-inch frame rests",
    # 12 Categorías Pilares
    "cat-resenas-marcos-digitales-wifi": "Editorial product testing desk featuring top-rated Wi-Fi digital photo frames of 9, 10.1 and 15.6 inches displaying bright family photography under soft window light",
    "cat-comparativas-marcos-digitales": "Balanced side-by-side studio comparison of two digital Wi-Fi photo frames—one matte slate and one natural oak wood—on a split wooden tabletop",
    "cat-marcos-para-padres-y-abuelos": "Warm afternoon living room scene where an elderly couple smiles while viewing a bright family portrait on a tabletop Wi-Fi digital picture frame",
    "cat-marcos-por-tamano-y-pantalla": "Graduated arrangement of 9-inch, 10.1-inch and 15.6-inch digital photo frames showcasing anti-glare IPS screens and 4:3 vs 16:10 aspect ratios",
    "cat-marcos-por-app-y-almacenamiento": "Overhead flat-lay on walnut wood featuring a Wi-Fi digital photo frame, a smartphone photo sharing app interface, a 64GB microSD card and cloud icon",
    "cat-marcos-por-presupuesto-y-ofertas": "Curated display of affordable and premium Wi-Fi digital photo frames organized on an oak table with gift ribbons and delivery boxes",
    "cat-configuracion-facil-y-regalo-a-distancia": "Step-by-step gift preparation table showing a digital photo frame box, smartphone gift setup screen, velvet ribbon and handwritten greeting card",
    "cat-enviar-fotos-desde-el-celular-y-familia": "Close-up over-the-shoulder shot of a mother selecting family photos on her iPhone to send instantly to a Wi-Fi digital frame across the room",
    "cat-guia-de-pantallas-resolucion-y-formatos": "Macro close-up of a high-density 2K anti-glare IPS digital photo frame screen showing paper-like color accuracy and wide 178-degree viewing angle",
    "cat-almacenamiento-nube-microsd-y-privacidad": "Rear and side studio view of a digital Wi-Fi photo frame highlighting its microSD card slot and USB-C port next to a laptop",
    "cat-solucion-de-problemas-wifi-y-apps": "Modern home Wi-Fi router on a wooden bookshelf next to a connected digital photo frame displaying a crisp family photo in a bright room",
    "cat-ideas-de-fotografia-familiar-y-decoracion": "Open vintage printed family photo album next to a smartphone digitizing old black-and-white memories into a glowing wooden Wi-Fi digital frame",
    # 35 Variantes Temáticas Anti-Similitud
    "scene-resenas-2": "Macro angle of a freestanding stone-textured Wi-Fi digital photo frame on a walnut nightstand with warm evening lamp glow",
    "scene-resenas-3": "Three-quarter view of a white matted 10.1-inch digital photo frame on a marble console table with eucalyptus stems",
    "scene-resenas-4": "Close-up of a wooden bezel 10.1-inch touchscreen digital frame displaying a baby portrait with a warm caption bar at the bottom",
    "scene-comparativas-2": "Overhead comparison of a 4:3 portrait digital frame on the left and a 16:10 landscape frame on the right on birch wood",
    "scene-comparativas-3": "Side-profile comparison showing the slim mat bezel of a gallery digital frame versus a classic wooden frame stand",
    "scene-comparativas-4": "Two digital photo frames in a sunny room demonstrating matte anti-glare glass versus standard glass reflection",
    "scene-abuelos-2": "Grandmother in a bright kitchen pouring tea while looking at a new photo of her grandson on a counter Wi-Fi digital frame",
    "scene-abuelos-3": "Grandfather sitting in an armchair reading a book beside a 15-inch digital photo frame on a side table showing a large family reunion photo",
    "scene-abuelos-4": "Close-up of a simple power plug connected to the wall behind a digital photo frame ready to work out of the box for seniors",
    "scene-pantalla-2": "Compact 9-inch 4:3 digital photo frame standing vertically on a bedroom nightstand next to reading glasses",
    "scene-pantalla-3": "Large 15.6-inch Full HD digital photo frame hanging horizontally on a living room gallery wall surrounded by framed art",
    "scene-pantalla-4": "Extreme close-up of an IPS screen showing two vertical smartphone photos paired side by side with zero black bars",
    "scene-app-2": "Smartphone screen selecting five grandchildren photos to send via Wi-Fi app to a digital frame in the background",
    "scene-app-3": "Close-up of a hand inserting a microSD memory card into the back slot of a 32GB digital photo frame",
    "scene-app-4": "Laptop and smartphone sending an email photo attachment directly to a touchscreen digital photo frame on a desk",
    "scene-presupuesto-2": "Affordable 10.1-inch black digital photo frame on a clean bookshelf displaying a colorful family holiday portrait",
    "scene-presupuesto-3": "Pair of matching 10.1-inch Wi-Fi digital photo frames wrapped with gift bows for both sets of grandparents",
    "scene-presupuesto-4": "Premium 15-inch matted gallery digital photo frame in a luxury living room interior with soft daylight",
    "scene-configuracion-2": "Nighttime bedroom scene showing a digital photo frame automatically dimming and turning off its screen in the dark",
    "scene-configuracion-3": "Smartphone hotspot setup next to a new digital photo frame being pre-configured on a dining table before gifting",
    "scene-configuracion-4": "Hands placing a pre-configured digital photo frame back into its gift box with a welcome note for mom and dad",
    "scene-celular-2": "Close-up of an Android smartphone sending a short family video clip to a Wi-Fi digital frame with built-in speaker",
    "scene-celular-3": "Three family smartphones on a coffee table all connected to the same shared digital photo frame album",
    "scene-celular-4": "A digital photo frame displaying a heartfelt Spanish caption and date at the bottom of a family beach photograph",
    "scene-formatos-2": "Studio demonstration of a 178-degree wide viewing angle on an IPS digital photo frame viewed from the side",
    "scene-formatos-3": "Close-up of the top touch bar sensor on a modern digital photo frame keeping the front screen free of fingerprints",
    "scene-formatos-4": "A rotating digital photo frame switching smoothly from horizontal landscape to vertical portrait orientation",
    "scene-almacenamiento-2": "Flat-lay of a 64GB microSDXC card, SD adapter and USB-C flash drive next to a 32GB Wi-Fi digital photo frame",
    "scene-almacenamiento-3": "A digital photo frame connected via USB cable to a laptop transferring a backup folder of family photographs",
    "scene-almacenamiento-4": "A Wi-Fi digital photo frame operating in offline mode displaying stored internal memory photos on a cabin mantelpiece",
    "scene-wifi-2": "Digital photo frame touchscreen displaying a clean Wi-Fi network connection checkmark in a bright living room",
    "scene-wifi-3": "Adult daughter on a video call helping her parents check their Wi-Fi digital photo frame on the living room table",
    "scene-wifi-4": "Dual-band mesh Wi-Fi node on a hallway console beside a digital photo frame receiving instant photo updates",
    "scene-decoracion-2": "Sunlit living room showing a digital photo frame positioned away from direct window glare on a wooden credenza",
    "scene-decoracion-3": "A neat hidden power cord routed discreetly behind a wooden sideboard supporting a 10.1-inch digital photo frame",
    "scene-decoracion-4": "Gallery wall composition combining classic printed wooden frames with a central 15-inch matte Wi-Fi digital photo frame",
}

TOP_ARTICLE_SLUGS = [
    "mejores-marcos-digitales-wifi-para-padres-y-abuelos-amazon",
    "aura-carver-vs-frameo-10-pulgadas-cual-elegir-para-abuelos",
    "aura-carver-10-pulgadas-marco-digital-wifi-resena",
    "frameo-10-1-pulgadas-32gb-marco-digital-tactil-resena",
    "aura-mason-9-pulgadas-2k-marco-digital-formato-4-3-resena",
    "skylight-frame-10-pulgadas-envio-por-email-resena",
    "que-tamano-de-marco-digital-elegir-9-10-o-15-pulgadas",
    "mejores-marcos-digitales-grandes-15-pulgadas-para-pared-y-abuelos",
    "mejores-marcos-digitales-con-nube-ilimitada-gratis-sin-suscripcion",
    "mejores-marcos-digitales-frameo-32gb-con-ranura-microsd-amazon",
    "mejores-marcos-digitales-para-enviar-fotos-por-correo-electronico",
    "mejores-marcos-digitales-wifi-calidad-precio-amazon-estados-unidos",
    "mejores-marcos-digitales-wifi-economicos-por-menos-de-70-dolares",
    "como-preconfigurar-un-marco-digital-wifi-para-regalar-a-distancia",
    "como-varios-familiares-pueden-enviar-fotos-al-mismo-marco-digital",
    "proporcion-4-3-vs-16-10-en-marcos-digitales-fotos-de-celular",
    "cuantas-fotos-caben-en-16gb-32gb-y-64gb-en-un-marco-digital",
    "que-hacer-si-el-marco-digital-de-tus-padres-no-conecta-al-wifi",
    "como-escanear-fotos-antiguas-de-los-abuelos-con-el-celular-para-el-marco-digital",
]


def call(slug, prompt):
    data = json.dumps({"slug": slug, "prompt": prompt}).encode()
    req = urllib.request.Request(
        ENDPOINT,
        data=data,
        headers={
            "Content-Type": "application/json",
            "x-eligetumarco-token": TOKEN,
        },
    )
    with urllib.request.urlopen(req, timeout=240) as r:
        res = json.loads(r.read())
    if not res.get("ok"):
        raise RuntimeError(res.get("error"))
    with urllib.request.urlopen(res["url"] + "?v=1", timeout=120) as r:
        return r.read()


def save_variants(slug, raw_bytes, outdir):
    outdir.mkdir(parents=True, exist_ok=True)
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    w, h = im.size
    target = 16 / 9
    if w / h > target:
        nw = int(h * target)
        im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / target)
        im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    # Límite estricto: <= 68 KB para la imagen 1200x675 (siempre < 100 KB como pidió el usuario)
    sizes = {"": 1200, "-800": 800, "-400": 400}
    limits = {"": 68_000, "-800": 42_000, "-400": 18_000}
    out = {}
    for suf, width in sizes.items():
        cur_w = width
        q = 78
        while True:
            r = im.resize((cur_w, round(cur_w * 9 / 16)), Image.LANCZOS)
            buf = io.BytesIO()
            r.save(buf, "WEBP", quality=q, method=6)
            if buf.tell() <= limits[suf]:
                break
            if q > 28:
                q -= 5
            elif cur_w > 640:
                cur_w = int(cur_w * 0.88)
            else:
                break
        p = outdir / f"{slug}{suf}.webp"
        p.write_bytes(buf.getvalue())
        out[suf] = buf.tell()
    return out


def job(slug, prompt, outdir):
    final = outdir / f"{slug}.webp"
    if final.exists() and final.stat().st_size <= 68_000:
        return slug, f"skip ({final.stat().st_size // 1024}KB)"
    rawp = RAW / f"{slug}.webp"
    if rawp.exists():
        b = rawp.read_bytes()
    else:
        last = None
        for _ in range(3):
            try:
                b = call(slug, prompt)
                break
            except Exception as e:
                last = e
        else:
            return slug, f"ERROR {last}"
        rawp.write_bytes(b)
    sizes = save_variants(slug, b, outdir)
    return slug, f"ok {sizes[''] // 1024}KB"


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "home"
    tasks = []
    if mode == "home":
        for s, p in HOME_PROMPTS.items():
            tasks.append((s, p, ROOT / "public/img/ambiente"))
        art_dir = ROOT / "src/content/articles"
        for slug in TOP_ARTICLE_SLUGS:
            f = art_dir / f"{slug}.json"
            if f.exists():
                a = json.loads(f.read_text())
                tasks.append(
                    (a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos")
                )
    elif mode == "articles":
        for f in sorted((ROOT / "src/content/articles").glob("*.json")):
            a = json.loads(f.read_text())
            tasks.append(
                (a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos")
            )
    elif mode == "one":
        tasks.append((sys.argv[2], sys.argv[3], ROOT / "public/img/ambiente"))
    with cf.ThreadPoolExecutor(max_workers=10) as ex:
        for slug, status in ex.map(lambda t: job(*t), tasks):
            print(slug, status, flush=True)


if __name__ == "__main__":
    main()
