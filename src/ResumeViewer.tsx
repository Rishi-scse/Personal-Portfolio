import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { FileText, Download, Printer, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

export function ResumeViewer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [zoom, setZoom] = useState(1);
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(1.4, prev + 0.1));
  const handleZoomOut = () => setZoom(prev => Math.max(0.7, prev - 0.1));

  const handlePrint = () => {
    const iframe = document.getElementById('resume-pdf-frame') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } else {
      window.print();
    }
  };

  const handleFullscreen = () => {
    if (viewerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        viewerRef.current.requestFullscreen().catch(err => {
          console.warn("Fullscreen toggle failed", err);
        });
      }
    }
  };

  return (
    <section id="resume-viewer" className="py-24 bg-slate-950 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Curriculum <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Vitae</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            Interact with or download my professional credentials directly below.
          </p>
        </div>

        {/* Glass Viewer Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          ref={viewerRef}
          className="glass-panel w-full max-w-4xl mx-auto rounded-3xl border border-cyan-500/15 overflow-hidden shadow-2xl bg-slate-950/70"
        >
          {/* Controls Bar */}
          <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-900 flex-wrap gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-white">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Rishi_Raj_Verma_Resume.pdf</span>
            </div>

            {/* Print/Zoom/Fullscreen Tools */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 0.7}
                className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-450 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 1.4}
                className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-450 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              
              <div className="w-[1px] h-6 bg-slate-900 mx-1 hidden sm:block" />

              <button
                onClick={handlePrint}
                className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-450 hover:text-white transition-colors cursor-pointer"
                title="Print PDF"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={handleFullscreen}
                className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-450 hover:text-white transition-colors cursor-pointer"
                title="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <a
                href="/Rishi_Raj_Verma_Resume.pdf"
                download="Rishi_Raj_Verma_Resume.pdf"
                className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border border-cyan-400/20 rounded-lg text-white transition-colors cursor-pointer flex items-center justify-center"
                title="Download Resume"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Embedded PDF iframe */}
          <div className="h-[500px] md:h-[650px] w-full overflow-hidden bg-slate-950 relative flex items-center justify-center">
            <iframe
              id="resume-pdf-frame"
              src="/Rishi_Raj_Verma_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
              className="w-full h-full border-none transition-transform duration-200 origin-center bg-slate-950"
              style={{
                transform: `scale(${zoom})`,
              }}
              title="Rishi Raj Verma Resume Preview"
            />
          </div>

        </motion.div>
        
      </div>
    </section>
  );
}
