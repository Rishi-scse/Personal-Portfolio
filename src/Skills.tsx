import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code, Palette, Database, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: "Languages",
    path: "/usr/rishi/bin",
    icon: Code,
    skills: ["Kotlin", "Java", "C", "SQL (MySQL, Oracle)", "JavaScript"],
    color: "from-cyan-500 to-blue-500",
    glow: "hover:shadow-cyan-500/10"
  },
  {
    title: "Technologies",
    path: "/usr/rishi/libs",
    icon: Palette,
    skills: ["Jetpack Compose", "Node.js", "Retrofit", "Room DB", "MVVM", "Flutter", "MongoDB", "Firebase"],
    color: "from-blue-500 to-indigo-500",
    glow: "hover:shadow-blue-500/10"
  },
  {
    title: "Tools & Frameworks",
    path: "/usr/rishi/tools",
    icon: Database,
    skills: ["Android Studio", "Git/GitHub", "VS Code", "REST API", "Clean Architecture", "Material Design"],
    color: "from-indigo-500 to-purple-500",
    glow: "hover:shadow-indigo-500/10"
  },
  {
    title: "Core Subjects",
    path: "/usr/rishi/core",
    icon: Wrench,
    skills: ["Data Structures & Algorithms", "DBMS", "Operating Systems", "AI & NLP", "Software Engineering"],
    color: "from-purple-500 to-pink-500",
    glow: "hover:shadow-purple-500/10"
  }
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 bg-slate-950 relative overflow-hidden" ref={ref}>
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Technical <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`glass-panel p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 group shadow-lg ${category.glow}`}
              >
                {/* Developer Folder Path Header */}
                <div className="flex items-center justify-between mb-4 border-b border-slate-800/60 pb-3">
                  <span className="font-mono text-xs text-slate-500 tracking-wider">{category.path}</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className={`bg-gradient-to-r ${category.color} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ delay: idx * 0.1 + skillIdx * 0.04 + 0.3, duration: 0.3 }}
                      className="px-4 py-2 bg-slate-900/65 text-slate-300 rounded-xl text-sm border border-slate-800 hover:border-cyan-500/50 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:text-cyan-300 transition-all duration-300 font-medium cursor-default hover:-translate-y-0.5"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
