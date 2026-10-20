/* =========================================================================
   SITE CONTENT — the single source of truth for identity and copy.
   EDIT EVERYTHING HERE to change text across the whole website.

   Integrity rule followed throughout: nothing in this file invents clients,
   awards, years of experience or performance statistics. Anything that is
   not yet supplied is either omitted or marked as a clearly editable sample.
   ========================================================================= */

export const site = {
  fullName: "Ubedah Adnan",
  brandName: "UBEDAH ADNAN",
  monogram: "UA",
  title: "AR Lens Creator & Digital Experience Designer",
  location: "Karachi, Pakistan",
  email: "ubedahadnan@gmail.com",

  /* --- hero --------------------------------------------------------- */
  heroHeadline: "I Turn Creative Ideas Into Immersive AR Experiences.",
  heroHeadlineEmphasis: "Immersive AR Experiences.",
  heroSupport:
    "Designing interactive lenses, expressive visual effects, and memorable digital experiences through the intersection of art and technology.",

  /* --- brand statements --------------------------------------------- */
  statement: "I Design Interactive Experiences Beyond the Screen.",
  support:
    "I create thoughtfully designed augmented reality experiences that combine visual storytelling, interaction, and digital creativity.",
  signature: "Designing experiences beyond the screen.",

  /* --- social links --------------------------------------------------
     Add ONLY profiles you own. The footer stays empty until at least one
     verified link is listed here. Example:
     { label: "Instagram", url: "https://instagram.com/your-handle" }      */
  socials: [],
};

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

/* ---------------------------------------------------------------- HERO */

// Small credibility strip under the hero. These are factual, verifiable
// statements about the work — not claims about scale or seniority.
export const heroFacts = [
  { label: "Practice", value: "AR lenses & interactive effects" },
  { label: "Platforms", value: "Face & world camera experiences" },
  { label: "Based in", value: "Karachi, Pakistan" },
];

/* ---------------------------------------------------------------- ABOUT */

export const about = {
  // Edit these paragraphs to describe your real story in your own words.
  bio: [
    "I'm Ubedah Adnan, an AR Lens Creator and Digital Experience Designer. I design and build augmented reality lenses, face filters and interactive effects — work that people can wear, touch and share within seconds of opening it.",
    "My practice sits between visual design and technical implementation. A lens only feels believable when tracking, materials, motion and behaviour all resolve together, so I work across that whole span — from the first concept sketch through to the finished effect running on a device.",
  ],
  philosophy:
    "Good interactive work disappears into the moment. The technology should be invisible; what stays with people is how the experience made them feel.",
  approach:
    "I start from the interaction rather than the artwork. Once I know what a person should be able to do, the visual language has a job to do, and every decision after that gets easier to defend.",
  // Add your own photo, e.g. "/images/portrait.webp".
  portrait: null,
  portraitAlt: "Ubedah Adnan working on an AR lens design",
  // Areas of focus — accurate descriptions of your practice, editable.
  focusAreas: [
    "Augmented reality lenses",
    "Face tracking effects",
    "Interactive world experiences",
    "3D visual design",
    "Motion & interaction design",
    "Social AR content",
  ],
  // MILESTONES: editable placeholders. Replace with real, verifiable
  // milestones — or delete entries you cannot confirm.
  milestones: [
    {
      period: "—",
      title: "Building an AR practice",
      text: "Developing a body of lens, filter and interactive effect work.",
      sample: true,
    },
    {
      period: "—",
      title: "Expanding into world experiences",
      text: "Moving from face-tracked effects into environment-aware work.",
      sample: true,
    },
    {
      period: "—",
      title: "Collaborations",
      text: "Open to projects with brands, agencies and creative studios.",
      sample: true,
    },
  ],
};

/* ------------------------------------------------------------ EXPERTISE */

export const expertiseGroups = [
  {
    id: "ar-development",
    title: "AR Development",
    summary: "Building the experience itself — tracking, behaviour and performance.",
    items: [
      {
        title: "AR Lens Creation",
        text: "End-to-end lens builds, from concept and asset preparation through to a publishable experience.",
      },
      {
        title: "Face Tracking",
        text: "Landmark-driven effects that stay locked to expression, angle and movement without jitter.",
      },
      {
        title: "Interactive Effects",
        text: "Behaviour, triggers and feedback so the experience responds meaningfully to the person using it.",
      },
      {
        title: "Real-Time Visual Experiences",
        text: "Effects that hold up live — tuned for smooth frame rates across a range of devices.",
      },
    ],
  },
  {
    id: "visual-design",
    title: "Visual Design",
    summary: "Defining how the experience looks, moves and feels.",
    items: [
      {
        title: "3D Visual Concepts",
        text: "Modelling, composition and staging of dimensional forms within the AR scene.",
      },
      {
        title: "Visual Effects",
        text: "Materials, particles and surface treatments that give an effect its atmosphere.",
      },
      {
        title: "Motion Design",
        text: "Timing, easing and choreography — the difference between something static and something alive.",
      },
      {
        title: "Digital Composition",
        text: "Colour, light and layout decisions that make a scene read clearly on a small screen.",
      },
    ],
  },
  {
    id: "creative-experience",
    title: "Creative Experience",
    summary: "Making sure the idea lands and the interaction means something.",
    items: [
      {
        title: "Interaction Design",
        text: "Designing what a person can do — and making that possibility obvious without instructions.",
      },
      {
        title: "Visual Storytelling",
        text: "Shaping a narrative arc inside a short, playful, repeatable moment.",
      },
      {
        title: "Concept Development",
        text: "Turning a brief or a loose idea into a clear creative direction worth building.",
      },
      {
        title: "Social AR Experiences",
        text: "Effects designed around how people actually capture, share and remix content.",
      },
    ],
  },
];

// Only list software you genuinely work in. Edit or remove freely.
export const software = ["Lens Studio", "Blender", "Adobe After Effects"];

/* --------------------------------------------------------------- PROCESS */

export const processSteps = [
  {
    n: "01",
    title: "Discover",
    text: "Understand the idea, the audience and the platform. Establish what the experience needs to achieve before deciding how it will look.",
  },
  {
    n: "02",
    title: "Conceptualize",
    text: "Explore visual directions and interaction ideas. Sketch options widely, then commit to one direction with a clear reason behind it.",
  },
  {
    n: "03",
    title: "Design",
    text: "Develop the assets, compositions and effects — models, materials, colour and motion all specified before implementation begins.",
  },
  {
    n: "04",
    title: "Build",
    text: "Implement the experience. Wire tracking and behaviour to real input and assemble everything into a working lens.",
  },
  {
    n: "05",
    title: "Refine",
    text: "Test on real devices in real conditions. Tune timing, tracking stability and performance until the interaction feels effortless.",
  },
  {
    n: "06",
    title: "Present",
    text: "Prepare the finished work for sharing — preview media, a written explanation of the thinking, and a link people can open.",
  },
];

/* --------------------------------------------------------------- CONTACT */

export const projectTypes = [
  "AR Lens / Face Filter",
  "World Experience",
  "Interactive Digital Experience",
  "Brand Campaign",
  "Collaboration",
  "Something else",
];
