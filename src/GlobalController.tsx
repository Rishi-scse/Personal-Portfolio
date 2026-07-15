import { createContext, useContext, useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ShieldAlert, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface GlobalContextType {
  cursorHovering: boolean;
  setCursorHovering: (hov: boolean) => void;
  audioPlaying: boolean;
  toggleAudio: () => void;
  devModeActive: boolean;
  setDevModeActive: (active: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobal must be used within GlobalProvider");
  return context;
}

// Synthetic Ambient Sound Engine using Web Audio API
class AudioEngine {
  private ctx: AudioContext | null = null;
  private oscillator1: OscillatorNode | null = null;
  private oscillator2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private mainGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  start() {
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Low base oscillator 1
      this.oscillator1 = this.ctx.createOscillator();
      this.oscillator1.type = 'sine';
      this.oscillator1.frequency.value = 55; // low A node

      // Soft tone oscillator 2
      this.oscillator2 = this.ctx.createOscillator();
      this.oscillator2.type = 'triangle';
      this.oscillator2.frequency.value = 110; // an octave higher

      // Filter to cut harsh highs
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.value = 250;

      // Volume Gain Nodes
      this.mainGain = this.ctx.createGain();
      this.mainGain.gain.value = 0.05; // very quiet, ambient

      // Low frequency modulator (creates engine swell/hum wave)
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.value = 0.15; // slow drift
      
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.value = 40; // sweep frequency by 40hz

      // Connect LFO modulation to filter cutoff
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filter.frequency);

      // Connect tones through filter to main output
      this.oscillator1.connect(this.filter);
      this.oscillator2.connect(this.filter);
      this.filter.connect(this.mainGain);
      this.mainGain.connect(this.ctx.destination);

      // Start sound nodes
      this.oscillator1.start(0);
      this.oscillator2.start(0);
      this.lfo.start(0);
    } catch (e) {
      console.warn("Audio Engine failed to initialize.", e);
    }
  }

  stop() {
    if (this.oscillator1) {
      try { this.oscillator1.stop(); } catch(e) {}
    }
    if (this.oscillator2) {
      try { this.oscillator2.stop(); } catch(e) {}
    }
    if (this.lfo) {
      try { this.lfo.stop(); } catch(e) {}
    }
    if (this.ctx) {
      this.ctx.close();
    }
  }
}

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [cursorHovering, setCursorHovering] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [devModeActive, setDevModeActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);

  const audioEngineRef = useRef<AudioEngine | null>(null);

  // Lenis Scrolling Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const scrollLoop = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(scrollLoop);
    };

    requestAnimationFrame(scrollLoop);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Loading Screen Timer
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 2;
      if (current >= 100) {
        current = 100;
        setLoadPercent(100);
        clearInterval(interval);
        setTimeout(() => setLoading(false), 800);
      } else {
        setLoadPercent(current);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  // Spotlight Follow & Hover Bindings
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    const spotlight = document.getElementById('mouse-spotlight');

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
      if (spotlight) {
        spotlight.style.left = `${e.clientX}px`;
        spotlight.style.top = `${e.clientY}px`;
      }
    };

    // Watch for hovering interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setCursorHovering(true);
      } else {
        setCursorHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Konami Code Surprise listener
  useEffect(() => {
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A
    let inputSequence: number[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      inputSequence.push(e.keyCode);
      inputSequence = inputSequence.slice(-konamiSequence.length);

      if (JSON.stringify(inputSequence) === JSON.stringify(konamiSequence)) {
        setDevModeActive(true);
        inputSequence = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle Ambient hum
  const toggleAudio = () => {
    if (audioPlaying) {
      audioEngineRef.current?.stop();
      setAudioPlaying(false);
    } else {
      if (!audioEngineRef.current) {
        audioEngineRef.current = new AudioEngine();
      }
      audioEngineRef.current.start();
      setAudioPlaying(true);
    }
  };

  return (
    <GlobalContext.Provider value={{
      cursorHovering,
      setCursorHovering,
      audioPlaying,
      toggleAudio,
      devModeActive,
      setDevModeActive
    }}>
      {/* Dynamic Cursor spotlight overlay */}
      <div id="custom-cursor" className={cursorHovering ? 'hovering' : ''} />
      <div id="mouse-spotlight" className="mouse-spotlight" />

      {/* Cinematic Audio Indicator overlay */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
        <button
          onClick={toggleAudio}
          className="p-2.5 bg-slate-950/80 hover:bg-cyan-500/10 text-cyan-400 border border-cyan-500/10 rounded-xl backdrop-blur-md shadow-lg transition-all duration-300 flex items-center justify-center cursor-pointer hover:border-cyan-500/30 group"
          title={audioPlaying ? "Mute Ambient music" : "Play Ambient music"}
        >
          {audioPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping absolute top-0.5 right-0.5" />
            </>
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
          )}
        </button>
        {audioPlaying && (
          <span className="font-mono text-[9px] text-cyan-500 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/10 backdrop-blur-md animate-pulse">
            AMBIENT ENGINE: ACTIVE
          </span>
        )}
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[99999] bg-slate-950 flex flex-col items-center justify-center"
          >
            <div className="space-y-6 text-center max-w-sm px-6">
              {/* Spinner logo */}
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 border-2 border-slate-900 rounded-full" />
                <div className="absolute inset-0 border-2 border-t-cyan-500 border-r-blue-500 rounded-full animate-spin" style={{ animationDuration: '1.2s' }} />
                <div className="absolute inset-3 border border-indigo-500/20 rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
                <Sparkles className="w-5 h-5 text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>

              <div className="space-y-2">
                <h2 className="font-mono text-xs font-bold text-white tracking-widest uppercase">DECODING CORE PORTFOLIO</h2>
                <div className="h-1 w-44 bg-slate-900 mx-auto rounded-full overflow-hidden border border-slate-900">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-70" style={{ width: `${loadPercent}%` }} />
                </div>
                <p className="font-mono text-[10px] text-slate-500">{loadPercent}% LOADING SYSTEM ASSETS</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konami Easter Egg Dashboard Console */}
      <AnimatePresence>
        {devModeActive && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDevModeActive(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="glass-panel w-full max-w-lg rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl relative z-10 bg-slate-950/95"
            >
              <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-500" />
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                  <span className="font-mono text-xs text-cyan-400 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    developer_mode_unlocked.sh
                  </span>
                  <button
                    onClick={() => setDevModeActive(false)}
                    className="text-xs font-mono px-2 py-0.5 border border-slate-800 hover:border-rose-500/30 hover:text-rose-400 text-slate-500 rounded transition-colors"
                  >
                    Close
                  </button>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-850 space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 animate-pulse" />
                    <div className="text-xs font-mono leading-relaxed text-slate-350">
                      <span className="text-white font-bold block mb-1">SECRET EASTER EGG UNLOCKED!</span>
                      Congratulations! You've input the Konami Code correctly. Here are the core environmental variables currently loaded:
                    </div>
                  </div>

                  <div className="space-y-1.5 font-mono text-[10px] text-cyan-400 bg-slate-950 p-3.5 rounded-xl border border-slate-900">
                    <p><span className="text-slate-500">ENV_USER:</span> Rishi Raj Verma</p>
                    <p><span className="text-slate-500">ENV_ROLE:</span> Android Intern @ CodeSoft</p>
                    <p><span className="text-slate-500">ENV_STATION:</span> Galgotias University</p>
                    <p><span className="text-slate-500">UPLINK_AUDIO:</span> Synthesized oscillator Hum</p>
                    <p><span className="text-slate-500">FPS_CAP:</span> 60Hz RequestAnimationFrame</p>
                  </div>
                </div>

                <button
                  onClick={() => setDevModeActive(false)}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-xs hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                >
                  Return to Portfolio
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {children}
    </GlobalContext.Provider>
  );
}
