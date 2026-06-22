import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Phone, Code2, Terminal, Play, CornerDownLeft, Sparkles, Download } from 'lucide-react';

export function Hero() {
  // Typing animation state
  const words = ["Android Developer", "Software Engineer", "AI Enthusiast", "CS Student @ Galgotias"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  // Terminal state
  const [inputValue, setInputValue] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    {
      command: "welcome",
      output: (
        <div>
          <p className="text-slate-400"># Rishi's Developer Environment v1.4.0</p>
          <p className="text-slate-300">Click a quick command below or type your own (e.g. <span className="text-cyan-400">skills</span>, <span className="text-cyan-400">bio</span>, <span className="text-cyan-400">experience</span>):</p>
        </div>
      )
    }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Typing effect loop
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 35 : 85);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  useEffect(() => {
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index]);

  // Terminal scroll-to-bottom
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
          <div className="text-slate-400">
            Available commands: <span className="text-cyan-400">bio</span>, <span className="text-cyan-400">skills</span>, <span className="text-cyan-400">experience</span>, <span className="text-cyan-400">contact</span>, <span className="text-cyan-400">clear</span>
          </div>
        );
        break;
      case 'bio':
      case 'cat bio.md':
        response = (
          <div className="space-y-1">
            <p className="text-cyan-400 font-semibold">rishi_raj_verma.md</p>
            <p className="text-slate-300 leading-relaxed">
              Computer Science student at Galgotias University (Class of 2026). 
              Specialized in Android applications and AI-driven solutions. 
              Primary Author of "Code Legalist" research paper.
            </p>
          </div>
        );
        break;
      case 'skills':
      case 'ls skills':
      case 'ls':
        response = (
          <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-emerald-400 font-mono text-sm">
            <div>• Kotlin / Java / C</div>
            <div>• Jetpack Compose</div>
            <div>• Android SDK & Room DB</div>
            <div>• REST APIs (Retrofit)</div>
            <div>• Node.js & MongoDB</div>
            <div>• DSA / DBMS / OS</div>
          </div>
        );
        break;
      case 'experience':
      case 'node experience.js':
        response = (
          <div className="space-y-1">
            <p className="text-yellow-400 font-semibold">CodeSoft - Android Intern</p>
            <p className="text-slate-400 text-xs">Nov 2025 - Dec 2025 | Remote</p>
            <p className="text-slate-300">
              Developed mobile apps using Kotlin & Clean Architecture. 
              Optimized REST API integration by ~40% using Retrofit.
            </p>
          </div>
        );
        break;
      case 'contact':
      case 'cat contact.json':
        response = (
          <div className="text-slate-300 font-mono text-sm">
            {"{"}
            <div className="pl-4">"email": "vermaankush427@gmail.com",</div>
            <div className="pl-4">"phone": "+918789514968",</div>
            <div className="pl-4">"location": "Greater Noida, UP"</div>
            {"}"}
          </div>
        );
        break;
      case 'clear':
        setTerminalHistory([]);
        setInputValue("");
        return;
      default:
        response = (
          <p className="text-rose-400 font-mono text-sm">
            Command not found: '{cmd}'. Type 'help' or click shortcuts.
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 pt-20">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b55_1px,transparent_1px),linear-gradient(to_bottom,#1e293b55_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Glow Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 relative z-10 py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
              Open for Internships & Roles
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Rishi Raj Verma
              </span>
            </h1>
            
            <div className="h-12 flex items-center">
              <p className="text-2xl md:text-3xl font-medium text-slate-300 font-mono">
                &gt; <span className="text-cyan-400">{text}</span>
                <span className="animate-ping ml-1 font-bold">|</span>
              </p>
            </div>

            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              BTech Computer Science student at Galgotias University. Passionate Android Developer Intern 
              building scalable apps with Clean Architecture and AI capabilities.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="mailto:vermaankush427@gmail.com"
                className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </a>
              <a
                href="/Rishi_Raj_Verma_Resume.pdf"
                download="Rishi_Raj_Verma_Resume.pdf"
                className="px-6 py-3.5 border border-slate-700 bg-slate-900/40 hover:bg-slate-800/80 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5 text-cyan-400" />
                Get Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-5 pt-4 text-slate-400">
              <a href="https://github.com/Rishi-scse" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/rishi-raj-verma-090564324" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="tel:+918789514968" className="hover:text-cyan-400 transition-colors hover:scale-110">
                <Phone className="w-6 h-6" />
              </a>
              <a href="https://leetcode.com/Rishi-rajverma2002" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors hover:scale-110 flex items-center gap-1 font-mono text-sm font-semibold">
                <Code2 className="w-5 h-5" />
                LeetCode
              </a>
            </div>
          </motion.div>
          
          {/* Terminal / Code Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="glass-panel w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-cyan-950/20 max-w-lg mx-auto">
              
              {/* Terminal Window Bar */}
              <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Terminal className="w-3.5 h-3.5" />
                  bash - rishi@portfolio
                </div>
                <div className="w-12" /> {/* spacer */}
              </div>

              {/* Terminal Screen Body */}
              <div className="p-5 h-72 overflow-y-auto font-mono text-sm space-y-4 bg-slate-950/80">
                
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    {item.command !== "welcome" && (
                      <p className="text-slate-400">
                        <span className="text-cyan-500 font-bold">$</span> {item.command}
                      </p>
                    )}
                    <div>{item.output}</div>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Keyboard Input Bar */}
              <form onSubmit={handleTerminalSubmit} className="bg-slate-950/90 border-t border-slate-900 px-4 py-3 flex items-center gap-2">
                <span className="text-cyan-500 font-bold font-mono">$</span>
                <input
                  type="text"
                  placeholder="type 'help' and press enter..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-slate-200 placeholder-slate-600 focus:ring-0"
                />
                <button type="submit" className="text-slate-500 hover:text-cyan-400 transition-colors p-1" aria-label="Run command">
                  <CornerDownLeft className="w-4 h-4" />
                </button>
              </form>

              {/* Terminal Quick Chips */}
              <div className="bg-slate-900/40 px-4 py-3.5 border-t border-slate-900/80 flex flex-wrap gap-2">
                <button
                  onClick={() => executeCommand("cat bio.md")}
                  className="px-2.5 py-1 bg-slate-800/80 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 text-xs text-slate-400 font-mono rounded border border-slate-700/60 transition-all duration-200"
                >
                  bio.md
                </button>
                <button
                  onClick={() => executeCommand("ls skills")}
                  className="px-2.5 py-1 bg-slate-800/80 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 text-xs text-slate-400 font-mono rounded border border-slate-700/60 transition-all duration-200"
                >
                  skills.sh
                </button>
                <button
                  onClick={() => executeCommand("node experience.js")}
                  className="px-2.5 py-1 bg-slate-800/80 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 text-xs text-slate-400 font-mono rounded border border-slate-700/60 transition-all duration-200"
                >
                  experience.js
                </button>
                <button
                  onClick={() => executeCommand("cat contact.json")}
                  className="px-2.5 py-1 bg-slate-800/80 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 text-xs text-slate-400 font-mono rounded border border-slate-700/60 transition-all duration-200"
                >
                  contact.json
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border border-slate-600 rounded-full p-1 flex justify-center cursor-pointer"
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
