/* =========================================================================
   CASE STUDY — the featured project presented in full detail.
   This section intentionally uses a DARK surface so it stands apart from the
   light editorial flow, giving the featured work its own gallery moment.

   All copy comes from `caseStudy` in src/data/projects.js.
   ========================================================================= */

import { useEffect, useRef } from "react";
import { initReveals } from "../lib/motion.js";
import { caseStudy } from "../data/projects.js";
import { ArrowUpRight, QrCode } from "lucide-react";

export default function CaseStudy() {
  const rootRef = useRef(null);

  useEffect(() => {
    const reveals = initReveals(rootRef.current, { start: "top 86%" });
    return () => reveals.revert();
  }, []);

  return (
    <section
      id="case-study"
      ref={rootRef}
      className="on-dark section bg-ink text-onink"
      aria-labelledby="case-study-title"
    >
      <div className="shell-wide">
        {/* ---------------- header ---------------- */}
        <div className="flex items-center gap-4" data-reveal>
          <span className="numeral !text-[#d9a679]">02</span>
          <span className="kicker">Featured Case Study</span>
          <span className="rule-fade" aria-hidden="true" />
          {caseStudy.sample && (
            <span className="shrink-0 rounded-sm border border-onink/25 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-onink-soft">
              Sample content
            </span>
          )}
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------------- left: title + meta ---------------- */}
          <div className="lg:col-span-5">
            <h2
              id="case-study-title"
              data-reveal
              className="display text-[clamp(2.1rem,5vw,3.6rem)] text-onink"
            >
              {caseStudy.title}
            </h2>

            <p data-reveal className="mt-4 text-[1rem] leading-relaxed text-onink-soft">
              {caseStudy.subtitle}
            </p>

            <dl data-stagger className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6">
              {caseStudy.meta.map((item) => (
                <div key={item.label} data-reveal-child>
                  <dt className="kicker">{item.label}</dt>
                  <dd className="mt-1.5 text-[0.92rem] font-medium text-onink">{item.value}</dd>
                </div>
              ))}
            </dl>

            {/* tools */}
            <div className="mt-10" data-reveal>
              <h3 className="kicker">Tools & techniques</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {caseStudy.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-sm border border-line-dark px-2.5 py-1.5 font-mono text-[0.68rem] text-onink-soft"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA + QR — only when a real destination exists */}
            <div className="mt-10 flex flex-wrap items-center gap-6" data-reveal>
              {caseStudy.link ? (
                <a
                  href={caseStudy.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Open the experience
                  <ArrowUpRight size={15} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <p className="max-w-xs rounded-md border border-dashed border-line-dark p-4 font-mono text-[0.68rem] leading-relaxed text-onink-soft">
                  No live link yet — add <span className="text-onink">link</span> to the case study
                  in src/data/projects.js to enable this button.
                </p>
              )}

              {caseStudy.qrImage && (
                <figure className="text-center">
                  <img
                    src={caseStudy.qrImage}
                    alt={`QR code to open the ${caseStudy.title} lens on a phone`}
                    width={104}
                    height={104}
                    loading="lazy"
                    className="h-26 w-26 rounded-sm bg-white p-1.5"
                  />
                  <figcaption className="kicker mt-2">Scan to open</figcaption>
                </figure>
              )}
            </div>
          </div>

          {/* ---------------- right: hero media ---------------- */}
          <div className="lg:col-span-7">
            <figure data-reveal className="overflow-hidden rounded-[10px] border border-line-dark">
              <div className="relative w-full" style={{ aspectRatio: "16 / 11" }}>
                <img
                  src={caseStudy.hero}
                  alt={caseStudy.heroAlt}
                  width={1600}
                  height={1100}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />

                {caseStudy.video && (
                  <video
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src={caseStudy.video} type="video/mp4" />
                  </video>
                )}

                <span className="absolute inset-x-4 bottom-4 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-onink/80">
                  <QrCode size={12} aria-hidden="true" />
                  {caseStudy.category} · visual preview
                </span>
              </div>
            </figure>

            <p className="mt-4 font-mono text-[0.68rem] leading-relaxed text-onink-soft/80">
              A preview image is not a running lens. Camera-based AR requires the host app —
              open the live link on a compatible phone to try the real experience.
            </p>
          </div>
        </div>

        {/* ---------------- chapters ---------------- */}
        <div className="mt-16 border-t border-line-dark pt-14">
          <ol data-stagger className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {caseStudy.chapters.map((chapter) => (
              <li key={chapter.n} data-reveal-child>
                <span className="numeral !text-[#d9a679]">{chapter.n}</span>
                <h3 className="mt-3 font-display text-[1.22rem] font-semibold text-onink">
                  {chapter.title}
                </h3>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-onink-soft">
                  {chapter.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <p data-reveal className="mt-14 font-mono text-[0.72rem] leading-relaxed text-onink-soft/80">
          This case study is clearly labelled sample content. Rewrite the six chapters in your own
          words once your featured project is finished.
        </p>
      </div>
    </section>
  );
}
