/* =========================================================================
   PROJECT DATA — Selected Work and the Featured Case Study read from here.
   Add, edit or delete entries; the gallery component needs no changes.

   ⚠ INTEGRITY NOTE
   Every entry below is a clearly labelled SAMPLE (`sample: true`), because no
   real project assets were supplied. Replace them with your own work:
     1. Put your image/video in  public/images  /  public/videos
     2. Copy an entry and update the fields
     3. Set `sample: false` for work you actually made
   Never publish a sample entry as completed client work.
   ========================================================================= */

export const categories = [
  "All Work",
  "Face Filters",
  "AR Effects",
  "World Experiences",
  "Interactive Experiments",
  "Brand Campaigns",
];

export const projects = [
  {
    id: "work-01",
    title: "Luminous Veil",
    category: "Face Filters",
    platform: "Face camera",
    /* Short summary shown on the card */
    description:
      "A translucent veil of layered planes that folds across the face and shifts colour as the head turns.",
    /* Structured case-study fields shown in the detail panel */
    objective:
      "Create a wearable effect that reads as fabric while being built entirely from light.",
    contribution:
      "Concept, visual direction, 3D and material design, lens build and on-device testing.",
    tools: ["Lens Studio", "Blender"],
    image: "/images/work-01.svg",
    alt: "Sample composition: a violet veil of translucent planes folding across a tracked face",
    ratio: "4 / 5",
    video: null, // e.g. "/videos/work-01-preview.mp4"
    link: null, // live lens URL, e.g. "https://www.snapchat.com/lens/..."
    qrImage: null, // e.g. "/images/work-01-qr.png"
    featured: false,
    sample: true,
  },
  {
    id: "work-02",
    title: "Nightline District",
    category: "World Experiences",
    platform: "Rear camera",
    description:
      "A night-city overlay that draws reactive light ribbons along real streets as the camera moves.",
    objective:
      "Turn an ordinary street into a stylised environment without hiding the world behind it.",
    contribution: "Concept, environment design, lighting and world-tracking implementation.",
    tools: ["Lens Studio"],
    image: "/images/work-02.svg",
    alt: "Sample composition: perspective light ribbons drawn over a night street",
    ratio: "16 / 10",
    video: null,
    link: null,
    qrImage: null,
    featured: false,
    sample: true,
  },
  {
    id: "work-03",
    title: "Signal Bloom",
    category: "Interactive Experiments",
    platform: "Face camera",
    description:
      "Particles bloom outward from facial landmarks and decay on a timed rhythm, like a signal being read.",
    objective:
      "Test how expressive a minimal particle system can feel when it is driven directly by expression.",
    contribution: "Concept, particle system design, timing study and performance testing.",
    tools: ["Lens Studio"],
    image: "/images/work-03.svg",
    alt: "Sample composition: a radial particle field blooming around facial landmark points",
    ratio: "16 / 10",
    video: null,
    link: null,
    qrImage: null,
    featured: false,
    sample: true,
  },
  {
    id: "work-04",
    title: "Paper Orbit",
    category: "AR Effects",
    platform: "World camera",
    description:
      "Low-poly forms orbit the camera on soft springs, folding and unfolding like paper in zero gravity.",
    objective:
      "Explore physical, spring-based motion as the primary expressive language of an effect.",
    contribution: "3D modelling, motion system design, material study and lens assembly.",
    tools: ["Lens Studio", "Blender"],
    image: "/images/work-04.svg",
    alt: "Sample composition: low-poly geometric forms orbiting a central point",
    ratio: "4 / 5",
    video: null,
    link: null,
    qrImage: null,
    featured: false,
    sample: true,
  },
  {
    id: "work-05",
    title: "Horizon Grid",
    category: "World Experiences",
    platform: "Rear camera",
    description:
      "A wireframe grid that snaps to the horizon and drifts with the phone, turning surroundings into a map.",
    objective:
      "Give a world-tracking effect a clear sense of place using the horizon as an anchor.",
    contribution: "Concept, spatial design, tracking behaviour and visual polish.",
    tools: ["Lens Studio"],
    image: "/images/work-05.svg",
    alt: "Sample composition: a wireframe perspective grid meeting a glowing horizon line",
    ratio: "16 / 10",
    video: null,
    link: null,
    qrImage: null,
    featured: false,
    sample: true,
  },
  {
    id: "work-06",
    title: "Launch Frame",
    category: "Brand Campaigns",
    platform: "Face camera",
    description:
      "A concept campaign frame: typographic borders, motion type and a product reveal timed to a single moment.",
    objective:
      "Show how a short, well-timed reveal can carry a campaign message inside a shareable format.",
    contribution: "Creative concept, typography, motion design and lens build.",
    tools: ["Lens Studio", "Adobe After Effects"],
    image: "/images/work-06.svg",
    alt: "Sample composition: an editorial typographic frame designed for a campaign reveal",
    ratio: "16 / 10",
    video: null,
    link: null,
    qrImage: null,
    featured: false,
    sample: true,
  },
];

/* ------------------------------------------------ FEATURED CASE STUDY */
/* This is the long-form case study (section 04). Every text field is sample
   content and should be rewritten in your own words for a real project. */

export const caseStudy = {
  title: "Luminous Veil",
  category: "Face Filter",
  subtitle:
    "A wearable study in light — designing a face-tracked effect where colour behaves like fabric.",
  hero: "/images/featured-project.svg",
  heroAlt:
    "Sample case study hero image: a layered violet veil rendered over a tracked face mesh",
  meta: [
    { label: "Type", value: "Face-tracked AR lens" },
    { label: "Contribution", value: "Concept, design, build" },
    { label: "Platform", value: "Face camera" },
    { label: "Stage", value: "Sample project" },
  ],
  chapters: [
    {
      n: "01",
      title: "Project overview",
      text: "Luminous Veil is a face-tracked lens built around a single idea: colour as a material you can wear. The effect layers translucent planes across the face so the surface appears to fold and catch light, even though it is generated entirely in real time. The piece was designed as a focused study — one strong visual behaviour, executed cleanly.",
    },
    {
      n: "02",
      title: "Creative challenge",
      text: "Transparency is difficult on a phone screen. Layered planes can quickly turn muddy, lose depth, or fight with the face underneath. The challenge was to keep the veil readable and elegant in bright daylight, on a small display, and while the person is moving — without hiding the face or relying on effects that only work in controlled conditions.",
    },
    {
      n: "03",
      title: "Concept & visual direction",
      text: "The visual language borrows from fabric, stained glass and long-exposure photography. A restrained palette keeps the effect deliberate: one dominant violet, a cool highlight for the fold lines, and neutrals for everything else. Rather than filling the frame, the veil occupies a band across the face so the person always remains the subject of the composition.",
    },
    {
      n: "04",
      title: "Design & development process",
      text: "I began by blocking the fold planes in 3D and testing how they read against a moving surface. From there I built the material set, then wired the planes to head rotation so the fold responds to movement rather than looping on a timer. Each pass was reviewed on a real device in daylight, and material opacity was adjusted until the effect held up outside the studio.",
    },
    {
      n: "05",
      title: "Interaction details",
      text: "The interaction is intentionally minimal. Head rotation drives the fold; expression shifts the spectrum slightly across the surface. Movement changes the piece and stillness lets it settle, so the experience rewards small, natural gestures instead of demanding specific poses. Tracking noise is smoothed so the effect never feels jittery on screen.",
    },
    {
      n: "06",
      title: "Outcome",
      text: "The finished effect is a short, calm, repeatable moment — the kind of lens someone tries once, then immediately wants to record. It demonstrates the core skill set behind my practice: designing a visual system and the interaction that drives it as one decision rather than two.",
    },
  ],
  tools: ["Lens Studio", "Blender"],
  link: null, // add a live lens URL to enable the "Open experience" button
  qrImage: null, // add "/images/featured-qr.png" to show a scan-to-open QR code
  video: null, // optional "/videos/featured-preview.mp4"
  sample: true,
};
