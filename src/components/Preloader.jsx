/* =========================================================================
   PRELOADER — short, elegant intro (about 2 seconds).
   Deliberately restrained: a wordmark, a thin progress rule and a counter.
   - Skippable with click / Enter / Space / Escape
   - Skipped entirely for reduced-motion visitors
   - A hard 6s safety timeout means it can never trap anyone
   Remove this component from App.jsx if you prefer no intro at all.
   ========================================================================= */

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion.js";
import { site } from "../data/site.js";

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);

  /* --- hold the page still while the intro plays ---------------------- */
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  /* --- reduced motion: reveal the site immediately, no animation ------ */
  useEffect(() => {
    if (prefersReducedMotion()) onDone();
  }, [onDone]);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const counter = { value: 0 };
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      onDone();
    };

    // Absolute safety net: the site must always become usable.
    const safety = window.setTimeout(finish, 6000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: finish,
      });

      tl.from("[data-pl-mono]", {
        opacity: 0,
        y: 14,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          "[data-pl-word]",
          { opacity: 0, y: 18, duration: 0.7, stagger: 0.06 },
          "-=0.3"
        )
        .to(
          counter,
          {
            value: 100,
            duration: 1,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = `${Math.round(counter.value)}`;
              }
            },
          },
          "-=0.15"
        )
        .to(barRef.current, { scaleX: 1, duration: 1, ease: "power2.inOut" }, "<")
        .to(
          "[data-pl-inner]",
          { opacity: 0, y: -10, duration: 0.35, ease: "power2.in" },
          "+=0.05"
        )
        .to(
          rootRef.current,
          { yPercent: -100, duration: 0.75, ease: "power3.inOut" },
          "-=0.05"
        );

      // --- skip control ------------------------------------------------
      const skip = () => tl.timeScale(7);
      const root = rootRef.current;
      root.addEventListener("click", skip);

      const onKey = (e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") skip();
      };
      window.addEventListener("keydown", onKey);

      return () => {
        root.removeEventListener("click", skip);
        window.removeEventListener("keydown", onKey);
      };
    }, rootRef);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
    };
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] grid place-items-center bg-canvas"
    >
      <div data-pl-inner className="w-[min(84vw,460px)] text-center">
        {/* monogram */}
        <span
          data-pl-mono
          className="mx-auto grid h-14 w-14 place-items-center border border-line font-display text-lg font-semibold text-charcoal"
        >
          {site.monogram}
        </span>

        {/* wordmark */}
        <p className="mt-7 flex flex-wrap justify-center gap-x-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-slate">
          {site.brandName.split(" ").map((word) => (
            <span key={word} data-pl-word className="inline-block">
              {word}
            </span>
          ))}
        </p>

        {/* progress rule + counter */}
        <div className="mt-8">
          <div className="h-px w-full bg-line">
            <span
              ref={barRef}
              aria-hidden="true"
              className="block h-px w-full origin-left scale-x-0 bg-cobalt"
            />
          </div>
          <p className="mt-3 flex items-center justify-between font-mono text-[0.68rem] text-mist">
            <span>Preparing portfolio</span>
            <span className="text-charcoal">
              <span ref={countRef}>0</span>%
            </span>
          </p>
        </div>
      </div>

      <p className="kicker absolute bottom-8">Click or press Enter to skip</p>
    </div>
  );
}
