import React, { useState, useEffect } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { FormField } from '../../components/admin/FormFields';
import { MediaUploader } from '../../components/admin/MediaUploader';
import { useAdminCRUD } from '../../hooks/useAdminCRUD';
import { useAuth } from '../../context/AuthContext';
import type { SiteSettings } from '../../types/database';

export const SettingsManager = () => {
  const { user, signOut } = useAuth();
  const { data: items, isLoading, error, fetchItems, createItem, updateItem } = useAdminCRUD<SiteSettings>({ 
    table: 'site_settings'
  });

  const [editingItem, setEditingItem] = useState<Partial<SiteSettings> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (!isLoading && !error) {
      if (items.length > 0) {
        setEditingItem(items[0]);
      } else {
        setEditingItem({
          site_title: 'VIJAYARAGAVAA V - Portfolio',
          site_description: 'Electronics & VLSI Engineering Portfolio',
          logo_url: '',
          favicon_url: '',
          primary_email: '',
          linkedin_url: '',
          github_url: '',
          youtube_url: ''
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
      setMessage({ type: 'success', text: 'Site settings saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingItem(prev => prev ? { ...prev, [name]: value } : null);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <AdminPageHeader 
        title="SYSTEM SETTINGS" 
        description="Global portfolio settings and admin account information" 
      />
      
      {/* Account Info Section */}
      <div className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg mb-8">
        <h3 className="text-lg font-bold text-white mb-4 tracking-widest border-b border-[#1a2b44] pb-2">ADMINISTRATOR ACCOUNT</h3>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-xs font-mono text-[#8ea3bd] uppercase tracking-widest mb-1">Logged in as</p>
            <p className="text-white font-mono">{user?.email}</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-xs font-mono text-[#8ea3bd] uppercase tracking-widest mb-1">Status</p>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-mono">
              Active Admin
            </span>
          </div>

          <button
            onClick={signOut}
            className="mt-4 md:mt-0 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded font-mono text-sm tracking-wider transition-colors"
          >
            SIGN OUT
          </button>
        </div>
      </div>
      
      <div className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg mb-8">
        <h3 className="text-lg font-bold text-white mb-4 tracking-widest border-b border-[#1a2b44] pb-2">DATABASE CONNECTION</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-mono text-[#8ea3bd] uppercase tracking-widest mb-1">Supabase URL</p>
            <p className="text-[#e8f1fb] font-mono text-sm break-all">{import.meta.env.VITE_SUPABASE_URL || 'Not configured'}</p>
          </div>
        </div>
      </div>

      {error ? (
        <div className="text-center py-8 border border-red-500/30 bg-red-500/10 rounded mb-8">
          <p className="text-red-400 font-mono mb-4">{error}</p>
          <button onClick={fetchItems} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded font-mono text-sm transition-colors">Retry</button>
        </div>
      ) : isLoading ? (
        <div className="text-[#8ea3bd] font-mono p-4">Loading site settings...</div>
      ) : editingItem && (
        <form onSubmit={handleSave} className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4 tracking-widest border-b border-[#1a2b44] pb-2">SITE CONFIGURATION</h3>
          
          {message && (
            <div className={`mb-6 p-4 rounded text-sm font-mono flex items-center ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Site Title" name="site_title" value={editingItem.site_title || ''} onChange={handleChange} required />
            <FormField label="Site Description" name="site_description" value={editingItem.site_description || ''} onChange={handleChange} required />
            <div className="md:col-span-1">
              <MediaUploader
                label="Logo Image"
                folder="other"
                prefix="logo"
                currentUrl={editingItem.logo_url}
                onUploadSuccess={(url) => setEditingItem(prev => prev ? { ...prev, logo_url: url } : null)}
                onRemove={() => setEditingItem(prev => prev ? { ...prev, logo_url: '' } : null)}
                accept="image"
              />
            </div>
            <div className="md:col-span-1">
              <MediaUploader
                label="Favicon Image"
                folder="other"
                prefix="favicon"
                currentUrl={editingItem.favicon_url}
                onUploadSuccess={(url) => setEditingItem(prev => prev ? { ...prev, favicon_url: url } : null)}
                onRemove={() => setEditingItem(prev => prev ? { ...prev, favicon_url: '' } : null)}
                accept="image"
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
