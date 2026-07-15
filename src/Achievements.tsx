import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { Trophy, Award, Calendar, ExternalLink, ShieldCheck, Sparkles, X } from 'lucide-react';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  id: string;
  color: string;
  glow: string;
}

const certs: Certificate[] = [
  {
    title: "Introduction to Packet Tracer",
    issuer: "CISCO Networking Academy",
    date: "Aug 2024",
    id: "cisco-packet",
    color: "from-cyan-500 to-blue-500",
    glow: "shadow-cyan-500/20"
  },
  {
    title: "Oracle Database Programming with SQL",
    issuer: "ORACLE Academy",
    date: "Dec 2024",
    id: "oracle-sql",
    color: "from-blue-500 to-indigo-500",
    glow: "shadow-blue-500/20"
  },
  {
    title: "NPTEL Software Engineering",
    issuer: "Skill India / IIT Kharagpur",
    date: "Apr 2025",
    id: "nptel-soft",
    color: "from-indigo-500 to-purple-500",
    glow: "shadow-indigo-500/20"
  }
];

export function Achievements() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="achievements" className="py-24 bg-slate-900 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Honors & <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            Professional certifications and technical credentials verifying core software developer competencies.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-stretch">
          
          {/* Column Left: Trophy & Stats Summary (Span 5) */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-cyan-500/10 bg-slate-950/45 flex flex-col justify-between relative overflow-hidden text-center">
            
            {/* Ambient golden glow behind trophy */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-amber-500/10 rounded-full blur-[50px] pointer-events-none" />

            <div className="space-y-6 relative z-10 flex flex-col items-center">
              {/* Rotating Trophy Icon */}
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="w-24 h-24 bg-gradient-to-b from-amber-400 to-yellow-500 p-5.5 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.3)] border border-amber-300/30 flex items-center justify-center cursor-pointer mb-2"
              >
                <Trophy className="w-full h-full text-slate-950 stroke-[2]" />
              </motion.div>

              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">Academic Honor Roll</h3>
                <p className="text-slate-400 text-xs font-mono max-w-xs mx-auto">
                  Galgotias CSE class credentials, publishing records, and standardized course certificates.
                </p>
              </div>
            </div>

            {/* Stats row grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-900 text-left">
                <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">Publications</span>
                <span className="text-2xl font-black text-cyan-400 block tracking-tight">1</span>
                <span className="text-[8px] font-mono text-slate-400 leading-tight block mt-0.5">Primary Author</span>
              </div>
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-900 text-left">
                <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">Certs</span>
                <span className="text-2xl font-black text-blue-400 block tracking-tight">3+</span>
                <span className="text-[8px] font-mono text-slate-400 leading-tight block mt-0.5">Cisco, Oracle, NPTEL</span>
              </div>
            </div>

          </div>

          {/* Column Right: Certifications Cards Grid (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white tracking-tight">Verified Credentials</h3>

            <div className="space-y-4">
              {certs.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="glass-card p-5.5 rounded-2xl border border-slate-850 flex items-center justify-between gap-4 hover:border-cyan-500/25 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-r ${cert.color} rounded-xl text-white shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{cert.issuer}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
                    <span className="hidden sm:inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-600" />
                      {cert.date}
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-650 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Expanded Certificate Mock Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="glass-panel w-full max-w-lg rounded-3xl overflow-hidden border border-cyan-500/25 shadow-2xl relative z-10 bg-slate-950/95"
            >
              <div className={`h-1.5 bg-gradient-to-r ${selectedCert.color}`} />
              <div className="p-6 md:p-8 space-y-6 text-center">
                
                {/* Close */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1 bg-slate-900 border border-slate-800 rounded-xl hover:bg-rose-500/20 hover:text-rose-400 text-slate-500 rounded transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Certificate layout mockup */}
                <div className="border border-cyan-500/20 bg-slate-950 p-6 rounded-2xl relative overflow-hidden shadow-inner flex flex-col items-center space-y-4">
                  <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:10px_10px] opacity-15 pointer-events-none" />
                  
                  <Award className="w-12 h-12 text-cyan-400 animate-pulse" />

                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">VERIFIED CERTIFICATE</span>
                    <h4 className="text-base font-bold text-white tracking-tight leading-tight px-4">{selectedCert.title}</h4>
                    <p className="font-mono text-[10px] text-cyan-400 font-semibold">{selectedCert.issuer}</p>
                  </div>

                  <div className="w-24 h-0.5 bg-slate-900" />

                  <div className="flex justify-between w-full font-mono text-[8px] text-slate-500 px-4">
                    <span>DATE: {selectedCert.date}</span>
                    <span className="flex items-center gap-0.5 text-cyan-400">
                      <ShieldCheck className="w-3 h-3" />
                      SECURE CREDENTIAL
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 rounded-full text-cyan-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    ACCREDITED COURSE
                  </div>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                    This credential confirms successful verification of final assessments, exam sheets, and database codes.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold border border-slate-800 transition-colors cursor-pointer"
                >
                  Return to Dashboard
                </button>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
