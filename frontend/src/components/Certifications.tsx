import React from 'react';
import type { Certification } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { ExternalLink, BadgeCheck } from 'lucide-react';

interface CertificationsProps {
  certs: Certification[];
}

export const Certifications: React.FC<CertificationsProps> = ({ certs }) => {
  return (
    <section className="py-10 md:py-14 border-t border-[#102a45]/80 relative" id="certificates">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="06"
          label="VERIFIED ACCREDITATIONS"
          title="CERTIFICATIONS"
          meta="OFFICIAL HARDWARE & SOFTWARE CREDENTIALS"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.filter((c) => !c.hide).map((cert) => (
            <div
              key={cert.cid}
              className="card-tech p-5 sm:p-6 flex flex-col justify-between hover:border-[#00d9ff]/60 hover:shadow-[0_0_24px_rgba(0,217,255,0.12)] transition-all"
            >
              <div>
                <div className="flex justify-between items-center font-mono text-xs text-[#00d9ff] uppercase tracking-wider mb-3 pb-2 border-b border-[#102a45]/70">
                  <span className="font-semibold flex items-center gap-1.5">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    {cert.org}
                  </span>
                  <span className="text-[#8ea3bd] text-[10.5px]">ID: {cert.cid}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide mb-2 leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs text-[#8ea3bd] leading-relaxed mb-4 font-normal">
                  {cert.desc}
                </p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[#102a45]/70 font-mono text-xs text-[#8ea3bd]">
                <span className="text-[11px]">ISSUED: {cert.year}</span>
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00d9ff] hover:underline flex items-center gap-1 font-semibold uppercase tracking-wider text-[11px]"
                  >
                    <span>VERIFY</span>
                    <ExternalLink className="w-3 h-3" />
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
