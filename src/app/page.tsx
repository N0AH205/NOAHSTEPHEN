"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate, useScroll, Variants } from "framer-motion";
import { Globe, Mail, Link as LinkIcon, MessageSquare, Zap, Activity, Code, Target, ExternalLink, Box, Send, Hash } from "lucide-react";
import Link from "next/link";

// Pre-computed static bar heights — avoids Math.random() calls inside JSX/render
const BAR_HEIGHTS: [string, string, string][] = Array.from({ length: 24 }, () => [
  `${Math.random() * 80 + 20}%`,
  `${Math.random() * 80 + 20}%`,
  `${Math.random() * 80 + 20}%`,
]);

// Cards array removed (redundant)

const profileDetails = [
  { label: "Class", value: "Full-Stack Dev", icon: Code },
  { label: "Experience", value: "2+ Years", icon: Activity },
  { label: "Location", value: "SEA / Remote", icon: Globe },
  { label: "Status", value: "Active_Ready", icon: Zap }
];

const profileSkills = [
  { name: "UI / Frontend", level: 88 },
  { name: "Backend APIs", level: 75 },
  { name: "Web3 & Crypto", level: 70 },
  { name: "Product Design", level: 80 }
];

const workProjects = [
  {
    title: "Swiftcart",
    category: "E-Commerce Platform",
    desc: "Full storefront with cart state management, product filtering, and multi-step checkout flow.",
    github: "https://github.com/N0AH205/Swiftcart",
    image: "/swiftcart.png"
  },
  {
    title: "mb.ent",
    category: "Ambience Social",
    desc: "TikTok-style content platform built around ambient video — lofi, nature, and focus content. Infinite scroll, mood-based feeds.",
    github: "https://github.com/N0AH205",
    image: "/mbent.png"
  },
  {
    title: "Byte-Bets",
    category: "Web3 Crypto Casino",
    desc: "On-chain gaming platform with provably fair Crash, Mines, Plinko and Hi-Lo. Wallet-connected, real-time multiplier logic.",
    github: "https://github.com/N0AH205",
    image: "/bytebets.png"
  }
];

const techStack = [
  { cat: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js"] },
  { cat: "Backend", skills: ["Node.js", "Express", "Python", "PostgreSQL", "Redis", "REST APIs"] },
  { cat: "Infra", skills: ["Docker", "Vercel", "GitHub Actions", "Supabase", "CI/CD", "Nginx"] },
  { cat: "Web3", skills: ["Solidity", "Ethers.js", "Hardhat", "MetaMask", "IPFS", "wagmi"] }
];

const contactLinks = [
  { name: "Terminal_A // Email", value: "n04hstephen@gmail.com", icon: Mail, tag: "DIRECT", href: "mailto:n04hstephen@gmail.com" },
  { name: "Terminal_B // GitHub", value: "github.com/N0AH205", icon: LinkIcon, tag: "REPO", href: "https://github.com/N0AH205" },
  { name: "Terminal_C // Discord", value: "phosmo", icon: MessageSquare, tag: "VOICE", href: "https://discord.com/users/phosmo" }
];

const terminalTransition = {
  type: "tween",
  duration: 0.3,
  ease: "circOut"
} as const;

// Card3D removed to fix layout


function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState("");
  const isDone = useRef(false);

  useEffect(() => {
    if (isDone.current) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        isDone.current = true;
        onComplete?.();
      }
    }, 60);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <span>{displayText}</span>;
}

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Spring-smooth the scroll progress — replaces Lenis, runs on compositor thread
  // stiffness/damping tuned for a natural deceleration without overshoot
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 20,
    mass: 0.6,
  });

  // All visual transforms use the smoothed value
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"], { clamp: false });
  const parallaxWatermark = useTransform(smoothProgress, [0, 1], ["0vw", "150vw"], { clamp: false });
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0], { clamp: false });
  const titleY = useTransform(smoothProgress, [0, 0.15], ["0vh", "-50vh"], { clamp: false });
  const titleOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0], { clamp: false });

  // Unused card transforms removed

  const [showUI, setShowUI] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeSkillCat, setActiveSkillCat] = useState("Frontend");
  const [activeSlide, setActiveSlide] = useState(0);

  // Track active slide — only re-renders when slide index actually changes
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const next = v < 0.2 ? 0 : v < 0.45 ? 1 : v < 0.7 ? 2 : 3;
      setActiveSlide(prev => (prev === next ? prev : next));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const slideNav = [
    { label: "Home", color: "#000000" },
    { label: "Profile", color: "#E63946" },
    { label: "Work", color: "#059669" },
    { label: "Contact", color: "#2563EB" },
  ];

  const getHoverClass = (className: string) => {
    switch (className) {
      case 'card-red': return 'hover:bg-[rgba(217,4,41,0.95)]';
      case 'card-blue': return 'hover:bg-[rgba(29,78,216,0.95)]';
      case 'card-green': return 'hover:bg-[rgba(5,150,105,0.95)]';
      default: return '';
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      clipPath: "inset(100% 0% 0% 0%)",
      willChange: "transform, opacity"
    },
    show: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      },
      willChange: "transform, opacity"
    }
  };


  return (
    <motion.main ref={targetRef} className="relative h-[400vh] w-full">

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Subtle Scroll Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-50 flex flex-col items-end gap-2 text-black pointer-events-none"
        >
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">Scroll to explore full profile</span>
          <div className="w-full h-[2px] bg-black/10 relative overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-y-0 left-0 w-1/2 bg-[#FF4D4D]"
            />
          </div>
        </motion.div>

        {/* === SECTION TICKER (top-left, always above content) === */}
        <motion.div
          className="absolute top-6 left-8 z-[60] flex items-center gap-4 pointer-events-none"
        >
          {/* Index */}
          <AnimatePresence mode="wait">
            <motion.span
              key={activeSlide}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2, ease: "circOut" }}
              className="font-mono text-[10px] font-bold"
              style={{ color: slideNav[activeSlide]?.color === "#000000" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.35)" }}
            >
              {String(activeSlide + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>

          {/* Divider */}
          <motion.div
            animate={{ backgroundColor: slideNav[activeSlide]?.color === "#000000" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.4 }}
            className="w-8 h-[1px]"
          />

          {/* Section name */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`label-${activeSlide}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25, ease: "circOut" }}
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: slideNav[activeSlide]?.color === "#000000" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)" }}
            >
              {slideNav[activeSlide]?.label}
            </motion.span>
          </AnimatePresence>

          {/* Scroll-to buttons — dots, always above content */}
          <div className="flex items-center gap-2 ml-4">
            {slideNav.map((slide, i) => (
              <button
                key={slide.label}
                onClick={() => {
                  const positions = [0, 0.29, 0.54, 0.79];
                  const totalHeight = (targetRef.current?.scrollHeight ?? 0) - window.innerHeight;
                  window.scrollTo({ top: positions[i] * totalHeight, behavior: "smooth" });
                }}
                className="pointer-events-auto"
                title={slide.label}
              >
                <motion.div
                  animate={{
                    width: activeSlide === i ? 14 : 4,
                    backgroundColor: activeSlide === i
                      ? slide.color
                      : slideNav[activeSlide]?.color === "#000000" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.25)",
                  }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className="h-[2px] rounded-full"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Unified Structural Accents (Persists across scroll) */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="absolute top-0 left-0 w-full h-2 bg-red-retro origin-left transition-opacity duration-500 z-50 opacity-100"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
          className="absolute bottom-0 left-0 w-full h-2 bg-blue-retro origin-right transition-opacity duration-500 z-50 opacity-100"
        />

        <motion.div style={{ x, willChange: "transform" }} className="flex w-[400vw]">

          {/* === SLIDE 1: MINIMALIST ARTSY HERO === */}
          <motion.section
            className="relative h-screen w-screen shrink-0 flex flex-col items-center justify-center font-sans text-black overflow-hidden"
          >
            {/* Architectural Grid Background */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
            
            {/* Parallax Watermark Removed */}

            {/* Glowing Ambient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

            {/* Artsy HUD Elements Removed */}

            {/* Main Content */}
            <motion.div
              className="relative z-10 flex flex-col items-center w-full"
            >
              {/* Identity Anchor */}
              <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative flex flex-col items-center group w-full">
                
                {/* Title Block with Glass Box */}
                <motion.div 
                  initial={{ y: 40 }}
                  animate={{ y: showUI ? 0 : 40 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                  className="relative flex flex-col items-center"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: showUI ? 1 : 0, scale: showUI ? 1 : 0.95 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute -inset-x-20 -inset-y-12 z-0"
                  >
                    <div className="absolute inset-0 shadow-2xl shadow-black/5 rounded-sm" />
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-md border border-black/10 rounded-sm overflow-hidden">
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_black_1px,_transparent_1px)] bg-[size:16px_16px] mix-blend-multiply pointer-events-none" />
                    </div>
                    {/* Glass Box Accents */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-black/40" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-black/40" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-black/40" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-black/40" />
                  </motion.div>

                  <h1
                    className="text-[5rem] md:text-[8.5rem] font-pixel uppercase tracking-tighter text-black relative z-10 leading-none mb-2"
                    style={{ textShadow: "8px 8px 0px rgba(0,0,0,0.05), 16px 16px 0px rgba(0,0,0,0.02)" }}
                  >
                    <span className="relative">
                      <TypewriterText text="Noah Stephen" onComplete={() => setShowUI(true)} />
                      <div className="teal-underline shadow-lg" />
                    </span>
                  </h1>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showUI ? 1 : 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-black/60 relative z-10 mt-6"
                  >
                    Creative Developer & Engineer
                  </motion.p>
                </motion.div>

                <div className="flex flex-col items-center w-full relative z-20 -mt-6 md:-mt-10">
                  <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl px-4 md:px-8"
                  >
                    {[
                      { id: "01", title: "Swiftcart", desc: "Full e-commerce storefront.", class: "card-red", link: "https://github.com/N0AH205/Swiftcart" },
                      { id: "02", title: "mb.ent", desc: "Ambient social platform.", class: "card-green", link: "https://github.com/N0AH205" },
                      { id: "03", title: "Byte-Bets", desc: "Web3 crypto casino.", class: "card-blue", link: "https://github.com/N0AH205" }
                    ].map((card, i) => (
                      <motion.a
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: showUI ? 1 : 0, y: showUI ? (i === 1 ? -48 : 0) : -40 }}
                        transition={{ duration: 0.8, delay: showUI ? 0.4 + (i * 0.15) : 0, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.02, y: (i === 1 ? -52 : -4) }}
                        key={card.id}
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`pixel-border ${card.class} aspect-square p-6 md:p-8 flex flex-col justify-between group text-left hover:brightness-110 hover:shadow-2xl shadow-xl cursor-pointer pointer-events-auto relative z-50 transition-colors`}
                      >
                        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                        
                        <div className="flex justify-between items-start font-mono text-[10px] font-bold w-full relative z-10">
                          <span className="opacity-60 tracking-widest">{card.id}</span>
                          <div className="w-2 h-2 border-t border-r border-current opacity-40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                        <div className="space-y-2 relative z-10 mt-auto">
                          <h2 className="font-pixel text-xl md:text-2xl uppercase tracking-wider group-hover:scale-105 origin-left transition-transform">{card.title}</h2>
                          <p className="font-sans text-xs md:text-sm opacity-80 leading-relaxed font-light">{card.desc}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* === SLIDE 2: RED PROFILE === */}
          <motion.section id="profile" className="relative h-screen w-screen shrink-0 flex flex-col items-center justify-center p-12 lg:p-24 overflow-hidden text-white">
            {/* Subtle dot overlay — cheap alternative to feTurbulence */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <motion.h2 style={{ x: parallaxWatermark }} className="text-[9rem] md:text-[14rem] font-pixel text-white opacity-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-overlay">PROFILE</motion.h2>
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
              className="relative z-10 w-full max-w-6xl glass-red p-10 md:p-16 backdrop-blur-sm pixel-border shadow-2xl flex flex-col justify-between h-[82vh] text-left"
            >
              <motion.div variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }} className="flex justify-between items-start font-mono text-sm md:text-base font-bold mb-8">
                <div className="flex items-center gap-4">
                  <span className="opacity-40">01</span>
                  <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-4 h-4 rounded-full bg-white" />
                </div>
                <div className="w-6 h-6 border-2 border-current opacity-40" />
              </motion.div>
              <div className="">
                <motion.h3 variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="text-5xl md:text-7xl font-arcade uppercase mb-6">Profile</motion.h3>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
                  {/* Bio Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-6 top-0 bottom-0 w-1 bg-red-500/20" />
                      <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-white/90">
                        I build things people actually use — from storefronts to ambience apps to on-chain games. Obsessed with <span className="text-red-400 font-medium italic">shipping fast</span> and making the UI feel alive.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {profileDetails.map((d, i) => (
                        <motion.div
                          key={d.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="group bg-red-950/10 border border-red-500/10 p-4 flex flex-col gap-2 hover:bg-red-500/10 transition-all"
                        >
                          <d.icon size={16} className="text-red-400/40 group-hover:text-red-400" />
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] opacity-40 uppercase tracking-[0.2em]">{d.label}</span>
                            <div className="font-arcade text-xl text-white group-hover:text-red-300 transition-colors">{d.value}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Matrix Column */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <h3 className="font-mono text-xs text-red-400 uppercase tracking-[0.5em]">Competency Matrix</h3>
                        <div className="flex-1 h-[1px] bg-red-500/10" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {profileSkills.map((s, i) => (
                        <div key={s.name} className="space-y-2 group">
                          <div className="flex justify-between items-baseline">
                            <span className="font-mono text-sm uppercase tracking-[0.3em] text-white group-hover:text-red-400 transition-colors">{s.name}</span>
                            <span className="font-mono text-xs text-red-400/60 font-bold">{s.level}%</span>
                          </div>
                          <div className="h-2 bg-red-950/30 w-full relative overflow-hidden border border-red-500/10">
                            <motion.div
                              className="h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                              initial={{ width: 0 }}
                              animate={{ width: `${s.level}%` }}
                              transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "circOut" }}
                            />
                            {/* Technical tick marks */}
                            <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-20">
                              {[...Array(10)].map((_, i) => (
                                <div key={i} className="w-[1px] h-full bg-white/20" />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border border-red-500/10 bg-red-950/10 relative group">
                      <Target size={20} className="text-red-500/40 mb-3 group-hover:text-red-400 transition-colors" />
                      <h4 className="font-arcade text-base text-white mb-1 uppercase">Current Focus</h4>
                      <p className="font-sans text-xs opacity-60 leading-relaxed">
                        Shipping my own products and levelling up in Web3 & fullstack. Open to freelance and internship opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* === SLIDE 3: GREEN WORK === */}
          <motion.section id="work" className="relative h-screen w-screen shrink-0 flex flex-col items-center justify-center p-12 lg:p-24 overflow-hidden text-white">
            {/* Subtle dot overlay — cheap alternative to feTurbulence */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <motion.h2 style={{ x: parallaxWatermark }} className="text-[12rem] md:text-[20rem] font-pixel text-white opacity:10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-overlay">WORK</motion.h2>
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
              className="relative z-10 w-full max-w-6xl glass-green p-10 md:p-16 backdrop-blur-sm pixel-border shadow-2xl flex flex-col justify-between h-[82vh] text-left"
            >
              <motion.div variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }} className="flex justify-between items-start font-mono text-sm md:text-base font-bold mb-8">
                <div className="flex items-center gap-4">
                  <span className="opacity-40">02</span>
                  <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-4 h-4 rounded-full bg-white" />
                </div>
                <div className="w-6 h-6 border-2 border-current opacity-40" />
              </motion.div>
              <div className="space-y-6 flex-1 flex flex-col">
                <motion.h3 variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="text-5xl md:text-7xl font-arcade uppercase">Work</motion.h3>

                {/* Elevated Project Section */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h2 className="font-mono text-xs text-emerald-400 uppercase tracking-[0.5em]">Selected Projects</h2>
                    <div className="flex-1 h-[1px] bg-emerald-500/10" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {workProjects.map((p, i) => (
                      <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="group flex flex-col gap-4 p-1 relative border border-white/5 hover:border-emerald-500/30 transition-all bg-emerald-950/10"
                      >
                        <div className="aspect-video bg-black/40 overflow-hidden relative border-b border-white/5">
                          <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-transparent transition-colors z-10" />
                          {p.image ? (
                            <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] opacity-20 uppercase tracking-[0.4em] z-0">
                              {p.title}
                            </div>
                          )}
                          {/* Interactive Corner Accents */}
                          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-emerald-400/40" />
                          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-emerald-400/40" />
                        </div>

                        <div className="flex justify-between items-start px-4 pb-4">
                          <div className="space-y-1.5">
                            <div className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest">{p.category}</div>
                            <div className="font-arcade text-lg text-white group-hover:text-emerald-400 transition-colors">{p.title}</div>
                            <p className="font-mono text-[9px] text-white/40 leading-relaxed max-w-[200px]">{p.desc}</p>
                          </div>
                          <a href={p.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 shrink-0 flex items-center justify-center border border-emerald-500/20 hover:bg-white hover:text-black transition-all">
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Elevated Tech Stack Section */}
                <div className="border-t border-emerald-500/10 pt-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                    <div className="space-y-1">
                      <h3 className="font-arcade text-4xl text-white">Stack</h3>
                      <p className="font-mono text-[10px] opacity-40 uppercase tracking-[0.3em]">Core Competency Explorer</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {techStack.map((cat) => (
                        <button
                          key={cat.cat}
                          onClick={() => setActiveSkillCat(cat.cat)}
                          className={`font-mono text-[10px] uppercase px-6 py-2 tracking-widest border transition-all ${activeSkillCat === cat.cat
                              ? "bg-emerald-500 text-black border-emerald-500"
                              : "bg-transparent text-emerald-400/60 border-emerald-500/20 hover:border-emerald-500/60"
                            }`}
                        >
                          {cat.cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    key={activeSkillCat}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-emerald-500/10 border border-emerald-500/10"
                  >
                    {techStack.find(c => c.cat === activeSkillCat)?.skills.map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="group bg-black/40 p-6 flex flex-col items-center justify-center gap-3 hover:bg-emerald-500/5 transition-all cursor-default text-center aspect-square"
                      >
                        <Box size={20} className="opacity-10 group-hover:opacity-40 text-emerald-400" />
                        <span className="font-mono text-[10px] text-white group-hover:text-emerald-400 transition-colors uppercase tracking-widest leading-relaxed">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* === SLIDE 4: BLUE CONTACT === */}
          <motion.section id="contact" className="relative h-screen w-screen shrink-0 flex flex-col items-center justify-center p-12 lg:p-24 overflow-hidden text-white">
            {/* Subtle dot overlay — cheap alternative to feTurbulence */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <motion.h2 style={{ x: parallaxWatermark }} className="text-[12rem] md:text-[20rem] font-pixel text-white opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-overlay">CONTACT</motion.h2>
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
              className="relative z-10 w-full max-w-6xl glass-blue p-10 md:p-16 backdrop-blur-sm pixel-border shadow-2xl flex flex-col justify-between h-[82vh] text-left"
            >
              <motion.div variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }} className="flex justify-between items-start font-mono text-sm md:text-base font-bold mb-8">
                <div className="flex items-center gap-4">
                  <span className="opacity-40">03</span>
                  <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-4 h-4 rounded-full bg-white" />
                </div>
                <div className="w-6 h-6 border-2 border-current opacity-40" />
              </motion.div>
              <div className="space-y-8 flex-1 flex flex-col">
                <motion.h3 variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="text-5xl md:text-7xl font-arcade uppercase">Contact</motion.h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                  {/* Left: Interactive Grid */}
                  <div className="space-y-4">
                    <div className="font-mono text-[10px] text-blue-400/30 uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
                      <Hash size={12} />
                      Access_Points
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {contactLinks.map((l, i) => (
                        <motion.div
                          key={l.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="group relative"
                        >
                          <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className="relative p-6 border border-white/5 group-hover:border-blue-400/40 transition-all flex justify-between items-center cursor-pointer block">
                            <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-[9px] text-blue-400 px-2 py-0.5 border border-blue-400/30 rounded-sm">
                                  {l.tag}
                                </span>
                                <span className="font-mono text-[10px] opacity-30 uppercase tracking-widest">{l.name}</span>
                              </div>
                              <div className="font-mono text-xl md:text-2xl text-white group-hover:text-blue-400 transition-all pt-1">
                                {l.value}
                              </div>
                            </div>
                            <l.icon size={20} className="text-blue-400/20 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Availability Panel */}
                  <div className="hidden lg:flex flex-col justify-between p-8 border border-white/5 bg-blue-950/10 relative overflow-hidden group">
                    <div className="space-y-6 relative z-10">
                      <div className="flex gap-1 h-24 items-end">
                        {BAR_HEIGHTS.map((heights, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: "10%" }}
                            animate={{ height: heights }}
                            transition={{ duration: 1.5 + i * 0.05, repeat: Infinity, ease: "easeInOut" }}
                            className="flex-1 bg-blue-500/20 group-hover:bg-blue-400/40 transition-colors"
                          />
                        ))}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-2 rounded-full bg-blue-400" />
                          <h3 className="font-arcade text-xl uppercase text-blue-400">Available for Work</h3>
                        </div>
                        <p className="font-sans text-sm opacity-60 leading-relaxed">
                          Open to freelance projects, collaborations, and full-time roles. Response time typically within 24 hours.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-white/5 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-blue-500/20 flex items-center justify-center">
                          <Send size={16} className="text-blue-400" />
                        </div>
                        <span className="font-mono text-[10px] text-blue-400/60 uppercase tracking-widest">SEA // UTC+7</span>
                      </div>
                    </div>

                    <motion.div
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[1px] bg-blue-400/20 blur-sm z-0"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>
        </motion.div>
      </div>
    </motion.main>
  );
}
