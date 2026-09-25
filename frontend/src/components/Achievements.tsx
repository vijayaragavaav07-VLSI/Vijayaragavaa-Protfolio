import React from 'react';
import type { Achievement } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { ExternalLink } from 'lucide-react';

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <section className="py-24 border-t border-[#0d2238] relative" id="achievements">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="05"
          label="RECOGNITION"
          title="ACHIEVEMENTS"
          meta="AWARDS & MILESTONES"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.filter((a) => !a.hide).map((item) => (
            <div
              key={item.title}
              className="card-tech p-7 flex flex-col justify-between border-l-4 border-l-[#00d9ff] hover:shadow-[0_0_25px_rgba(0,217,255,0.15)] transition-all"
            >
              <div>
                <div className="font-mono text-xs text-[#8ea3bd] uppercase tracking-wider mb-2">
                  {item.org} {item.date ? `· ${item.date}` : ''}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide mb-3">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-[#8ea3bd] leading-relaxed mb-4">
                  {item.desc}
                </p>

                {item.img && (
                  <div className="w-full h-44 overflow-hidden rounded mb-4 border border-[#10304d]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {item.link && (
                <div className="pt-3 border-t border-[#0d2238]">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#00d9ff] hover:underline uppercase tracking-wider inline-flex items-center gap-1.5"
                  >
                    <span>VERIFY</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
