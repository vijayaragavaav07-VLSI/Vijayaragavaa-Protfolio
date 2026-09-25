import React from 'react';
import type { SkillCategory } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';

interface SkillsProps {
  skills: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const accentColors = [
    { border: 'border-t-[#00d9ff]', text: 'text-[#00d9ff]', badgeBorder: 'border-[#00d9ff]', bg: 'bg-[#00d9ff]/10' },
    { border: 'border-t-[#a78bfa]', text: 'text-[#a78bfa]', badgeBorder: 'border-[#a78bfa]', bg: 'bg-[#a78bfa]/10' },
    { border: 'border-t-[#fbbf24]', text: 'text-[#fbbf24]', badgeBorder: 'border-[#fbbf24]', bg: 'bg-[#fbbf24]/10' },
    { border: 'border-t-[#34d399]', text: 'text-[#34d399]', badgeBorder: 'border-[#34d399]', bg: 'bg-[#34d399]/10' },
  ];

  return (
    <section className="py-24 border-t border-[#0d2238] relative" id="skills">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="02"
          label="CAPABILITY MATRIX"
          title="SKILLS"
          meta="SILICON TO SYSTEM"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.filter((s) => !s.hide).map((skill, index) => {
            const theme = accentColors[index % accentColors.length];
            const skillItems = skill.items.split('\n').filter(Boolean).map((line) => {
              const [name, detail] = line.split('|');
              return {
                name: (name || '').trim(),
                detail: (detail || '').trim(),
              };
            });

            return (
              <div
                key={skill.name}
                className={`card-tech p-7 flex flex-col justify-between border-t-2 ${theme.border} hover:shadow-[0_0_30px_rgba(0,217,255,0.1)] transition-all`}
              >
                <div>
                  <div className="flex justify-between items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold uppercase text-white tracking-wide">
                      {skill.name}
                    </h3>
                    <span
                      className={`font-mono text-[11px] font-semibold tracking-wider px-2 py-0.5 border rounded uppercase ${theme.text} ${theme.badgeBorder} ${theme.bg}`}
                    >
                      {skill.tag}
                    </span>
                  </div>

                  <p className="text-sm text-[#8ea3bd] mb-5 leading-relaxed">
                    {skill.desc}
                  </p>

                  <div className="space-y-2.5">
                    {skillItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center gap-3 bg-[#0a1a2d] border border-[#0f2740] px-3 py-2.5 rounded text-xs font-mono"
                      >
                        <b className="font-semibold text-white tracking-wide">
                          {item.name}
                        </b>
                        <span className="text-[#00d9ff] text-right font-normal text-[11px]">
                          {item.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="font-mono text-[11px] text-[#8ea3bd] pt-4 mt-6 border-t border-[#0d2238] uppercase tracking-wider">
                  {skill.foot}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
