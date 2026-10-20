/* =========================================================================
   NAVBAR — refined sticky header.
   - Wordmark + section links + understated collaboration CTA
   - Subtle background/border change on scroll
   - Responsive overlay menu with keyboard support (Escape closes,
     focus moves into the menu and returns to the toggle)
   - Scroll-spy highlights the section currently in view
   ========================================================================= */

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion.js";
import { navigation, site } from "../data/site.js";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const overlayRef = useRef(null);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);
  const wasOpen = useRef(false);

  /* --- header background/border after scrolling ------------------------ */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- scroll-spy ------------------------------------------------------ */
  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* --- lock scroll and close on Escape while the menu is open ---------- */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* --- focus the first menu link once the overlay has laid out ---------
         Two animation frames: the first lets React paint the overlay, the
         second lands after the browser has applied layout, so the focus call
         is not lost to the toggle button's own click-focus. --------------- */
  useEffect(() => {
    if (!open) return;
    let second = 0;
    const first = window.requestAnimationFrame(() => {
      second = window.requestAnimationFrame(() => firstLinkRef.current?.focus());
    });
    return () => {
      window.cancelAnimationFrame(first);
      window.cancelAnimationFrame(second);
    };
  }, [open]);

  /* --- keep Tab inside the overlay while it is open -------------------- */
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key !== "Tab" || !overlayRef.current) return;

      const focusables = overlayRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      // The header sits above the overlay, so the toggle stays reachable.
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        toggleRef.current?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* --- return focus to the toggle after the menu closes ---------------- */
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus();
    }
  }, [open]);

  /* --- menu entrance animation ---------------------------------------- */
  useEffect(() => {
    if (!open || prefersReducedMotion() || !overlayRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-menu-link]", {
        opacity: 0,
        y: 22,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.06,
      });
      gsap.from("[data-menu-meta]", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        delay: 0.25,
        ease: "power3.out",
      });
    }, overlayRef);
    return () => ctx.revert();
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-[90]">
      <div
        className={
          "relative z-10 transition-[background-color,border-color,box-shadow] duration-400 " +
          (scrolled && !open
            ? "border-b border-line bg-canvas/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent")
        }
      >
        <nav aria-label="Main navigation" className="shell-wide flex h-17 items-center justify-between sm:h-19">
          {/* wordmark */}
          <a
            href="#top"
            aria-label={`${site.fullName} — back to top`}
            className="group flex items-center gap-2.5"
          >
            <span className="grid h-8 w-8 place-items-center border border-line font-display text-[0.8rem] font-semibold text-charcoal transition-colors duration-300 group-hover:border-cobalt group-hover:text-cobalt">
              {site.monogram}
            </span>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-charcoal">
              {site.brandName}
            </span>
          </a>

          {/* desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={
                      "ulink text-[0.9rem] font-medium transition-colors duration-300 " +
                      (isActive ? "text-cobalt" : "text-slate hover:text-charcoal")
                    }
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a href="#contact" className="btn btn-primary btn-sm hidden lg:inline-flex">
              Let&apos;s collaborate
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="overlay-menu"
              className="grid h-10 w-10 place-items-center rounded-md border border-line text-charcoal transition-colors duration-300 hover:border-charcoal lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      {/* ---------- overlay menu (phone + tablet) ---------- */}
      {open && (
        <div
          id="overlay-menu"
          ref={overlayRef}
          className="fixed inset-0 z-0 flex flex-col bg-canvas pt-17 lg:hidden"
        >
          <div className="shell flex flex-1 flex-col justify-center">
            <ul>
              {navigation.map((item, i) => (
                <li key={item.href} className="border-b border-line-soft">
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={closeMenu}
                    data-menu-link
                    className="flex items-baseline justify-between py-5"
                  >
                    <span className="display text-[1.9rem] text-charcoal">{item.label}</span>
                    <span className="numeral">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div data-menu-meta className="mt-9 space-y-2">
              <p className="kicker">{site.location}</p>
              <a
                href={`mailto:${site.email}`}
                className="ulink block text-[0.95rem] font-medium text-charcoal"
              >
                {site.email}
              </a>
            </div>
          </div>

          <p className="kicker border-t border-line-soft px-6 py-5">{site.signature}</p>
        </div>
      )}
    </header>
  );
}
