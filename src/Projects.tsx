import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { ExternalLink, Github, Calendar, Folder, Info, X, CheckCircle2 } from 'lucide-react';

interface Project {
  title: string;
  category: string[];
  date: string;
  description: string;
  tech: string[];
  color: string;
  glow: string;
  links: {
    github?: string;
    demo?: string;
  };
  features: string[];
  challenges: string;
}

const projects: Project[] = [
  {
    title: "Legal AI Advisor",
    category: ["android", "ai", "fullstack"],
    date: "Oct 2025",
    description: "An AI-driven legal assistance app providing instant legal guidance using the Gemini API and a Node.js backend. Features MongoDB for secure document storage and a responsive UI built with Jetpack Compose.",
    tech: ["Kotlin", "Jetpack Compose", "Gemini API", "Node.js", "MongoDB"],
    color: "from-cyan-500 to-blue-500",
    glow: "shadow-cyan-500/20",
    links: {
      github: "#",
      demo: "#"
    },
    features: [
      "Secured JWT user authentication & stateless sessions",
      "Integrated Gemini LLM API via Node.js backend integration",
      "Built O(1) query indexes inside MongoDB collections for fast legal data fetching",
      "Structured declarative Jetpack Compose layout for user query threads"
    ],
    challenges: "Handling LLM hallucinations and ensuring fast retrieval. Resolved by implementing a dual-source retrieval hybrid NLP-driven design: fetching verified structured laws from MongoDB and using Gemini to summarize legal contexts."
  },
  {
    title: "Advanced Alarm App",
    category: ["android"],
    date: "Dec 2025",
    description: "A high-reliability alarm system using AlarmManager and Broadcast Receivers for persistent background execution. Utilizes Room Database for local data persistence and features custom snooze logic.",
    tech: ["Kotlin", "Room Database", "Broadcast Receivers", "AlarmManager"],
    color: "from-blue-500 to-indigo-500",
    glow: "shadow-blue-500/20",
    links: {
      github: "https://github.com/Rishi-scse/Advanced-Alarm-App"
    },
    features: [
      "Broadcast Receivers implementation to reschedule alarms upon device boot",
      "Room DB integration with Flow interfaces to live-track active alarms",
      "Custom high-reliability foreground service with push notification managers",
      "Flexible snooze scheduling algorithms and vibration/ringtone managers"
    ],
    challenges: "Preventing Android OS background restrictions from killing scheduled alarms. Solved by implementing dynamic alarm schedules via exact AlarmManager triggers and registering persistent broadcast hooks."
  },
  {
    title: "Bike Info System",
    category: ["fullstack", "ai"],
    date: "Sep 2025",
    description: "Developed a dashboard featuring an AI Assistant for vehicle maintenance queries and Google Maps integration to locate nearby fuel pumps. Created a secure vault for bike docs and built a fuel-tracking log system with animated UI.",
    tech: ["React.js", "Google Maps API", "Framer Motion", "Firebase"],
    color: "from-indigo-500 to-purple-500",
    glow: "shadow-indigo-500/20",
    links: {
      github: "https://github.com/Rishi-scse/Bike-Info-System"
    },
    features: [
      "Interactive Google Maps API integration to display local fuel nodes",
      "Firebase Cloud Storage for secure document vaults (RC, insurance)",
      "Integrated AI agent chatbot for vehicle repair queries and guides",
      "Visual fuel log analytics dashboard using SVG progress lines"
    ],
    challenges: "State synchronization across Google Maps nodes and user search queries. Solved by integrating context API and debounced hooks to coordinate map markers."
  }
];

function ProjectCard({ project, onExplore }: { project: Project; onExplore: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tilt calculations
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    setTilt({ x: rotateX, y: rotateY });
    setSpotlight({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
        transition: 'transform 0.15s ease-out'
      }}
      className="glass-card rounded-3xl border border-slate-850 overflow-hidden hover:border-cyan-500/25 shadow-xl relative cursor-pointer group flex flex-col justify-between h-[360px]"
    >
      {/* Top highlight band */}
      <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />

      {/* Radial Hover Spotlight Overlay */}
      {hovered && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 120px at ${spotlight.x}px ${spotlight.y}px, rgba(6, 182, 212, 0.15), transparent 80%)`
          }}
        />
      )}
      
      <div className="p-7 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                {project.title}
              </h3>
            </div>
            
            <div className="flex gap-2">
              {project.links.github && project.links.github !== "#" && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.links.demo && project.links.demo !== "#" && (
                <a
                  href={project.links.demo}
                  className="p-1.5 bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 mb-4 text-slate-500 text-[10px] font-mono font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            {project.date}
          </div>
          
          <p className="text-slate-350 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-slate-950/60 text-slate-400 rounded-md text-[10px] font-mono border border-slate-850"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-0.5 bg-slate-950/60 text-cyan-400 rounded-md text-[10px] font-mono border border-slate-850">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          <button
            onClick={onExplore}
            className="w-full py-2.5 bg-slate-950/80 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/30 text-slate-450 hover:text-cyan-400 font-bold rounded-xl transition-all duration-300 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            Explore Case Study
          </button>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category.includes(activeFilter));

  const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "android", label: "Android Apps" },
    { id: "fullstack", label: "Full Stack" },
    { id: "ai", label: "AI Systems" }
  ];

  return (
    <section id="projects" className="py-24 bg-slate-900 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 rounded-full" />
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-2xl mx-auto bg-slate-950/60 p-2 rounded-2xl border border-slate-800/80 backdrop-blur-md">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all relative cursor-pointer ${
                  activeFilter === tab.id
                    ? 'text-cyan-400'
                    : 'text-slate-500 hover:text-slate-350'
                }`}
              >
                <span className="relative z-10">{tab.label}</span>
                {activeFilter === tab.id && (
                  <motion.div
                    layoutId="projectActiveFilter"
                    className="absolute inset-0 bg-slate-900 border border-cyan-500/10 rounded-xl z-0 shadow-lg shadow-cyan-950/15"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          
          {/* Projects Card Grid */}
          <motion.div 
            layout 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectCard 
                    project={project} 
                    onExplore={() => setSelectedProject(project)} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Expanded Modal Case Study overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel w-full max-w-2xl rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl relative z-10 bg-slate-950/95"
            >
              <div className={`h-2 bg-gradient-to-r ${selectedProject.color}`} />
              
              <div className="p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-mono mt-1">DEVELOPED: {selectedProject.date}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-rose-500/20 hover:text-rose-400 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    aria-label="Close Modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-900">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-slate-900 text-cyan-300 font-mono text-xs rounded-lg border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider text-cyan-400">Key Features:</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-350 text-xs md:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 bg-slate-900/50 border border-slate-850 p-5 rounded-2xl">
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider text-cyan-400">Technical Challenges Solved:</h4>
                  <p className="text-slate-350 text-xs md:text-sm leading-relaxed text-justify">
                    {selectedProject.challenges}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-900">
                  {selectedProject.links.github && selectedProject.links.github !== "#" && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-slate-800 hover:border-slate-700 text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                    >
                      <Github className="w-4.5 h-4.5" />
                      View Repository
                    </a>
                  )}
                  {selectedProject.links.demo && selectedProject.links.demo !== "#" && (
                    <a
                      href={selectedProject.links.demo}
                      className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-cyan-950/15 cursor-pointer"
                    >
                      <ExternalLink className="w-4.5 h-4.5" />
                      Live Preview
                    </a>
                  )}
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
