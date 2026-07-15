import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { Briefcase, Award, GraduationCap, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceItem {
  id: string;
  type: 'experience' | 'education';
  icon: any;
  title: string;
  organization: string;
  location: string;
  duration: string;
  description: string;
  highlights?: string[];
  color: string;
  glow: string;
}

const timelineItems: ExperienceItem[] = [
  {
    id: "codesoft-intern",
    type: "experience",
    icon: Briefcase,
    title: "Android Application Development Intern",
    organization: "CodeSoft",
    location: "Remote, India",
    duration: "Nov 2025 - Dec 2025",
    description: "Developed scalable mobile applications using Kotlin/Java, implementing Clean Architecture, Material Design, and REST API integration. Managed the end-to-end development lifecycle, from UI design to APK generation and testing.",
    highlights: [
      "Implemented Clean Architecture and MVVM pattern structure",
      "Integrated REST APIs (Retrofit) with ~40% load efficiency improvement",
      "Created reusable layout modules in Jetpack Compose UI",
      "Wrote room data persistence structures and debugged layouts"
    ],
    color: "from-cyan-500 to-blue-500",
    glow: "shadow-cyan-500/20"
  },
  {
    id: "galgotias-btech",
    type: "education",
    icon: GraduationCap,
    title: "B.Tech in Computer Science & Engineering",
    organization: "Galgotias University",
    location: "Greater Noida, UP",
    duration: "Sept 2022 - June 2026",
    description: "Current Aggregate: 70% | Pursuing professional computer engineering degree focusing on core concepts: Data Structures & Algorithms, DBMS, Operating Systems, Software Engineering, AI & NLP.",
    highlights: [
      "Primary Author of Published AI Research Paper",
      "Maintained 7.0+ CGPA average throughout courses",
      "Participated in multiple technical hackathons & codings"
    ],
    color: "from-blue-500 to-indigo-500",
    glow: "shadow-blue-500/20"
  },
  {
    id: "ppm-xii",
    type: "education",
    icon: GraduationCap,
    title: "Higher Secondary School (Class XII)",
    organization: "PPM School",
    location: "Jehanabad, Bihar",
    duration: "Mar 2019 - July 2021",
    description: "Completed secondary education focusing on Science & Mathematics curriculum. Graduated with 72% aggregate score.",
    color: "from-indigo-500 to-purple-500",
    glow: "shadow-indigo-500/20"
  }
];

const certifications = [
  {
    icon: Award,
    title: "Introduction to Packet Tracer",
    issuer: "CISCO Networking Academy",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: Award,
    title: "Oracle Database Programming with SQL",
    issuer: "ORACLE Academy",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Award,
    title: "NPTEL Software Engineering",
    issuer: "Skill India",
    color: "from-indigo-500 to-purple-500"
  }
];

export function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Manage expanded timeline nodes
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "codesoft-intern": true, // Default open
    "galgotias-btech": true
  });

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const experiences = timelineItems.filter(item => item.type === 'experience');
  const education = timelineItems.filter(item => item.type === 'education');

  return (
    <section id="experience" className="py-24 bg-slate-900 relative overflow-hidden" ref={sectionRef}>
      {/* Visual top border separator glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Professional Experience Section */}
          <div className="mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-white">
              Professional <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />
            
            <div className="relative border-l border-slate-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-10">
              {experiences.map((exp, idx) => {
                const isExpanded = !!expandedNodes[exp.id];
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -35 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -35 }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="relative group"
                  >
                    {/* Timeline Node */}
                    <button
                      onClick={() => toggleNode(exp.id)}
                      className="absolute -left-[41px] md:-left-[57px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border border-cyan-500/40 text-cyan-400 hover:text-white hover:border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] group-hover:scale-105 transition-all duration-300 z-10 cursor-pointer"
                    >
                      <exp.icon className="w-4 h-4" />
                    </button>

                    <div className="glass-panel rounded-3xl border border-slate-850 hover:border-cyan-500/20 transition-all duration-300 shadow-lg overflow-hidden">
                      {/* Interactive Header */}
                      <div 
                        onClick={() => toggleNode(exp.id)}
                        className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/10 transition-colors"
                      >
                        <div className="space-y-1">
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                            {exp.title}
                          </h3>
                          <p className="text-base text-cyan-400 font-semibold">{exp.organization}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                          <div className="flex flex-col sm:items-end gap-1">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-600" />
                              {exp.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-600" />
                              {exp.location}
                            </span>
                          </div>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </div>
                      </div>

                      {/* Expandable Body */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="overflow-hidden border-t border-slate-950 bg-slate-950/20"
                          >
                            <div className="p-6 md:p-8 space-y-6">
                              <p className="text-slate-300 text-xs md:text-sm leading-relaxed pb-4 border-b border-slate-900/50">
                                {exp.description}
                              </p>
                              
                              {exp.highlights && (
                                <ul className="grid sm:grid-cols-2 gap-3.5">
                                  {exp.highlights.map((highlight) => (
                                    <li key={highlight} className="flex items-start gap-2.5 text-slate-350 text-xs md:text-sm">
                                      <span className="text-cyan-500 select-none text-sm leading-tight">▹</span>
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Academic Education Section */}
          <div className="mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-white">
              Academic <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Education</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />
            
            <div className="relative border-l border-slate-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-10">
              {education.map((edu, idx) => {
                const isExpanded = !!expandedNodes[edu.id];
                return (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: 35 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 35 }}
                    transition={{ delay: idx * 0.15, duration: 0.6 }}
                    className="relative group"
                  >
                    {/* Timeline Node */}
                    <button
                      onClick={() => toggleNode(edu.id)}
                      className="absolute -left-[41px] md:-left-[57px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border border-blue-500/40 text-blue-400 hover:text-white hover:border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)] group-hover:scale-105 transition-all duration-300 z-10 cursor-pointer"
                    >
                      <edu.icon className="w-4 h-4" />
                    </button>

                    <div className="glass-card rounded-3xl border border-slate-850 hover:border-blue-500/20 transition-all duration-300 shadow-md overflow-hidden">
                      {/* Interactive Header */}
                      <div 
                        onClick={() => toggleNode(edu.id)}
                        className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/10 transition-colors"
                      >
                        <div className="space-y-1">
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                            {edu.title}
                          </h3>
                          <p className="text-base text-slate-350 font-semibold">{edu.organization}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                          <div className="flex flex-col sm:items-end gap-1">
                            <span className="flex items-center gap-1.5">{edu.duration}</span>
                            <span className="flex items-center gap-1.5">{edu.location}</span>
                          </div>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </div>
                      </div>

                      {/* Expandable Body */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="overflow-hidden border-t border-slate-950 bg-slate-950/20"
                          >
                            <div className="p-6 md:p-8 space-y-6">
                              <p className="text-slate-300 text-xs md:text-sm leading-relaxed pb-4 border-b border-slate-900/50">
                                {edu.description}
                              </p>
                              
                              {edu.highlights && (
                                <ul className="grid sm:grid-cols-2 gap-3.5">
                                  {edu.highlights.map((highlight) => (
                                    <li key={highlight} className="flex items-start gap-2.5 text-slate-355 text-xs md:text-sm">
                                      <span className="text-blue-500 select-none text-sm leading-tight">▹</span>
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-white">
              Professional <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Certifications</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />
            
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="glass-card p-6 rounded-2xl border border-slate-850 hover:border-cyan-500/20 transition-all duration-300 group flex flex-col justify-between shadow-md hover:-translate-y-1"
                >
                  <div>
                    <div className={`bg-gradient-to-r ${cert.color} p-2.5 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-cyan-950/10`}>
                      <cert.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors tracking-tight">{cert.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-4 border-t border-slate-900 pt-3">{cert.issuer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
