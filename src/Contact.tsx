import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Code2, Send } from 'lucide-react';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
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
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Rishi-scse",
      color: "hover:text-white hover:border-slate-350 hover:bg-slate-900/60"
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

  return (
    <section id="contact" className="py-20 bg-slate-900 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b22_1px,transparent_1px),linear-gradient(to_bottom,#1e293b22_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Get In <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6 rounded-full" />
          <p className="text-center text-slate-400 text-base md:text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, internships, software developer roles, 
            or tech collaborations. Drop a message!
          </p>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
            
            {/* Contact Info Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white tracking-tight mb-4">Contact Information</h3>
                
                {contactInfo.map((contact, idx) => (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                  >
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className={`flex items-start gap-4 p-5 bg-slate-950/40 backdrop-blur-md rounded-2xl border border-slate-800/80 transition-all duration-300 group hover:-translate-y-0.5 ${contact.glow}`}
                      >
                        <div className={`bg-gradient-to-r ${contact.color} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                          <contact.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs font-mono mb-1">{contact.label}</p>
                          <p className="text-white text-base md:text-lg group-hover:text-cyan-300 transition-colors font-semibold tracking-tight">{contact.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 p-5 bg-slate-950/40 backdrop-blur-md rounded-2xl border border-slate-800/80">
                        <div className={`bg-gradient-to-r ${contact.color} p-3 rounded-xl shadow-md`}>
                          <contact.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs font-mono mb-1">{contact.label}</p>
                          <p className="text-white text-base md:text-lg font-semibold tracking-tight">{contact.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-800/60 mt-8">
                <h4 className="text-lg font-bold text-white mb-4 tracking-tight">Connect on Social Platforms</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, idx) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: idx * 0.1 + 0.5, duration: 0.4 }}
                      className={`p-4 bg-slate-950/40 backdrop-blur-md rounded-2xl border border-slate-800/80 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                      title={social.label}
                    >
                      <social.icon className="w-5.5 h-5.5 transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA Box Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-panel p-8 rounded-3xl border border-slate-800/85 flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              {/* Subtle accent border lights */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-cyan-500/10 rounded-full blur-[40px] pointer-events-none" />

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-4">Let's Build Something Great</h3>
                <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed">
                  I'm actively searching for internship opportunities and associate software roles. 
                  If you are looking for an adaptable, highly motivated developer, drop a line!
                </p>

                <div className="space-y-4">
                  <div className="glass-card p-5 rounded-2xl border border-slate-800/60 hover:border-cyan-500/20 transition-all duration-300">
                    <h4 className="text-sm font-bold text-white mb-1">📱 Mobile Development</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">High fidelity native Android apps utilizing clean architectures and Jetpack Compose.</p>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-slate-800/60 hover:border-blue-500/20 transition-all duration-300">
                    <h4 className="text-sm font-bold text-white mb-1">🤖 AI Integrations</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Infusing models (LLMs, GenAI APIs) into user-facing mobile workflows.</p>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-slate-800/60 hover:border-purple-500/20 transition-all duration-300">
                    <h4 className="text-sm font-bold text-white mb-1">🔧 Systems & Backends</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Secure integrations with Node.js controllers, MongoDB collections, and microservice architectures.</p>
                  </div>
                </div>
              </div>

              <a
                href="mailto:vermaankush427@gmail.com"
                className="mt-8 w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/40 font-bold hover:-translate-y-0.5 text-sm md:text-base"
              >
                <Send className="w-4 h-4" />
                Send Me an Email
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
