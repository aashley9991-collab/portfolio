/* =========================================================================
   SELECTED WORK — the portfolio showcase.
   - Category filtering with smooth, accessible transitions
   - Refined grid with varied project compositions
   - Every project's information is available WITHOUT hover:
     the detail panel is always visible on the card (see ProjectCard)
   - Sample entries are labelled so nothing is misrepresented

   Data lives in src/data/projects.js — edit that file, not this one.
   ========================================================================= */

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, initReveals, prefersReducedMotion } from "../lib/motion.js";
import { categories, projects } from "../data/projects.js";
import SectionHead from "./SectionHead.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { ImageOff } from "lucide-react";

export default function SelectedWork() {
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const [active, setActive] = useState(categories[0]);

  const filtered = useMemo(
    () =>
      active === categories[0]
        ? projects
        : projects.filter((project) => project.category === active),
    [active]
  );

  const countFor = (category) =>
    category === categories[0]
      ? projects.length
      : projects.filter((project) => project.category === category).length;

  /* --- section reveals ------------------------------------------------- */
  useLayoutEffect(() => {
    const reveals = initReveals(rootRef.current);
    return () => reveals.revert();
  }, []);

  /* --- animate cards when the filter changes.
         Deliberately NOT ScrollTrigger-based: dynamic content animated with
         ScrollTrigger leaves stale triggers behind. ----------------------- */
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll("[data-work-card]");
      if (!cards.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.055,
          clearProps: "opacity,transform",
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <section id="work" ref={rootRef} className="section border-t border-line">
      <div className="shell-wide">
        <SectionHead
          index="01"
          label="Selected Work"
          title="A selection of lenses, effects and interactive experiments."
          lede="Each piece below represents a complete design problem — an idea, an interaction and a visual system resolved into something a person can use. Open any project to read the objective, the contribution and the tools involved."
        />

        {/* ---------------- filters ---------------- */}
        <div
          data-reveal
          className="mt-10 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => {
            const isActive = active === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={isActive}
                className={
                  "rounded-md border px-3.5 py-2 text-[0.82rem] font-medium transition-all duration-300 " +
                  (isActive
                    ? "border-cobalt bg-cobalt text-paper shadow-[0_1px_2px_rgba(33,54,143,0.18)]"
                    : "border-line bg-paper text-slate hover:border-charcoal hover:text-charcoal")
                }
              >
                {category}
                <span className={"ml-1.5 " + (isActive ? "text-paper/70" : "text-mist")}>
                  {String(countFor(category)).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------------- grid ---------------- */}
        {filtered.length > 0 ? (
          <div
            ref={gridRef}
            data-stagger
            className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12"
            aria-live="polite"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          /* ---------------- empty state ---------------- */
          <div
            data-reveal
            className="mt-12 rounded-[10px] border border-dashed border-line bg-paper px-6 py-16 text-center"
          >
            <ImageOff
              size={26}
              aria-hidden="true"
              className="mx-auto text-mist"
            />
            <p className="mt-4 font-display text-xl font-semibold text-charcoal">
              No projects published in this category yet
            </p>
            <p className="mx-auto mt-3 max-w-md text-[0.95rem] text-slate">
              Nothing currently sits under “{active}”. Add one in
              src/data/projects.js, or browse the full selection.
            </p>
            <button
              type="button"
              onClick={() => setActive(categories[0])}
              className="btn btn-outline btn-sm mt-6"
            >
              Show all work
            </button>
          </div>
        )}

        {/* ---------------- integrity note ---------------- */}
        <p data-reveal className="mt-10 font-mono text-[0.72rem] leading-relaxed text-mist">
          Entries marked “Sample project” are placeholder content supplied to demonstrate the
          layout. Replace them with your own work in src/data/projects.js and set
          {" "}<span className="text-slate">sample: false</span>.
        </p>
      </div>
    </section>
  );
}
