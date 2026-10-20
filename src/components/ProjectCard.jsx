/* =========================================================================
   PROJECT CARD — one project in the Selected Work grid.
   The card is a real <details> element so the full case-study information
   (objective, contribution, tools) is reachable by click AND keyboard —
   never hover-only. On desktop the summary also expands on hover.

   Props: { project, index }
   ========================================================================= */

import { ArrowUpRight, Play, ScanLine } from "lucide-react";

export default function ProjectCard({ project, index }) {
  return (
    <article
      data-work-card
      data-reveal-child
      className="group flex flex-col overflow-hidden rounded-[10px] border border-line bg-paper transition-[border-color,box-shadow] duration-400 hover:border-cobalt/35 hover:shadow-[0_16px_44px_-24px_rgba(27,29,34,0.34)]"
    >
      {/* ---------------- cover media ---------------- */}
      <div className="media relative w-full" style={{ aspectRatio: project.ratio ?? "16 / 10" }}>
        <img
          src={project.image}
          alt={project.alt}
          width={1200}
          height={800}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />

        {/* optional muted preview video, revealed on hover/focus */}
        {project.video && (
          <video
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            <source src={project.video} type="video/mp4" />
          </video>
        )}

        {/* top meta row */}
        <div className="absolute inset-x-3.5 top-3.5 flex items-start justify-between gap-2">
          <span className="rounded-sm bg-paper/92 px-2.5 py-1.5 text-[0.68rem] font-medium tracking-[0.02em] text-charcoal backdrop-blur-sm">
            {project.category}
          </span>

          {project.sample && (
            <span className="rounded-sm border border-cobalt/40 bg-paper/92 px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-cobalt backdrop-blur-sm">
              Sample
            </span>
          )}
        </div>

        {/* hover hint only when a preview video exists */}
        {project.video && (
          <span className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 rounded-sm bg-paper/92 px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-charcoal backdrop-blur-sm">
            <Play size={11} aria-hidden="true" />
            Preview
          </span>
        )}
      </div>

      {/* ---------------- body ---------------- */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.28rem] font-semibold leading-snug text-charcoal">
            {project.title}
          </h3>
          <span className="numeral mt-0.5 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-2.5 text-[0.92rem] leading-relaxed text-slate">{project.description}</p>

        <p className="kicker mt-4 flex items-center gap-2">
          <ScanLine size={12} aria-hidden="true" />
          {project.platform}
        </p>

        {/* ---------------- expandable detail (click + keyboard) ---------- */}
        <details className="group/detail mt-5 border-t border-line-soft pt-4">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-[0.85rem] font-medium text-cobalt transition-colors duration-300 hover:text-cobalt-deep">
            <span className="group/detail:[[open]]:hidden">Project details</span>
            <span className="hidden group/detail:[[open]]:inline">Hide details</span>
            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group/detail:[[open]]:rotate-90"
            />
          </summary>

          <dl className="mt-4 space-y-4">
            <div>
              <dt className="kicker">Creative objective</dt>
              <dd className="mt-1 text-[0.9rem] leading-relaxed text-slate">{project.objective}</dd>
            </div>
            <div>
              <dt className="kicker">My contribution</dt>
              <dd className="mt-1 text-[0.9rem] leading-relaxed text-slate">
                {project.contribution}
              </dd>
            </div>
            {project.tools?.length > 0 && (
              <div>
                <dt className="kicker">Tools & techniques</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-sm border border-line px-2 py-1 font-mono text-[0.66rem] text-slate"
                    >
                      {tool}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>

          {/* links — only rendered when a real destination exists */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                Open experience
                <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <p className="font-mono text-[0.68rem] leading-relaxed text-mist">
                No live lens link yet — add <span className="text-slate">link</span> in
                src/data/projects.js
              </p>
            )}

            {project.qrImage && (
              <img
                src={project.qrImage}
                alt={`QR code to open the ${project.title} lens on a phone`}
                width={88}
                height={88}
                loading="lazy"
                className="h-20 w-20 rounded-sm border border-line bg-white p-1"
              />
            )}
          </div>
        </details>
      </div>
    </article>
  );
}
