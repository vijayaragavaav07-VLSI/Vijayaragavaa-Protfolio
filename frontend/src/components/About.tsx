import React from 'react';
import type { AboutData } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';

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

  return (
    <section className="py-24 border-t border-[#0d2238] relative" id="about">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="01"
          label="ENGINEERING DOSSIER"
          title="ABOUT ME"
          meta={`DISCIPLINE: ${data.disc}`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profile Card (5 cols) */}
          <div className="lg:col-span-5 card-tech p-6 sm:p-8">
            {/* Monospace Code Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 border border-[#00d9ff] rounded-lg flex items-center justify-center font-mono font-bold text-2xl sm:text-3xl text-[#00d9ff] bg-[#062434] mb-6 shadow-[0_0_20px_rgba(0,217,255,0.25)]">
              {'{ }'}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-1">
              {data.name}
            </h3>
            <p className="font-mono text-sm text-[#00d9ff] tracking-wide mb-6">
              {data.role}
            </p>

            <div className="space-y-3 font-mono text-xs sm:text-sm">
              {profileSpecs.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-2.5 border-t border-[#0d2238]"
                >
                  <span className="text-[#8ea3bd]">{item.label}:</span>
                  <b className="text-[#e8f1fb] text-right font-semibold">{item.val}</b>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4 border-t border-[#0d2238] text-xs font-mono">
                <span className="text-[#34d399] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                  {data.status}
                </span>
                <span className="text-[#8ea3bd] uppercase tracking-wider">STATUS: OPEN</span>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Philosophy & Principles (7 cols) */}
          <div className="lg:col-span-7 card-tech p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mb-6 flex items-center gap-3">
                <span className="font-mono text-[#00d9ff]">01</span>
                <span>{data.ptitle}</span>
              </h3>

              <div className="space-y-4 text-base sm:text-lg text-[#8ea3bd] font-normal leading-relaxed mb-8">
                {bioParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Principles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#0d2238]">
              {principles.map((pr) => (
                <div
                  key={pr.num}
                  className="border border-[#10304d] bg-[#06182a] p-4 rounded hover:border-[#00d9ff]/50 transition-colors"
                >
                  <b className="block font-mono text-xs text-[#00d9ff] tracking-wider mb-2 uppercase">
                    {pr.num} / {pr.title}
                  </b>
                  <p className="text-xs text-[#8ea3bd] leading-relaxed">
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
