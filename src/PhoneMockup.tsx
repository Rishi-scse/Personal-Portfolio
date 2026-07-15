import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, ChevronLeft, ChevronRight, MessageSquare, ShieldAlert, AlarmClock, Calendar, Cpu } from 'lucide-react';

interface ScreenSlide {
  title: string;
  tagline: string;
  app: string;
  icon: any;
  content: React.ReactNode;
}

export function PhoneMockup() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides: ScreenSlide[] = [
    {
      title: "Legal AI Advisor",
      tagline: "Snapshot: Home Dashboard",
      app: "Code Legalist",
      icon: Cpu,
      content: (
        <div className="w-full h-full bg-slate-950 flex flex-col justify-between text-white font-sans text-[11px] p-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-900 mt-2">
            <span className="font-bold text-cyan-400">Legal Helper</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          {/* Search bar */}
          <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-500 text-[10px]">
            Ask your legal question...
          </div>

          {/* Categories Grid */}
          <div className="space-y-2">
            <p className="text-slate-500 font-semibold text-[9px] uppercase tracking-wider">Quick Categories</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-cyan-400 block text-sm">⚖️</span>
                <span className="font-bold block mt-1">Consumer Law</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-purple-400 block text-sm">🏛️</span>
                <span className="font-bold block mt-1">Criminal Law</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-blue-400 block text-sm">🏡</span>
                <span className="font-bold block mt-1">Property Law</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-pink-400 block text-sm">🤝</span>
                <span className="font-bold block mt-1">Contract Law</span>
              </div>
            </div>
          </div>

          {/* System status */}
          <div className="bg-cyan-500/5 border border-cyan-500/15 p-2 rounded-xl text-[9px] text-cyan-400 text-center leading-tight">
            SYSTEM STATUS: ONLINE (ACCURACY 96.8%)
          </div>
        </div>
      )
    },
    {
      title: "AI Chatbot UI",
      tagline: "Snapshot: Conversation Thread",
      app: "Code Legalist",
      icon: MessageSquare,
      content: (
        <div className="w-full h-full bg-slate-950 flex flex-col justify-between text-white font-sans text-[11px] p-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-900 mt-2">
            <span className="font-bold text-cyan-400">Legal Chatbot</span>
            <span className="text-slate-500 text-[9px]">Ask anything</span>
          </div>

          {/* Chat bubbles */}
          <div className="space-y-3 flex-1 py-4 overflow-y-auto">
            {/* User */}
            <div className="flex justify-end">
              <div className="bg-cyan-600/90 text-white rounded-2xl rounded-tr-sm p-2.5 max-w-[85%] text-left leading-relaxed">
                What are my rights if I buy a defective product?
              </div>
            </div>
            {/* AI */}
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-slate-800 text-slate-300 rounded-2xl rounded-tl-sm p-2.5 max-w-[85%] text-left leading-relaxed">
                Under CPA 2019, you have the right to:<br />
                1. Get a replacement or refund.<br />
                2. Get free repair services.<br />
                3. File a complaint with the Consumer Court.
              </div>
            </div>
          </div>

          {/* Input panel */}
          <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl text-slate-500 text-[9px] flex justify-between items-center">
            <span>Type your query...</span>
            <span className="text-cyan-400">▶</span>
          </div>
        </div>
      )
    },
    {
      title: "Advanced Alarm App",
      tagline: "Snapshot: Alarm Logs",
      app: "Alarm System",
      icon: AlarmClock,
      content: (
        <div className="w-full h-full bg-slate-950 flex flex-col justify-between text-white font-sans text-[11px] p-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-900 mt-2">
            <span className="font-bold text-blue-400">Alarms Manager</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            </span>
          </div>

          {/* Alarm list */}
          <div className="space-y-2.5 py-4 flex-1">
            <div className="bg-slate-900/60 border border-slate-900 p-3 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-2xl font-black block leading-none">06:30</span>
                <span className="text-slate-500 text-[8px] mt-1 block">Mon, Tue, Wed, Thu, Fri</span>
              </div>
              <div className="w-8 h-4.5 bg-blue-500 rounded-full p-0.5 flex justify-end items-center cursor-pointer">
                <div className="w-3.5 h-3.5 bg-white rounded-full" />
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-900 p-3 rounded-xl flex items-center justify-between opacity-60">
              <div>
                <span className="text-2xl font-black block leading-none">09:00</span>
                <span className="text-slate-500 text-[8px] mt-1 block">Saturday, Sunday</span>
              </div>
              <div className="w-8 h-4.5 bg-slate-800 rounded-full p-0.5 flex justify-start items-center cursor-pointer">
                <div className="w-3.5 h-3.5 bg-slate-600 rounded-full" />
              </div>
            </div>
          </div>

          {/* Broadcast triggers info */}
          <div className="bg-blue-500/5 border border-blue-500/15 p-2 rounded-xl text-[9px] text-blue-400 text-center leading-tight">
            BROADCAST LISTENERS: CONNECTED (ROOM CACHING)
          </div>
        </div>
      )
    }
  ];

  // Auto-slide loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setActiveSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveSlide(prev => (prev + 1) % slides.length);
  };

  const active = slides[activeSlide];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      
      {/* Smartphone Frame Wrapper */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="relative w-64 h-[490px] bg-slate-900 border-[7px] border-slate-800 rounded-[38px] shadow-2xl shadow-cyan-950/20 overflow-hidden flex flex-col justify-between"
        style={{
          boxShadow: '0 0 35px rgba(6, 182, 212, 0.1), inset 0 0 10px rgba(0, 0, 0, 0.8)'
        }}
      >
        
        {/* Top Camera Punch hole & speaker */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center gap-1.5">
          <div className="w-2.5 h-1 bg-slate-800 rounded-full" />
          <div className="w-1.5 h-1.5 bg-slate-950 rounded-full border border-slate-850" />
        </div>

        {/* Dynamic Display Screen */}
        <div className="flex-1 w-full relative z-10 overflow-hidden bg-slate-950 pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              {active.content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Screen Gloss Reflection Overlay */}
        <div 
          className="absolute inset-0 z-15 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0) 100%)'
          }}
        />

        {/* Bottom Android Pill Navigation Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-slate-700 rounded-full z-20" />

      </motion.div>

      {/* Screen Title & Manual Slide Controls */}
      <div className="w-full flex items-center justify-between px-6">
        <button 
          onClick={handlePrev}
          className="p-2 border border-slate-800 hover:border-cyan-500/35 bg-slate-950/80 hover:bg-cyan-500/10 text-slate-450 hover:text-cyan-400 rounded-xl transition-all duration-300 cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-white font-bold tracking-tight">
            <active.icon className="w-3.5 h-3.5 text-cyan-400" />
            {active.app}
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{active.tagline}</span>
        </div>

        <button 
          onClick={handleNext}
          className="p-2 border border-slate-800 hover:border-cyan-500/35 bg-slate-950/80 hover:bg-cyan-500/10 text-slate-450 hover:text-cyan-400 rounded-xl transition-all duration-300 cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeSlide === idx ? 'bg-cyan-400 w-4 shadow-[0_0_8px_#06b6d4]' : 'bg-slate-800'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
