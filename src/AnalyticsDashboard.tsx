import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import { Github, Code2, Award, GitCommit, GitBranch, FolderGit, Star, Flame } from 'lucide-react';

export function AnalyticsDashboard() {
  // Generate mock GitHub Contribution grid squares (24 cols x 7 rows)
  const contributionGrid = useMemo(() => {
    const cols = 32;
    const rows = 7;
    const grid: number[][] = [];
    for (let r = 0; r < rows; r++) {
      grid[r] = [];
      for (let c = 0; c < cols; c++) {
        // Random level from 0 to 4 (representing commit frequencies)
        const rand = Math.random();
        grid[r][c] = rand > 0.85 ? 4 : rand > 0.65 ? 3 : rand > 0.45 ? 2 : rand > 0.25 ? 1 : 0;
      }
    }
    return grid;
  }, []);

  const languageData = [
    { name: 'Kotlin', value: 50, color: '#06b6d4' },
    { name: 'Java', value: 25, color: '#3b82f6' },
    { name: 'C / C++', value: 15, color: '#8b5cf6' },
    { name: 'JS / SQL', value: 10, color: '#64748b' }
  ];

  // LeetCode Stats splits
  const solvedCount = 300;
  const easy = 120;
  const medium = 150;
  const hard = 30;

  return (
    <section id="analytics" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Developer <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Analytics</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            Live-looking developer metrics outlining repository activities, codebase language allocations, and algorithmic solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Column Left: GitHub stats & grid (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* GitHub Graph Panel */}
            <div className="glass-panel p-6 rounded-3xl border border-cyan-500/10 bg-slate-950/40 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <Github className="w-5 h-5 text-cyan-400" />
                  GitHub Contributions
                </span>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">@Rishi-scse</span>
              </div>

              {/* Grid Box */}
              <div className="overflow-x-auto pb-2">
                <div className="flex flex-col gap-1.5 min-w-[380px]">
                  {contributionGrid.map((row, rIdx) => (
                    <div key={rIdx} className="flex gap-1.5 justify-center">
                      {row.map((val, cIdx) => (
                        <div
                          key={cIdx}
                          className={`w-3.5 h-3.5 rounded-sm transition-all duration-300 ${
                            val === 4 ? 'bg-cyan-400 shadow-[0_0_6px_#06b6d4]' :
                            val === 3 ? 'bg-cyan-500/70' :
                            val === 2 ? 'bg-cyan-600/40' :
                            val === 1 ? 'bg-cyan-900/30' : 'bg-slate-900/60 border border-slate-950'
                          }`}
                          title={`Contributions: level ${val}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-slate-900" />
                  <div className="w-2.5 h-2.5 rounded bg-cyan-900/30" />
                  <div className="w-2.5 h-2.5 rounded bg-cyan-600/40" />
                  <div className="w-2.5 h-2.5 rounded bg-cyan-500/70" />
                  <div className="w-2.5 h-2.5 rounded bg-cyan-400" />
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Repos", val: "18", icon: FolderGit, color: "text-cyan-400" },
                { label: "Commits", val: "480+", icon: GitCommit, color: "text-blue-400" },
                { label: "PRs", val: "12", icon: GitBranch, color: "text-indigo-400" },
                { label: "Stars", val: "25+", icon: Star, color: "text-purple-400" }
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="bg-slate-950/60 border border-slate-850 p-4.5 rounded-2xl flex items-center justify-between group hover:border-cyan-500/20 transition-colors">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">{card.label}</span>
                      <span className="text-xl font-black text-white tracking-tight block">{card.val}</span>
                    </div>
                    <div className={`p-2 bg-slate-900 rounded-xl group-hover:scale-105 transition-transform ${card.color}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Column Right: Leetcode & Languages (Span 5) */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            
            {/* LeetCode stats */}
            <div className="glass-panel p-6 rounded-3xl border border-cyan-500/10 bg-slate-950/40 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-amber-500" />
                  LeetCode Algorithmic
                </span>
                <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-current" />
                  300+
                </span>
              </div>

              {/* Progress circles stack */}
              <div className="flex items-center justify-around gap-2 pt-2">
                
                {/* Solved Circle progress indicator */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="38" stroke="rgba(30, 41, 59, 0.5)" strokeWidth="6" fill="transparent" />
                    <circle cx="48" cy="48" r="38" stroke="#f59e0b" strokeWidth="6" fill="transparent" 
                            strokeDasharray={2 * Math.PI * 38} strokeDashoffset={2 * Math.PI * 38 * (1 - 0.75)} 
                            className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-lg font-black text-white leading-none block">{solvedCount}</span>
                    <span className="text-[8px] font-mono text-slate-500 uppercase mt-0.5 block">Solved</span>
                  </div>
                </div>

                {/* Split list */}
                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-emerald-500" />
                    <span className="text-slate-400">Easy:</span>
                    <span className="text-white font-bold">{easy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-500" />
                    <span className="text-slate-400">Medium:</span>
                    <span className="text-white font-bold">{medium}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-rose-500" />
                    <span className="text-slate-400">Hard:</span>
                    <span className="text-white font-bold">{hard}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Language Allocations Pie */}
            <div className="glass-panel p-6 rounded-3xl border border-cyan-500/10 bg-slate-950/40 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  Language Metrics
                </span>
                <span className="font-mono text-[10px] text-slate-500">LOC weight</span>
              </div>

              {/* Pie Chart container */}
              <div className="h-28 w-full flex items-center justify-between gap-4">
                <div className="w-28 h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={languageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={28}
                        outerRadius={45}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {languageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-1.5 font-mono text-[9px]">
                  {languageData.map((d) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="text-slate-400">{d.name}</span>
                      </div>
                      <span className="text-white font-bold">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
