import React from 'react';
import type { Hackathon } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface HackathonsProps {
  hackathons: Hackathon[];
  onExamineArchitecture: (hackathon: Hackathon) => void;
}

export const Hackathons: React.FC<HackathonsProps> = ({ hackathons, onExamineArchitecture }) => {
  return (
    <section className="py-24 border-t border-[#0d2238] relative" id="hackathons">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="04"
          label="COMPETITIVE ENGINEERING"
          title="HACKATHONS"
          meta="PROTOTYPING HIGH-RELIABILITY HARDWARE UNDER TIME CONSTRAINTS"
        />

        <div className="space-y-8">
          {hackathons.filter((h) => !h.hide).map((item) => (
            <div
              key={item.title}
              className="card-tech p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center shadow-[0_0_40px_rgba(0,217,255,0.08)] hover:shadow-[0_0_50px_rgba(0,217,255,0.18)] transition-all"
            >
              {/* Left Column: Details & Metrics (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="bg-[#00d9ff] text-[#001018] font-mono font-bold text-xs px-3 py-1.5 rounded-sm tracking-wider uppercase shadow-[0_0_12px_rgba(0,217,255,0.4)]">
                      {item.award}
                    </span>
                    <span className="font-mono text-xs text-[#8ea3bd] tracking-widest uppercase">
                      {item.level}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white tracking-tight mb-4">
                    {item.title}
                  </h3>

                  <p className="text-base text-[#8ea3bd] leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>

                  {/* 3 Metric Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 font-mono">
                    <div className="border border-[#10304d] bg-[#06182a] p-3.5 rounded">
                      <small className="block text-[10px] text-[#8ea3bd] uppercase tracking-wider mb-1">
                        ROLE:
                      </small>
                      <span className="text-xs font-semibold text-white">
                        {item.role}
                      </span>
                    </div>

                    <div className="border border-[#10304d] bg-[#06182a] p-3.5 rounded">
                      <small className="block text-[10px] text-[#8ea3bd] uppercase tracking-wider mb-1">
                        TEAM SIZE:
                      </small>
                      <span className="text-xs font-semibold text-white">
                        {item.team}
                      </span>
                    </div>

                    <div className="border border-[#10304d] bg-[#06182a] p-3.5 rounded">
                      <small className="block text-[10px] text-[#8ea3bd] uppercase tracking-wider mb-1">
                        OUTCOME:
                      </small>
                      <b className="text-xs font-bold text-[#34d399]">
                        {item.outcome}
                      </b>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="flex flex-wrap items-center gap-5 pt-4">
                  <button
                    onClick={() => onExamineArchitecture(item)}
                    className="btn-primary"
                  >
                    <span>Examine Architecture</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <span className="font-mono text-xs text-[#8ea3bd] flex items-center gap-1.5 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-[#00d9ff]" />
                    Verified Accreditation
                  </span>
                </div>
              </div>

              {/* Right Column: Prototype Photo Frame (5 cols) */}
              {item.img && (
                <div className="lg:col-span-5">
                  <div
                    onClick={() => onExamineArchitecture(item)}
                    className="cursor-pointer border border-[#10304d] rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,217,255,0.2)] group relative bg-[#06121f]"
                  >
                    <div className="h-64 sm:h-80 overflow-hidden relative">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06121f] via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="flex justify-between items-center p-3.5 bg-[#050c16] border-t border-[#10304d] font-mono text-xs">
                      <span className="text-white font-medium">LIVE PROTOTYPE BENCH</span>
                      <span className="text-[#00d9ff] font-semibold">PITCH: 36 HRS SPRINT</span>
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
