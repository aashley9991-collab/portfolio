/* =========================================================================
   APP — composes the single-page portfolio.

   Order of sections:
   <Preloader/>    short intro, unmounts itself when done
   <Navbar/>       sticky header
   <Hero/>         editorial split hero
   <SelectedWork/> project gallery with filters
   <CaseStudy/>    featured project (dark section)
   <About/>        biography + philosophy
   <Expertise/>    three capability groups
   <Process/>      six-stage workflow
   <Contact/>      collaboration + form
   <Footer/>       close
   ========================================================================= */

import { useCallback, useState } from "react";
import Preloader from "./components/Preloader.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import SelectedWork from "./components/SelectedWork.jsx";
import CaseStudy from "./components/CaseStudy.jsx";
import About from "./components/About.jsx";
import Expertise from "./components/Expertise.jsx";
import Process from "./components/Process.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  // The hero animation starts only once the preloader has finished.
  const [introDone, setIntroDone] = useState(false);

  // Stable callback so the preloader's effects never re-run mid-animation.
  const finishIntro = useCallback(() => setIntroDone(true), []);

  return (
    <>
      {/* decorative paper grain (pointer-events: none) */}
      <div className="paper-grain" aria-hidden="true" />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-md focus:bg-cobalt focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero introDone={introDone} />
        <SelectedWork />
        <CaseStudy />
        <About />
        <Expertise />
        <Process />
        <Contact />
      </main>

      <Footer />

      {!introDone && <Preloader onDone={finishIntro} />}
    </>
  );
}
