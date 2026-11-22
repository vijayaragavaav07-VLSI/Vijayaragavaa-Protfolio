import React from 'react';
import type { Hackathon } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { CheckCircle2, ArrowRight, Trophy } from 'lucide-react';

interface HackathonsProps {
  hackathons: Hackathon[];
  onExamineArchitecture: (hackathon: Hackathon) => void;
}

export const Hackathons: React.FC<HackathonsProps> = ({ hackathons, onExamineArchitecture }) => {
  return (
    <section className="py-10 md:py-14 border-t border-[#102a45]/80 relative" id="hackathons">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="04"
          label="COMPETITIVE ENGINEERING"
          title="HACKATHONS & SPRINTS"
          meta="PROTOTYPING HIGH-RELIABILITY HARDWARE UNDER TIME CONSTRAINTS"
        />

        <div className="space-y-6">
          {hackathons.filter((h) => !h.hide).map((item) => (
            <div
              key={item.title}
              className="card-tech p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-[0_0_30px_rgba(0,217,255,0.06)] hover:shadow-[0_0_40px_rgba(0,217,255,0.15)] transition-all"
            >
              {/* Left Column: Details & Metrics (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="bg-[#00d9ff] text-[#020812] font-mono font-bold text-xs px-2.5 py-1 rounded tracking-wider uppercase shadow-[0_0_12px_rgba(0,217,255,0.4)] flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5" />
                      {item.award}
                    </span>
                    <span className="font-mono text-xs text-[#8ea3bd] tracking-widest uppercase">
                      {item.level}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase text-white tracking-tight mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8ea3bd] leading-relaxed mb-4 font-normal">
                    {item.desc}
                  </p>

                  {/* 3 Metric Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4 font-mono">
                    <div className="border border-[#102a45] bg-[#051528] p-2.5 rounded">
                      <small className="block text-[9.5px] text-[#8ea3bd] uppercase tracking-wider mb-0.5">
                        ROLE:
                      </small>
                      <span className="text-[11.5px] font-semibold text-white">
                        {item.role}
                      </span>
                    </div>

                    <div className="border border-[#102a45] bg-[#051528] p-2.5 rounded">
                      <small className="block text-[9.5px] text-[#8ea3bd] uppercase tracking-wider mb-0.5">
                        TEAM SIZE:
                      </small>
                      <span className="text-[11.5px] font-semibold text-white">
                        {item.team}
                      </span>
                    </div>

                    <div className="border border-[#102a45] bg-[#051528] p-2.5 rounded">
                      <small className="block text-[9.5px] text-[#8ea3bd] uppercase tracking-wider mb-0.5">
                        OUTCOME:
                      </small>
                      <b className="text-[11.5px] font-bold text-[#34d399]">
                        {item.outcome}
                      </b>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onExamineArchitecture(item)}
                    className="btn-primary py-2 px-3 text-xs"
                  >
                    <span>Examine Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="font-mono text-[11px] text-[#8ea3bd] flex items-center gap-1.5 uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00d9ff]" />
                    Verified Accreditation
                  </span>
                </div>
              </div>

              {/* Right Column: Prototype Photo Frame (5 cols) */}
              {item.img && (
                <div className="lg:col-span-5">
                  <div
                    onClick={() => onExamineArchitecture(item)}
                    className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#102a45] bg-[#051528] cursor-pointer group hover:border-[#00d9ff]/70 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#020812]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="font-mono text-xs text-[#00d9ff] bg-[#051528]/90 border border-[#00d9ff]/50 px-3 py-1.5 rounded uppercase tracking-wider shadow-lg">
                        Inspect Diagram ↗
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
