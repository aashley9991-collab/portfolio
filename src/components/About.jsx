/* =========================================================================
   ABOUT — professional biography, philosophy, approach and focus areas.
   All copy comes from `about` in src/data/site.js.
   ========================================================================= */

import { useEffect, useRef } from "react";
import { initReveals } from "../lib/motion.js";
import { about, site } from "../data/site.js";
import SectionHead from "./SectionHead.jsx";
import { MapPin, Mail, Sparkles } from "lucide-react";

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    const reveals = initReveals(rootRef.current);
    return () => reveals.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="section border-t border-line bg-canvas-alt">
      <div className="shell-wide">
        <SectionHead
          index="03"
          label="About"
          title="A designer who builds the thing she designs."
          lede="An independent practice focused on augmented reality — the craft of making an idea something a person can interact with, not just look at."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-12">
          {/* ---------------- left: portrait + facts ---------------- */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              {/* Portrait: add your own image in src/data/site.js → about.portrait */}
              {about.portrait ? (
                <img
                  data-reveal
                  src={about.portrait}
                  alt={about.portraitAlt}
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full rounded-[10px] border border-line object-cover"
                />
              ) : (
                <div
                  data-reveal
                  className="flex aspect-[4/5] w-full flex-col justify-center rounded-[10px] border border-dashed border-line bg-paper p-7"
                >
                  <Sparkles size={20} aria-hidden="true" className="text-clay" />
                  <p className="mt-4 font-display text-lg font-semibold text-charcoal">
                    Portrait or studio image
                  </p>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-slate">
                    This is a labelled placeholder — not a stock photo. Add your own file and set
                    {" "}<span className="font-mono text-[0.8rem] text-charcoal">about.portrait</span> in
                    src/data/site.js.
                  </p>
                </div>
              )}

              {/* contact quick facts */}
              <dl className="mt-8 space-y-5" data-reveal>
                <div className="flex items-start gap-3">
                  <MapPin size={15} aria-hidden="true" className="mt-1 shrink-0 text-clay" />
                  <div>
                    <dt className="kicker">Based in</dt>
                    <dd className="mt-0.5 text-[0.93rem] text-charcoal">{site.location}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={15} aria-hidden="true" className="mt-1 shrink-0 text-clay" />
                  <div>
                    <dt className="kicker">Contact</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`mailto:${site.email}`}
                        className="ulink text-[0.93rem] font-medium text-charcoal"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </aside>

          {/* ---------------- right: biography ---------------- */}
          <div className="lg:col-span-8">
            <div data-stagger className="space-y-6">
              {about.bio.map((paragraph, i) => (
                <p
                  key={i}
                  data-reveal-child
                  className={
                    i === 0
                      ? "text-[clamp(1.1rem,1.9vw,1.32rem)] leading-[1.7] text-charcoal"
                      : "lede"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* philosophy pull quote */}
            <figure
              data-reveal
              className="mt-12 border-l-2 border-cobalt pl-6 sm:pl-8"
            >
              <blockquote className="font-display text-[clamp(1.35rem,2.8vw,2rem)] font-medium italic leading-[1.35] text-charcoal">
                “{about.philosophy}”
              </blockquote>
              <figcaption className="kicker mt-4">Creative philosophy</figcaption>
            </figure>

            {/* approach */}
            <div data-reveal className="mt-12 rounded-[10px] border border-line bg-paper p-6 sm:p-8">
              <h3 className="kicker">My approach</h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-slate">{about.approach}</p>
            </div>

            {/* focus areas */}
            <div className="mt-12" data-reveal>
              <h3 className="kicker">Areas of focus</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-md border border-line bg-paper px-3 py-2 text-[0.83rem] font-medium text-charcoal transition-colors duration-300 hover:border-cobalt hover:text-cobalt"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            {/* milestones */}
            <div className="mt-14">
              <h3 className="kicker" data-reveal>
                Milestones
              </h3>

              <ol data-stagger className="mt-6 border-l border-line">
                {about.milestones.map((item) => (
                  <li key={item.title} data-reveal-child className="relative pb-8 pl-6 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[4.5px] top-2 h-2 w-2 rounded-full border border-cobalt bg-canvas-alt"
                    />
                    <p className="numeral">{item.period}</p>
                    <h4 className="mt-1 font-display text-[1.08rem] font-semibold text-charcoal">
                      {item.title}
                    </h4>
                    <p className="mt-1 max-w-xl text-[0.92rem] leading-relaxed text-slate">
                      {item.text}
                    </p>
                    {item.sample && (
                      <span className="mt-2.5 inline-block rounded-sm border border-dashed border-line px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-mist">
                        Editable sample
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              <p className="mt-5 font-mono text-[0.72rem] leading-relaxed text-mist">
                Milestones are placeholders. Replace them with real, verifiable moments — or delete
                entries you cannot confirm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
