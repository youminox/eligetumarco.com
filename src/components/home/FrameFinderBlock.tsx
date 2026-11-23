"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CATALOG,
  buildAmazonUrl,
  detectUserAmazonRegion,
  type AmazonStoreRegion,
  type AmazonProductRecommendation,
} from "@/lib/amazon";
import { trackClick } from "@/lib/client-constants";
import OpenChatButton from "@/components/OpenChatButton";

export type FrameTier = {
  key: string;
  label: string;
  screenSpec: string;
  storageSpec: string;
  familyApp: string;
  img: string;
  alt: string;
  idealFor: string;
  reviewHref: string;
  productKey: keyof typeof CATALOG;
};

/**
 * Selector interactivo de Marcos Digitales con Wi-Fi (según tamaño de pantalla, facilidad de configuración, almacenamiento y familiares) + Calculadora de Capacidad de Fotos yFamiliares (clonado de PriceBlock.tsx de prunex1.com).
 */
export default function FrameFinderBlock({
  options,
}: {
  options: FrameTier[];
}) {
  const [k, setK] = useState(options[0].key);
  const [familyMembersCount, setFamilyMembersCount] = useState(6);
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const p = options.find((o) => o.key === k) || options[0];
  const amzProd: AmazonProductRecommendation =
    CATALOG[p.productKey] || CATALOG.AURA_CARVER_10_WIFI;
  const amzUrl = buildAmazonUrl(amzProd, region);
  const storeName = region === "US" ? "Amazon.com" : "Amazon.es";

  const yearlyPhotos = familyMembersCount * 15 * 12;

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="card card-static spot relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-drink/10 blur-3xl" />
        <div className="relative">
          <div
            className="inline-flex flex-wrap rounded-full bg-fxsky p-1 gap-1"
            role="tablist"
            aria-label="Selector de marco digital Wi-Fi por prioridad familiar"
          >
            {options.map((o) => (
              <button
                key={o.key}
                role="tab"
                type="button"
                aria-selected={o.key === k}
                onClick={() => setK(o.key)}
                className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  o.key === k
                    ? "bg-white text-fxbluedeep shadow"
                    : "text-[var(--muted)] hover:text-fxink"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_1.15fr]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[240px] overflow-hidden rounded-2xl border border-[var(--line)] shadow-sm">
              <Image
                key={p.img}
                src={p.img}
                alt={p.alt}
                fill
                sizes="240px"
                className="object-cover"
                style={{ animation: "fadeup .45s ease both" }}
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-900">
                {amzProd.badge}
              </span>
              <p className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-fxink leading-snug">
                {amzProd.title.split("—")[0].trim()}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                <strong className="text-fxink">
                  ¿Para qué padres o abuelos es ideal?
                </strong>{" "}
                {p.idealFor}
              </p>
              <div className="mt-2.5 rounded-xl bg-fxsky p-2.5 text-xs space-y-0.5">
                <p className="font-bold text-prune">
                  📐 Pantalla: {p.screenSpec}
                </p>
                <p className="font-semibold text-fxink">
                  ☁️ Memoria: {p.storageSpec}
                </p>
                <p className="font-semibold text-fxbluedeep">
                  👨‍👩‍👧‍👦 Envío Familiar: {p.familyApp}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={amzUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() =>
                trackClick(`calc-amazon-${p.key}`, {
                  article_slug: amzProd.id,
                  article_title: amzProd.title,
                  category: "amazon",
                  target_url: amzUrl,
                })
              }
              className="btn btn-buy shine flex-1 text-sm"
              data-magnetic
            >
              🖼️ Consultar precio en {storeName} ↗
            </a>
            <Link href={p.reviewHref} className="btn btn-ghost text-sm">
              Ver comparativa →
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#17110d] via-[#0d1614] to-[#231109] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fxlime/15 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-fxlime">
          Calculadora Familiar de Envío de Fotos y Almacenamiento
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          ¿Cuántos familiares enviarán fotos desde su celular?
        </h3>
        <p className="mt-2 text-sm text-white/70">
          Desliza para indicar cuántos hijos, nietos, hermanos o tíos se
          conectarán al marco digital de tus padres o abuelos (desde EE. UU.,
          Latinoamérica o España).
        </p>
        <label
          htmlFor="family-slider"
          className="mt-6 flex items-center justify-between text-sm font-semibold"
        >
          <span>Familiares conectados en la App / Email</span>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-display text-lg text-fxlime">
            {familyMembersCount} familiares
          </span>
        </label>
        <input
          id="family-slider"
          type="range"
          min={1}
          max={25}
          step={1}
          value={familyMembersCount}
          onChange={(e) => setFamilyMembersCount(Number(e.target.value))}
          className="mt-3 w-full accent-[#F59E0B]"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] text-white/45">
          <span>1–2 hijos</span>
          <span>6–8 (Hijos y nietos)</span>
          <span>15 (Familia extendida)</span>
          <span>25+ invitados</span>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            [
              "Fotos Nuevas / Año",
              `~${yearlyPhotos.toLocaleString("en-US")} fotos`,
            ],
            ["Costo Mensual", "$0/mes (Sin cuota)"],
            ["Capacidad 32 GB / Nube", "40+ años de fotos"],
          ].map(([l, val], i) => (
            <div
              key={l}
              className={`glass flex flex-col-reverse p-3 ${
                i === 0 ? "border-fxlime/50 bg-fxlime/10" : ""
              }`}
            >
              <dt className="mt-1 text-[0.7rem] leading-tight text-white/60">
                {l}
              </dt>
              <dd
                className={`font-display font-extrabold ${
                  i === 0
                    ? "text-sm text-fxlime sm:text-base"
                    : "text-xs sm:text-base"
                }`}
              >
                {val}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-white/60">
          <span>
            Tanto Aura (invitados ilimitados en la nube gratis) como Frameo
            (hasta 500+ familiares en 32 GB internos) permiten que todos envíen
            fotos gratis desde iPhone y Android.
          </span>
          <OpenChatButton
            label="Pedir recomendación al Asesor IA"
            prompt={`Somos ${familyMembersCount} familiares que queremos enviar fotos desde el celular a nuestros padres/abuelos y me interesa la opción "${p.label}". ¿Qué marco digital Wi‑Fi nos conviene más en Amazon Estados Unidos?`}
            className="text-fxlime font-bold hover:underline !bg-transparent !p-0"
          />
        </div>
      </div>
    </div>
  );
}
