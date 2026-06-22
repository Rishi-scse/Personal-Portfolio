import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Code2, Download } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-950/75 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-cyan-950/10' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">RRV</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-slate-300 hover:text-cyan-400 transition-colors relative py-2 text-sm font-medium group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              
              <div className="flex items-center gap-3 ml-4">
                <a
                  href="/Rishi_Raj_Verma_Resume.pdf"
                  download="Rishi_Raj_Verma_Resume.pdf"
                  className="flex items-center gap-1.5 px-4 py-2 border border-slate-700/80 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 rounded-lg transition-all duration-300 text-sm font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </a>
                
                <a
                  href="mailto:vermaankush427@gmail.com"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-cyan-500/30 text-sm font-semibold"
                >
                  Hire Me
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-slate-950/95 backdrop-blur-lg border-l border-slate-800 md:hidden"
          >
            <div className="flex flex-col gap-6 p-8 pt-24">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-2xl text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              
              <div className="flex flex-col gap-3 mt-6">
                <motion.a
                  href="/Rishi_Raj_Verma_Resume.pdf"
                  download="Rishi_Raj_Verma_Resume.pdf"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-slate-700 text-cyan-400 rounded-lg text-center font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </motion.a>
                
                <motion.a
                  href="mailto:vermaankush427@gmail.com"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + 1) * 0.1 }}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-center font-semibold"
                >
                  Hire Me
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
