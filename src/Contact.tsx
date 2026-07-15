import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { Mail, Phone, Linkedin, Github, MapPin, Code2, Send, Terminal, ShieldCheck, CheckCircle2, Clipboard, Check } from 'lucide-react';

interface ContactInfo {
  icon: any;
  label: string;
  value: string;
  href?: string;
  color: string;
  glow: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email Address",
    value: "vermaankush427@gmail.com",
    href: "mailto:vermaankush427@gmail.com",
    color: "from-cyan-500 to-blue-500",
    glow: "hover:border-cyan-500/30"
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91-8789514968",
    href: "tel:+918789514968",
    color: "from-blue-500 to-indigo-500",
    glow: "hover:border-blue-500/30"
  },
  {
    icon: MapPin,
    label: "Current Location",
    value: "Greater Noida, UP",
    href: "https://www.google.com/maps/search/?api=1&query=Greater+Noida,+Uttar+Pradesh",
    color: "from-indigo-500 to-purple-500",
    glow: "hover:border-indigo-500/30"
  }
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Rishi-scse",
    color: "hover:text-white hover:border-slate-300 hover:bg-slate-900/60"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/rishi-raj-verma-090564324",
    color: "hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5"
  },
  {
    icon: Code2,
    label: "LeetCode",
    href: "https://leetcode.com/Rishi-rajverma2002",
    color: "hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5"
  }
];

export function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [logLogs, setLogLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Copy email logic
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vermaankush427@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulation log typing
  useEffect(() => {
    if (status !== 'sending') return;

    const logs = [
      "Establishing link to rishi.gateway...",
      "Resolving socket handshakes...",
      "Verifying sender email headers...",
      "Payload compiled successfully.",
      "Delivering packet size 1.02kb...",
      "Uplink transmission completed."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setLogLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStatus('success');
          window.open(`mailto:vermaankush427@gmail.com?subject=Portfolio Message from ${name}&body=${message}`);
        }, 1000);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [status, name, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLogLogs([]);
    setStatus('sending');
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus('idle');
    setLogLogs([]);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b11_1px,transparent_1px),linear-gradient(to_bottom,#1e293b11_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-1" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Get In <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-450 text-sm md:text-base mt-4 max-w-2xl mx-auto">
              Want to discuss research papers, Android projects, or internships? Ping me!
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-stretch">
            
            {/* Left Column: Direct channels (Span 5) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-5 flex flex-col justify-between gap-6"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Direct Channels</h3>
                  {/* Copy Email Fast Action */}
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/80 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/35 rounded-xl font-mono text-[9px] font-bold uppercase transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-3.5 h-3.5" />
                        Copy Email
                      </>
                    )}
                  </button>
                </div>
                
                {contactInfo.map((contact, idx) => {
                  const Icon = contact.icon;
                  return (
                    <motion.div
                      key={contact.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                      transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                    >
                      <a
                        href={contact.href}
                        target={contact.href?.startsWith('http') ? "_blank" : undefined}
                        rel={contact.href?.startsWith('http') ? "noopener noreferrer" : undefined}
                        className={`flex items-start gap-4 p-5 bg-slate-950/40 backdrop-blur-md rounded-2xl border border-slate-850 hover:-translate-y-0.5 transition-all duration-300 group ${contact.glow}`}
                      >
                        <div className={`bg-gradient-to-r ${contact.color} p-2.5 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-md`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-slate-500 text-[10px] font-mono font-semibold uppercase">{contact.label}</p>
                          <p className="text-white text-sm md:text-base group-hover:text-cyan-300 transition-colors font-bold tracking-tight">{contact.value}</p>
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social coordinates */}
              <div className="pt-6 border-t border-slate-800/60 mt-6 space-y-4">
                <h4 className="text-base font-bold text-white tracking-tight">Social Coordinates</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, idx) => {
                    const SocialIcon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                        transition={{ delay: idx * 0.1 + 0.5, duration: 0.4 }}
                        className={`p-3.5 bg-slate-950/50 backdrop-blur-md rounded-2xl border border-slate-850 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.color} cursor-pointer`}
                        title={social.label}
                      >
                        <SocialIcon className="w-5 h-5 transition-colors" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Console Form (Span 7) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/10 flex flex-col justify-between shadow-2xl relative overflow-hidden bg-slate-950/55"
            >
              <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none" />

              <AnimatePresence mode="wait">
                
                {/* State 1: Form Inputs */}
                {status === 'idle' && (
                  <motion.div
                    key="idle-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                      <span className="font-mono text-xs text-slate-500 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        rishi@uplink:~/messenger
                      </span>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1.5">Sender Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-slate-650 focus:border-cyan-500/50 focus:ring-0 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@domain.com"
                          className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-slate-650 focus:border-cyan-500/50 focus:ring-0 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1.5">Message Body</label>
                        <textarea
                          required
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Write your transmission details..."
                          className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-slate-650 focus:border-cyan-500/50 focus:ring-0 focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      {/* Code Object Serializer */}
                      {(name || email || message) && (
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-[9px] text-cyan-400 space-y-1 overflow-hidden shadow-inner">
                          <p className="text-slate-500">// LIVE PACKET SERIALIZER</p>
                          <p className="text-purple-400">const <span className="text-cyan-400">payload</span> = &#123;</p>
                          <p className="pl-4">name: <span className="text-amber-300">"{name}"</span>,</p>
                          <p className="pl-4">email: <span className="text-amber-300">"{email}"</span>,</p>
                          <p className="pl-4">body: <span className="text-amber-300">"{message.slice(0, 35)}..."</span></p>
                          <p className="text-purple-400">&#125;;</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-cyan-950/20 hover:-translate-y-0.5 cursor-pointer group"
                      >
                        <motion.div
                          className="flex items-center gap-2"
                        >
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Send Transmission
                        </motion.div>
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* State 2: Sending handshakes */}
                {status === 'sending' && (
                  <motion.div
                    key="sending-logs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 py-8 flex flex-col justify-between min-h-[300px]"
                  >
                    <div className="space-y-2.5 font-mono text-xs text-cyan-400">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5" />
                          uplink_monitor.sh
                        </span>
                        <span className="text-cyan-400 animate-pulse uppercase">TRANSMITTING...</span>
                      </div>
                      
                      <div className="space-y-1 pt-4 text-[10px]">
                        {logLogs.map((log, idx) => (
                          <p key={idx} className="flex items-center gap-2">
                            <span className="text-cyan-500 select-none">&gt;&gt;</span>
                            <span>{log}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-850">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse w-4/5" />
                    </div>
                  </motion.div>
                )}

                {/* State 3: Success Screen */}
                {status === 'success' && (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center text-center space-y-6 justify-center min-h-[300px]"
                  >
                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full animate-bounce shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Transmission Successful!</h3>
                      <p className="text-slate-400 text-xs md:text-sm max-w-sm mx-auto font-mono">
                        Handshake completed. Fallback mail client triggered to secure transmission delivery.
                      </p>
                    </div>

                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-355 hover:text-white rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer"
                    >
                      New Transmission
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
