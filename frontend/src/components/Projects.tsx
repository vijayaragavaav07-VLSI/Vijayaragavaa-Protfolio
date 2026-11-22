import React, { useState } from 'react';
import type { Project } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { ExternalLink, Cpu } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [filter, setFilter] = useState<'ALL' | 'HARDWARE' | 'IOT' | 'OTHER'>('ALL');

  const visibleProjects = projects.filter((p) => !p.hide);

  const filteredProjects = visibleProjects.filter((p) => {
    if (filter === 'ALL') return true;
    const combined = `${p.title} ${p.tags} ${p.subtitle}`.toUpperCase();
    if (filter === 'HARDWARE') return combined.includes('VERILOG') || combined.includes('RTL') || combined.includes('FPGA') || combined.includes('HARDWARE');
    if (filter === 'IOT') return combined.includes('IOT') || combined.includes('ESP32') || combined.includes('ARDUINO') || combined.includes('SMART');
    return true;
  });

  return (
    <section className="py-10 md:py-14 border-t border-[#102a45]/80 relative" id="projects">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="03"
          label="SYSTEM BUILDS"
          title="PROJECTS"
          meta="HARDWARE ARCHITECTURE & SYSTEMS"
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['ALL', 'HARDWARE', 'IOT'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-xs px-3 py-1.5 rounded uppercase tracking-wider transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-[#00d9ff] text-[#020812] font-bold shadow-[0_0_12px_rgba(0,217,255,0.4)]'
                  : 'bg-[#051528] text-[#8ea3bd] border border-[#102a45] hover:border-[#00d9ff]/50 hover:text-white'
              }`}
            >
              {cat === 'HARDWARE' ? 'RTL & FPGA HARDWARE' : cat === 'IOT' ? 'EMBEDDED & IOT' : 'ALL BUILDS'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => {
            const tags = project.tags.split(',').map((t) => t.trim()).filter(Boolean);

            return (
              <div
                key={project.title}
                className="card-tech p-5 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="font-mono text-xs text-[#8ea3bd] uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#00d9ff]">
                      <Cpu className="w-3.5 h-3.5" />
                      PRJ-0{idx + 1}
                    </span>
                    <span className="text-[#34d399] px-2 py-0.5 border border-[#34d399]/40 rounded bg-[#34d399]/10 text-[10.5px]">
                      {project.status || 'VERIFIED'}
                    </span>
                  </div>

                  {project.img && (
                    <div className="w-full h-48 overflow-hidden rounded-lg mb-4 border border-[#102a45] relative bg-[#051528]">
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-transparent to-transparent opacity-60" />
                    </div>
                  )}

                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-wide mb-1">
                    {project.title}
                  </h3>

                  <div className="font-mono text-xs text-[#00d9ff] mb-3">
                    {project.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-[#8ea3bd] leading-relaxed mb-4 font-normal">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[#102a45] bg-[#051528] text-[#7dd3fc] font-mono text-[10.5px] px-2 py-0.5 rounded tracking-wider uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#102a45]/70 flex items-center justify-between">
                  <div className="font-mono text-xs text-[#8ea3bd]">
                    ROLE: <span className="text-white font-semibold">{project.role}</span>
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary py-1.5 px-3 text-[11px] min-h-[34px]"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
