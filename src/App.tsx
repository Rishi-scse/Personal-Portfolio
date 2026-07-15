import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { About } from './About';
import { Skills } from './Skills';
import { PhoneMockup } from './PhoneMockup';
import { Projects } from './Projects';
import { Research } from './Research';
import { Experience } from './Experience';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { Achievements } from './Achievements';
import { ResumeViewer } from './ResumeViewer';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { AIChatbot } from './AIChatbot';
import { GlobalProvider } from './GlobalController';

export default function App() {
  return (
    <GlobalProvider>
      <div className="min-h-screen text-white relative bg-slate-950 aurora-bg">
        
        {/* Core Layout Content */}
        <div className="relative z-10">
          <Navigation />
          <Hero />
          
          {/* Main sections container with proper spacing */}
          <div className="space-y-4">
            <About />
            <Skills />
            
            {/* Immersive Phone Mockup Section */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                  Mobile <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Workspace</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />
                <PhoneMockup />
              </div>
            </section>

            <Projects />
            <Research />
            <Experience />
            <AnalyticsDashboard />
            <Achievements />
            <ResumeViewer />
            <Contact />
          </div>
          
          <Footer />
        </div>
        
        {/* Floating Chatbot Assistant */}
        <AIChatbot />
      </div>
    </GlobalProvider>
  );
}
