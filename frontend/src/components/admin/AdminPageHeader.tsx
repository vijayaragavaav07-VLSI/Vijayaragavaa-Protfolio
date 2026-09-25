import { Plus } from 'lucide-react';

interface AdminPageHeaderProps {
  title: string;
  description: string;
  onAdd?: () => void;
  addLabel?: string;
}

export const AdminPageHeader = ({ title, description, onAdd, addLabel }: AdminPageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-[#1a2b44]">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold tracking-widest text-white">{title}</h1>
        <p className="text-[#8ea3bd] font-mono text-sm mt-1">{description}</p>
      </div>
      {onAdd && addLabel && (
        <button
          onClick={onAdd}
          className="flex items-center justify-center px-4 py-2 bg-[#00d9ff]/10 hover:bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/30 rounded font-mono text-sm tracking-wider transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          {addLabel}
        </button>
      )}
    </div>
  );
};
