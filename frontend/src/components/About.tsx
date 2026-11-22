import React from 'react';
import type { AboutData } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Cpu, ShieldCheck, Zap, Layers } from 'lucide-react';

interface AboutProps {
  data: AboutData;
}

export const About: React.FC<AboutProps> = ({ data }) => {
  const bioParagraphs = data.bio.split('\n').filter(Boolean);
  const principles = data.pr.split('\n').map((line, idx) => {
    const parts = line.split('|');
    return {
      num: `0${idx + 1}`,
      title: (parts[0] || '').trim(),
      desc: (parts[1] || '').trim(),
    };
  });

  const profileSpecs = [
    { label: 'Institution', val: data.inst },
    { label: 'Specialization', val: data.spec },
    { label: 'Primary Focus', val: data.focus },
    { label: 'Target Hardware', val: data.hw },
  ];

  const principleIcons = [
    <ShieldCheck className="w-5 h-5 text-[#00d9ff]" key="1" />,
    <Zap className="w-5 h-5 text-[#38bdf8]" key="2" />,
    <Cpu className="w-5 h-5 text-[#34d399]" key="3" />,
  ];

  return (
    <section className="py-10 md:py-14 border-t border-[#102a45]/80 relative" id="about">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="01"
          label="ENGINEERING DOSSIER"
          title="ABOUT ME"
          meta={`DISCIPLINE: ${data.disc || 'ELECTRONICS & COMMUNICATION ENGINEERING'}`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Profile Card (5 cols) */}
          <div className="lg:col-span-5 card-tech p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-5">
                {data.profile_icon_url ? (
                  <div className="w-14 h-14 border border-[#00d9ff] rounded-lg overflow-hidden bg-[#062434] shadow-[0_0_15px_rgba(0,217,255,0.25)] flex items-center justify-center shrink-0">
                    <img
                      src={data.profile_icon_url}
                      alt={data.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 border border-[#00d9ff] rounded-lg flex items-center justify-center font-mono font-bold text-xl text-[#00d9ff] bg-[#062434] shadow-[0_0_15px_rgba(0,217,255,0.25)] shrink-0">
                    {'<V/>'}
                  </div>
                )}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                    {data.name}
                  </h3>
                  <p className="font-mono text-xs text-[#00d9ff] tracking-wide">
                    {data.role}
                  </p>
                </div>
              </div>

              {/* Four Existing Information Rows: Institution, Specialization, Primary Focus, Target Hardware */}
              <div className="space-y-2.5 font-mono text-xs">
                {profileSpecs.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-2 border-t border-[#102a45]/70"
                  >
                    <span className="text-[#8ea3bd]">{item.label}:</span>
                    <b className="text-[#e2e8f0] text-right font-semibold">{item.val}</b>
                  </div>
                ))}
              </div>

              {/* Below the 4 rows: VLSI ENGINEERING PROFILE */}
              <div className="mt-5 pt-4 border-t border-[#102a45]/70">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-mono font-bold text-xs text-[#00d9ff] tracking-wider uppercase flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-[#00d9ff]" />
                    <span>VLSI ENGINEERING PROFILE</span>
                  </h4>
                  <span className="text-[10px] font-mono text-[#8ea3bd] uppercase tracking-wider">CORE FOCUS</span>
                </div>

                {/* A. Engineering Interests (2x2 grid) */}
                <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                  <div className="bg-[#051528] border border-[#00d9ff]/30 hover:border-[#00d9ff] p-2.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_12px_rgba(0,217,255,0.15)] group">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Cpu className="w-3.5 h-3.5 text-[#00d9ff] group-hover:scale-110 transition-transform" />
                      <h5 className="text-[11px] font-bold text-white uppercase tracking-tight">RTL Design</h5>
                    </div>
                    <p className="text-[10px] text-[#8ea3bd] font-mono leading-tight">Verilog, SystemVerilog.</p>
                  </div>

                  <div className="bg-[#051528] border border-[#00d9ff]/30 hover:border-[#00d9ff] p-2.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_12px_rgba(0,217,255,0.15)] group">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap className="w-3.5 h-3.5 text-[#38bdf8] group-hover:scale-110 transition-transform" />
                      <h5 className="text-[11px] font-bold text-white uppercase tracking-tight">FPGA Design</h5>
                    </div>
                    <p className="text-[10px] text-[#8ea3bd] font-mono leading-tight">Digital implementation.</p>
                  </div>

                  <div className="bg-[#051528] border border-[#00d9ff]/30 hover:border-[#00d9ff] p-2.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_12px_rgba(0,217,255,0.15)] group">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Layers className="w-3.5 h-3.5 text-[#00d9ff] group-hover:scale-110 transition-transform" />
                      <h5 className="text-[11px] font-bold text-white uppercase tracking-tight">ASIC Design</h5>
                    </div>
                    <p className="text-[10px] text-[#8ea3bd] font-mono leading-tight">Digital hardware.</p>
                  </div>

                  <div className="bg-[#051528] border border-[#00d9ff]/30 hover:border-[#00d9ff] p-2.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_12px_rgba(0,217,255,0.15)] group">
                    <div className="flex items-center gap-1.5 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#34d399] group-hover:scale-110 transition-transform" />
                      <h5 className="text-[11px] font-bold text-white uppercase tracking-tight">Design Verification</h5>
                    </div>
                    <p className="text-[10px] text-[#8ea3bd] font-mono leading-tight">Simulation, Testbench.</p>
                  </div>
                </div>

                {/* B. Engineering Mindset */}
                <div className="bg-[#05172b] border border-[#00d9ff]/40 rounded-lg p-3 mb-3.5 shadow-[inset_0_0_15px_rgba(0,217,255,0.06)]">
                  <div className="font-mono text-xs font-bold text-[#00d9ff] tracking-wider uppercase mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d9ff] animate-pulse" />
                    <span>THINK. DESIGN. BUILD.</span>
                  </div>
                  <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                    Transforming digital logic concepts into practical hardware solutions.
                  </p>
                </div>

                {/* C. Current Engineering Focus */}
                <div className="mb-2">
                  <div className="text-[10px] font-mono text-[#8ea3bd] tracking-wider uppercase mb-1.5">
                    CURRENT ENGINEERING FOCUS:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['RTL Design', 'FPGA Implementation', 'Design Verification'].map((focus) => (
                      <span
                        key={focus}
                        className="border border-[#00d9ff]/35 bg-[#06182c] text-[#7dd3fc] font-mono text-[10.5px] px-2.5 py-1 rounded tracking-wide hover:border-[#00d9ff] transition-colors"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Internship availability & verification status */}
            <div className="flex justify-between items-center pt-3 border-t border-[#102a45]/70 text-xs font-mono mt-4">
              <span className="text-[#34d399] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                {data.status || 'AVAILABLE FOR HIRE'}
              </span>
              <span className="text-[#8ea3bd] text-[10px] tracking-wider uppercase">STATUS: VERIFIED</span>
            </div>
          </div>

          {/* New VLSI Engineering Profile Section */}
<div className="mt-6">
  <h3 className="text-lg font-bold uppercase text-white mb-3">VLSI ENGINEERING PROFILE</h3>
  {/* Engineering Interests */}
  <div className="grid grid-cols-2 gap-4 mb-4">
    <div className="bg-[#051528] border border-[#00d9ff] p-3 rounded-lg hover:border-[#00d9ff]/50 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Cpu className="w-4 h-4 text-[#00d9ff]" />
        <h4 className="text-sm font-semibold text-white">RTL Design</h4>
      </div>
      <p className="text-xs text-[#8ea3bd]">Verilog, SystemVerilog.</p>
    </div>
    <div className="bg-[#051528] border border-[#00d9ff] p-3 rounded-lg hover:border-[#00d9ff]/50 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-4 h-4 text-[#00d9ff]" />
        <h4 className="text-sm font-semibold text-white">FPGA Design</h4>
      </div>
      <p className="text-xs text-[#8ea3bd]">Digital implementation.</p>
    </div>
    <div className="bg-[#051528] border border-[#00d9ff] p-3 rounded-lg hover:border-[#00d9ff]/50 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="w-4 h-4 text-[#00d9ff]" />
        <h4 className="text-sm font-semibold text-white">ASIC Design</h4>
      </div>
      <p className="text-xs text-[#8ea3bd]">Digital hardware.</p>
    </div>
    <div className="bg-[#051528] border border-[#00d9ff] p-3 rounded-lg hover:border-[#00d9ff]/50 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="w-4 h-4 text-[#00d9ff]" />
        <h4 className="text-sm font-semibold text-white">Design Verification</h4>
      </div>
      <p className="text-xs text-[#8ea3bd]">Simulation, Testbench.</p>
    </div>
  </div>
  {/* Engineering Mindset */}
  <div className="bg-[#051527] border border-[#00d9ff]/30 p-4 rounded-lg mb-4">
    <h4 className="text-sm font-bold uppercase text-[#00d9ff] mb-2">THINK. DESIGN. BUILD.</h4>
    <p className="text-xs text-[#8ea3bd]">Transforming digital logic concepts into practical hardware solutions.</p>
  </div>
  {/* Current Engineering Focus Tags */}
  <div className="flex flex-wrap gap-2">
    <span className="border border-[#102a45] bg-[#06182c]/80 text-[#7dd3fc] font-mono text-[10.5px] px-2.5 py-0.5 rounded tracking-wider uppercase hover:border-[#00d9ff]/50 transition-colors">RTL Design</span>
    <span className="border border-[#102a45] bg-[#06182c]/80 text-[#7dd3fc] font-mono text-[10.5px] px-2.5 py-0.5 rounded tracking-wider uppercase hover:border-[#00d9ff]/50 transition-colors">FPGA Implementation</span>
    <span className="border border-[#102a45] bg-[#06182c]/80 text-[#7dd3fc] font-mono text-[10.5px] px-2.5 py-0.5 rounded tracking-wider uppercase hover:border-[#00d9ff]/50 transition-colors">Design Verification</span>
  </div>
</div>

{/* Right Column: Engineering Philosophy \u0026 Principles (7 cols) */}
          <div className="lg:col-span-7 card-tech p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold uppercase text-white mb-4 flex items-center gap-2.5">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#00d9ff]/15 text-[#00d9ff] border border-[#00d9ff]/30">01</span>
                <span>{data.ptitle || 'ARCHITECTURAL TENETS'}</span>
              </h3>

              <div className="space-y-3 text-sm sm:text-base text-[#8ea3bd] font-normal leading-relaxed mb-6">
                {bioParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Principles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-[#102a45]/70">
              {principles.map((pr, idx) => (
                <div
                  key={pr.num}
                  className="bg-[#051528] border border-[#102a45] p-3.5 rounded-lg hover:border-[#00d9ff]/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#00d9ff] font-bold tracking-wider">
                      {pr.num} // PRINCIPLE
                    </span>
                    {principleIcons[idx % principleIcons.length]}
                  </div>
                  <h4 className="font-bold text-xs uppercase text-white mb-1 tracking-wide">
                    {pr.title}
                  </h4>
                  <p className="text-[11px] text-[#8ea3bd] leading-relaxed">
                    {pr.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
