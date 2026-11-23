import { useId } from "react";

/** Logotipo de EligeTuMarco.com: Marco Digital con Paspartú + Ondas Wi-Fi Doradas + Paisaje Familiar */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#17110D" />
          <stop offset="0.52" stopColor="#065F46" />
          <stop offset="1" stopColor="#C2410C" />
        </linearGradient>
        <linearGradient id={`${id}wood`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EA580C" />
          <stop offset="1" stopColor="#9A3412" />
        </linearGradient>
        <linearGradient id={`${id}gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FEF08A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}bg)`} />
      {/* Marco digital exterior */}
      <rect
        x="11"
        y="17"
        width="42"
        height="33"
        rx="5"
        fill={`url(#${id}wood)`}
        stroke={`url(#${id}gold)`}
        strokeWidth="2.2"
      />
      {/* Paspartú y pantalla IPS */}
      <rect x="15.5" y="21.5" width="33" height="24" rx="2.5" fill="#FAF7F2" />
      {/* Sol cálido y silueta en la foto */}
      <circle cx="24" cy="28.5" r="3.2" fill="#F59E0B" />
      <path
        d="M17 43.5 L26 34.5 L33.5 41 L39.5 35.5 L47 43.5 Z"
        fill="#065F46"
      />
      {/* Ondas Wi-Fi superiores de envío desde el celular */}
      <path
        d="M24.5 11.5 A11 11 0 0 1 39.5 11.5"
        fill="none"
        stroke={`url(#${id}gold)`}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M28 14.5 A6 6 0 0 1 36 14.5"
        fill="none"
        stroke="#FEF08A"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
      <LogoMark />
      <span>
        EligeTu<span className={dark ? "text-fxlime" : "text-fxblue"}>Marco</span>
        <span
          className={`ml-1.5 hidden text-[10px] font-bold uppercase tracking-[0.18em] sm:inline ${
            dark ? "text-white/60" : "text-[var(--muted)]"
          }`}
        >
          .com
        </span>
      </span>
    </span>
  );
}
