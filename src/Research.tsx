import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { BookOpen, FileText, ArrowRight, ShieldAlert, Award, FileCode, CheckCircle, Database, LayoutGrid } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  sub: string;
  progress: number;
}

export function Research() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'architecture' | 'comparison'>('overview');

  const metrics: Metric[] = [
    { label: "Overall Accuracy", value: "96.84%", sub: "Validation test sets", progress: 96.8 },
    { label: "System Precision", value: "95.72%", sub: "Query context classification", progress: 95.7 },
    { label: "System Recall", value: "96.31%", sub: "Relevant statutes retrieval", progress: 96.3 },
    { label: "Average Response Time", value: "1.9s", sub: "End-to-end user latency", progress: 85 } // mock progress representation
  ];

  const authors = [
    { name: "MD Kamran Ansari", role: "Co-Author", school: "Galgotias University" },
    { name: "Rishi Raj Verma", role: "Primary Author", school: "Galgotias University", highlighted: true },
    { name: "Alok Kumar", role: "Co-Author", school: "Galgotias University" },
    { name: "Utsav Upadhyay", role: "Corresponding Author", school: "Galgotias University" }
  ];

  const comparisonData = [
    { ref: "[1]", focus: "Legal awareness among students", limitation: "No AI-based scalable legal assistance", benefit: "Offers real-time AI-driven legal assistance" },
    { ref: "[2]", focus: "Access to justice in rural India", limitation: "Lacks digital/AI delivery systems", benefit: "Removes geographical barriers via mobile client" },
    { ref: "[3]", focus: "ICT and e-Courts implementation", limitation: "No automated AI legal analytics", benefit: "Provides context-specific AI legal advice" },
    { ref: "[8]", focus: "Ethical AI in legal reforms", limitation: "Conceptual frameworks only", benefit: "Implements a working prototype with verified databases" }
  ];

  return (
    <section id="research" className="py-24 bg-slate-950 relative overflow-hidden" ref={sectionRef}>
      {/* Dynamic glowing overlays */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/35 rounded-full text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              CONFERENCE PUBLICATION (FEB 2026)
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Research & <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Publications</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-400 text-sm md:text-base mt-4 max-w-2xl mx-auto">
              Primary Author of a national-level technical publication presenting a hybrid legal information retrieval system.
            </p>
          </div>

          {/* Research Title Display Panel */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/10 max-w-5xl mx-auto mb-12 shadow-xl shadow-cyan-950/5 relative overflow-hidden bg-gradient-to-r from-slate-900/50 to-slate-950/50">
            {/* Visual background blueprint lines */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Code Legalist: An AI-Based Legal Advisor System
                </h3>
                <p className="text-slate-400 font-mono text-[11px] leading-relaxed">
                  Published in the <span className="text-cyan-400 font-semibold">School of Computer Science & Engineering</span> research forum, Galgotias University.
                </p>
                
                {/* Author Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {authors.map((author) => (
                    <span
                      key={author.name}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-mono border flex items-center gap-1.5 ${
                        author.highlighted
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 font-bold shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                          : 'bg-slate-900/60 text-slate-400 border-slate-800'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${author.highlighted ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`} />
                      {author.name} ({author.role})
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto pt-4 md:pt-0">
                <a
                  href="/Code_Legalist_Research_Paper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-initial px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-cyan-950/15 hover:-translate-y-0.5"
                >
                  <FileText className="w-4 h-4" />
                  Read Paper
                </a>
              </div>
            </div>
          </div>

          {/* Sub Navigation Bar */}
          <div className="flex items-center justify-center gap-2 mb-10 max-w-lg mx-auto bg-slate-950/60 p-1.5 rounded-2xl border border-slate-900">
            {[
              { id: 'overview', label: 'Paper Abstract', icon: BookOpen },
              { id: 'architecture', label: 'Architecture & Flow', icon: FileCode },
              { id: 'comparison', label: 'Comparison Matrix', icon: LayoutGrid }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all relative ${
                    activeSubTab === tab.id ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-350'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="relative z-10">{tab.label}</span>
                  {activeSubTab === tab.id && (
                    <motion.div
                      layoutId="researchActiveSubTab"
                      className="absolute inset-0 bg-slate-900 border border-cyan-500/10 rounded-xl z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Contents */}
          <div className="max-w-5xl mx-auto items-stretch">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Overview & Abstract */}
              {activeSubTab === 'overview' && (
                <motion.div
                  key="overview-subtab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-12 gap-8 items-stretch"
                >
                  {/* Abstract Card (Span 7) */}
                  <div className="md:col-span-7 glass-panel p-7 rounded-3xl border border-cyan-500/10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs font-bold uppercase pb-3 border-b border-slate-900">
                        <BookOpen className="w-4 h-4" />
                        Abstract & Problem Statement
                      </div>
                      <p className="text-slate-300 text-xs md:text-sm leading-relaxed text-justify">
                        For a society to promote social justice, access to the legal profession's knowledge base must be available equally to all of its members. All members of society face significant barriers preventing them from effectively understanding their legal rights due to complex terminology, high attorney costs, and lack of search options.
                      </p>
                      <p className="text-slate-350 text-xs md:text-sm leading-relaxed text-justify">
                        This work proposes **Code Legalist**, an AI-Driven Legal Advisor App featuring a 4-tier hybrid architecture combining verified structured laws in MongoDB with unstructured queries routed via a RESTful middleware controller to Generative AI APIs (Gemini).
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {["Legal AI", "NLP", "Section Recommendation", "Confidence Score"].map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-slate-900 text-slate-500 rounded-lg text-[10px] font-mono border border-slate-850">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quantitative Results Card (Span 5) */}
                  <div className="md:col-span-5 glass-panel p-7 rounded-3xl border border-cyan-500/10 flex flex-col justify-between bg-gradient-to-b from-slate-900/30 to-slate-950/30">
                    <div className="space-y-5">
                      <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs font-bold uppercase pb-3 border-b border-slate-900">
                        <CheckCircle className="w-4 h-4" />
                        Quantitative Metrics
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {metrics.map((m) => (
                          <div key={m.label} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-900 flex flex-col justify-between">
                            <span className="text-[10px] font-mono text-slate-500 block mb-1">{m.label}</span>
                            <span className="text-2xl font-black text-white tracking-tight block mb-1">{m.value}</span>
                            <span className="text-[9px] font-mono text-slate-400 block leading-tight">{m.sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 bg-slate-950 border border-slate-900 p-3 rounded-xl flex items-center gap-3">
                      <Database className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <div className="text-[10px] font-mono leading-tight">
                        <p className="text-slate-300 font-bold">DATABASE SEARCH: O(1) SPEED</p>
                        <p className="text-slate-500">Query execution &lt;1ms using MongoDB indexing</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Architecture & Flowchart */}
              {activeSubTab === 'architecture' && (
                <motion.div
                  key="arch-subtab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel p-8 rounded-3xl border border-cyan-500/10 flex flex-col items-center justify-center space-y-8 bg-gradient-to-b from-slate-900/40 to-slate-950/40"
                >
                  <div className="text-center max-w-xl">
                    <h4 className="text-lg font-bold text-white tracking-tight mb-2">4-Tiered System Architecture Diagram</h4>
                    <p className="text-slate-400 text-xs font-mono">Real-time data flow pipelines from user query inputs to natural language legal advice response.</p>
                  </div>

                  {/* Flow Nodes (HTML represent) */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 w-full max-w-4xl py-4">
                    
                    {/* Tier 1 */}
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl w-full md:w-44 text-center shadow-lg relative">
                      <div className="absolute top-1.5 left-3 text-[8px] font-mono text-slate-500">TIER 1: UI</div>
                      <span className="text-xs font-bold text-cyan-400 block mt-2 font-mono">Mobile client</span>
                      <p className="text-[10px] text-slate-400 mt-1">Jetpack Compose UI query Q</p>
                    </div>

                    <ArrowRight className="w-5 h-5 text-slate-600 rotate-90 md:rotate-0" />

                    {/* Tier 2 */}
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl w-full md:w-44 text-center shadow-lg relative">
                      <div className="absolute top-1.5 left-3 text-[8px] font-mono text-slate-500">TIER 2: GATEWAY</div>
                      <span className="text-xs font-bold text-cyan-400 block mt-2 font-mono">Express.js API</span>
                      <p className="text-[10px] text-slate-400 mt-1">Validations & rate limit middleware</p>
                    </div>

                    <ArrowRight className="w-5 h-5 text-slate-600 rotate-90 md:rotate-0" />

                    {/* Tier 3 */}
                    <div className="bg-slate-950 border border-cyan-500/20 p-4 rounded-2xl w-full md:w-48 text-center shadow-lg relative">
                      <div className="absolute top-1.5 left-3 text-[8px] font-mono text-slate-500">TIER 3: CORE NLP</div>
                      <span className="text-xs font-bold text-cyan-400 block mt-2 font-mono">Gemini AI / embeddings</span>
                      <p className="text-[10px] text-slate-400 mt-1">NLU classification & attention summaries</p>
                    </div>

                    <ArrowRight className="w-5 h-5 text-slate-600 rotate-90 md:rotate-0" />

                    {/* Tier 4 */}
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl w-full md:w-44 text-center shadow-lg relative">
                      <div className="absolute top-1.5 left-3 text-[8px] font-mono text-slate-500">TIER 4: DATABASE</div>
                      <span className="text-xs font-bold text-cyan-400 block mt-2 font-mono">MongoDB / index</span>
                      <p className="text-[10px] text-slate-400 mt-1">Verified structured database lookup</p>
                    </div>

                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-900 w-full max-w-3xl text-left flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <div className="text-[11px] font-mono leading-relaxed text-slate-400">
                      <span className="text-slate-200 font-bold block mb-1">HYBRID INDEX SYSTEM:</span>
                      Dual-source model pipeline checks facts against database indexing logs before responding to prevent hallucinatory queries. It utilizes a mid-tier model consuming less than 150MB RAM.
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Comparison Matrix Table */}
              {activeSubTab === 'comparison' && (
                <motion.div
                  key="comparison-subtab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/10 overflow-hidden shadow-xl"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-mono text-[11px] text-slate-300">
                      <thead>
                        <tr className="border-b border-slate-900 text-cyan-400 uppercase tracking-wider font-bold">
                          <th className="py-4 px-4">Ref.</th>
                          <th className="py-4 px-4">Existing Research Focus</th>
                          <th className="py-4 px-4">Limitations Identified</th>
                          <th className="py-4 px-4 text-emerald-400">Proposed Code Legalist System</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.map((row) => (
                          <tr key={row.ref} className="border-b border-slate-900/60 hover:bg-slate-900/20 transition-colors">
                            <td className="py-4 px-4 text-slate-500 font-bold">{row.ref}</td>
                            <td className="py-4 px-4 font-semibold text-white">{row.focus}</td>
                            <td className="py-4 px-4 text-slate-400">{row.limitation}</td>
                            <td className="py-4 px-4 text-emerald-400 font-semibold">{row.benefit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
