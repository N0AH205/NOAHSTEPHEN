"use client";

import Image from "next/image";
import { ArrowUpRight, Globe, MessageSquare, Link as LinkIcon, Mail, User, Command, Zap, Activity, Grid3X3, Layers } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main className="relative h-screen w-screen bg-white overflow-hidden flex flex-col items-center justify-center p-12">
      
      {/* Retro Overlays */}
      <div className="scanlines" />
      <div className="crt-flicker" />

      {/* Top Left Red Blocks */}
      <div className="absolute top-12 left-12 flex gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="retro-block bg-red-retro" />
        ))}
      </div>

      {/* Bottom Right Blue Blocks */}
      <div className="absolute bottom-12 right-12 flex gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="retro-block bg-blue-retro" />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-50 text-center flex flex-col items-center gap-16">
        
        {/* Identity */}
        <div className="relative">
          <h1 className="text-8xl md:text-[10rem] font-pixel uppercase tracking-tight text-black relative z-10">
            Noah Stephen
          </h1>
          <div className="teal-underline -mb-2" />
        </div>

        {/* Navigation Grid (Retro Styled) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-12 w-full max-w-5xl">
          
          {/* PROFILE */}
          <div className="pixel-border bg-white p-6 flex flex-col gap-4 group cursor-pointer">
             <div className="flex justify-between items-start font-mono text-[10px] font-bold">
                <span>01</span>
                <User size={14} />
             </div>
             <h2 className="font-pixel text-2xl uppercase text-left">Profile</h2>
             <p className="font-mono text-[10px] text-left opacity-60 leading-tight">
                Architecting digital systems with precision.
             </p>
          </div>

          {/* WORK */}
          <div className="pixel-border bg-white p-6 flex flex-col gap-4 group cursor-pointer">
             <div className="flex justify-between items-start font-mono text-[10px] font-bold">
                <span>02</span>
                <Grid3X3 size={14} />
             </div>
             <h2 className="font-pixel text-2xl uppercase text-left">Work</h2>
             <p className="font-mono text-[10px] text-left opacity-60 leading-tight">
                Selected projects and experiments.
             </p>
          </div>

          {/* CONTACT */}
          <div className="pixel-border bg-white p-6 flex flex-col gap-4 group cursor-pointer">
             <div className="flex justify-between items-start font-mono text-[10px] font-bold">
                <span>03</span>
                <Mail size={14} />
             </div>
             <h2 className="font-pixel text-2xl uppercase text-left">Contact</h2>
             <p className="font-mono text-[10px] text-left opacity-60 leading-tight">
                Get in touch for collaborations.
             </p>
          </div>

          {/* NETWORK */}
          <div className="pixel-border bg-white p-6 flex flex-col gap-4 group cursor-pointer">
             <div className="flex justify-between items-start font-mono text-[10px] font-bold">
                <span>04</span>
                <Globe size={14} />
             </div>
             <h2 className="font-pixel text-2xl uppercase text-left">Network</h2>
             <div className="flex gap-3 opacity-60 mt-auto">
                <Globe size={12} />
                <LinkIcon size={12} />
                <MessageSquare size={12} />
             </div>
          </div>

        </div>

        {/* Footer Meta */}
        <div className="mt-12 font-mono text-[10px] tracking-[0.5em] opacity-30 uppercase">
          Precision Engineered // Terminal v4.0
        </div>

      </div>

      {/* Decorative Border */}
      <div className="absolute inset-4 border-2 border-blue-400/20 pointer-events-none" />

    </main>
  );
}
