import React from 'react';
import { X, Download, FileText } from 'lucide-react';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  documentUrl: string;
  filename: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  isOpen,
  onClose,
  documentUrl,
  filename,
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full h-[90vh] bg-[#07111f] border border-[#00d9ff] rounded-lg p-5 sm:p-6 shadow-[0_0_50px_rgba(0,217,255,0.3)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#0d2238]">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#00d9ff]" />
            <div>
              <h3 className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                {filename}
              </h3>
              <p className="font-mono text-[11px] text-[#8ea3bd]">
                RTL & VLSI Engineering Dossier Viewer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="btn-primary py-1.5 px-3 text-xs min-h-[36px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#8ea3bd] hover:text-[#00d9ff] rounded bg-[#06182a] border border-[#10304d] hover:border-[#00d9ff] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF viewer frame */}
        <div className="flex-1 w-full rounded border border-[#10304d] bg-white overflow-hidden relative">
          <iframe
            src={documentUrl}
            title={filename}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
