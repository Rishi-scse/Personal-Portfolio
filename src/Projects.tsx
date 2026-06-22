import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Github, Calendar, Folder } from 'lucide-react';

const projects = [
  {
    title: "Legal AI Advisor",
    date: "Oct 2025",
    description: "An AI-driven legal assistance app providing instant legal guidance using Gemini API and Node.js backend. Features MongoDB for secure document storage and a responsive UI built with modern Android practices.",
    tech: ["Kotlin", "Jetpack Compose", "Gemini API", "Node.js", "MongoDB"],
    color: "from-cyan-500 to-blue-500",
    glow: "group-hover:shadow-cyan-500/20",
    links: {
      github: "#",
      demo: "#"
    }
  },
  {
    title: "Advanced Alarm App",
    date: "Dec 2025",
    description: "A high-reliability alarm system using AlarmManager and Broadcast Receivers for persistent background tasks. Utilizes Room Database for local data persistence and features custom snooze logic.",
    tech: ["Kotlin", "Room Database", "Broadcast Receivers", "AlarmManager"],
    color: "from-blue-500 to-indigo-500",
    glow: "group-hover:shadow-blue-500/20",
    links: {
      github: "https://github.com/Rishi-scse/Advanced-Alarm-App"
    }
  },
  {
    title: "Bike Info System",
    date: "Sep 2025",
    description: "Developed a dashboard featuring an AI Assistant for vehicle maintenance queries and Google Maps integration to locate nearby fuel pumps. Created a secure vault for bike docs and built a fuel-tracking log system with animated UI.",
    tech: ["React.js", "Google Maps API", "Framer Motion", "Firebase"],
    color: "from-indigo-500 to-purple-500",
    glow: "group-hover:shadow-indigo-500/20",
    links: {
      github: "https://github.com/Rishi-scse/Bike-Info-System"
    }
  }
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 bg-slate-900 relative overflow-hidden" ref={ref}>
      {/* Decorative subtle top light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: idx * 0.15 + 0.1, duration: 0.6 }}
                className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden hover:border-slate-700/80 transition-all duration-300 group flex flex-col justify-between shadow-lg relative"
              >
                {/* Gradient top bar */}
                <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />

                {/* Subtly colored ambient glow inside the card, visible on hover */}
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none blur-sm`} />
                
                <div className="p-8 flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Folder className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                          {project.title}
                        </h3>
                      </div>
                      
                      <div className="flex gap-2">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target={project.links.github === "#" ? undefined : "_blank"}
                            rel={project.links.github === "#" ? undefined : "noopener noreferrer"}
                            className="p-2 bg-slate-950/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                            aria-label="GitHub repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.links.demo && (
                          <a
                            href={project.links.demo}
                            className="p-2 bg-slate-950/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                            aria-label="Live demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Date */}
                    <div className="flex items-center gap-1.5 mb-4 text-slate-500 text-xs font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {project.date}
                    </div>
                    
                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-slate-950/50 text-slate-400 rounded-lg text-xs font-mono border border-slate-850 hover:border-cyan-500/20 hover:text-cyan-300 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
