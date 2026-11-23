"use client";

import { useCallback, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Escena arrastrable Antes ↔ Después clonada de DayNightSlider.tsx de prunex1.com: Marco con Nube Ilimitada Gratis + Smart Pairing de Fotos Verticales (Aura Carver/Mason) vs Marco con 32 GB de Memoria Interna + Ranura MicroSD que Funciona con y sin Wi-Fi (Frameo 10.1" / 15.6"). */
export default function ScreenComparisonSlider() {
  const [v, setV] = useState(25);
  const [touched, setTouched] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const t = v / 100;
  const mid = clamp(1 - Math.abs(t - 0.5) * 2.4);
  const pro = clamp((t - 0.45) / 0.45);
  const fullLocal = clamp((t - 0.55) / 0.4);

  const phase =
    t < 0.35
      ? "Arquitectura A · Nube Ilimitada Gratis + Smart Pairing (Aura Carver / Mason)"
      : t < 0.68
      ? "Transición · Comparando Almacenamiento en la Nube vs Memoria Interna Local"
      : "Arquitectura B · 32 GB Internos + MicroSD + Modo Offline (Frameo 10.1\" / 15.6\")";

  const storageReading =
    t < 0.45 ? "Nube Ilimitada ($0/mes)" : "32 GB + MicroSD ($0/mes)";

  const fromPointer = useCallback((clientX: number) => {
    const el = scene.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setV(Math.round(clamp((clientX - r.left) / r.width) * 100));
    setTouched(true);
  }, []);

  return (
    <div className="daynight bg-[#17110d] shadow-[0_40px_80px_-40px_rgba(20,50,30,0.7)]">
      <div
        ref={scene}
        className="relative aspect-[4/5] cursor-ew-resize select-none sm:aspect-[16/9]"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") e.preventDefault();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === "touch") {
            if (
              (e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)
            )
              fromPointer(e.clientX);
          }
        }}
      >
        <svg
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="dn-day" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f3e8d8" />
              <stop offset="1" stopColor="#faf7f2" />
            </linearGradient>
            <linearGradient id="dn-dusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#9a3412" />
              <stop offset="0.55" stopColor="#c2410c" />
              <stop offset="1" stopColor="#fde68a" />
            </linearGradient>
            <linearGradient id="dn-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#17110d" />
              <stop offset="0.7" stopColor="#064e3b" />
              <stop offset="1" stopColor="#261108" />
            </linearGradient>
            <radialGradient id="dn-lamp" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="1" stopColor="#c2410c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#dn-day)" />
          <rect width="800" height="450" fill="url(#dn-dusk)" opacity={mid} />
          <rect width="800" height="450" fill="url(#dn-night)" opacity={pro} />

          {/* Halo cálido de pantalla */}
          <circle
            cx="400"
            cy="230"
            r="240"
            fill="url(#dn-lamp)"
            opacity={pro}
          />

          {/* Superficie de aparador */}
          <rect
            x="0"
            y="365"
            width="800"
            height="85"
            fill={pro > 0.5 ? "#121f17" : "#dfd3c0"}
          />

          {/* Escena Izquierda (Aura Carver Smart Pairing + Nube) vs Derecha (Frameo 32GB + MicroSD) */}
          {pro < 0.5 ? (
            <g>
              <rect
                x="235"
                y="145"
                width="330"
                height="195"
                rx="16"
                fill="#1f1916"
                stroke="#c2410c"
                strokeWidth="4"
              />
              <rect
                x="253"
                y="161"
                width="294"
                height="163"
                rx="6"
                fill="#ffffff"
              />
              {/* 2 Fotos Verticales Emparejadas (Smart Pairing) */}
              <rect
                x="265"
                y="171"
                width="130"
                height="143"
                rx="4"
                fill="#fef3c7"
              />
              <text
                x="330"
                y="244"
                textAnchor="middle"
                fontSize="13"
                fontWeight="800"
                fill="#9a3412"
              >
                Foto Vertical 1
              </text>
              <rect
                x="405"
                y="171"
                width="130"
                height="143"
                rx="4"
                fill="#d1fae5"
              />
              <text
                x="470"
                y="244"
                textAnchor="middle"
                fontSize="13"
                fontWeight="800"
                fill="#065f46"
              >
                Foto Vertical 2
              </text>
              <text
                x="400"
                y="128"
                textAnchor="middle"
                fontFamily="Outfit, sans-serif"
                fontWeight="800"
                fontSize="15.5"
                fill="#9a3412"
              >
                ☁️ Aura Carver / Mason: Código QR sin Abrir la Caja + Nube
                Ilimitada Gratis
              </text>
            </g>
          ) : (
            <g opacity={fullLocal}>
              <rect
                x="220"
                y="140"
                width="360"
                height="205"
                rx="16"
                fill="#2d1c10"
                stroke="#fef08a"
                strokeWidth="4"
              />
              <rect
                x="238"
                y="156"
                width="324"
                height="173"
                rx="6"
                fill="#064e3b"
              />
              <text
                x="400"
                y="218"
                textAnchor="middle"
                fontSize="16"
                fontWeight="800"
                fill="#fef08a"
              >
                💾 32 GB Internos (~80.000 Fotos) + Ranura MicroSD
              </text>
              <text
                x="400"
                y="248"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#ffffff"
              >
                App Frameo Gratuita + Dedicatorias en Pantalla Táctil IPS
              </text>
              <text
                x="400"
                y="276"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#a7f3d0"
              >
                ✓ Sigue mostrando las fotos aunque se corte el Wi‑Fi de los
                abuelos
              </text>
            </g>
          )}

          {/* Caja de lectura inferior */}
          <rect
            x="130"
            y="352"
            width="540"
            height="34"
            rx="10"
            fill="#17110d"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text
            x="400"
            y="374"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="12"
            fill="#fef08a"
          >
            {pro > 0.5
              ? "Ideal si los abuelos tienen Wi‑Fi inestable o quieres pre-cargar una tarjeta MicroSD"
              : "Ideal si tus padres tienen Wi‑Fi estable y quieres preconfigurarlo sin abrir la caja"}
          </text>
        </svg>

        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/30 bg-black/45 px-4 py-2 text-white backdrop-blur-md sm:left-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/75">
            {phase}
          </p>
          <p className="font-display text-2xl sm:text-3xl font-extrabold tabular-nums">
            {storageReading}
          </p>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 max-w-[54%] rounded-2xl border border-white/30 bg-black/45 px-4 py-3 text-right text-white backdrop-blur-md sm:right-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-fxlime">
            {pro > 0.5
              ? "Ventaja Clave: Memoria Física + Offline"
              : "Ventaja Clave: Gift Setup QR + Smart Pairing"}
          </p>
          <p className="font-display text-sm font-bold leading-snug sm:text-lg">
            {pro > 0.5
              ? "Frameo 10.1\" y 15.6\" (32 GB Internos + MicroSD)"
              : "Aura Carver 10.1\" y Aura Mason 9\" 2K (Nube Ilimitada)"}
          </p>
        </div>
        {!touched && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-fxink shadow-lg sm:bottom-5 sm:px-4 sm:py-2 sm:text-sm">
            ← Arrastra para comparar Nube Ilimitada (Aura) vs 32 GB Internos +
            MicroSD (Frameo) →
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 bg-[#17110d] px-5 py-4 text-white sm:px-7">
        <span className="text-xs font-bold whitespace-nowrap">
          ☁️ Nube Ilimitada (Aura)
        </span>
        <label className="sr-only" htmlFor="dn-range">
          Comparador de almacenamiento y pantalla en marcos digitales Wi-Fi
        </label>
        <input
          id="dn-range"
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => {
            setV(Number(e.target.value));
            setTouched(true);
          }}
          aria-valuetext={`${phase}, ${storageReading}`}
        />
        <span className="text-xs font-bold whitespace-nowrap text-fxlime">
          💾 32 GB + MicroSD (Frameo)
        </span>
      </div>
    </div>
  );
}
