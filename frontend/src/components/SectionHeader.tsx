import React from 'react';

interface SectionHeaderProps {
  num: string;
  label: string;
  title: string;
  meta: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ num, label, title, meta }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#102a45] pb-4 mb-8">
      <div>
        <div className="font-mono text-xs text-[#00d9ff] tracking-widest uppercase mb-1.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d9ff] shadow-[0_0_8px_#00d9ff] animate-pulse" />
          <span>{num} // {label}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
          {title}
        </h2>
      </div>
      <div className="font-mono text-[11px] sm:text-xs text-[#8ea3bd] tracking-widest uppercase flex items-center gap-2">
        <span className="hidden sm:inline-block w-4 h-[1px] bg-[#102a45]" />
        <span>{meta}</span>
      </div>
    </div>
  );
};
