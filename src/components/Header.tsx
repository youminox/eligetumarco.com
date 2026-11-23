"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import OpenChatButton from "./OpenChatButton";

export const NAV = [
  { href: "/marcos-para-padres-y-abuelos/", label: "Padres y Abuelos" },
  { href: "/marcos-por-tamano-y-pantalla/", label: "Tamaños (9\", 10\", 15\")" },
  { href: "/marcos-por-app-y-almacenamiento/", label: "Nube vs 32GB" },
  { href: "/resenas-marcos-digitales-wifi/", label: "Reseñas Amazon" },
  { href: "/comparativas-marcos-digitales/", label: "Comparativas VS" },
  { href: "/marcos-por-presupuesto-y-ofertas/", label: "Por Presupuesto" },
  { href: "/configuracion-facil-y-regalo-a-distancia/", label: "Preconfigurar Regalo" },
  { href: "/enviar-fotos-desde-el-celular-y-familia/", label: "Enviar desde Celular" },
];

export default function Header({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const dark = variant === "dark" && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        dark
          ? "bg-transparent text-white"
          : "bg-white/90 text-fxink shadow-[0_8px_30px_-20px_rgba(194,65,12,0.35)] backdrop-blur-xl"
      }`}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-3">
        <Link href="/" aria-label="EligeTuMarco.com – inicio">
          <Logo dark={dark} />
        </Link>
        <nav
          className="hidden items-center gap-0.5 xl:flex"
          aria-label="Principal"
        >
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full px-3 py-2 text-[0.83rem] font-semibold transition ${
                dark
                  ? "hover:bg-white/10"
                  : "hover:bg-fxsky hover:text-fxbluedeep"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <OpenChatButton
            label="Asesor Marcos IA"
            className="btn btn-buy shine !px-4 !py-2 text-xs sm:text-sm"
          />
          <button
            className="grid h-10 w-10 place-items-center rounded-full xl:hidden cursor-pointer"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="wrap grid gap-1 pb-5 xl:hidden bg-white text-fxink rounded-b-3xl shadow-xl"
          aria-label="Móvil"
          data-lenis-prevent
        >
          {[
            ...NAV,
            {
              href: "/guia-de-pantallas-resolucion-y-formatos/",
              label: "Pantallas, Resolución y Formato 4:3 vs 16:10",
            },
            {
              href: "/almacenamiento-nube-microsd-y-privacidad/",
              label: "Almacenamiento, Nube, MicroSD y Privacidad",
            },
            {
              href: "/solucion-de-problemas-wifi-y-apps/",
              label: "Solución de Problemas de Wi‑Fi y Apps",
            },
            {
              href: "/ideas-de-fotografia-familiar-y-decoracion/",
              label: "Fotografía Familiar y Ubicación en Casa",
            },
          ].map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 font-semibold hover:bg-fxsky"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
