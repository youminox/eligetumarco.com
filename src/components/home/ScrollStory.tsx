"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    n: "01",
    t: "Elige el tamaño (9\", 10.1\" o 15.6\") y el almacenamiento (Nube vs 32 GB)",
    d: "Para mesa de noche o escritorio brilla el Aura Mason de 9\" (formato 4:3 2K); para el aparador de la sala el estándar favorito es 10.1\" (Aura Carver con nube ilimitada o Frameo con 32 GB internos + MicroSD); y para pared o abuelos con baja visión destaca el Frameo de 15.6\" Full HD.",
  },
  {
    n: "02",
    t: "Preconfigúralo como regalo desde tu celular antes de que lo abran",
    d: "Con el código QR de regalo de Aura puedes cargar el Wi‑Fi de tus padres, las primeras 50 fotos familiares y un mensaje de bienvenida sin siquiera abrir la caja. En Frameo o Skylight puedes dejarlo listo con su red y miles de fotos pre-cargadas.",
  },
  {
    n: "03",
    t: "Tus padres o abuelos lo reciben a distancia y solo lo enchufan",
    d: "Aunque vivan en otro estado de EE. UU. o en otro país y no sepan usar smartphones, no tienen que crear cuentas ni tocar menús: al enchufar el cable a la pared, el marco se conecta solo y empieza a mostrar los recuerdos.",
  },
  {
    n: "04",
    t: "Invita a hermanos, nietos y tíos para enviar fotos cada día",
    d: "Comparte el código de invitación en la App gratuita (iOS y Android) o el correo del marco para que toda la familia mande fotos y videos cortos al instante. Por la noche, el sensor de luz apaga la pantalla automáticamente.",
  },
];

/** Escena fijada con GSAP ScrollTrigger clonada de prunex1.com: muestra los 4 pasos desde el celular de los hijos hasta la sala de los abuelos. */
export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        if (reduce) {
          gsap.set(q(".step"), { opacity: 1 });
          gsap.set(q(".bar"), { scaleX: 1 });
          gsap.set(q(".phone-alert, .night, .sound-wave"), { opacity: 1 });
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2200",
            scrub: 0.7,
            pin: q(".pin")[0],
            anticipatePin: 1,
          },
        });
        tl.to(q(".step-0"), { opacity: 1, duration: 0.2 }, 0)
          .to(
            q(".step-0 .dot"),
            { backgroundColor: "#C2410C", color: "#fff", duration: 0.2 },
            0
          )
          .fromTo(
            q(".piano-key-press"),
            { y: 0 },
            { y: -12, duration: 0.6 },
            0.1
          )
          .to(q(".step-0"), { opacity: 0.75, duration: 0.2 }, 1)
          .to(q(".step-1"), { opacity: 1, duration: 0.2 }, 1)
          .to(
            q(".step-1 .dot"),
            { backgroundColor: "#065F46", color: "#fff", duration: 0.2 },
            1
          )
          .to(
            q(".hammer-arm"),
            { rotate: -6, svgOrigin: "200 155", duration: 0.5 },
            1.15
          )
          .to(
            q(".sound-wave"),
            { opacity: 0.65, scaleX: 0.6, duration: 0.5 },
            1.25
          )
          .to(q(".step-1"), { opacity: 0.75, duration: 0.2 }, 2)
          .to(q(".step-2"), { opacity: 1, duration: 0.2 }, 2)
          .to(
            q(".step-2 .dot"),
            { backgroundColor: "#F59E0B", color: "#1e1206", duration: 0.2 },
            2
          )
          .to(
            q(".pedal-lever"),
            { scale: 1.05, svgOrigin: "200 355", duration: 0.7 },
            2.05
          )
          .to(q(".sound-wave"), { opacity: 1, scaleX: 1, duration: 0.5 }, 2.1)
          .to(q(".step-2"), { opacity: 0.75, duration: 0.2 }, 3.1)
          .to(q(".step-3"), { opacity: 1, duration: 0.2 }, 3.1)
          .to(
            q(".step-3 .dot"),
            { backgroundColor: "#C2410C", color: "#fff", duration: 0.2 },
            3.1
          )
          .to(q(".night"), { opacity: 1, duration: 0.6 }, 3.1)
          .to(q(".phone-alert"), { opacity: 1, y: 0, duration: 0.5 }, 3.3)
          .to(q(".done"), { opacity: 1, y: 0, duration: 0.4 }, 3.4)
          .to(q(".bar"), { scaleX: 1, duration: 3.8 }, 0);
      }, el);
    };

    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io?.disconnect();
          init();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="ruta-marco"
      ref={root}
      className="relative bg-gradient-to-b from-white via-fxsky to-white"
    >
      <div className="pin flex min-h-[100svh] items-center overflow-hidden py-10 lg:py-14">
        <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">
              Conexión Familiar a Miles de Kilómetros
            </span>
            <h2 className="section-title mt-3">
              Cuatro pasos.{" "}
              <span className="text-prune">
                Del celular de los hijos y nietos a la sala de los abuelos.
              </span>
            </h2>
            <div className="mt-4 h-1.5 w-full max-w-sm overflow-hidden rounded bg-[var(--line)]">
              <div className="bar h-full origin-left scale-x-0 bg-gradient-to-r from-fxblue via-drinklight to-prune" />
            </div>
            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`step step-${i} flex gap-4`}
                  style={{ opacity: 0.78 }}
                >
                  <span className="dot grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white font-display font-extrabold text-fxink shadow-md">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold sm:text-xl">
                      {s.t}
                    </p>
                    <p className="text-sm text-[#5c4b3e] sm:text-base">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p
              className="done mt-5 hidden text-sm text-[var(--muted)] sm:block"
              style={{ opacity: 0, transform: "translateY(10px)" }}
            >
              Consejo práctico: si compras en Amazon Estados Unidos, puedes
              enviar el marco directamente a la dirección de tus padres o
              abuelos marcando <em>This is a gift</em> para incluir recibo de
              regalo sin precio.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[420px]">
            <svg
              viewBox="0 0 400 440"
              className="relative w-full drop-shadow-[0_30px_50px_rgba(194,65,12,0.22)]"
              role="img"
              aria-label="Animación interactiva de envío de fotos desde varios celulares a un marco digital Wi-Fi en casa de los abuelos"
            >
              <defs>
                <linearGradient id="ss-day" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#faf7f2" />
                  <stop offset="1" stopColor="#f3e8d8" />
                </linearGradient>
                <linearGradient id="ss-night" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#17110d" />
                  <stop offset="0.65" stopColor="#065f46" />
                  <stop offset="1" stopColor="#2e1308" />
                </linearGradient>
                <clipPath id="ss-panel">
                  <rect x="0" y="0" width="400" height="440" rx="36" />
                </clipPath>
              </defs>
              <g clipPath="url(#ss-panel)">
                <rect width="400" height="440" fill="url(#ss-day)" />
                <rect
                  className="night"
                  width="400"
                  height="440"
                  fill="url(#ss-night)"
                  opacity="0"
                />

                {/* Ondas Wi-Fi de Envío Remoto */}
                <g className="hammer-arm">
                  <path
                    d="M145 130 A70 70 0 0 1 255 130"
                    fill="none"
                    stroke="#c2410c"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M165 144 A45 45 0 0 1 235 144"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <text
                    x="200"
                    y="104"
                    textAnchor="middle"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="10.5"
                    fill="#c2410c"
                  >
                    ENVÍO WI‑FI DESDE CELULARES DE TODA LA FAMILIA
                  </text>
                </g>

                {/* Marco Digital con Paspartú y 2 Fotos Verticales (Smart Pairing) */}
                <rect
                  x="75"
                  y="162"
                  width="250"
                  height="162"
                  rx="14"
                  fill="#291d16"
                  stroke="#f59e0b"
                  strokeWidth="4"
                />
                <rect
                  x="91"
                  y="176"
                  width="218"
                  height="134"
                  rx="6"
                  fill="#faf7f2"
                />
                {/* Foto Izquierda y Foto Derecha */}
                <rect
                  x="101"
                  y="185"
                  width="94"
                  height="116"
                  rx="4"
                  fill="#fde68a"
                />
                <circle cx="148" cy="224" r="16" fill="#c2410c" />
                <path d="M115 292 C115 262, 181 262, 181 292 Z" fill="#065f46" />

                <rect
                  x="205"
                  y="185"
                  width="94"
                  height="116"
                  rx="4"
                  fill="#d1fae5"
                />
                <circle cx="252" cy="224" r="16" fill="#065f46" />
                <path d="M219 292 C219 262, 285 262, 285 292 Z" fill="#c2410c" />

                {/* Tarjetas Flotantes de Celulares Familiares */}
                <g className="piano-key-press">
                  <rect
                    x="24"
                    y="204"
                    width="90"
                    height="46"
                    rx="10"
                    fill="#ffffff"
                    stroke="#065f46"
                    strokeWidth="2"
                  />
                  <text
                    x="69"
                    y="224"
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="800"
                    fill="#065f46"
                  >
                    📱 iPhone Hijos
                  </text>
                  <text
                    x="69"
                    y="240"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill="#61574c"
                  >
                    App / QR Regalo
                  </text>

                  <rect
                    x="286"
                    y="204"
                    width="90"
                    height="46"
                    rx="10"
                    fill="#ffffff"
                    stroke="#c2410c"
                    strokeWidth="2"
                  />
                  <text
                    x="331"
                    y="224"
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="800"
                    fill="#c2410c"
                  >
                    ✉️ Nietos / Tíos
                  </text>
                  <text
                    x="331"
                    y="240"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill="#61574c"
                  >
                    Android &amp; Email
                  </text>
                </g>

                {/* Línea de Sincronización */}
                <line
                  className="sound-wave"
                  x1="64"
                  y1="338"
                  x2="336"
                  y2="338"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  opacity="0.45"
                />

                {/* Base de Especificaciones */}
                <g className="pedal-lever">
                  <rect
                    x="65"
                    y="352"
                    width="270"
                    height="36"
                    rx="10"
                    fill="#065f46"
                    stroke="#fef08a"
                    strokeWidth="2"
                  />
                  <text
                    x="200"
                    y="374"
                    textAnchor="middle"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="10.5"
                    fill="#fef08a"
                  >
                    9&quot; (4:3 2K) · 10.1&quot; (NUBE / 32GB) · 15.6&quot; FULL HD
                  </text>
                </g>

                {/* Notificación Superior de Foto Recibida */}
                <g
                  className="phone-alert"
                  opacity="0"
                  transform="translate(45 18)"
                >
                  <rect
                    width="310"
                    height="46"
                    rx="14"
                    fill="#ffffff"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                  />
                  <circle cx="24" cy="23" r="13" fill="#F59E0B" />
                  <text
                    x="24"
                    y="27"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="800"
                    fill="#141413"
                  >
                    🖼️
                  </text>
                  <text
                    x="44"
                    y="19"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="11.5"
                    fill="#141413"
                  >
                    ¡Nueva foto de los nietos recibida por Wi‑Fi!
                  </text>
                  <text
                    x="44"
                    y="34"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    fontSize="10"
                    fill="#9a3412"
                  >
                    Preconfigurado · Sin tocar botones · Apagado nocturno
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
