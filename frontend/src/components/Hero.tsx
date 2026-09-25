import React from 'react';
import type { HomeData } from '../types/portfolio';
import { Cpu, Terminal, Layers } from 'lucide-react';

interface HeroProps {
  data: HomeData;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ data, onNavigate }) => {
  const tagsList = data.tags.split(',').map((t) => t.trim()).filter(Boolean);
  const edaLines = data.eda.split('\n').map((l) => l.trim()).filter(Boolean);

  return (
    <section className="pt-28 md:pt-36 pb-20 min-h-screen flex items-center relative overflow-hidden" id="home">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d9ff]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#062a3d]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Bio, and Action Buttons (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Status chip */}
            <div className="inline-flex items-center gap-2.5 border border-[#10304d] bg-[#06182a] px-3.5 py-1.5 rounded text-xs font-mono text-[#00d9ff] tracking-wider mb-6 shadow-[0_0_12px_rgba(0,217,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse" />
              <span>{data.badge}</span>
            </div>

            {/* Main Name Heading */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05] mb-4">
              {data.name1}
              <br />
              <b className="text-[#00d9ff] drop-shadow-[0_0_25px_rgba(0,217,255,0.6)]">{data.name2}</b>
            </h1>

            {/* Subtitle */}
            <div className="font-mono font-semibold tracking-widest text-xs sm:text-sm text-[#00d9ff] uppercase mb-3">
              {data.sub}
            </div>

            {/* Role Title */}
            <p className="text-xl sm:text-2xl font-medium text-[#e8f1fb] leading-snug mb-4">
              {data.role}
            </p>

            {/* Description */}
            <p className="text-base text-[#8ea3bd] max-w-xl leading-relaxed mb-6 font-normal">
              {data.desc}
            </p>

            {/* Technical Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tagsList.map((tag) => (
                <span
                  key={tag}
                  className="border border-[#10304d] bg-[#082033] text-[#7fdcf5] font-mono text-[11px] px-2.5 py-1 rounded tracking-wider uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onNavigate('skills')}
                className="btn-primary"
              >
                <Cpu className="w-4 h-4" />
                <span>▣ Explore Cores</span>
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="btn-default"
              >
                <span>Lab Dossier ⌄</span>
              </button>
            </div>
          </div>

          {/* Center Column: Portrait Card (4 cols) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-[420px] rounded-2xl border border-[#00d9ff] bg-[#06121f] overflow-hidden relative shadow-[0_0_40px_rgba(0,217,255,0.2)] group transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,217,255,0.35)]">
              {data.photo ? (
                <div className="aspect-[3/4] overflow-hidden bg-[#07111f] relative">
                  <img
                    src={data.photo}
                    alt={data.name1}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06121f] via-transparent to-transparent opacity-80" />
                </div>
              ) : (
                <div className="aspect-[3/4] flex items-center justify-center bg-[#07111f] text-[#8ea3bd]">
                  Profile Photo
                </div>
              )}

              {/* Status bar pinned at bottom */}
              <div className="absolute bottom-4 left-4 right-4 border border-[#10304d] bg-[#050c16]/90 backdrop-blur-md px-4 py-2.5 rounded flex items-center justify-between font-mono text-xs font-semibold">
                <span className="text-[#8ea3bd] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                  SYNTHESIS READY
                </span>
                <span className="text-[#00d9ff]">{data.cap}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Spec Panels (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Card 1: Domain Core */}
            <div className="card-tech p-5">
              <h4 className="font-mono font-semibold text-xs tracking-wider text-[#00d9ff] uppercase flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  ▦ Domain Core
                </span>
                <span className="text-[#8ea3bd] font-normal text-[10px]">IEEE 1364</span>
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-[#0d2238] pb-1.5">
                  <span className="text-[#8ea3bd]">Target Discipline:</span>
                  <b className="text-white">RTL Design</b>
                </div>
                <div className="flex justify-between border-b border-[#0d2238] pb-1.5">
                  <span className="text-[#8ea3bd]">HDL Syntax:</span>
                  <b className="text-[#00d9ff]">Verilog / SystemVerilog</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8ea3bd]">Verification:</span>
                  <b className="text-white">UVM / Testbench</b>
                </div>
              </div>
            </div>

            {/* Card 2: EDA Toolchain */}
            <div className="card-tech p-5">
              <h4 className="font-mono font-semibold text-xs tracking-wider text-[#00d9ff] uppercase flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  &gt;_ EDA Toolchain
                </span>
                <span className="text-[#00d9ff] text-[10px] px-1.5 py-0.5 border border-[#00d9ff]/40 rounded bg-[#00d9ff]/10">
                  ACTIVE
                </span>
              </h4>
              <ul className="space-y-1.5 font-mono text-xs text-[#8ea3bd]">
                {edaLines.map((tool) => (
                  <li key={tool} className="flex items-center gap-2">
                    <span className="text-[#00d9ff]">▸</span>
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Sub-micron Die Specimen */}
            <div className="card-tech p-5">
              <div className="flex items-center justify-between font-mono text-xs text-[#8ea3bd] uppercase tracking-wider mb-2">
                <span>Sub-micron die specimen</span>
                <span className="text-[#00d9ff] text-[10px] font-bold">LITHOGRAPHY</span>
              </div>
              {data.die && (
                <div className="w-full h-28 overflow-hidden rounded border border-[#10304d]">
                  <img
                    src={data.die}
                    alt="Silicon die"
                    className="w-full h-full object-cover filter brightness-90 hover:brightness-110 transition-all duration-300"
                  />
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
