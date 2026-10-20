/* =========================================================================
   PROCESS — six-stage creative workflow as an editorial timeline.
   A thin cobalt rail fills as the reader scrolls (ScrollTrigger scrub);
   each stage reveals in sequence. Fully static under reduced motion.
   ========================================================================= */

import { useEffect, useRef } from "react";
import { gsap, initReveals, prefersReducedMotion, ScrollTrigger } from "../lib/motion.js";
import { processSteps } from "../data/site.js";
import SectionHead from "./SectionHead.jsx";

export default function Process() {
  const rootRef = useRef(null);
  const railRef = useRef(null);

  useEffect(() => {
    const reveals = initReveals(rootRef.current);
    if (prefersReducedMotion()) return () => reveals.revert();

    const ctx = gsap.context(() => {
      if (!railRef.current) return;
      gsap.fromTo(
        railRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: "[data-process-list]",
            start: "top 78%",
            end: "bottom 72%",
            scrub: 0.35,
          },
        }
      );
    }, rootRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      reveals.revert();
    };
  }, []);

  return (
    <section id="process" ref={rootRef} className="section border-t border-line bg-canvas-alt">
      <div className="shell-wide">
        <SectionHead
          index="05"
          label="Process"
          title="A working method, from idea to finished experience."
          lede="Every project moves through the same six stages. The sequence is deliberate — design decisions get made before implementation starts, so building stays fast and revision stays cheap."
        />

        <div data-process-list className="relative mt-14 pl-6 sm:pl-10">
          {/* rail */}
          <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-line" />
          <span
            ref={railRef}
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-cobalt"
          />

          <ol data-stagger>
            {processSteps.map((step) => (
              <li
                key={step.n}
                data-reveal-child
                className="group grid gap-3 border-t border-line py-8 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-8 md:py-9"
              >
                <div className="md:col-span-3">
                  <span className="numeral block transition-colors duration-300 group-hover:text-cobalt">
                    Stage {step.n}
                  </span>
                  <h3 className="mt-2 font-display text-[1.32rem] font-semibold leading-snug text-charcoal transition-colors duration-300 group-hover:text-cobalt">
                    {step.title}
                  </h3>
                </div>

                <div className="md:col-span-9">
                  <p className="max-w-2xl leading-relaxed text-slate">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
