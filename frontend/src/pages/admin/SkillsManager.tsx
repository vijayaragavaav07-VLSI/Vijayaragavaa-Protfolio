import React, { useState } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { DataTable } from '../../components/admin/DataTable';
import { DeleteConfirmDialog } from '../../components/admin/DeleteConfirmDialog';
import { FormField, TextAreaField, ToggleField, ActionButtons } from '../../components/admin/FormFields';
import { useAdminCRUD } from '../../hooks/useAdminCRUD';
import type { Skill } from '../../types/database';

export const SkillsManager = () => {
  const { data: skills, isLoading, createItem, updateItem, deleteItem } = useAdminCRUD<Skill>({ 
    table: 'skills',
    orderBy: { column: 'sort_order', ascending: true }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Skill> | null>(null);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Skill | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { 
      key: 'visible', 
      label: 'Status',
      render: (item: Skill) => (
        <span className={`px-2 py-1 text-xs rounded-full ${item.visible ? 'bg-green-500/20 text-green-400' : 'bg-[#1a2b44] text-[#8ea3bd]'}`}>
          {item.visible ? 'Visible' : 'Hidden'}
        </span>
      )
    },
    { key: 'sort_order', label: 'Order' }
  ];

  const handleAdd = () => {
    setEditingItem({
      name: '',
      category: '',
      description: '',
      technology: '',
      sort_order: (skills.length + 1) * 10,
      visible: true
    });
    setIsEditing(true);
  };

  const handleEdit = (item: Skill) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDeleteClick = (item: Skill) => {
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
          {editingItem.id ? 'EDIT SKILL' : 'NEW SKILL'}
        </h2>
        
        <form onSubmit={handleSave} className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Name" name="name" value={editingItem.name || ''} onChange={handleChange} required />
            <FormField label="Category" name="category" value={editingItem.category || ''} onChange={handleChange} required />
            <FormField label="Technology/Icon ID" name="technology" value={editingItem.technology || ''} onChange={handleChange} />
            <FormField label="Sort Order" name="sort_order" type="number" value={editingItem.sort_order || 0} onChange={handleChange} required />
            
            <div className="md:col-span-2">
              <TextAreaField label="Description" name="description" value={editingItem.description || ''} onChange={handleChange} rows={3} required />
            </div>

            <div className="md:col-span-2 mt-4">
              <ToggleField 
                label="Visible" 
                name="visible" 
                checked={editingItem.visible || false} 
                onChange={handleChange}
                description="Show this skill on the public portfolio." 
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
        title="SKILLS CMS" 
        description="Manage your technical skills" 
        onAdd={handleAdd}
        addLabel="ADD SKILL"
      />
      
      <DataTable 
        data={skills} 
        columns={columns} 
        isLoading={isLoading} 
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        emptyMessage="No skills found."
      />

      <DeleteConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name}
        isDeleting={isProcessing}
      />
    </div>
  );
};
