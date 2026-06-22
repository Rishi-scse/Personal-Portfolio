import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, Award, GraduationCap, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    icon: Briefcase,
    title: "Android Application Development Intern",
    organization: "CodeSoft",
    location: "Remote, India",
    duration: "Nov 2025 - Dec 2025",
    description: "Developed scalable mobile applications using Kotlin/Java, implementing Clean Architecture, Material Design, and REST API integration. Managed the end-to-end development lifecycle, from UI design to APK generation and testing.",
    highlights: [
      "Implemented Clean Architecture and MVVM pattern",
      "Integrated REST APIs with ~40% efficiency improvement",
      "End-to-end app development and deployment"
    ],
    color: "from-cyan-500 to-blue-500",
    glow: "shadow-cyan-500/20"
  }
];

const education = [
  {
    icon: GraduationCap,
    title: "B.Tech in Computer Science & Engineering",
    organization: "Galgotias University",
    location: "Greater Noida, UP",
    duration: "Sept 2022 - June 2026",
    description: "Current aggregate: 70% | Core focus: Data Structures & Algorithms, DBMS, Operating Systems, Software Engineering, AI & NLP.",
    color: "from-blue-500 to-indigo-500",
    glow: "shadow-blue-500/20"
  },
  {
    icon: GraduationCap,
    title: "Higher Secondary School (Class XII)",
    organization: "PPM School",
    location: "Jehanabad, Bihar",
    duration: "Mar 2019 - July 2021",
    description: "Percentage: 72% | Focused on Science & Mathematics curriculum.",
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 bg-slate-950 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Experience Section */}
          <div className="mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              Professional <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />
            
            <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="relative group"
                >
                  {/* Timeline node */}
                  <span className="absolute -left-[41px] md:-left-[57px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <exp.icon className="w-4 h-4" />
                  </span>

                  <div className="glass-panel p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/30 transition-all duration-300 shadow-lg relative">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">{exp.title}</h3>
                        <p className="text-lg text-cyan-400 font-semibold">{exp.organization}</p>
                      </div>
                      
                      <div className="flex flex-col sm:items-end text-sm text-slate-500 font-mono gap-1">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 border-b border-slate-800/60 pb-4">{exp.description}</p>
                    
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {exp.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-slate-300 text-sm">
                          <span className="text-cyan-400 select-none">▹</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              Academic <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Education</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />
            
            <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-10">
              {education.map((edu, idx) => (
                <motion.div
                  key={edu.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="relative group"
                >
                  {/* Timeline node */}
                  <span className="absolute -left-[41px] md:-left-[57px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border-2 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <edu.icon className="w-4 h-4" />
                  </span>

                  <div className="glass-card p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/20 transition-all duration-300 shadow-md">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">{edu.title}</h3>
                        <p className="text-slate-300 text-sm font-semibold">{edu.organization}</p>
                      </div>
                      
                      <div className="flex flex-col sm:items-end text-xs text-slate-500 font-mono gap-1">
                        <span className="flex items-center gap-1.5">{edu.duration}</span>
                        <span className="flex items-center gap-1.5">{edu.location}</span>
                      </div>
                    </div>
                    <p className="text-slate-450 text-sm leading-relaxed">{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              Professional <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Certifications</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />
            
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="glass-card p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/25 transition-all duration-300 group flex flex-col justify-between shadow-md hover:-translate-y-1"
                >
                  <div>
                    <div className={`bg-gradient-to-r ${cert.color} p-2.5 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <cert.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors tracking-tight">{cert.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-3 border-t border-slate-800/60 pt-3">{cert.issuer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
