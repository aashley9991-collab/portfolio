/* =========================================================================
   FOOTER — quiet, consistent close to the page.
   Includes the identity block, quick links, working email link, verified
   social links (only when present) and a scroll-progress back-to-top control.
   ========================================================================= */

import { useEffect, useRef } from "react";
import { initReveals, prefersReducedMotion } from "../lib/motion.js";
import { navigation, site } from "../data/site.js";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);

  /* --- reveal ---------------------------------------------------------- */
  useEffect(() => {
    const reveals = initReveals(rootRef.current, { start: "top 94%" });
    return () => reveals.revert();
  }, []);

  /* --- scroll-progress ring + show/hide (direct DOM writes, no re-render) */
  useEffect(() => {
    const CIRCUMFERENCE = 2 * Math.PI * 25;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;

      if (ringRef.current) {
        ringRef.current.style.strokeDasharray = `${CIRCUMFERENCE}`;
        ringRef.current.style.strokeDashoffset = `${CIRCUMFERENCE * (1 - progress)}`;
      }

      if (wrapRef.current && btnRef.current) {
        const show = window.scrollY > 480;
        wrapRef.current.style.opacity = show ? "1" : "0";
        wrapRef.current.style.transform = show ? "translateY(0)" : "translateY(12px)";
        wrapRef.current.style.pointerEvents = show ? "auto" : "none";
        btnRef.current.tabIndex = show ? 0 : -1;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <>
      {/* ---------------- back to top ---------------- */}
      <div
        ref={wrapRef}
        className="fixed bottom-6 right-5 z-[80] opacity-0 transition-all duration-500 ease-out sm:bottom-8 sm:right-8"
      >
        <button
          ref={btnRef}
          type="button"
          onClick={scrollToTop}
          tabIndex={-1}
          className="group relative grid h-13 w-13 place-items-center rounded-full border border-line bg-paper shadow-[0_10px_28px_-16px_rgba(27,29,34,0.4)] transition-colors duration-300 hover:border-cobalt"
        >
          <span className="sr-only">Back to top</span>
          <ArrowUp
            size={17}
            aria-hidden="true"
            className="text-charcoal transition-transform duration-300 group-hover:-translate-y-0.5"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 58 58"
            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
          >
            <circle
              ref={ringRef}
              cx="29"
              cy="29"
              r="25"
              fill="none"
              stroke="#2f4ac7"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* ---------------- footer ---------------- */}
      <footer ref={rootRef} className="border-t border-line bg-canvas-alt">
        <div className="shell-wide pb-10 pt-16">
          <div className="grid gap-10 md:grid-cols-12">
            {/* identity */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center border border-line font-display text-[0.8rem] font-semibold text-charcoal">
                  {site.monogram}
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-charcoal">
                  {site.brandName}
                </span>
              </div>

              <p className="mt-5 text-[0.95rem] text-slate">{site.title}</p>
              <p className="mt-1 text-[0.95rem] text-slate">{site.location}</p>
              <p className="mt-5 font-display text-[1.05rem] italic text-cobalt">
                “{site.signature}”
              </p>
            </div>

            {/* navigate */}
            <nav aria-label="Footer" className="md:col-span-3">
              <h2 className="kicker">Navigate</h2>
              <ul className="mt-4 space-y-2.5">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="ulink text-[0.92rem] text-charcoal transition-colors duration-300 hover:text-cobalt"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* contact + socials */}
            <div className="md:col-span-4">
              <h2 className="kicker">Contact</h2>
              <a
                href={`mailto:${site.email}`}
                className="ulink mt-4 inline-block break-all text-[0.98rem] font-medium text-charcoal"
              >
                {site.email}
              </a>

              {site.socials.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {site.socials.map((social) => (
                    <li key={social.url}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-md border border-line px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-charcoal transition-colors duration-300 hover:border-cobalt hover:text-cobalt"
                      >
                        {social.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {site.socials.length === 0 && (
                <p className="mt-5 font-mono text-[0.7rem] leading-relaxed text-mist">
                  Social links appear here once verified profiles are added to
                  src/data/site.js — no unverified accounts are listed.
                </p>
              )}
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[0.7rem] tracking-[0.06em] text-mist">
              © 2026 {site.fullName}. All rights reserved.
            </p>
            <a
              href="#top"
              className="kicker transition-colors duration-300 hover:text-charcoal"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
