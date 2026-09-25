import React from 'react';
import type { ResumeData } from '../types/portfolio';
import { Download, Eye, FileText } from 'lucide-react';

interface ResumeProps {
  data: ResumeData;
  onViewViewer: () => void;
}

export const Resume: React.FC<ResumeProps> = ({ data, onViewViewer }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = data.file || '/resume.pdf';
    link.download = data.fname || 'VIJAYARAGAVAA_V_RESUME.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-24 border-t border-[#0d2238] relative" id="resume">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="card-tech p-8 sm:p-14 text-center flex flex-col items-center shadow-[0_0_50px_rgba(0,217,255,0.1)] border-[#00d9ff]/40">
          
          {/* Centered Document Icon */}
          <div className="w-20 h-20 border border-[#00d9ff] rounded-lg flex items-center justify-center font-mono font-bold text-3xl text-[#00d9ff] bg-[#062434] mb-6 shadow-[0_0_25px_rgba(0,217,255,0.3)]">
            <FileText className="w-9 h-9" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-2">
            CURRICULUM VITAE
          </h2>

          <div className="font-mono text-sm sm:text-base text-[#00d9ff] font-semibold tracking-wider mb-6">
            {data.fname}
          </div>

          <p className="text-base sm:text-lg text-[#8ea3bd] max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            {data.desc}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleDownload}
              className="btn-primary"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME</span>
            </button>

            <button
              onClick={onViewViewer}
              className="btn-default"
            >
              <Eye className="w-4 h-4 text-[#00d9ff]" />
              <span>VIEW IN DOCUMENT VIEWER</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
