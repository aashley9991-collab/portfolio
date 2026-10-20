/* =========================================================================
   EXPERTISE — capabilities presented in three structured groups
   (AR Development, Visual Design, Creative Experience).

   Deliberately NO proficiency percentages or skill bars: those are
   unfalsifiable. Each item is a short, concrete description of what the
   capability actually means in practice.

   Data lives in src/data/site.js → expertiseGroups.
   ========================================================================= */

import { useEffect, useRef } from "react";
import { initReveals } from "../lib/motion.js";
import { expertiseGroups, software } from "../data/site.js";
import SectionHead from "./SectionHead.jsx";
import { Check } from "lucide-react";

export default function Expertise() {
  const rootRef = useRef(null);

  useEffect(() => {
    const reveals = initReveals(rootRef.current);
    return () => reveals.revert();
  }, []);

  return (
    <section id="expertise" ref={rootRef} className="section border-t border-line">
      <div className="shell-wide">
        <SectionHead
          index="04"
          label="Expertise"
          title="What I actually do, described plainly."
          lede="The work spans visual design and technical implementation. These are the three areas where that range shows up, and what each one means in practice."
        />

        {/* ---------------- three expertise groups ---------------- */}
        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {expertiseGroups.map((group) => (
            <div key={group.id} data-reveal className="flex flex-col">
              <div className="border-t border-charcoal pt-5">
                <h3 className="font-display text-[1.35rem] font-semibold text-charcoal">
                  {group.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-slate">{group.summary}</p>
              </div>

              <ul data-stagger className="mt-7 space-y-6">
                {group.items.map((item) => (
                  <li key={item.title} data-reveal-child className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cobalt-wash"
                    >
                      <Check size={11} strokeWidth={3} className="text-cobalt" />
                    </span>
                    <div>
                      <h4 className="text-[0.97rem] font-semibold text-charcoal">{item.title}</h4>
                      <p className="mt-1 text-[0.9rem] leading-relaxed text-slate">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ---------------- software ---------------- */}
        <div
          data-reveal
          className="mt-16 flex flex-col gap-5 rounded-[10px] border border-line bg-paper p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <h3 className="kicker">Software I work in</h3>
            <p className="mt-2 max-w-md text-[0.88rem] leading-relaxed text-slate">
              Kept deliberately short and editable — only tools used regularly are listed here.
            </p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {software.map((tool) => (
              <li
                key={tool}
                className="rounded-md border border-line px-3.5 py-2 font-mono text-[0.72rem] text-charcoal"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
