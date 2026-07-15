import { Code2, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-cyan-500/10 py-10 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold tracking-tight">Rishi Raj Verma</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-cyan-400 fill-current animate-pulse" />
            <span>in Cosmic Ocean theme</span>
          </div>
          
          <p className="text-slate-500 text-xs font-mono">
            © 2026 Rishi Raj Verma.
          </p>
        </div>
      </div>
    </footer>
  );
}
