import { Edit, Trash2 } from 'lucide-react';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  isLoading: boolean;
  emptyMessage?: string;
  error?: string | null;
  onRetry?: () => void;
}

export function DataTable<T extends { id: string }>({ 
  data, 
  columns, 
  onEdit, 
  onDelete, 
  isLoading, 
  emptyMessage = "No items found.",
  error,
  onRetry
}: DataTableProps<T>) {
  if (error) {
    return (
      <div className="text-center py-8 border border-red-500/30 bg-red-500/10 rounded">
        <p className="text-red-400 font-mono mb-4">{error}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded font-mono text-sm transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    );
  }
  if (isLoading) {
    return <div className="text-center py-8 text-[#8ea3bd] font-mono">Loading data...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-8 text-[#8ea3bd] font-mono border border-dashed border-[#1a2b44] rounded">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto rounded border border-[#1a2b44] bg-[#07111f]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#030609] border-b border-[#1a2b44]">
            {columns.map((col, i) => (
              <th key={i} className="p-4 text-xs font-mono text-[#8ea3bd] font-bold tracking-widest uppercase">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="p-4 text-xs font-mono text-[#8ea3bd] font-bold tracking-widest uppercase text-right">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-[#1a2b44] hover:bg-[#1a2b44]/30 transition-colors">
              {columns.map((col, i) => (
                <td key={i} className="p-4 text-sm text-[#e8f1fb]">
                  {col.render ? col.render(item) : String((item as any)[col.key] || '')}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="p-4 text-right space-x-2 whitespace-nowrap">
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(item)}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(item)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
