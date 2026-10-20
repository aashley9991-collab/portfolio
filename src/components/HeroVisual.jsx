/* =========================================================================
   HERO VISUAL — an original, premium AR lens composition.
   Built from SVG + CSS only (no WebGL, no 3D library, no camera).
   It reads as a design studio's lens preview: a device frame, a face-mesh
   study, editorial annotations and a slow scan line.

   Replace the whole component with your own image if you prefer:
     <img src="/images/hero-ar-preview.webp" alt="…" width={1200} height={1400} />
   ========================================================================= */

import { site } from "../data/site.js";

export default function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="AR lens preview artwork: a face-mesh study inside a phone frame with design annotations"
      className="relative mx-auto w-full max-w-[520px]"
    >
      {/* ---------- phone frame ---------- */}
      <div className="relative rounded-[26px] border border-line bg-paper p-2.5 shadow-[0_30px_70px_-40px_rgba(27,29,34,0.45)]">
        <div className="media relative aspect-[3/4] rounded-[18px] border border-line-soft">
          {/* warm studio backdrop */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(115% 80% at 68% 18%, #eef1fc 0%, #f7f4ee 42%, #ece6da 100%)",
            }}
          />

          {/* faint measurement grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(27,29,34,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,29,34,0.05) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />

          {/* face mesh study */}
          <svg
            viewBox="0 0 300 400"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[76%] w-auto -translate-x-1/2 -translate-y-1/2"
            fill="none"
          >
            <defs>
              <linearGradient id="veilA" x1="0" y1="0" x2="1" y2="0.4">
                <stop offset="0" stopColor="#2f4ac7" stopOpacity="0.16" />
                <stop offset="0.5" stopColor="#2f4ac7" stopOpacity="0.42" />
                <stop offset="1" stopColor="#2f4ac7" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="veilB" x1="0" y1="0" x2="1" y2="0.3">
                <stop offset="0" stopColor="#b4724a" stopOpacity="0.14" />
                <stop offset="0.6" stopColor="#2f4ac7" stopOpacity="0.3" />
                <stop offset="1" stopColor="#2f4ac7" stopOpacity="0.06" />
              </linearGradient>
              <clipPath id="headClip">
                <ellipse cx="150" cy="196" rx="98" ry="128" />
              </clipPath>
            </defs>

            {/* translucent veil planes across the face */}
            <g clipPath="url(#headClip)">
              <path d="M52 132 Q150 100 248 138 L248 176 Q150 140 52 172 Z" fill="url(#veilA)" />
              <path d="M52 186 Q150 154 248 192 L248 230 Q150 194 52 226 Z" fill="url(#veilB)" />
              <path d="M52 240 Q150 208 248 246 L248 284 Q150 248 52 280 Z" fill="url(#veilA)" />
            </g>

            {/* head outline */}
            <ellipse cx="150" cy="196" rx="98" ry="128" stroke="#1b1d22" strokeOpacity="0.42" strokeWidth="1.2" />
            <ellipse
              cx="150"
              cy="196"
              rx="116"
              ry="150"
              stroke="#2f4ac7"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="3 8"
            />

            {/* contour lines */}
            <path d="M52 196 H248" stroke="#1b1d22" strokeOpacity="0.16" strokeWidth="0.8" />
            <path d="M150 68 V324" stroke="#1b1d22" strokeOpacity="0.1" strokeWidth="0.8" />
            <path d="M60 150 Q150 118 240 150" stroke="#2f4ac7" strokeOpacity="0.4" strokeWidth="1" />
            <path d="M60 244 Q150 276 240 244" stroke="#2f4ac7" strokeOpacity="0.24" strokeWidth="1" />

            {/* features, kept abstract and editorial */}
            <path d="M100 182 q18 -13 36 0" stroke="#1b1d22" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
            <path d="M164 182 q18 -13 36 0" stroke="#1b1d22" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
            <path d="M128 256 q22 15 44 0" stroke="#1b1d22" strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" />

            {/* landmark points */}
            <g fill="#2f4ac7">
              <circle cx="52" cy="196" r="3" />
              <circle cx="248" cy="196" r="3" />
              <circle cx="150" cy="68" r="3" />
              <circle cx="150" cy="324" r="3" />
              <circle cx="100" cy="182" r="2.6" />
              <circle cx="136" cy="182" r="2.6" />
              <circle cx="164" cy="182" r="2.6" />
              <circle cx="200" cy="182" r="2.6" />
              <circle cx="150" cy="220" r="2.6" />
              <circle cx="128" cy="256" r="2.6" />
              <circle cx="172" cy="256" r="2.6" />
            </g>
          </svg>

          {/* scan line */}
          <span aria-hidden="true" className="scan-line" />

          {/* status bar inside the phone */}
          <div className="absolute inset-x-4 top-4 flex items-center justify-between">
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-slate">
              Lens preview
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-cobalt">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cobalt" />
              Live
            </span>
          </div>

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-slate">
              Face track · study
            </span>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-slate">
              01 / {site.monogram}
            </span>
          </div>
        </div>
      </div>

      {/* ---------- floating annotation card ---------- */}
      <div
        aria-hidden="true"
        className="absolute -bottom-6 -left-3 w-[62%] max-w-[260px] rounded-[10px] border border-line bg-paper p-4 shadow-[0_18px_40px_-26px_rgba(27,29,34,0.4)] sm:-left-8"
      >
        <p className="kicker">Design notes</p>
        <p className="mt-2 text-[0.78rem] leading-relaxed text-slate">
          Layered translucent planes driven by head rotation — colour behaving like fabric.
        </p>
      </div>

      {/* ---------- small AR tracking mark ---------- */}
      <div
        aria-hidden="true"
        className="absolute -right-2 -top-3 hidden h-16 w-16 sm:block"
      >
        <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-cobalt/60" />
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-cobalt/60" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-cobalt/60" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-cobalt/60" />
      </div>
    </div>
  );
}
