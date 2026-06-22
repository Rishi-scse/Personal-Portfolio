import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { User, MapPin, GraduationCap, Briefcase, Award, FileText, Zap } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Android Internship", value: "1", detail: "At CodeSoft", icon: Briefcase, color: "text-cyan-400" },
    { label: "Research Publication", value: "1", detail: "Primary Author", icon: FileText, color: "text-blue-400" },
    { label: "API Optimization", value: "40%", detail: "Load improvement", icon: Zap, color: "text-indigo-400" },
    { label: "LeetCode Solved", value: "300+", detail: "Problems solved", icon: Award, color: "text-purple-400" }
  ];

  return (
    <section id="about" className="py-20 bg-slate-900 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_90%,#020617_100%)] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            About <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16 rounded-full" />
          
          {/* Quick Metrics Dashboard for HR */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="glass-card p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-850/30 transition-all duration-300 group shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 bg-slate-950/60 rounded-xl group-hover:scale-110 transition-transform ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-300 mb-1">{stat.label}</h3>
                <p className="text-xs text-slate-500">{stat.detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* Bio Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="md:col-span-7 glass-panel p-8 rounded-2xl border border-slate-800/80 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 p-3 rounded-xl text-cyan-400">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Who I Am</h3>
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                      I'm a computer science engineer specializing in modern Android application development 
                      and AI integration. With strong skills in Kotlin, Java, and software architecture, 
                      I focus on creating high-performance, robust mobile environments that provide 
                      seamless user experiences.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 p-3 rounded-xl text-blue-400">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">My Focus</h3>
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                      Currently sharpening mobile technologies through clean MVVM/MVI architectures, reactive state management 
                      (Flow/Coroutines), and REST integrations. My goal is to build secure, 
                      production-grade apps that bridge complex backends with intuitive UI layouts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/60 mt-6 flex flex-wrap gap-4 items-center justify-between text-slate-400 text-xs font-mono">
                <span>STATUS: ACTIVE & OPEN FOR HIRING</span>
                <span>B.TECH CSE (2022 - 2026)</span>
              </div>
            </motion.div>

            {/* Edu & Research Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="md:col-span-5 flex flex-col gap-6"
            >
              
              {/* Education Box */}
              <div className="glass-card p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Education</h4>
                    <p className="text-xs text-slate-500 font-mono">Galgotias University</p>
                  </div>
                </div>
                <p className="text-slate-200 font-semibold text-sm">Bachelor of Technology in CSE</p>
                <p className="text-slate-400 text-sm">Aggregate: 70%</p>
                <p className="text-slate-500 text-xs font-mono mt-2">Sept 2022 - June 2026 | Greater Noida</p>
              </div>

              {/* Research Box */}
              <div className="bg-gradient-to-br from-cyan-950/20 via-blue-950/15 to-indigo-950/20 p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Research Paper</h4>
                    <p className="text-xs text-slate-500 font-mono">Accepted & Published</p>
                  </div>
                </div>
                <h5 className="text-slate-200 font-semibold text-sm mb-2">Code Legalist: AI-Based Legal Advisor</h5>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Published as <span className="text-cyan-400 font-medium">Primary Author</span> at a national technical conference 
                  at Galgotias University (Feb 2026). Explores NLP models and secure document querying.
                </p>
              </div>

              {/* Location Box */}
              <div className="glass-card p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div className="text-xs">
                  <p className="text-slate-200 font-semibold">Greater Noida, Uttar Pradesh</p>
                  <p className="text-slate-400">Willing to relocate & open for remote roles</p>
                </div>
              </div>

            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
