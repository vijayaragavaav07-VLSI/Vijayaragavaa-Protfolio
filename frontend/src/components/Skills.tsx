import React, { useState } from 'react';
import type { SkillCategory } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';

interface SkillsProps {
  skills: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [filter, setFilter] = useState<string>('ALL');

  const visibleSkills = skills.filter((s) => !s.hide);

  // Extract unique category names for filtering
  const categories = ['ALL', ...Array.from(new Set(visibleSkills.map((s) => s.tag || s.name)))];

  const filteredSkills = filter === 'ALL'
    ? visibleSkills
    : visibleSkills.filter((s) => (s.tag || s.name).toUpperCase() === filter.toUpperCase());

  const accentColors = [
    { border: 'border-t-[#00d9ff]', text: 'text-[#00d9ff]', badgeBorder: 'border-[#00d9ff]/40', bg: 'bg-[#00d9ff]/10' },
    { border: 'border-t-[#38bdf8]', text: 'text-[#38bdf8]', badgeBorder: 'border-[#38bdf8]/40', bg: 'bg-[#38bdf8]/10' },
    { border: 'border-t-[#34d399]', text: 'text-[#34d399]', badgeBorder: 'border-[#34d399]/40', bg: 'bg-[#34d399]/10' },
    { border: 'border-t-[#a78bfa]', text: 'text-[#a78bfa]', badgeBorder: 'border-[#a78bfa]/40', bg: 'bg-[#a78bfa]/10' },
    { border: 'border-t-[#fbbf24]', text: 'text-[#fbbf24]', badgeBorder: 'border-[#fbbf24]/40', bg: 'bg-[#fbbf24]/10' },
  ];

  return (
    <section className="py-10 md:py-14 border-t border-[#102a45]/80 relative" id="skills">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="02"
          label="CAPABILITY MATRIX"
          title="SKILLS & PROFICIENCIES"
          meta="SILICON TO SYSTEM"
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-xs px-3 py-1.5 rounded uppercase tracking-wider transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-[#00d9ff] text-[#020812] font-bold shadow-[0_0_12px_rgba(0,217,255,0.4)]'
                  : 'bg-[#051528] text-[#8ea3bd] border border-[#102a45] hover:border-[#00d9ff]/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, index) => {
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
                className={`card-tech p-5 sm:p-6 flex flex-col justify-between border-t-2 ${theme.border} hover:shadow-[0_0_24px_rgba(0,217,255,0.12)] transition-all`}
              >
                <div>
                  <div className="flex justify-between items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold uppercase text-white tracking-wide">
                      {skill.name}
                    </h3>
                    <span
                      className={`font-mono text-[10px] font-semibold tracking-wider px-2 py-0.5 border rounded uppercase ${theme.text} ${theme.badgeBorder} ${theme.bg}`}
                    >
                      {skill.tag}
                    </span>
                  </div>

                  <p className="text-xs text-[#8ea3bd] mb-4 leading-relaxed">
                    {skill.desc}
                  </p>

                  <div className="space-y-2">
                    {skillItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center gap-2 bg-[#051528] border border-[#102a45]/80 px-3 py-2 rounded text-xs font-mono"
                      >
                        <b className="font-semibold text-white tracking-wide text-[11.5px]">
                          {item.name}
                        </b>
                        <span className="text-[#00d9ff] text-right font-normal text-[10.5px]">
                          {item.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {skill.foot && (
                  <div className="font-mono text-[10px] text-[#8ea3bd] pt-3 mt-4 border-t border-[#102a45]/70 uppercase tracking-wider">
                    {skill.foot}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
