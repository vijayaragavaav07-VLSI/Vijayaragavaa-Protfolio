import React from 'react';
import type { Education as EducationType } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { GraduationCap } from 'lucide-react';

interface EducationProps {
  education: EducationType[];
}

export const Education: React.FC<EducationProps> = ({ education }) => {
  return (
    <section className="py-24 border-t border-[#0d2238] relative" id="education">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="07"
          label="ACADEMIC RECORD"
          title="EDUCATION"
          meta="TIMELINE"
        />

        <div className="space-y-6">
          {education.filter((e) => !e.hide).map((item) => (
            <div
              key={item.inst}
              className="card-tech p-7 sm:p-8 border-l-4 border-l-[#a78bfa] hover:shadow-[0_0_25px_rgba(167,139,250,0.15)] transition-all"
            >
              <div className="flex justify-between items-center font-mono text-xs text-[#8ea3bd] uppercase tracking-wider mb-2">
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#a78bfa]" />
                  {item.dur}
                </span>
                {item.score && (
                  <span className="text-[#a78bfa] font-bold px-2 py-0.5 border border-[#a78bfa]/30 rounded bg-[#a78bfa]/10">
                    {item.score}
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold uppercase text-white tracking-wide mb-1">
                {item.inst}
              </h3>

              <div className="font-mono text-xs sm:text-sm text-[#00d9ff] mb-4">
                {item.degree} — {item.dept}
              </div>

              <p className="text-sm sm:text-base text-[#8ea3bd] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
