import React from 'react';
import type { Certification } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { ExternalLink } from 'lucide-react';

interface CertificationsProps {
  certs: Certification[];
}

export const Certifications: React.FC<CertificationsProps> = ({ certs }) => {
  return (
    <section className="py-24 border-t border-[#0d2238] relative" id="certificates">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="06"
          label="VERIFIED ACCREDITATIONS"
          title="CERTIFICATIONS"
          meta="OFFICIAL HARDWARE & SOFTWARE QUALIFICATIONS"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.filter((c) => !c.hide).map((cert) => (
            <div
              key={cert.cid}
              className="card-tech p-7 flex flex-col justify-between hover:border-[#00d9ff]/60 hover:shadow-[0_0_25px_rgba(0,217,255,0.15)] transition-all"
            >
              <div>
                <div className="flex justify-between items-center font-mono text-xs text-[#00d9ff] uppercase tracking-wider mb-4 pb-2 border-b border-[#0d2238]">
                  <span className="font-semibold">{cert.org}</span>
                  <span className="text-[#8ea3bd] text-[11px]">ID: {cert.cid}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-3 leading-snug">
                  {cert.title}
                </h3>

                <p className="text-sm text-[#8ea3bd] leading-relaxed mb-6 font-normal">
                  {cert.desc}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#0d2238] font-mono text-xs text-[#8ea3bd]">
                <span>ISSUED: {cert.year}</span>
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00d9ff] hover:underline flex items-center gap-1 font-semibold uppercase tracking-wider"
                  >
                    <span>VERIFY</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span>—</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
