import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { storageService, type AllowedFolder } from '../../services/storageService';

interface MediaUploaderProps {
  label: string;
  folder: AllowedFolder;
  prefix?: string;
  currentUrl?: string | null;
  onUploadSuccess: (url: string) => void;
  onRemove: () => void;
  accept?: 'image' | 'pdf' | 'both';
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10 MB

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  label,
  folder,
  prefix = '',
  currentUrl,
  onUploadSuccess,
  onRemove,
  accept = 'image'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAcceptString = () => {
    if (accept === 'image') return 'image/jpeg, image/png, image/webp, image/gif';
    if (accept === 'pdf') return 'application/pdf';
    return 'image/jpeg, image/png, image/webp, image/gif, application/pdf';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validation
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';

    if (accept === 'image' && !isImage) {
      setError('Unsupported file type. Please upload an image.');
      return;
    }
    if (accept === 'pdf' && !isPdf) {
      setError('Unsupported file type. Please upload a PDF.');
      return;
    }

    if (isImage && file.size > MAX_IMAGE_SIZE) {
      setError('Image file too large. Maximum size is 5MB.');
      return;
    }
    if (isPdf && file.size > MAX_PDF_SIZE) {
      setError('PDF file too large. Maximum size is 10MB.');
      return;
    }

    setIsUploading(true);

    const { url, error: uploadError } = await storageService.uploadFile(file, folder, prefix);

    setIsUploading(false);

    if (uploadError) {
      setError(uploadError);
      return;
    }

    if (url) {
      onUploadSuccess(url);
    }
    
    // Clear input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = async () => {
    // Note: We don't delete the file from storage immediately to prevent 
    // orphaned links if the user doesn't click Save on the main form.
    // Cleanup happens either via a separate cron job or manually in a full implementation.
    // For now, just clear the UI field.
    onRemove();
  };

  const renderPreview = () => {
    if (!currentUrl) return null;

    const isPdf = currentUrl.toLowerCase().endsWith('.pdf');

    if (isPdf || accept === 'pdf') {
      return (
        <div className="flex items-center space-x-3 p-4 bg-[#0a192f] border border-[#1a2b44] rounded">
          <FileText className="w-8 h-8 text-cyan-400" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm text-[#e8f1fb] font-mono truncate">
              {currentUrl.split('/').pop()}
            </p>
            <a 
              href={currentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-cyan-400 hover:underline mt-1 inline-block"
            >
              View Document
            </a>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-2 text-[#8ea3bd] hover:text-red-400 transition-colors bg-[#1a2b44]/50 rounded"
            title="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }

    return (
      <div className="relative group rounded border border-[#1a2b44] overflow-hidden bg-[#0a192f] inline-block">
        <img 
          src={currentUrl} 
          alt="Preview" 
          className="max-h-48 object-contain"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            type="button"
            onClick={handleRemove}
            className="px-4 py-2 bg-red-500/80 text-white text-sm font-mono tracking-wider rounded hover:bg-red-500 transition-colors"
          >
            REMOVE IMAGE
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-mono text-[#8ea3bd] uppercase tracking-widest mb-2">
        {label}
      </label>
      
      {currentUrl ? (
        <div className="mt-2">
          {renderPreview()}
          
          <div className="mt-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono tracking-widest transition-colors flex items-center"
              disabled={isUploading}
            >
              {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
              {isUploading ? 'UPLOADING...' : 'REPLACE FILE'}
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-[#1a2b44] rounded p-8 text-center cursor-pointer hover:border-cyan-500/50 hover:bg-[#1a2b44]/20 transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
              <p className="text-sm text-cyan-400 font-mono">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {accept === 'pdf' ? (
                <FileText className="w-8 h-8 text-[#8ea3bd] mb-3" />
              ) : (
                <ImageIcon className="w-8 h-8 text-[#8ea3bd] mb-3" />
              )}
              <p className="text-sm text-[#e8f1fb] font-mono mb-1">Click to upload file</p>
              <p className="text-xs text-[#8ea3bd]">
                {accept === 'image' ? 'JPEG, PNG, WEBP, GIF up to 5MB' : 
                 accept === 'pdf' ? 'PDF up to 10MB' : 
                 'Images (5MB) or PDF (10MB)'}
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-red-400 text-xs font-mono mt-2 flex items-center">
          <X className="w-3 h-3 mr-1" />
          {error}
        </p>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={getAcceptString()}
        className="hidden"
      />
    </div>
  );
};
