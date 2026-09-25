import React from 'react';
import type { Project } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { ExternalLink } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="py-24 border-t border-[#0d2238] relative" id="projects">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="03"
          label="SYSTEM BUILDS"
          title="PROJECTS"
          meta="HARDWARE & FULL-STACK"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.filter((p) => !p.hide).map((project, idx) => {
            const tags = project.tags.split(',').map((t) => t.trim()).filter(Boolean);

            return (
              <div
                key={project.title}
                className="card-tech p-7 sm:p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="font-mono text-xs text-[#8ea3bd] uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>PRJ-0{idx + 1}</span>
                    <span className="text-[#00d9ff] px-2 py-0.5 border border-[#10304d] rounded bg-[#06182a]">
                      {project.status}
                    </span>
                  </div>

                  {project.img && (
                    <div className="w-full h-52 overflow-hidden rounded mb-4 border border-[#10304d]">
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <h3 className="text-2xl font-bold uppercase text-white tracking-wide mb-1">
                    {project.title}
                  </h3>

                  <div className="font-mono text-xs sm:text-sm text-[#00d9ff] mb-4">
                    {project.subtitle}
                  </div>

                  <p className="text-sm sm:text-base text-[#8ea3bd] leading-relaxed mb-6 font-normal">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[#10304d] bg-[#082033] text-[#7fdcf5] font-mono text-[11px] px-2.5 py-1 rounded tracking-wider uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#0d2238] flex items-center justify-between">
                  <div className="font-mono text-xs text-[#8ea3bd]">
                    ROLE: <span className="text-white font-semibold">{project.role}</span>
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary py-2 px-4 text-[11px] min-h-[36px]"
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-3.5 h-3.5" />
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
