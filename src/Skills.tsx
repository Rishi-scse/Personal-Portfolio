import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { Code2, Cpu, Wrench, Layers, Terminal, Sparkles } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// 3D Box representing languages
function LanguageBox() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.4 + mouse.y * 0.5;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5 + mouse.x * 0.5;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.6, 1.6, 1.6]} />
      <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.65} />
    </mesh>
  );
}

// 3D Capsule representing Mobile Layers
function AndroidCapsule() {
  const meshRef = useRef<THREE.Group>(null);
  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.6 + mouse.x * 0.5;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2 + mouse.y * 0.3;
    }
  });
  return (
    <group ref={meshRef}>
      {/* Robot Head Dome */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.7, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.7} />
      </mesh>
      {/* Body Cylinder */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.8, 16]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// 3D Stack of cylinders representing database layers
function DatabaseStack() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.55 + mouse.x * 0.4;
      groupRef.current.rotation.x = mouse.y * 0.2;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.35, 16]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.35, 16]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.35, 16]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// 3D Orbiting Brain nodes representing AI Concepts
function AIOrbit() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.4 + mouse.x * 0.6;
      groupRef.current.rotation.x = clock.getElapsedTime() * 0.15 + mouse.y * 0.4;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Central Node */}
      <mesh>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.7} />
      </mesh>
      
      {/* Orbiting Satellite Node 1 */}
      <mesh position={[1.3, 0.3, 0.5]}>
        <sphereGeometry args={[0.12, 10, 10]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>

      {/* Orbiting Satellite Node 2 */}
      <mesh position={[-1.2, -0.4, -0.3]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>

      {/* Connecting orbital paths */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.3, 0.008, 8, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function Skill3DCanvas({ activeTab }: { activeTab: string }) {
  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-slate-950/60 rounded-3xl overflow-hidden border border-slate-900 shadow-inner">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#06b6d4" />
        <Stars radius={50} depth={20} count={200} factor={2} saturation={0.5} fade speed={1} />
        
        {activeTab === 'languages' && <LanguageBox />}
        {activeTab === 'android' && <AndroidCapsule />}
        {activeTab === 'backend' && <DatabaseStack />}
        {activeTab === 'concepts' && <AIOrbit />}
      </Canvas>
    </div>
  );
}

interface Skill {
  name: string;
  level: number;
  ratingText: string;
  description: string;
}

interface Category {
  id: string;
  title: string;
  icon: any;
  skills: Skill[];
}

const skillCategories: Category[] = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "Kotlin", level: 92, ratingText: "Expert", description: "Primary language for Android, coroutines/flow, and Compose." },
      { name: "Java", level: 85, ratingText: "Expert", description: "Backend development, Android SDK, and OOP foundations." },
      { name: "C", level: 75, ratingText: "Proficient", description: "Core systems programming, data structures, and algorithms." },
      { name: "SQL (MySQL/Oracle)", level: 80, ratingText: "Proficient", description: "Query optimization, normalization, indexing, and management." },
      { name: "JavaScript", level: 78, ratingText: "Proficient", description: "Async coding, web application logic, and Node.js middleware." }
    ]
  },
  {
    id: "android",
    title: "Android & Mobile",
    icon: Cpu,
    skills: [
      { name: "Jetpack Compose", level: 90, ratingText: "Expert", description: "Declarative UI, states layout animations, and custom graphics." },
      { name: "Android SDK", level: 88, ratingText: "Expert", description: "Broadcast receivers, services, AlarmManager, and background processes." },
      { name: "Retrofit / OKHttp", level: 85, ratingText: "Expert", description: "JSON parsing, network calls optimization, and interceptors." },
      { name: "Room Database", level: 85, ratingText: "Expert", description: "SQLite wrapper, database migrations, and local caching layers." },
      { name: "Clean MVVM Architecture", level: 88, ratingText: "Expert", description: "Data, Domain, Presentation layer segregation and repository patterns." }
    ]
  },
  {
    id: "backend",
    title: "Backend & Cloud",
    icon: Layers,
    skills: [
      { name: "Node.js & Express", level: 82, ratingText: "Proficient", description: "Asynchronous middleware API gateways, controllers, and routing." },
      { name: "MongoDB", level: 80, ratingText: "Proficient", description: "NoSQL schema structures, database index caches, and aggregations." },
      { name: "Firebase Suite", level: 80, ratingText: "Proficient", description: "Realtime DB, Cloud Firestore, authentication, and FCM messaging." },
      { name: "REST APIs", level: 85, ratingText: "Expert", description: "Stateless endpoints design, rate-limiting, and payload optimizations." }
    ]
  },
  {
    id: "concepts",
    title: "CS Concepts & AI",
    icon: Wrench,
    skills: [
      { name: "Data Structures & Algorithms", level: 85, ratingText: "Expert", description: "Complexity analyses, graphs/trees, sorting, and dynamic programming." },
      { name: "DBMS / OS", level: 80, ratingText: "Proficient", description: "Concurrency schedules, locking, CPU management, and memory allocations." },
      { name: "AI & NLP Integration", level: 78, ratingText: "Proficient", description: "Tokenization, LLM APIs, prompting layouts, and vector indexing." },
      { name: "Git & Github", level: 85, ratingText: "Proficient", description: "Branching protocols, reviews, commit hygiene, and worktrees." }
    ]
  }
];

export function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [activeTab, setActiveTab] = useState<string>("languages");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skillCategories[0].skills[0]);

  const activeCategory = skillCategories.find(c => c.id === activeTab) || skillCategories[0];

  return (
    <section id="skills" className="py-24 bg-slate-950 relative overflow-hidden" ref={sectionRef}>
      {/* Aurora glow overlays */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none z-1" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none z-1" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Technical <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-400 text-sm md:text-base mt-4 max-w-2xl mx-auto">
              Hover or click on a specific skill to explore my expertise level, focus areas, and view active 3D models.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* Left Column: Category Tabs (Span 4) */}
            <div className="lg:col-span-4 flex flex-col gap-2.5">
              {skillCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeTab === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveTab(category.id);
                      setSelectedSkill(category.skills[0]);
                    }}
                    className={`flex items-center justify-between p-4.5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 border-cyan-500/30 text-white shadow-lg shadow-cyan-950/20'
                        : 'bg-slate-900/30 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700/60 hover:bg-slate-900/50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 relative z-10">
                      <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md' 
                          : 'bg-slate-800/50 text-slate-400 group-hover:text-cyan-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-sm tracking-tight">{category.title}</span>
                    </div>

                    <div className="flex items-center gap-1.5 relative z-10 text-[10px] font-mono font-semibold text-slate-500">
                      <span>{category.skills.length} Items</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </button>
                );
              })}
            </div>

            {/* Right Column: 3D Canvas & Stats Grid (Span 8) */}
            <div className="lg:col-span-8 grid md:grid-cols-12 gap-6 items-stretch">
              
              {/* Progress bars list (Span 7) */}
              <div className="md:col-span-7 glass-panel p-6 rounded-3xl border border-cyan-500/10 flex flex-col gap-4 bg-slate-950/30">
                <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                  <span className="font-mono text-xs text-slate-500 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    /usr/rishi/bin/{activeTab}.config
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-cyan-400" />
                  </span>
                </div>

                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-3.5"
                    >
                      {activeCategory.skills.map((skill) => {
                        const isHovered = selectedSkill?.name === skill.name;
                        return (
                          <div
                            key={skill.name}
                            onMouseEnter={() => setSelectedSkill(skill)}
                            onClick={() => setSelectedSkill(skill)}
                            className={`p-3 rounded-2xl transition-all cursor-pointer border ${
                              isHovered
                                ? 'bg-slate-900 border-cyan-500/30 shadow-md shadow-cyan-950/15'
                                : 'bg-transparent border-transparent hover:bg-slate-900/30'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-sm font-bold text-white tracking-tight">{skill.name}</span>
                              <span className="font-mono text-xs text-cyan-400 font-bold">{skill.level}%</span>
                            </div>
                            
                            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 relative">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* 3D Model Display / Info box (Span 5) */}
              <div className="md:col-span-5 flex flex-col gap-6 items-stretch">
                
                {/* 3D Scene View */}
                <div className="h-44 relative">
                  <Skill3DCanvas activeTab={activeTab} />
                </div>

                {/* Selected Skill Details Box */}
                <AnimatePresence mode="wait">
                  {selectedSkill ? (
                    <motion.div
                      key={selectedSkill.name}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="glass-panel p-5 rounded-3xl border border-cyan-500/10 bg-gradient-to-b from-slate-900/50 to-slate-950/50 flex-1 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 rounded-full text-cyan-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                          {selectedSkill.ratingText}
                        </div>
                        
                        <h4 className="text-lg font-bold text-white tracking-tight border-b border-slate-900 pb-1.5">
                          {selectedSkill.name}
                        </h4>
                        
                        <p className="text-slate-350 text-xs leading-relaxed">
                          {selectedSkill.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-900 mt-4 flex justify-between items-center text-[9px] font-mono text-slate-500">
                        <span>SYS_STATUS: OPTIMAL</span>
                        <span>COMPLETION: {selectedSkill.level}%</span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex-1 flex items-center justify-center text-slate-500 text-xs font-mono">
                      Hover over a skill to see specifications.
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
