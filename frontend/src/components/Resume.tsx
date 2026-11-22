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
    <section className="py-10 md:py-14 border-t border-[#102a45]/80 relative" id="resume">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="card-tech p-6 sm:p-10 text-center flex flex-col items-center shadow-[0_0_40px_rgba(0,217,255,0.08)] border-[#00d9ff]/30">
          
          {/* Centered Document Icon */}
          <div className="w-16 h-16 border border-[#00d9ff] rounded-xl flex items-center justify-center font-mono font-bold text-2xl text-[#00d9ff] bg-[#051a2d] mb-4 shadow-[0_0_20px_rgba(0,217,255,0.3)]">
            <FileText className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-1.5">
            CURRICULUM VITAE
          </h2>

          <div className="font-mono text-xs sm:text-sm text-[#00d9ff] font-semibold tracking-wider mb-4">
            {data.fname || 'VIJAYARAGAVAA_V_RESUME.pdf'}
          </div>

          <p className="text-xs sm:text-sm text-[#8ea3bd] max-w-xl mx-auto leading-relaxed mb-6 font-normal">
            {data.desc || 'Comprehensive technical breakdown covering RTL architecture, SystemVerilog verification testbenches, FPGA syntheses, and academic honors.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
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
              <span>IN-BROWSER VIEWER</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
