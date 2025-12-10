import { useState, useEffect, Suspense } from 'react';
import CustomCursor from './components/CustomCursor';
import CanvasContainer from './components/CanvasContainer';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

function App() {
  return (
    <>
      <CustomCursor />
      <div className="relative z-10 w-full overflow-hidden bg-transparent">
        <Hero />
        <About />
        <Projects />
        <Testimonials />
        <Contact />
      </div>

      {/* 3D Background Layer */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <CanvasContainer />
      </div>
    </>
  );
}

export default App;
