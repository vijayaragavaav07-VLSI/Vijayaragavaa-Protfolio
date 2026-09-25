import React, { useState, useEffect } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { FormField, ToggleField } from '../../components/admin/FormFields';
import { useAdminCRUD } from '../../hooks/useAdminCRUD';
import type { ContactSettings } from '../../types/database';

export const ContactManager = () => {
  const { data: items, isLoading, error, fetchItems, createItem, updateItem } = useAdminCRUD<ContactSettings>({ 
    table: 'contact_settings'
  });

  const [editingItem, setEditingItem] = useState<Partial<ContactSettings> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (!isLoading && !error) {
      if (items.length > 0) {
        setEditingItem(items[0]);
      } else {
        setEditingItem({
          email: '',
          linkedin_url: '',
          github_url: '',
          youtube_url: '',
          contact_enabled: true
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
      setMessage({ type: 'success', text: 'Contact settings saved successfully!' });
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
        <AdminPageHeader title="CONTACT SETTINGS" description="Manage your contact information and social links" />
        <div className="text-center py-8 border border-red-500/30 bg-red-500/10 rounded mt-8">
          <p className="text-red-400 font-mono mb-4">{error}</p>
          <button onClick={fetchItems} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded font-mono text-sm transition-colors">Retry</button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-[#8ea3bd] font-mono p-8">Loading contact settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <AdminPageHeader 
        title="CONTACT SETTINGS" 
        description="Manage your contact information and social links" 
      />
      
      {message && (
        <div className={`mb-6 p-4 rounded text-sm font-mono flex items-center ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
          {message.text}
        </div>
      )}

      {editingItem && (
        <form onSubmit={handleSave} className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg">
          <div className="grid grid-cols-1 gap-4">
            <FormField label="Primary Email" name="email" type="email" value={editingItem.email || ''} onChange={handleChange} required />
            <FormField label="LinkedIn URL" name="linkedin_url" type="url" value={editingItem.linkedin_url || ''} onChange={handleChange} />
            <FormField label="GitHub URL" name="github_url" type="url" value={editingItem.github_url || ''} onChange={handleChange} />
            <FormField label="YouTube URL" name="youtube_url" type="url" value={editingItem.youtube_url || ''} onChange={handleChange} />

            <div className="mt-4">
              <ToggleField 
                label="Contact Section Enabled" 
                name="contact_enabled" 
                checked={editingItem.contact_enabled ?? true} 
                onChange={handleChange}
                description="Toggle the visibility of the contact form/section on the public portfolio."
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
