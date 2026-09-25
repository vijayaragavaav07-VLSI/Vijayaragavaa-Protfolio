import React, { useState } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { DataTable } from '../../components/admin/DataTable';
import { DeleteConfirmDialog } from '../../components/admin/DeleteConfirmDialog';
import { FormField, ToggleField, ActionButtons } from '../../components/admin/FormFields';
import { MediaUploader } from '../../components/admin/MediaUploader';
import { useAdminCRUD } from '../../hooks/useAdminCRUD';
import type { GalleryItem } from '../../types/database';

export const GalleryManager = () => {
  const { data: items, isLoading, error, fetchItems, createItem, updateItem, deleteItem } = useAdminCRUD<GalleryItem>({ 
    table: 'gallery',
    orderBy: { column: 'sort_order', ascending: true }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { 
      key: 'published', 
      label: 'Status',
      render: (item: GalleryItem) => (
        <span className={`px-2 py-1 text-xs rounded-full ${item.published ? 'bg-green-500/20 text-green-400' : 'bg-[#1a2b44] text-[#8ea3bd]'}`}>
          {item.published ? 'Published' : 'Draft'}
        </span>
      )
    },
    { key: 'sort_order', label: 'Order' }
  ];

  const handleAdd = () => {
    setEditingItem({
      title: '',
      caption: '',
      image_url: '',
      category: '',
      sort_order: (items.length + 1) * 10,
      published: false
    });
    setIsEditing(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDeleteClick = (item: GalleryItem) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsProcessing(true);
    await deleteItem(itemToDelete.id);
    setIsProcessing(false);
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsProcessing(true);
    if (editingItem.id) {
      await updateItem(editingItem.id, editingItem);
    } else {
      await createItem(editingItem);
    }
    
    setIsProcessing(false);
    setIsEditing(false);
    setEditingItem(null);
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

  if (isEditing && editingItem) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold tracking-widest text-white mb-6">
          {editingItem.id ? 'EDIT GALLERY ITEM' : 'NEW GALLERY ITEM'}
        </h2>
        
        <form onSubmit={handleSave} className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Title" name="title" value={editingItem.title || ''} onChange={handleChange} required />
            <FormField label="Category" name="category" value={editingItem.category || ''} onChange={handleChange} />
            <FormField label="Caption" name="caption" value={editingItem.caption || ''} onChange={handleChange} required />
            <FormField label="Sort Order" name="sort_order" type="number" value={editingItem.sort_order || 0} onChange={handleChange} required />
            
            <div className="md:col-span-2">
              <MediaUploader
                label="Gallery Image"
                folder="gallery"
                prefix={editingItem.title?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() || 'new'}
                currentUrl={editingItem.image_url}
                onUploadSuccess={(url) => setEditingItem(prev => prev ? { ...prev, image_url: url } : null)}
                onRemove={() => setEditingItem(prev => prev ? { ...prev, image_url: '' } : null)}
                accept="image"
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <ToggleField 
                label="Published" 
                name="published" 
                checked={editingItem.published || false} 
                onChange={handleChange}
              />
            </div>
          </div>
          
          <ActionButtons onCancel={() => setIsEditing(false)} isSaving={isProcessing} />
        </form>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader 
        title="GALLERY CMS" 
        description="Manage your portfolio images" 
        onAdd={handleAdd}
        addLabel="ADD IMAGE"
      />
      
      <DataTable 
        data={items} 
        columns={columns} 
        isLoading={isLoading} 
        error={error}
        onRetry={fetchItems}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        emptyMessage="No gallery items found."
      />

      <DeleteConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.title}
        isDeleting={isProcessing}
      />
    </div>
  );
};
