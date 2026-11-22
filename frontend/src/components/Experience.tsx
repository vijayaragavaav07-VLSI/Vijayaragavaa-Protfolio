import React from 'react';
import type { Experience as ExperienceType } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Briefcase } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const activeExperience = experience.filter((e) => !e.hide);

  return (
    <section className="py-10 md:py-14 border-t border-[#102a45]/80 relative" id="experience">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="08"
          label="FIELD LOG"
          title="EXPERIENCE"
          meta="INDUSTRY & LAB WORK"
        />

        {activeExperience.length > 0 ? (
          <div className="space-y-4">
            {activeExperience.map((item) => {
              const techList = item.tech.split(',').map((t) => t.trim()).filter(Boolean);

              return (
                <div
                  key={`${item.org}-${item.role}`}
                  className="card-tech p-5 sm:p-7 border-l-4 border-l-[#34d399] hover:shadow-[0_0_24px_rgba(52,211,153,0.15)] transition-all"
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-[#8ea3bd] uppercase tracking-wider mb-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#34d399]" />
                    <span>{item.dur}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold uppercase text-white tracking-wide mb-2">
                    {item.role} <span className="text-[#34d399]">·</span> {item.org}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8ea3bd] leading-relaxed mb-4 font-normal">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {techList.map((tech) => (
                      <span
                        key={tech}
                        className="border border-[#102a45] bg-[#051528] text-[#7dd3fc] font-mono text-[10.5px] px-2 py-0.5 rounded tracking-wider uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="font-mono text-xs text-[#8ea3bd] border border-dashed border-[#102a45] rounded-xl p-8 text-center tracking-wider uppercase bg-[#051424]/40">
            Dedicated to academic VLSI research, RTL architecture & embedded systems laboratory prototypes.
          </div>
        )}
      </div>
    </section>
  );
};
