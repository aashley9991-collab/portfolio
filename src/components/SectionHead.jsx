/* =========================================================================
   SECTION HEAD — consistent editorial header for every section.
   Layout: index numeral + label + hairline rule, then a display title and
   an optional lede paragraph.
   ========================================================================= */

export default function SectionHead({ index, label, title, lede, align = "left" }) {
  return (
    <header data-reveal className={align === "center" ? "text-center" : ""}>
      <div
        className={
          "flex items-center gap-4 " + (align === "center" ? "justify-center" : "")
        }
      >
        <span className="numeral">{index}</span>
        <span className="kicker">{label}</span>
        {align === "left" && <span className="rule-fade" aria-hidden="true" />}
      </div>

      <h2
        className={
          "display mt-6 text-[clamp(1.9rem,4.4vw,3.3rem)] text-charcoal " +
          (align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl")
        }
      >
        {title}
      </h2>

      {lede && (
        <p
          className={
            "lede mt-5 " + (align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl")
          }
        >
          {lede}
        </p>
      )}
    </header>
  );
}
