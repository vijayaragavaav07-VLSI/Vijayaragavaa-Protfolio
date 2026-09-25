import React, { useState, useEffect } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { FormField, ToggleField } from '../../components/admin/FormFields';
import { MediaUploader } from '../../components/admin/MediaUploader';
import { useAdminCRUD } from '../../hooks/useAdminCRUD';
import type { Resume } from '../../types/database';

export const ResumeManager = () => {
  const { data: items, isLoading, error, fetchItems, createItem, updateItem } = useAdminCRUD<Resume>({ 
    table: 'resume'
  });

  const [editingItem, setEditingItem] = useState<Partial<Resume> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (!isLoading && !error) {
      if (items.length > 0) {
        setEditingItem(items[0]);
      } else {
        setEditingItem({
          file_name: 'Resume.pdf',
          file_url: '',
          is_active: true
        });
      }
    }
  }, [items, isLoading, error]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsProcessing(true);
    setMessage(null);
    
    let result;
    if (editingItem.id) {
      result = await updateItem(editingItem.id, editingItem);
    } else {
      result = await createItem(editingItem);
    }
    
    setIsProcessing(false);
    
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Resume updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditingItem(prev => prev ? { ...prev, [name]: checked } : null);
    } else {
      setEditingItem(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <AdminPageHeader title="RESUME MANAGER" description="Manage your professional resume file" />
        <div className="text-center py-8 border border-red-500/30 bg-red-500/10 rounded mt-8">
          <p className="text-red-400 font-mono mb-4">{error}</p>
          <button onClick={fetchItems} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded font-mono text-sm transition-colors">Retry</button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-[#8ea3bd] font-mono p-8">Loading resume data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <AdminPageHeader 
        title="RESUME MANAGER" 
        description="Manage your professional resume file" 
      />
      
      {message && (
        <div className={`mb-6 p-4 rounded text-sm font-mono flex items-center ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
          {message.text}
        </div>
      )}

      {editingItem && (
        <form onSubmit={handleSave} className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg">
          <div className="grid grid-cols-1 gap-4">
            <FormField label="File Name" name="file_name" value={editingItem.file_name || ''} onChange={handleChange} required />
            <MediaUploader
              label="Resume PDF"
              folder="resume"
              currentUrl={editingItem.file_url}
              onUploadSuccess={(url) => setEditingItem(prev => prev ? { ...prev, file_url: url } : null)}
              onRemove={() => setEditingItem(prev => prev ? { ...prev, file_url: '' } : null)}
              accept="pdf"
            />

            <div className="mt-4">
              <ToggleField 
                label="Active" 
                name="is_active" 
                checked={editingItem.is_active ?? true} 
                onChange={handleChange}
                description="Display the resume download button on the public portfolio."
              />
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-[#1a2b44] flex justify-end">
            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 py-2 bg-[#00d9ff]/10 hover:bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/30 rounded font-mono text-sm tracking-widest transition-colors flex items-center"
            >
              {isProcessing ? 'SAVING...' : 'SAVE CHANGES'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
