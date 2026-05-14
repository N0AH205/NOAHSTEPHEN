"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { X, Globe, Mail, Link as LinkIcon, MessageSquare, Cpu, Terminal, Shield, Zap, Activity } from "lucide-react";
import PixelTrail from "@/components/PixelTrail";

const cards = [
  {
    id: "01",
    title: "Profile",
    desc: "System architecture & logic.",
    class: "card-red",
    content: "Lead Systems Architect with a focus on robotics and human-computer symbiosis.",
    details: [
      { label: "Core_Version", value: "v9.4.2" },
      { label: "Logic_Engine", value: "Neural_Net_v2" },
      { label: "Uptime", value: "99.9997%" },
      { label: "Sync_Status", value: "Nominal" }
    ]
  },
  {
    id: "02",
    title: "Work",
    desc: "Selected digital archives.",
    class: "card-green",
    content: "A curated collection of high-entropy digital experiences and structural systems.",
    projects: [
      "Project_Alpha // Robotics",
      "Module_Beta // Visual_ID",
      "System_Gamma // Web_Arch",
      "Network_Delta // Security"
    ]
  },
  {
    id: "03",
    title: "Contact",
    desc: "Network synchronization.",
    class: "card-blue",
    content: "Establishing secure multi-vector communication protocols...",
    links: [
      { name: "Terminal_A", value: "noah@stephen.io" },
      { name: "Terminal_B", value: "github.com/n0ah" },
      { name: "Terminal_C", value: "linkedin.com/noah" }
    ]
  },

];

const terminalTransition = {
  type: "spring",
  stiffness: 300,
  damping: 35
} as const;

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedCard = cards.find(c => c.id === selectedId);

  return (
    <main
      className="relative h-screen w-screen bg-white overflow-hidden flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 font-sans text-black"
    >

      {/* Background Pixel Trail (High Contrast) */}
      <div className="absolute inset-0 opacity-60 pointer-events-none z-0">
        <PixelTrail
          gridSize={80}
          trailSize={0.04}
          maxAge={250}
          interpolate={1}
          color="#00FF99" // Ultra-vibrant Neon Green/Teal
        />
      </div>

      {/* Structural Accents */}
      <div className={`absolute top-0 left-0 w-full h-2 bg-red-retro transition-opacity duration-500 ${selectedId ? 'opacity-0' : 'opacity-100'}`} />
      <div className={`absolute bottom-0 left-0 w-full h-2 bg-blue-retro transition-opacity duration-500 ${selectedId ? 'opacity-0' : 'opacity-100'}`} />

      {/* Main Content (Grid) */}
      <motion.div
        layout
        className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24"
      >

        {/* Identity Anchor */}
        <div className="relative flex flex-col items-center">

          <h1 className="text-7xl md:text-[8.5rem] font-pixel uppercase tracking-tighter text-black relative z-10 leading-none">
            <span className="relative">
              <TypewriterText text="Noah Stephen" />
              <div className="teal-underline" />
            </span>
          </h1>
        </div>

        {/* Cinematic Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              layoutId={`card-${card.id}`}
              onClick={() => setSelectedId(card.id)}
              className={`pixel-border ${card.class} aspect-video p-6 flex flex-col justify-between group cursor-pointer`}
              transition={terminalTransition}
            >
              <div className="flex justify-between items-start font-mono text-[10px] font-bold">
                <span className="opacity-40">{card.id}</span>
                <div className="w-2 h-2 border border-current opacity-40" />
              </div>
              <div className="space-y-2">
                <h2 className="font-arcade text-lg uppercase">{card.title}</h2>
                <p className="font-terminal text-base opacity-90 leading-tight">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>



      </motion.div>

      {/* Expanded Hero View */}
      <AnimatePresence>
        {selectedId && selectedCard && (
          <motion.div
            layoutId={`card-${selectedId}`}
            className={`fixed inset-0 z-[100] ${selectedCard.class} p-12 md:p-24 flex flex-col justify-between overflow-hidden`}
            transition={terminalTransition}
          >
            <div className="flex justify-between items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <span className="font-mono text-xl font-bold opacity-40 block">
                  {selectedCard.id}
                </span>
                <h2 className="text-6xl md:text-9xl font-arcade uppercase">
                  {selectedCard.title}
                </h2>
                <p className="font-terminal text-2xl opacity-80 max-w-2xl">
                  {selectedCard.desc}
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="pixel-border bg-black text-white px-6 py-3 font-arcade text-sm hover:invert transition-all relative z-[110]"
              >
                [X] CLOSE_SYSTEM
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="flex-1 mt-16 border-t border-current/20 pt-12 flex flex-col md:flex-row gap-12"
            >
              {/* Left Column: Context */}
              <div className="md:w-1/2">
                <div className="font-terminal text-3xl leading-relaxed">
                  {selectedCard.content}
                </div>

                {selectedId === "03" && (
                  <div className="flex gap-12 mt-16">
                    <Globe size={48} className="hover:scale-110 transition-transform cursor-pointer" />
                    <Mail size={48} className="hover:scale-110 transition-transform cursor-pointer" />
                    <LinkIcon size={48} className="hover:scale-110 transition-transform cursor-pointer" />
                  </div>
                )}
              </div>

              {/* Right Column: Module Specific UI */}
              <div className="md:w-1/2 border-l border-current/10 pl-12">

                {/* Profile Details */}
                {"details" in selectedCard && selectedCard.details && (
                  <div className="grid grid-cols-1 gap-6">
                    {selectedCard.details.map((d: any) => (
                      <div key={d.label} className="flex justify-between border-b border-current/5 pb-2">
                        <span className="font-mono text-sm opacity-40 uppercase">{d.label}</span>
                        <span className="font-terminal text-2xl uppercase tracking-widest">{d.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Work Projects */}
                {"projects" in selectedCard && selectedCard.projects && (
                  <div className="space-y-4">
                    {selectedCard.projects.map((p: string) => (
                      <div key={p} className="pixel-border p-4 hover:bg-current hover:text-white transition-all cursor-pointer font-terminal text-2xl">
                        {p}
                      </div>
                    ))}
                  </div>
                )}



                {/* Network Links */}
                {"links" in selectedCard && selectedCard.links && (
                  <div className="space-y-6">
                    {selectedCard.links.map((l: any) => (
                      <div key={l.name} className="space-y-2">
                        <div className="font-mono text-[10px] opacity-40 uppercase">{l.name}</div>
                        <div className="font-terminal text-3xl border-b border-current pb-2 hover:opacity-60 cursor-pointer transition-opacity">
                          {l.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>

            <div className="flex justify-between font-mono text-[12px] tracking-[0.5em] opacity-40 uppercase border-t border-current/10 pt-8">
              <span>System // {selectedCard.title} Expansion</span>
              <div className="flex gap-6">
                <Cpu size={14} />
                <Terminal size={14} />
                <Shield size={14} />
              </div>
            </div>

            <div className="scanlines opacity-10 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="scanlines opacity-20 pointer-events-none" />

    </main>
  );
}
