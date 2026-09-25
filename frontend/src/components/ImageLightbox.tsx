import React from 'react';
import { X } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  caption: string;
  subcaption?: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  imageUrl,
  caption,
  subcaption,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#07111f] border border-[#00d9ff] rounded-lg p-5 sm:p-6 shadow-[0_0_50px_rgba(0,217,255,0.3)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8ea3bd] hover:text-[#00d9ff] rounded bg-[#06182a] border border-[#10304d] hover:border-[#00d9ff] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <h3 className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-white">
            {caption}
          </h3>
          {subcaption && (
            <p className="font-mono text-xs text-[#00d9ff] mt-1">
              {subcaption}
            </p>
          )}
        </div>

        <div className="w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded border border-[#10304d] bg-[#030609]">
          <img
            src={imageUrl}
            alt={caption}
            className="max-w-full max-h-[70vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};
