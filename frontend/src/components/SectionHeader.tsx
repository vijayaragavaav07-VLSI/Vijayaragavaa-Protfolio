import React from 'react';

interface SectionHeaderProps {
  num: string;
  label: string;
  title: string;
  meta: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ num, label, title, meta }) => {
  return (
    <div className="flex justify-between items-end gap-4 flex-wrap border-b border-[#0d2238] pb-7 mb-12">
      <div>
        <div className="font-mono text-xs sm:text-sm text-[#00d9ff] tracking-widest uppercase mb-2 flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-[#00d9ff] shadow-[0_0_8px_rgba(0,217,255,0.8)]" />
          <span>{num} / {label}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
          {title}
        </h2>
      </div>
      <div className="font-mono text-xs sm:text-sm text-[#8ea3bd] tracking-widest uppercase">
        {meta}
      </div>
    </div>
  );
};
