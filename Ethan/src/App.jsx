import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import TabNavigation from "./components/TabNavigation";


function App() {
  return (
    <div className="scroll-container">
      <div id="hero" className="snap-section">
        <Hero />
      </div>
      <div id="about" className="no-snap">
        <AboutMe />
      </div>
      <div id="experience" className="no-snap">
        <Experience />
      </div>
      <div id="projects" className="snap-section-strong">
        <Projects />
      </div>
      <div id="contact" className="snap-section">
        <Contact />
      </div>
      <div className="snap-section">
        <Footer />
      </div>
      <TabNavigation />
    </div>
  );
};

export default App;