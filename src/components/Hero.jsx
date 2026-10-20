/* =========================================================================
   HERO — editorial split layout.
   Left: name, title, headline, supporting copy, CTAs, location.
   Right: an original AR lens composition (SVG + CSS, no WebGL, no camera).

   MOTION SAFETY
   Elements are visible in the markup. GSAP applies the hidden start state
   only inside gsap.context(), so if JavaScript fails nothing is hidden.
   ========================================================================= */

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion.js";
import { heroFacts, site } from "../data/site.js";
import { ArrowRight, ArrowDown, MapPin } from "lucide-react";
import HeroVisual from "./HeroVisual.jsx";

export default function Hero({ introDone }) {
  const rootRef = useRef(null);

  /* --- entrance timeline, starts once the preloader lifts -------------- */
  useLayoutEffect(() => {
    if (!introDone || prefersReducedMotion()) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // text block: label, headline lines, copy, buttons
      tl.from("[data-hero-line]", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.07,
      })
        .from(
          "[data-hero-word]",
          { yPercent: 108, duration: 1, stagger: 0.08, ease: "power4.out" },
          "-=0.45"
        )
        .from(
          "[data-hero-copy]",
          { opacity: 0, y: 22, duration: 0.75, stagger: 0.08 },
          "-=0.6"
        )
        // visual: a restrained clip-path reveal
        .from(
          "[data-hero-visual]",
          {
            opacity: 0,
            y: 28,
            scale: 0.985,
            duration: 1.15,
            ease: "power3.out",
          },
          "-=0.95"
        )
        .from(
          "[data-hero-fact]",
          { opacity: 0, y: 14, duration: 0.6, stagger: 0.07 },
          "-=0.6"
        );
    }, root);

    return () => ctx.revert();
  }, [introDone]);

  /* --- gentle parallax + very slight pointer response ------------------ */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-hero-visual]", {
        y: -46,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const visual = root.querySelector("[data-hero-tilt]");
      if (!visual) return;

      const qx = gsap.quickTo(visual, "x", { duration: 1, ease: "power3.out" });
      const qy = gsap.quickTo(visual, "y", { duration: 1, ease: "power3.out" });

      const onMove = (e) => {
        if (e.pointerType !== "mouse") return;
        const rect = root.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        qx(px * 14);
        qy(py * 12);
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={rootRef} className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
      <div className="shell-wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------------- left: text ---------------- */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* name + title */}
            <div data-hero-line className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h1 className="font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-charcoal">
                {site.fullName}
              </h1>
              <span aria-hidden="true" className="h-3 w-px bg-line" />
              <p className="kicker">{site.title}</p>
            </div>

            {/* headline */}
            <div
              className="display mt-8 text-[clamp(2.3rem,6.1vw,4.15rem)] text-charcoal"
              aria-label={site.heroHeadline}
            >
              <span className="line-mask">
                <span data-hero-word className="block">
                  I Turn Creative
                </span>
              </span>
              <span className="line-mask">
                <span data-hero-word className="block">
                  Ideas Into
                </span>
              </span>
              <span className="line-mask">
                <span data-hero-word className="block italic text-cobalt">
                  Immersive AR
                </span>
              </span>
              <span className="line-mask">
                <span data-hero-word className="block">
                  Experiences.
                </span>
              </span>
            </div>

            {/* supporting copy */}
            <p data-hero-copy className="lede mt-7 max-w-xl">
              {site.heroSupport}
            </p>

            {/* CTAs */}
            <div data-hero-copy className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn btn-primary">
                Explore my work
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-outline">
                Let&apos;s collaborate
              </a>
            </div>

            {/* location */}
            <p data-hero-copy className="mt-8 flex items-center gap-2 text-[0.9rem] text-slate">
              <MapPin size={15} aria-hidden="true" className="text-clay" />
              {site.location}
            </p>
          </div>

          {/* ---------------- right: visual ---------------- */}
          <div data-hero-visual className="lg:col-span-6 xl:col-span-6">
            <div data-hero-tilt>
              <HeroVisual />
            </div>
          </div>
        </div>

        {/* ---------------- credibility strip ---------------- */}
        <dl className="mt-16 grid gap-px overflow-hidden border-t border-line pt-8 sm:grid-cols-3 lg:mt-24">
          {heroFacts.map((fact) => (
            <div key={fact.label} data-hero-fact className="pr-6">
              <dt className="kicker">{fact.label}</dt>
              <dd className="mt-1.5 text-[0.95rem] font-medium text-charcoal">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* scroll cue */}
      <a
        href="#work"
        data-hero-fact
        className="mx-auto mt-12 hidden w-fit items-center gap-2 text-[0.8rem] font-medium text-slate transition-colors duration-300 hover:text-charcoal lg:flex"
      >
        <ArrowDown size={14} aria-hidden="true" />
        Scroll to selected work
      </a>
    </section>
  );
}
