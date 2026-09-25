import React, { useState } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { DataTable } from '../../components/admin/DataTable';
import { DeleteConfirmDialog } from '../../components/admin/DeleteConfirmDialog';
import { FormField, TextAreaField, ToggleField, ActionButtons } from '../../components/admin/FormFields';
import { useAdminCRUD } from '../../hooks/useAdminCRUD';
import type { Hackathon } from '../../types/database';

export const HackathonsManager = () => {
  const { data: items, isLoading, error, fetchItems, createItem, updateItem, deleteItem } = useAdminCRUD<Hackathon>({ 
    table: 'hackathons',
    orderBy: { column: 'sort_order', ascending: true }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Hackathon> | null>(null);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Hackathon | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'award', label: 'Award' },
    { 
      key: 'published', 
      label: 'Status',
      render: (item: Hackathon) => (
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
      award: '',
      level: 'National',
      description: '',
      role: '',
      team_size: '',
      outcome: '',
      image_url: '',
      architecture_url: '',
      sort_order: (items.length + 1) * 10,
      published: false
    });
    setIsEditing(true);
  };

  const handleEdit = (item: Hackathon) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDeleteClick = (item: Hackathon) => {
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
          {editingItem.id ? 'EDIT HACKATHON' : 'NEW HACKATHON'}
        </h2>
        
        <form onSubmit={handleSave} className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Title" name="title" value={editingItem.title || ''} onChange={handleChange} required />
            <FormField label="Award" name="award" value={editingItem.award || ''} onChange={handleChange} required />
            <FormField label="Level" name="level" value={editingItem.level || ''} onChange={handleChange} required />
            <FormField label="Role" name="role" value={editingItem.role || ''} onChange={handleChange} required />
            <FormField label="Team Size" name="team_size" value={editingItem.team_size || ''} onChange={handleChange} />
            <FormField label="Outcome" name="outcome" value={editingItem.outcome || ''} onChange={handleChange} />
            <FormField label="Sort Order" name="sort_order" type="number" value={editingItem.sort_order || 0} onChange={handleChange} required />
            
            <div className="md:col-span-2">
              <TextAreaField label="Description" name="description" value={editingItem.description || ''} onChange={handleChange} rows={4} required />
            </div>

            <FormField label="Image URL" name="image_url" value={editingItem.image_url || ''} onChange={handleChange} />
            <FormField label="Architecture URL" name="architecture_url" value={editingItem.architecture_url || ''} onChange={handleChange} />

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
        title="HACKATHONS CMS" 
        description="Manage your hackathon experiences" 
        onAdd={handleAdd}
        addLabel="ADD HACKATHON"
      />
      
      <DataTable 
        data={items} 
        columns={columns} 
        isLoading={isLoading} 
        error={error}
        onRetry={fetchItems}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        emptyMessage="No hackathons found."
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
