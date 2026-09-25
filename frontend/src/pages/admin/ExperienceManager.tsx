import React, { useState } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { DataTable } from '../../components/admin/DataTable';
import { DeleteConfirmDialog } from '../../components/admin/DeleteConfirmDialog';
import { FormField, TextAreaField, ToggleField, ActionButtons } from '../../components/admin/FormFields';
import { useAdminCRUD } from '../../hooks/useAdminCRUD';
import type { Experience } from '../../types/database';

export const ExperienceManager = () => {
  const { data: items, isLoading, error, fetchItems, createItem, updateItem, deleteItem } = useAdminCRUD<Experience>({ 
    table: 'experience',
    orderBy: { column: 'sort_order', ascending: true }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Experience> | null>(null);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Experience | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const columns = [
    { key: 'organization', label: 'Organization' },
    { key: 'position', label: 'Position' },
    { 
      key: 'published', 
      label: 'Status',
      render: (item: Experience) => (
        <span className={`px-2 py-1 text-xs rounded-full ${item.published ? 'bg-green-500/20 text-green-400' : 'bg-[#1a2b44] text-[#8ea3bd]'}`}>
          {item.published ? 'Published' : 'Draft'}
        </span>
      )
    },
    { key: 'sort_order', label: 'Order' }
  ];

  const handleAdd = () => {
    setEditingItem({
      organization: '',
      position: '',
      description: '',
      start_date: '',
      end_date: '',
      technologies: [],
      sort_order: (items.length + 1) * 10,
      published: false
    });
    setIsEditing(true);
  };

  const handleEdit = (item: Experience) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDeleteClick = (item: Experience) => {
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
    
    const dataToSave = { ...editingItem };
    if (typeof dataToSave.technologies === 'string') {
      dataToSave.technologies = (dataToSave.technologies as string).split(',').map(t => t.trim()).filter(Boolean);
    }

    if (editingItem.id) {
      await updateItem(editingItem.id, dataToSave);
    } else {
      await createItem(dataToSave);
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
          {editingItem.id ? 'EDIT EXPERIENCE' : 'NEW EXPERIENCE'}
        </h2>
        
        <form onSubmit={handleSave} className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Organization" name="organization" value={editingItem.organization || ''} onChange={handleChange} required />
            <FormField label="Position" name="position" value={editingItem.position || ''} onChange={handleChange} required />
            <FormField label="Start Date" name="start_date" value={editingItem.start_date || ''} onChange={handleChange} />
            <FormField label="End Date" name="end_date" value={editingItem.end_date || ''} onChange={handleChange} />
            <FormField label="Sort Order" name="sort_order" type="number" value={editingItem.sort_order || 0} onChange={handleChange} required />
            
            <div className="md:col-span-2">
              <FormField 
                label="Technologies (comma separated)" 
                name="technologies" 
                value={Array.isArray(editingItem.technologies) ? editingItem.technologies.join(', ') : (editingItem.technologies || '')} 
                onChange={handleChange} 
              />
            </div>

            <div className="md:col-span-2">
              <TextAreaField label="Description" name="description" value={editingItem.description || ''} onChange={handleChange} rows={5} required />
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
        title="EXPERIENCE CMS" 
        description="Manage your work experience" 
        onAdd={handleAdd}
        addLabel="ADD EXPERIENCE"
      />
      
      <DataTable 
        data={items} 
        columns={columns} 
        isLoading={isLoading} 
        error={error}
        onRetry={fetchItems}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        emptyMessage="No experience records found."
      />

      <DeleteConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.organization}
        isDeleting={isProcessing}
      />
    </div>
  );
};
