import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  isDeleting?: boolean;
}

export const DeleteConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName = 'this item',
  isDeleting = false 
}: DeleteConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#07111f] border border-red-500/30 rounded max-w-md w-full shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-red-500"></div>
        
        <div className="p-6">
          <div className="flex items-start mb-4">
            <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mr-4 shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Confirm Deletion</h3>
              <p className="text-sm text-[#8ea3bd]">
                Are you sure you want to delete <span className="text-white font-bold">{itemName}</span>? 
                This action cannot be undone.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 bg-[#1a2b44] hover:bg-[#253959] text-white rounded font-mono text-sm transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded font-mono text-sm transition-colors flex items-center"
            >
              {isDeleting ? 'DELETING...' : 'DELETE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
