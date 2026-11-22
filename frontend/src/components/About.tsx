import React from 'react';
import type { AboutData } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Profile Card (5 cols) */}
          <div className="lg:col-span-5 card-tech p-5 sm:p-6">
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

              <div className="flex justify-between items-center pt-3 border-t border-[#102a45]/70 text-xs font-mono">
                <span className="text-[#34d399] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                  {data.status || 'AVAILABLE FOR HIRE'}
                </span>
                <span className="text-[#8ea3bd] text-[10px] tracking-wider uppercase">STATUS: VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Philosophy & Principles (7 cols) */}
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
