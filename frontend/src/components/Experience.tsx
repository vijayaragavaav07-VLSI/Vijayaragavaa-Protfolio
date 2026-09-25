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
    <section className="py-24 border-t border-[#0d2238] relative" id="experience">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="08"
          label="FIELD LOG"
          title="EXPERIENCE"
          meta="INDUSTRY & LAB WORK"
        />

        {activeExperience.length > 0 ? (
          <div className="space-y-6">
            {activeExperience.map((item) => {
              const techList = item.tech.split(',').map((t) => t.trim()).filter(Boolean);

              return (
                <div
                  key={`${item.org}-${item.role}`}
                  className="card-tech p-7 sm:p-8 border-l-4 border-l-[#34d399] hover:shadow-[0_0_25px_rgba(52,211,153,0.15)] transition-all"
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-[#8ea3bd] uppercase tracking-wider mb-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#34d399]" />
                    <span>{item.dur}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-wide mb-3">
                    {item.role} <span className="text-[#34d399]">·</span> {item.org}
                  </h3>

                  <p className="text-sm sm:text-base text-[#8ea3bd] leading-relaxed mb-5 font-normal">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {techList.map((tech) => (
                      <span
                        key={tech}
                        className="border border-[#10304d] bg-[#082033] text-[#7fdcf5] font-mono text-[11px] px-2.5 py-1 rounded tracking-wider uppercase"
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
          <div className="font-mono text-xs text-[#8ea3bd] border border-dashed border-[#10304d] rounded-lg p-10 text-center tracking-wider uppercase">
            No external industry entries published yet — currently dedicated to academic research & VLSI laboratory projects.
          </div>
        )}
      </div>
    </section>
  );
};
