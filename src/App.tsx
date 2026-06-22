import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { About } from './About';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { Experience } from './Experience';
import { Contact } from './Contact';
import { Footer } from './Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
