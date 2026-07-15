import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Cpu, User, Sparkles } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hello! I am Rishi's AI assistant. Ask me anything about his qualifications, projects, or research paper!" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Who is Rishi?",
    "Tell me about Code Legalist",
    "What is his tech stack?",
    "Is he open to roles?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('who is rishi') || q.includes('about rishi') || q.includes('profile')) {
      return "Rishi Raj Verma is a B.Tech Computer Science student at Galgotias University (Class of 2026). He is a passionate Android Developer specializing in clean MVVM architectures, native Jetpack Compose interfaces, and AI API integrations.";
    }
    if (q.includes('legalist') || q.includes('paper') || q.includes('research')) {
      return "Code Legalist is Rishi's primary research publication (Feb 2026). It's an AI-based Legal Advisor App that routes natural language user queries to LLMs, cross-checking facts with a local MongoDB index database. It achieves 96.84% accuracy and under 1.9s latencies!";
    }
    if (q.includes('stack') || q.includes('skills') || q.includes('languages') || q.includes('technologies')) {
      return "Rishi's primary stack includes Kotlin, Java, Jetpack Compose, Room DB, Retrofit, Node.js, Express.js, MongoDB, Firebase, and basic Python ML integration. He maintains clean MVVM/MVI architectures.";
    }
    if (q.includes('roles') || q.includes('internship') || q.includes('job') || q.includes('hire')) {
      return "Yes! Rishi is active and open for Android Developer Internships and Associate Software Engineer roles. He is willing to relocate or work remotely. You can get in touch via email at vermaankush427@gmail.com!";
    }
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('address')) {
      return "You can contact Rishi via email at vermaankush427@gmail.com, call/WhatsApp at +918789514968, or find him on LinkedIn (rishi-raj-verma-090564324) and GitHub (Rishi-scse).";
    }
    return "Interesting question! Rishi is highly skilled in Kotlin, Android SDK, and backend database aggregates. Feel free to contact him directly at vermaankush427@gmail.com for specific details!";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getBotResponse(text);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full shadow-[0_0_20px_rgba(6,182,212,0.35)] border border-cyan-400/25 flex items-center justify-center cursor-pointer relative"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-cyan-400 rounded-full border-2 border-slate-950 animate-ping" />
        )}
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="glass-panel absolute bottom-18 right-0 w-80 sm:w-92 h-[460px] rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl flex flex-col justify-between z-10 bg-slate-950/95"
          >
            
            {/* Header */}
            <div className="bg-slate-950/85 px-4.5 py-4 border-b border-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-none">Ask about Rishi</h4>
                  <span className="text-[9px] text-slate-500 font-mono mt-0.5 block">AI UPLINK: ONLINE</span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-500 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-900/10">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[85%] ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Icon tag */}
                    <div className={`p-1 rounded-md text-[10px] mt-0.5 flex-shrink-0 ${
                      m.sender === 'user' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {m.sender === 'user' ? <User className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                    </div>

                    <div className={`p-3 rounded-2xl text-[11px] leading-relaxed text-left ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-sm shadow-md'
                        : 'bg-slate-950 border border-slate-850 text-slate-300 rounded-tl-sm'
                    }`}>
                      {m.text}
                    </div>

                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="p-1 bg-slate-800 text-slate-400 rounded-md">
                      <Sparkles className="w-3 h-3 animate-pulse" />
                    </div>
                    <div className="bg-slate-950 border border-slate-850 p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-slate-900 bg-slate-950/60 flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 text-[9px] text-slate-400 font-mono rounded-lg border border-slate-800 transition-all cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
              className="bg-slate-950 border-t border-slate-900 px-4 py-3 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about Rishi..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-sans text-xs text-white placeholder-slate-600 focus:ring-0 focus:outline-none"
              />
              <button
                type="submit"
                className="p-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
