import React from 'react';
import type { Achievement } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { ExternalLink, Award } from 'lucide-react';

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <section className="py-10 md:py-14 border-t border-[#102a45]/80 relative" id="achievements">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="05"
          label="HONORS & MILESTONES"
          title="ACHIEVEMENTS"
          meta="COMPETITIONS & RECOGNITIONS"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {achievements.filter((a) => !a.hide).map((item) => (
            <div
              key={item.title}
              className="card-tech p-5 sm:p-6 flex flex-col justify-between border-l-4 border-l-[#00d9ff] hover:shadow-[0_0_25px_rgba(0,217,255,0.12)] transition-all"
            >
              <div>
                <div className="font-mono text-xs text-[#8ea3bd] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#00d9ff]" />
                  <span>{item.org} {item.date ? `· ${item.date}` : ''}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#8ea3bd] leading-relaxed mb-3">
                  {item.desc}
                </p>

                {item.img && (
                  <div className="w-full h-40 overflow-hidden rounded-lg mb-3 border border-[#102a45] bg-[#051528]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>

              {item.link && (
                <div className="pt-2.5 border-t border-[#102a45]/70">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-[#00d9ff] hover:underline uppercase tracking-wider inline-flex items-center gap-1.5"
                  >
                    <span>VERIFY CREDENTIAL</span>
                    <ExternalLink className="w-3 h-3" />
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
