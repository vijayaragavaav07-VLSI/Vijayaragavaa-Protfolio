import React, { useState, useEffect } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { FormField, TextAreaField, ToggleField } from '../../components/admin/FormFields';
import { useAdminCRUD } from '../../hooks/useAdminCRUD';
import type { AboutContent } from '../../types/database';

export const AboutManager = () => {
  const { data: items, isLoading, error, fetchItems, createItem, updateItem } = useAdminCRUD<AboutContent>({ 
    table: 'about_content'
  });

  const [editingItem, setEditingItem] = useState<Partial<AboutContent> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (!isLoading && !error) {
      if (items.length > 0) {
        setEditingItem(items[0]);
      } else {
        setEditingItem({
          section_title: 'ABOUT / BIO',
          short_bio: '',
          engineering_philosophy: '',
          institution: '',
          specialization: '',
          primary_focus: '',
          target_hardware: '',
          visible: true
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
      setMessage({ type: 'success', text: 'About content saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <AdminPageHeader title="ABOUT CONTENT" description="Manage your biography and professional summary" />
        <div className="text-center py-8 border border-red-500/30 bg-red-500/10 rounded mt-8">
          <p className="text-red-400 font-mono mb-4">{error}</p>
          <button onClick={fetchItems} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded font-mono text-sm transition-colors">Retry</button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-[#8ea3bd] font-mono p-8">Loading about content...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <AdminPageHeader 
        title="ABOUT CONTENT" 
        description="Manage your biography and professional summary" 
      />
      
      {message && (
        <div className={`mb-6 p-4 rounded text-sm font-mono flex items-center ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
          {message.text}
        </div>
      )}

      {editingItem && (
        <form onSubmit={handleSave} className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Section Title" name="section_title" value={editingItem.section_title || ''} onChange={handleChange} required />
            <FormField label="Institution" name="institution" value={editingItem.institution || ''} onChange={handleChange} required />
            <FormField label="Specialization" name="specialization" value={editingItem.specialization || ''} onChange={handleChange} required />
            <FormField label="Primary Focus" name="primary_focus" value={editingItem.primary_focus || ''} onChange={handleChange} required />
            <FormField label="Target Hardware" name="target_hardware" value={editingItem.target_hardware || ''} onChange={handleChange} required />
            
            <div className="md:col-span-2">
              <TextAreaField label="Short Bio" name="short_bio" value={editingItem.short_bio || ''} onChange={handleChange} rows={4} required />
            </div>

            <div className="md:col-span-2">
              <TextAreaField label="Engineering Philosophy" name="engineering_philosophy" value={editingItem.engineering_philosophy || ''} onChange={handleChange} rows={4} required />
            </div>

            <div className="md:col-span-2 mt-4">
              <ToggleField 
                label="Visible" 
                name="visible" 
                checked={editingItem.visible ?? true} 
                onChange={handleChange}
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
