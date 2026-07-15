import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, Phone, Code2, Terminal, CornerDownLeft, Sparkles, Download, UserCheck, ShieldCheck, Cpu } from 'lucide-react';
import { SpaceGlobe } from './SpaceGlobe';

// Matrix Rain canvas animation
function MatrixRain({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 450;
      canvas.height = 280;
    };

    handleResize();

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>//[]{}*#@$";
    const charArr = chars.split("");
    const fontSize = 11;
    const columns = Math.floor(canvas.width / fontSize);

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * -100;
    }

    let frameId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        
        if (Math.random() > 0.9) {
          ctx.fillStyle = "#ffffff";
        } else {
          ctx.fillStyle = i % 2 === 0 ? "#06b6d4" : "#3b82f6";
        }

        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          rainDrops[i] = 0;
        }
        rainDrops[i] += 1;
      }
      frameId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[280px] overflow-hidden rounded-xl">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="absolute top-3 right-3 z-10">
        <button 
          onClick={onClose}
          className="px-2 py-1 bg-slate-900/85 hover:bg-rose-500/20 hover:text-rose-400 text-xs font-mono rounded border border-slate-700/80 transition-colors text-slate-400 cursor-pointer"
        >
          Exit Matrix
        </button>
      </div>
      <div className="absolute bottom-3 left-3 z-10 pointer-events-none font-mono text-[10px] text-cyan-400 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
        MATRIX RAIN STREAM: ACTIVE
      </div>
    </div>
  );
}

export function Hero() {
  const words = ["Android Developer", "Software Engineer", "AI Enthusiast", "CS Student @ Galgotias"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  const [activeTab, setActiveTab] = useState<'profile' | 'terminal'>('profile');

  const [inputValue, setInputValue] = useState("");
  const [matrixActive, setMatrixActive] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    {
      command: "welcome",
      output: (
        <div>
          <p className="text-slate-400 font-mono text-[10px] md:text-xs"># Rishi Raj Verma - Environment v3.0.0</p>
          <p className="text-slate-300 font-mono text-[10px] md:text-xs mt-1">
            Enter: <span className="text-cyan-400 font-bold">skills</span>, <span className="text-cyan-400 font-bold">bio</span>, <span className="text-cyan-400 font-bold">research</span>, <span className="text-cyan-400 font-bold">matrix</span>
          </p>
        </div>
      )
    }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 35 : 75);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  useEffect(() => {
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    let response: React.ReactNode;
    switch (cleanCmd) {
      case 'help':
        response = (
          <div className="text-slate-450 font-mono text-[10px] md:text-xs leading-relaxed">
            Available programs:<br />
            - <span className="text-cyan-400 font-semibold">bio</span>: Author biography details.<br />
            - <span className="text-cyan-400 font-semibold">skills</span>: Key technologies stack.<br />
            - <span className="text-cyan-400 font-semibold">research</span>: Legal AI paper details.<br />
            - <span className="text-cyan-400 font-semibold">matrix</span>: Load terminal digital rain canvas.<br />
            - <span className="text-cyan-400 font-semibold">clear</span>: Flush terminal screen cache.
          </div>
        );
        break;
      case 'bio':
        response = (
          <div className="space-y-1 text-[10px] md:text-xs">
            <p className="text-cyan-400 font-mono font-semibold">rishi_raj_verma.sh</p>
            <p className="text-slate-350 leading-relaxed font-mono">
              B.Tech Computer Science student @ Galgotias (Class of 2026). Specializes in Android development and AI solutions. Primary author of "Code Legalist".
            </p>
          </div>
        );
        break;
      case 'skills':
        response = (
          <div className="grid grid-cols-2 gap-y-1 gap-x-2 font-mono text-[10px] md:text-[11px] text-cyan-300">
            <div>• Kotlin & Java (Native)</div>
            <div>• Jetpack Compose</div>
            <div>• Node.js & MongoDB</div>
            <div>• Retrofit & Room DB</div>
            <div>• MVVM Clean Architecture</div>
            <div>• Python / LLMs Integration</div>
          </div>
        );
        break;
      case 'research':
        response = (
          <div className="space-y-1 text-[10px] md:text-xs font-mono">
            <p className="text-emerald-400 font-semibold">Code Legalist: Legal AI Advisor System</p>
            <p className="text-slate-300">
              Validated on 5,000 queries. Achieved **96.84% accuracy** and sub-millisecond database queries using MongoDB indexing.
            </p>
            <p className="text-slate-500 text-[9px] md:text-[10px]">Type 'cat Code_Legalist_Research_Paper.pdf' in CLI or scroll to Research section.</p>
          </div>
        );
        break;
      case 'matrix':
        setMatrixActive(true);
        setInputValue("");
        return;
      case 'clear':
        setTerminalHistory([]);
        setInputValue("");
        return;
      default:
        response = (
          <p className="text-rose-450 font-mono text-[10px] md:text-xs">
            bash: program not found: '{cmd}'. Enter 'help' for support.
          </p>
        );
    }

    setTerminalHistory(prev => [...prev, { command: cmd, output: response }]);
    setInputValue("");
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputValue);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 pt-24 pb-16">
      
      {/* 3D Space Planet/Stars Background Canvas */}
      <SpaceGlobe />

      {/* Aurora glow indicators */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none z-1" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none z-1" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/35 rounded-full text-cyan-400 text-xs font-semibold tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
              PRIMARY AUTHOR & ANDROID ENGINEER
            </div>
            
            <h1 className="text-5xl md:text-7.5xl font-extrabold text-white tracking-tight leading-tight">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                Rishi Raj Verma
              </span>
            </h1>
            
            <div className="h-12 flex items-center">
              <p className="text-2xl md:text-3.5xl font-bold text-slate-350 font-mono">
                &gt; <span className="text-cyan-400 code-glow">{text}</span>
                <span className="animate-ping ml-1 font-bold text-cyan-400">|</span>
              </p>
            </div>

            <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
              BTech Computer Science student at **Galgotias University** ('26). 
              Crafting high-performance native Android apps, building clean architectures, 
              and researching language models via **Code Legalist**.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </a>
              <a
                href="/Rishi_Raj_Verma_Resume.pdf"
                download="Rishi_Raj_Verma_Resume.pdf"
                className="px-6 py-3.5 border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5 text-cyan-400" />
                Get Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-5 pt-4 text-slate-400">
              <a href="https://github.com/Rishi-scse" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-all hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/rishi-raj-verma-090564324" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-all hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="tel:+918789514968" className="hover:text-cyan-400 transition-all hover:scale-110">
                <Phone className="w-6 h-6" />
              </a>
              <a href="https://leetcode.com/Rishi-rajverma2002" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-all hover:scale-110 flex items-center gap-1 font-mono text-sm font-semibold">
                <Code2 className="w-5 h-5" />
                LeetCode
              </a>
            </div>
          </motion.div>
          
          {/* Right Column: Switching Hub */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 w-full max-w-lg mx-auto"
          >
            <div className="glass-panel w-full rounded-3xl overflow-hidden border border-cyan-500/10 shadow-2xl shadow-cyan-950/20 relative z-10 bg-slate-950/80">
              
              {/* Tab Selector */}
              <div className="bg-slate-950/90 px-4 pt-3 flex items-center border-b border-slate-900 justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => { setActiveTab('profile'); setMatrixActive(false); }}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-t-xl transition-all duration-300 cursor-pointer ${
                      activeTab === 'profile'
                        ? 'bg-slate-900 border-t border-x border-cyan-500/20 text-cyan-400 shadow-[0_-2px_10px_rgba(6,182,212,0.1)]'
                        : 'text-slate-500 hover:text-slate-350'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    profile.hud
                  </button>
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-t-xl transition-all duration-300 cursor-pointer ${
                      activeTab === 'terminal'
                        ? 'bg-slate-900 border-t border-x border-cyan-500/20 text-cyan-400 shadow-[0_-2px_10px_rgba(6,182,212,0.1)]'
                        : 'text-slate-500 hover:text-slate-350'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    terminal.bash
                  </button>
                </div>
                
                {/* Visual Window dots */}
                <div className="flex gap-1.5 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                </div>
              </div>

              {/* Tab Display Area */}
              <div className="bg-slate-900/40 relative">
                
                <AnimatePresence mode="wait">
                  {/* Tab 1: Profile HUD */}
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="p-8 flex flex-col items-center text-center space-y-6"
                    >
                      {/* 3D tilt frame */}
                      <div 
                        ref={cardRef}
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        style={{
                          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                          transition: 'transform 0.1s ease-out'
                        }}
                        className="relative w-44 h-44 rounded-full group cursor-pointer"
                      >
                        <div className="absolute inset-[-12px] border border-cyan-500/25 rounded-full animate-spin" style={{ animationDuration: '18s' }} />
                        <div className="absolute inset-[-6px] border border-blue-500/15 rounded-full animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
                        
                        <div className="absolute inset-[-12px] rounded-full animate-orbit">
                          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_12px_#06b6d4] border-2 border-slate-950" />
                        </div>
                        
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-xl shadow-cyan-950/40 relative z-10 bg-slate-950">
                          <img 
                            src="/profile.jpg" 
                            alt="Rishi Raj Verma" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
                          Rishi Raj Verma
                          <ShieldCheck className="w-5 h-5 text-cyan-400" />
                        </h3>
                        <p className="font-mono text-xs text-slate-400">Class of 2026 | BTech CSE @ Galgotias</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 w-full font-mono text-[10px] text-slate-350">
                        <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-900 text-left flex items-start gap-2">
                          <Cpu className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-500 block text-[9px] mb-0.5">RESEARCH</span>
                            <span className="text-cyan-400 font-semibold leading-tight">Primary Author</span>
                          </div>
                        </div>
                        <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-900 text-left flex items-start gap-2">
                          <Terminal className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-500 block text-[9px] mb-0.5">INTERNSHIP</span>
                            <span className="text-blue-400 font-semibold leading-tight">CodeSoft Android</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab 2: CRT Bash Terminal */}
                  {activeTab === 'terminal' && (
                    <motion.div
                      key="terminal-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="crt-screen relative"
                    >
                      <div className="crt-scanline" />
                      
                      {matrixActive ? (
                        <MatrixRain onClose={() => setMatrixActive(false)} />
                      ) : (
                        <div className="p-5 h-[280px] overflow-y-auto font-mono text-[10px] md:text-[11px] space-y-4 bg-slate-950/90 text-slate-200 shadow-inner">
                          {terminalHistory.map((item, idx) => (
                            <div key={idx} className="space-y-1">
                              {item.command !== "welcome" && (
                                <p className="text-slate-500">
                                  <span className="text-cyan-500 font-bold">$</span> {item.command}
                                </p>
                              )}
                              <div className="leading-relaxed">{item.output}</div>
                            </div>
                          ))}
                          <div ref={terminalEndRef} />
                        </div>
                      )}

                      {!matrixActive && (
                        <form onSubmit={handleTerminalSubmit} className="bg-slate-950 border-t border-slate-900 px-4 py-2.5 flex items-center gap-2">
                          <span className="text-cyan-500 font-bold font-mono text-xs">$</span>
                          <input
                            type="text"
                            placeholder="type 'help' or click shortcut chips below..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-slate-200 placeholder-slate-600 focus:ring-0 focus:outline-none"
                            autoComplete="off"
                          />
                          <button type="submit" className="text-slate-500 hover:text-cyan-400 transition-colors p-1 cursor-pointer" aria-label="Submit command">
                            <CornerDownLeft className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      )}

                      {!matrixActive && (
                        <div className="bg-slate-950/80 px-4 py-2.5 border-t border-slate-900/60 flex flex-wrap gap-1.5">
                          {['bio', 'skills', 'research', 'matrix'].map((cmd) => (
                            <button
                              key={cmd}
                              onClick={() => executeCommand(cmd)}
                              className="px-2.5 py-0.5 bg-slate-900/85 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 text-[9px] md:text-[10px] text-slate-400 font-mono rounded border border-slate-800/80 transition-all duration-200 cursor-pointer"
                            >
                              {cmd}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:block z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="w-5 h-9 border border-slate-700 rounded-full p-1 flex justify-center cursor-pointer hover:border-cyan-500/50 transition-colors"
          onClick={() => {
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="w-1.5 h-2 bg-cyan-400 rounded-full" />
        </motion.div>
      </div>

    </section>
  );
}
