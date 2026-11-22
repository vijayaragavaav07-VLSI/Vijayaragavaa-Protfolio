import React from 'react';
import type { HomeData } from '../types/portfolio';
import { Cpu, Terminal, ArrowDown, FileText, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  data: HomeData;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ data, onNavigate }) => {
  const tagsList = data.tags.split(',').map((t) => t.trim()).filter(Boolean);
  const edaLines = data.eda.split('\n').map((l) => l.trim()).filter(Boolean);

  return (
    <section className="pt-20 md:pt-24 pb-8 md:pb-12 relative overflow-hidden" id="home">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d9ff]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#0ea5e9]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Headline (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Status chip */}
            <div className="inline-flex items-center gap-2 border border-[#102a45] bg-[#05172b] px-3 py-1 rounded-full text-xs font-mono text-[#00d9ff] tracking-wider mb-4 shadow-[0_0_12px_rgba(0,217,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse" />
              <span>{data.badge || 'RTL DESIGN & VERIFICATION'}</span>
            </div>

            {/* Main Name Heading */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-white uppercase leading-[1.08] mb-3">
              {data.name1}
              <br />
              <b className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] via-[#38bdf8] to-[#818cf8] drop-shadow-[0_0_20px_rgba(0,217,255,0.5)]">
                {data.name2}
              </b>
            </h1>

            {/* Subtitle / Role */}
            <div className="font-mono font-semibold tracking-wider text-xs sm:text-sm text-[#00d9ff] uppercase mb-2">
              {data.sub}
            </div>

            <p className="text-base sm:text-lg font-medium text-[#e2e8f0] leading-snug mb-3">
              {data.role}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#8ea3bd] max-w-xl leading-relaxed mb-5 font-normal">
              {data.desc}
            </p>

            {/* Technical Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {tagsList.map((tag) => (
                <span
                  key={tag}
                  className="border border-[#102a45] bg-[#06182c]/80 text-[#7dd3fc] font-mono text-[10.5px] px-2.5 py-0.5 rounded tracking-wider uppercase hover:border-[#00d9ff]/50 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => onNavigate('skills')}
                className="btn-primary"
              >
                <Cpu className="w-4 h-4" />
                <span>Explore Cores</span>
              </button>
              <button
                onClick={() => onNavigate('resume')}
                className="btn-outline"
              >
                <FileText className="w-4 h-4" />
                <span>Curriculum Vitae</span>
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="btn-default"
              >
                <span>Dossier</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center Column: Portrait Card (4 cols) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-[360px] rounded-xl border border-[#00d9ff]/60 bg-[#061424] overflow-hidden relative shadow-[0_0_30px_rgba(0,217,255,0.2)] group transition-all duration-300 hover:shadow-[0_0_45px_rgba(0,217,255,0.35)]">
              {/* Corner crosshairs */}
              <div className="absolute top-2 left-2 z-20 font-mono text-[9px] text-[#00d9ff]/80 select-none">+</div>
              <div className="absolute top-2 right-2 z-20 font-mono text-[9px] text-[#00d9ff]/80 select-none">+</div>
              <div className="absolute bottom-2 left-2 z-20 font-mono text-[9px] text-[#00d9ff]/80 select-none">+</div>
              <div className="absolute bottom-2 right-2 z-20 font-mono text-[9px] text-[#00d9ff]/80 select-none">+</div>

              {data.photo ? (
                <div className="aspect-[3/4] overflow-hidden bg-[#05111d] relative">
                  <img
                    src={data.photo}
                    alt={data.name1}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061424] via-transparent to-transparent opacity-85" />
                </div>
              ) : (
                <div className="aspect-[3/4] flex items-center justify-center bg-[#071324] text-[#8ea3bd] font-mono text-xs">
                  Silicon Profile
                </div>
              )}

              {/* Status Badge overlay */}
              <div className="p-3.5 bg-[#051423]/95 border-t border-[#102a45] flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                  <span className="text-[#34d399] font-semibold text-[11px] tracking-wider uppercase">
                    {data.cap || 'CORE ACTIVE // OPEN TO ROLES'}
                  </span>
                </div>
                <span className="text-[#8ea3bd] text-[10px] tracking-widest uppercase">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: EDA Toolchain & Specimen Telemetry (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {/* EDA Tools Card */}
            <div className="card-tech p-4">
              <div className="font-mono text-xs text-[#00d9ff] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>EDA TOOLCHAIN MATRIX</span>
              </div>
              <div className="space-y-1.5 font-mono text-[11.5px]">
                {edaLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1 border-b border-[#102a45]/60 text-[#8ea3bd]"
                  >
                    <span>{line}</span>
                    <CheckCircle2 className="w-3 h-3 text-[#00d9ff]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Silicon Specimen Card */}
            {data.die && (
              <div className="card-tech p-3 overflow-hidden">
                <div className="font-mono text-[10px] text-[#8ea3bd] uppercase tracking-wider mb-1.5 flex justify-between">
                  <span>SILICON DIE SPECIMEN</span>
                  <span className="text-[#00d9ff]">28nm CMOS</span>
                </div>
                <div className="h-24 w-full rounded overflow-hidden border border-[#102a45]">
                  <img
                    src={data.die}
                    alt="Die specimen"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Hardware Telemetry Ribbon */}
        <div className="mt-8 pt-4 border-t border-[#102a45]/70 grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="bg-[#051527] border border-[#102a45] p-2.5 rounded flex items-center justify-between">
            <span className="text-[#8ea3bd] text-[10px]">RTL ARCH:</span>
            <span className="text-[#00d9ff] font-semibold text-[11px]">VERILOG / SV</span>
          </div>
          <div className="bg-[#051527] border border-[#102a45] p-2.5 rounded flex items-center justify-between">
            <span className="text-[#8ea3bd] text-[10px]">FPGA CORE:</span>
            <span className="text-[#38bdf8] font-semibold text-[11px]">XILINX ZYNQ / ARTIX</span>
          </div>
          <div className="bg-[#051527] border border-[#102a45] p-2.5 rounded flex items-center justify-between">
            <span className="text-[#8ea3bd] text-[10px]">VERIFICATION:</span>
            <span className="text-[#34d399] font-semibold text-[11px]">UVM / SVA / FORMAL</span>
          </div>
          <div className="bg-[#051527] border border-[#102a45] p-2.5 rounded flex items-center justify-between">
            <span className="text-[#8ea3bd] text-[10px]">CLOSURE:</span>
            <span className="text-[#a78bfa] font-semibold text-[11px]">STA & TIMING 0-ERR</span>
          </div>
        </div>
      </div>
    </section>
  );
};
