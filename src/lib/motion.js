/* =========================================================================
   MOTION — shared GSAP setup + the reveal system used by every section.

   HOW TO USE IT (no GSAP knowledge required):
   1. Add `data-reveal` to any element that should fade/slide in on scroll.
   2. Add `data-stagger` to a container to animate its children as a group —
      the children need `data-reveal-child`.
   3. Optional: `data-reveal-y="60"` to change how far it travels.
   4. Call initReveals(ref.current) inside a useEffect and return its revert.

   Safety rules implemented here:
   - Animations only run when the visitor has NO reduced-motion preference.
   - `fromTo` tweens always finish in the visible state.
   - A 2.5s failsafe reveals anything already on screen.
   - If setup throws, everything is reverted so no content stays hidden.
   ========================================================================= */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** True when the visitor has asked for less motion. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Animates every [data-reveal] / [data-stagger] element inside `scope`.
 *
 * @param {HTMLElement} scope - usually ref.current
 * @param {{start?: string}} options - ScrollTrigger start position
 * @returns {{ revert: () => void }} cleanup handle
 */
export function initReveals(scope, { start = "top 88%" } = {}) {
  if (!scope) return { revert: () => {} };

  const mm = gsap.matchMedia();
  let ctx = null;

  const FROM = { opacity: 0, y: 40 };
  const TO = {
    opacity: 1,
    y: 0,
    duration: 0.95,
    ease: "power3.out",
    overwrite: "auto",
  };

  try {
    ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // --- grouped staggers -------------------------------------------
        scope.querySelectorAll("[data-stagger]").forEach((group) => {
          const children = group.querySelectorAll("[data-reveal-child]");
          if (!children.length) return;
          gsap.fromTo(
            children,
            { ...FROM, y: Number(group.dataset.revealY) || 40 },
            {
              ...TO,
              stagger: 0.085,
              scrollTrigger: {
                trigger: group,
                start,
                once: true,
                toggleActions: "play none none none",
              },
            }
          );
        });

        // --- single reveals (not inside a [data-stagger] container) -----
        [...scope.querySelectorAll("[data-reveal]")]
          .filter((el) => !el.closest("[data-stagger]"))
          .forEach((el) => {
            gsap.fromTo(
              el,
              { ...FROM, y: Number(el.dataset.revealY) || 40 },
              {
                ...TO,
                duration: 1,
                scrollTrigger: {
                  trigger: el,
                  start,
                  once: true,
                  toggleActions: "play none none none",
                },
              }
            );
          });
      });
    }, scope);
  } catch (error) {
    // If animation setup fails, undo everything so content stays visible.
    console.warn("[motion] reveal setup failed, content left visible:", error);
    mm.revert();
    return { revert: () => {} };
  }

  // Recalculate positions once fonts and images settle (avoids stale triggers).
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);
  const timeout = window.setTimeout(refresh, 900);

  // Last-resort guarantee: after 2.5s nothing on screen may remain invisible.
  const failsafe = window.setTimeout(() => {
    scope.querySelectorAll("[data-reveal], [data-reveal-child]").forEach((el) => {
      if (!el.style.opacity || Number(el.style.opacity) === 0) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          gsap.set(el, { opacity: 1, y: 0 });
        }
      }
    });
  }, 2500);

  return {
    revert: () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timeout);
      window.clearTimeout(failsafe);
      mm.revert();
      ctx?.revert();
    },
  };
}
