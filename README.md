# UBEDAH ADNAN — AR Lens Creator Portfolio

A premium single-page portfolio for **Ubedah Adnan**, AR Lens Creator & Digital Experience Designer (Karachi, Pakistan).

> **I Turn Creative Ideas Into Immersive AR Experiences.**

Built with **React 19 + Vite 8 + Tailwind CSS v4 + GSAP 3 (ScrollTrigger) + Lucide React**.

The visual direction is editorial and light: warm ivory surfaces, deep charcoal typography,
and a single restrained cobalt accent, with one dark section reserved for the featured case
study. Motion is subtle and purposeful throughout.

---

## 1. What's in the project

```
ub portfolio/
├─ index.html                  # Page shell, SEO + social-share meta tags, fonts
├─ vite.config.js              # Vite + React + Tailwind v4 plugin
├─ package.json                # Scripts and dependencies
├─ public/                     # Files served as-is (your assets live here)
│  ├─ favicon.svg              # "UA" monogram favicon
│  └─ images/
│     ├─ work-01.svg … work-06.svg   # 6 sample project artworks (SVG)
│     └─ featured-project.svg        # Featured case-study artwork
└─ src/
   ├─ main.jsx                 # React entry point (renders <App/>)
   ├─ App.jsx                  # Page composition + preloader state
   ├─ index.css                # Design tokens, layout classes, animations
   ├─ data/
   │  ├─ site.js               # ⭐ All text: identity, about, expertise, process
   │  └─ projects.js           # ⭐ All projects + the featured case study
   ├─ lib/
   │  └─ motion.js             # GSAP setup + the shared scroll-reveal system
   └─ components/
      ├─ Preloader.jsx         # Short intro (UA monogram + % counter)
      ├─ Navbar.jsx            # Sticky nav, scroll-spy, overlay menu
      ├─ Hero.jsx              # Editorial split hero + animation timeline
      ├─ HeroVisual.jsx        # Original AR lens artwork (SVG, no WebGL)
      ├─ SectionHead.jsx       # Shared section header (index/label/title)
      ├─ SelectedWork.jsx      # ⭐ Project gallery + category filters
      ├─ ProjectCard.jsx       # One project card (click/keyboard details)
      ├─ CaseStudy.jsx         # Featured project, dark section
      ├─ About.jsx             # Biography, philosophy, milestones
      ├─ Expertise.jsx         # Three capability groups + software
      ├─ Process.jsx           # Six-stage creative workflow
      ├─ Contact.jsx           # Identity panel + accessible form
      └─ Footer.jsx            # Signature, links, back-to-top progress ring
```

**Where to edit what**

| I want to change… | Edit this file |
| --- | --- |
| Name, email, location, headline, socials | `src/data/site.js` |
| About paragraphs, philosophy, approach, milestones | `src/data/site.js` |
| Expertise groups + software list | `src/data/site.js` |
| Process steps, project-type dropdown options | `src/data/site.js` |
| Projects, categories, featured case study | `src/data/projects.js` |
| Images / videos / QR codes | `public/images/`, `public/videos/` |
| Colors, fonts, spacing, easing | `src/index.css` (the `@theme` block) |

---

## 2. Run it (Windows, from scratch)

Open **PowerShell** in the folder that *contains* your project, then:

```powershell
# 1. Create the project (skip this — the project already exists)
npm create vite@latest "ub portfolio" -- --template react
cd "ub portfolio"

# 2. Install everything
npm install
npm install gsap lucide-react
npm install -D tailwindcss @tailwindcss/vite

# 3. Start the development server
npm run dev
```

Then open the URL printed in the terminal — normally **http://localhost:5173**.

Other commands:

```powershell
npm run build     # production build → creates the dist/ folder
npm run preview   # preview the built site locally
npm run lint      # check the code for mistakes
```

> **Why Tailwind v4 is configured this way:** Tailwind v4 uses a Vite plugin and a CSS-first
> configuration — there is **no `tailwind.config.js`**. All design tokens live in the
> `@theme { … }` block at the top of `src/index.css`. Do not follow older v3 tutorials that
> tell you to create a config file or use `@tailwind base;` directives.

---

## 3. Design system

Everything is controlled by tokens in `src/index.css`:

| Token | Value | Used for |
| --- | --- | --- |
| `--color-canvas` / `--color-canvas-alt` | `#f7f4ee` / `#efeae0` | Warm ivory page + alternating bands |
| `--color-paper` | `#fffdf9` | Cards and raised panels |
| `--color-ink` / `--color-ink-soft` | `#14161c` / `#1c1f27` | Dark project sections |
| `--color-charcoal` | `#1b1d22` | Primary text on light surfaces |
| `--color-slate` | `#5d6068` | Secondary text on light surfaces |
| `--color-onink` / `--color-onink-soft` | `#f3f0ea` / `#a9a7a0` | Text on the dark section |
| `--color-cobalt` | `#2f4ac7` | **The single accent** (one restrained cobalt) |
| `--color-clay` | `#b4724a` | Rare warm counterpoint (index numerals, pins) |
| `--font-display` | Fraunces | Editorial headings (high-contrast serif) |
| `--font-sans` | Inter | Body copy |
| `--font-mono` | IBM Plex Mono | Labels, kickers, meta text |

Reusable classes: `.shell` (page width), `.section` (vertical rhythm), `.kicker` (mono label),
`.display` (display heading), `.frame` (AR corner brackets), `.rule` (hairline),
`.btn` / `.btn-primary` / `.btn-outline`, `.field` (form inputs), `.ulink` (animated underline).

Because tokens are in `@theme`, they automatically become utilities: `bg-paper`, `text-charcoal`,
`text-cobalt`, `border-line`, `font-display`, …

Add `on-dark` to a section wrapper (see `CaseStudy.jsx`) and the `.card`, `.kicker`, `.rule`
and button classes automatically switch to their light-on-dark variants.

---

## 4. Replacing the sample assets with your real work

> Every project currently in the site is clearly labelled **Sample**. None of it is real client
> work — it exists only to demonstrate the layout.

### 4a. Add a project

1. Copy your artwork into `public/images/` using descriptive names, e.g.
   `public/images/lens-aurora.webp` (WebP or AVIF keeps the site fast).
2. Optionally add a short muted preview loop: `public/videos/lens-aurora-preview.mp4`
   (square or 16:10, **under ~3 MB**, no audio track).
3. Open `src/data/projects.js` and add an entry:

```js
{
  id: "lens-aurora",
  title: "Aurora Bloom",
  category: "Face Filters",          // must match one in `categories`
  platform: "Face camera",
  description: "Short summary shown on the card.",
  objective: "What the piece was trying to achieve.",
  contribution: "What you personally did on it.",
  tools: ["Lens Studio"],
  image: "/images/lens-aurora.webp",
  alt: "Describe the artwork for screen readers and search engines",
  ratio: "4 / 5",                    // any CSS aspect ratio, e.g. "16 / 10"
  link: "https://www.snapchat.com/lens/…",  // live lens URL, or null
  video: "/videos/lens-aurora-preview.mp4", // or null
  qrImage: "/images/lens-aurora-qr.png",    // or null
  featured: false,
  sample: false,                     // false = work you actually made
}
```

`sample: true` prints a visible **“Sample”** badge. Set it to `false` (or delete the line)
only for work you actually made — the site should never present sample content as client work.

4. Delete the six placeholder entries (`work-01` … `work-06`) and their SVG files once your
   own projects are in, using `Remove-Item public\images\work-0*.svg` if you like.

### 4b. Add a live lens link and QR code

- `link` — paste the public lens URL. An **Open experience** button appears and is labelled for
  screen readers as opening in a new tab.
- `qrImage` — generate a QR code for that URL (any free QR generator), save it as PNG in
  `public/images/`, and point `qrImage` at it. It renders in the card details and in the case
  study as “Scan to open”.
- If `link` is `null`, the interface shows a labelled instruction instead of a dead button —
  the site never has fake controls.

### 4c. Categories

Edit the `categories` array at the top of `src/data/projects.js`. The **first** entry is
always the “show everything” filter. Adding a category that has no projects produces a
friendly empty state (see `SelectedWork.jsx`), never a broken grid.

### 4d. Your portrait

In `src/data/site.js`:

```js
portrait: "/images/portrait.webp",
portraitAlt: "Ubedah Adnan in her creative workspace",
```

Leave `portrait: null` to keep the clearly-labelled placeholder frame.

### 4e. Social links

In `src/data/site.js`, add only profiles you own:

```js
socials: [
  { label: "Instagram", url: "https://instagram.com/your-handle" },
],
```

The footer prints nothing until at least one verified link exists.

---

## 5. How the motion system works

`src/lib/motion.js` exposes:

- `gsap`, `ScrollTrigger` — pre-configured and registered once.
- `prefersReducedMotion()` — returns `true` when the visitor asks for less motion.
- `initReveals(scopeRef, { start })` — finds every `[data-reveal]` and `[data-stagger]`
  element inside a section and animates it in on scroll.

So adding a reveal to any element is a one-line job:

```jsx
<p data-reveal>Fades up when scrolled into view.</p>

<div data-stagger>
  <div data-reveal-child>One</div>
  <div data-reveal-child>Two</div>
</div>
```

And in the component:

```jsx
useEffect(() => {
  const reveals = initReveals(rootRef.current);
  return () => reveals.revert();   // always clean up
}, []);
```

Rules the codebase follows everywhere:

1. `useRef` for DOM access — never `document.getElementById` inside animations.
2. `gsap.context(..., scope)` so selectors stay inside the component.
3. Every effect returns its cleanup (`ctx.revert()`, `reveals.revert()`, ScrollTrigger kill).
4. `gsap.matchMedia()` is used when behavior differs under reduced motion.
5. Only `transform` and `opacity` are animated (no layout thrash).
6. No scroll hijacking — native scrolling is untouched.
7. Content is **visible by default**; GSAP only hides it while animating, and failures revert.
8. Dynamic content (gallery filtering) animates *without* ScrollTrigger so no stale triggers
   are left behind. `ScrollTrigger.refresh()` runs after fonts/images settle.

---

## 6. Accessibility notes

- Skip-to-content link, semantic landmarks (`header`, `main`, `footer`, `nav`), and one `h1`.
- Visible focus ring on every interactive element (`:focus-visible`).
- The overlay menu locks scroll, closes on <kbd>Esc</kbd>, keeps <kbd>Tab</kbd> inside itself,
  and returns focus to its toggle.
- Project details open on click **and** keyboard (native `<details>`), never hover-only.
- The gallery filter group uses `aria-pressed`; the grid announces changes politely.
- Form errors are linked with `aria-describedby` and announced via `role="alert"`.
- The back-to-top button is removed from the tab order while hidden (`tabIndex="-1"`).
- All motion is disabled under `prefers-reduced-motion: reduce`.

---

## 7. Testing checklist

- [ ] `npm run dev` starts with no errors in the terminal or browser console.
- [ ] `npm run build` completes successfully.
- [ ] Preloader finishes on its own; clicking or pressing <kbd>Enter</kbd> skips it.
- [ ] With reduced motion on (Windows: *Settings → Accessibility → Visual effects → Animation
      effects off*), the site loads instantly and everything is visible.
- [ ] Nav links jump to Work, About, Expertise, Process and Contact; the active link highlights.
- [ ] Overlay menu opens on mobile, closes on <kbd>Esc</kbd>, and focus returns to the toggle.
- [ ] Every project filter shows the right number of cards; a category with no projects
      shows the empty state and its “Show all work” button works.
- [ ] Each card’s “Project details” opens by click and by <kbd>Enter</kbd>, and shows the
      objective, contribution and tools.
- [ ] Contact form: submitting empty shows errors and focuses the first problem field;
      valid input shows the honest “not sent” state with a working **Open in email app** link.
- [ ] `ubedahadnan@gmail.com` opens your mail client from the header, About, Contact and Footer.
- [ ] No horizontal scrolling at 320 px, 768 px, 1024 px and 1440 px wide.
- [ ] Images show alt text; offscreen images lazy-load.

**Troubleshooting**

| Symptom | Fix |
| --- | --- |
| `Unknown at rule @theme` or `@import "tailwindcss"` error | Tailwind v4 plugin missing from `vite.config.js`. |
| Styles missing entirely | Make sure `import "./index.css"` is the first line of `src/main.jsx`. |
| Images 404 | Files go in `public/images/…` and are referenced as `/images/…` (no `public` in the path). |
| A card is invisible | It's inside `[data-stagger]`, so add `data-reveal-child` to it (or remove `data-stagger` from the parent). |
| Text is unreadable in the dark section | Add `on-dark` to that section's wrapper so the light-on-dark variants apply. |
| Scroll animations feel off after resizing | Already handled — `ScrollTrigger.refresh()` runs on window load and after a 900 ms settle. |

---

## 8. Deploying

### Vercel

1. Push the project to GitHub (or drag the folder into vercel.com/new).
2. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
3. Deploy, then open `index.html` and replace `/images/og-image.png` with your **full**
   domain URL (e.g. `https://ubedah-adnan.vercel.app/images/og-image.png`) so link
   previews work on social platforms.

### Netlify

1. New site from Git, or drag-and-drop the `dist/` folder after `npm run build`.
2. Build command: `npm run build`. Publish directory: `dist`.
3. Add the same absolute OG image URL as above.

### Custom domain

Point your domain at the host, then update `og:image` / `twitter:image` in `index.html`
to the final HTTPS URL, and add the domain to `og:url` for clean sharing.

---

## 9. Content integrity

This site ships with **no invented credentials**: no fake awards, clients, testimonials
or job history. The milestones, the portrait frame, the software list and all six gallery
projects plus the featured case study are visibly labelled sample content. Replace them with
your real work, set `sample: false`, and keep the software list limited to tools you genuinely
use.

© 2026 Ubedah Adnan. All rights reserved.
