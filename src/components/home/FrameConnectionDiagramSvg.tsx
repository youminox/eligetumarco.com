/** SVG animado clonado de FiberGel.tsx de prunex1.com: muestra cómo los 4 factores técnicos (Tamaño/Proporción 4:3 vs 16:10 + Preconfiguración para Abuelos + Nube Ilimitada / 32 GB + Envío desde Varios Familiares) convergen en el marco digital Wi-Fi ideal. */
export default function FrameConnectionDiagramSvg() {
  const drops = Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return {
      x: 200 + Math.cos(a) * 46,
      y: 210 + Math.sin(a) * 46,
      dx: `${Math.cos(a) * 150}px`,
      dy: `${Math.sin(a) * 150}px`,
      d: `${(i % 6) * 0.65}s`,
      r: 7 + (i % 3) * 2,
    };
  });
  const strands = Array.from({ length: 7 }).map((_, i) => {
    const a = (i / 7) * Math.PI * 2 + 0.3;
    const x1 = 200 + Math.cos(a) * 30,
      y1 = 210 + Math.sin(a) * 30;
    const x2 = 200 + Math.cos(a) * 120,
      y2 = 210 + Math.sin(a) * 120;
    const mx = 200 + Math.cos(a + 0.5) * 80,
      my = 210 + Math.sin(a + 0.5) * 80;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });
  return (
    <div className="gel-scene relative mx-auto aspect-square w-full max-w-[460px]">
      <svg
        viewBox="0 0 400 420"
        className="h-full w-full"
        role="img"
        aria-label="Diagrama animado de envío de fotos por Wi-Fi desde varios celulares familiares hacia un marco digital con pantalla IPS antirreflejos"
      >
        <defs>
          <filter id="fg-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b" />
            <feColorMatrix
              in="b"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
          <radialGradient id="fg-gel" cx="45%" cy="40%" r="60%">
            <stop offset="0" stopColor="#fef08a" />
            <stop offset="0.55" stopColor="#c2410c" />
            <stop offset="1" stopColor="#065f46" />
          </radialGradient>
          <radialGradient id="fg-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#f59e0b" stopOpacity="0.38" />
            <stop offset="1" stopColor="#c2410c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="210" r="190" fill="url(#fg-halo)" />
        <circle
          cx="200"
          cy="210"
          r="150"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeDasharray="3 7"
        />
        <circle
          cx="200"
          cy="210"
          r="105"
          fill="none"
          stroke="rgba(245,158,11,0.38)"
          strokeDasharray="5 5"
        />
        {strands.map((d, i) => (
          <path
            key={i}
            d={d}
            className="fiber-strand"
            fill="none"
            stroke="#f59e0b"
            strokeOpacity="0.75"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
        <g filter="url(#fg-goo)">
          <circle
            className="gel-blob"
            cx="200"
            cy="210"
            r="46"
            fill="url(#fg-gel)"
          />
          <circle
            className="gel-blob"
            cx="178"
            cy="196"
            r="26"
            fill="#c2410c"
            style={{ animationDelay: "0.4s" }}
          />
          <circle
            className="gel-blob"
            cx="224"
            cy="226"
            r="24"
            fill="#059669"
            style={{ animationDelay: "0.9s" }}
          />
          {drops.map((p, i) => (
            <circle
              key={i}
              className="drop"
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#fbbf24"
              style={{
                ["--dx" as string]: p.dx,
                ["--dy" as string]: p.dy,
                animationDelay: p.d,
              }}
            />
          ))}
        </g>
        <g fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700">
          <g transform="translate(8 38)">
            <rect
              width="176"
              height="26"
              rx="13"
              fill="rgba(245,158,11,0.2)"
              stroke="rgba(245,158,11,0.6)"
            />
            <text x="88" y="17" textAnchor="middle" fill="#fef08a">
              Pantalla 4:3 (2K) vs 16:10
            </text>
          </g>
          <g transform="translate(212 54)">
            <rect
              width="180"
              height="26"
              rx="13"
              fill="rgba(194,65,12,0.28)"
              stroke="rgba(251,146,60,0.65)"
            />
            <text x="90" y="17" textAnchor="middle" fill="#fde68a">
              Preconfigurado para Abuelos
            </text>
          </g>
          <g transform="translate(62 372)">
            <rect
              width="276"
              height="26"
              rx="13"
              fill="rgba(6,95,70,0.38)"
              stroke="rgba(245,158,11,0.6)"
            />
            <text x="138" y="17" textAnchor="middle" fill="#fef3c7">
              Nube Ilimitada $0/mes o 32 GB + App Familiar
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
