import React, { useState } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { DataTable } from '../../components/admin/DataTable';
import { DeleteConfirmDialog } from '../../components/admin/DeleteConfirmDialog';
import { FormField, TextAreaField, ToggleField, ActionButtons } from '../../components/admin/FormFields';
import { MediaUploader } from '../../components/admin/MediaUploader';
import { useAdminCRUD } from '../../hooks/useAdminCRUD';
import type { Project } from '../../types/database';

export const ProjectsManager = () => {
  const { data: projects, isLoading, error, fetchItems, createItem, updateItem, deleteItem } = useAdminCRUD<Project>({ 
    table: 'projects',
    orderBy: { column: 'sort_order', ascending: true }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'role', label: 'Role' },
    { 
      key: 'published', 
      label: 'Status',
      render: (item: Project) => (
        <span className={`px-2 py-1 text-xs rounded-full ${item.published ? 'bg-green-500/20 text-green-400' : 'bg-[#1a2b44] text-[#8ea3bd]'}`}>
          {item.published ? 'Published' : 'Draft'}
        </span>
      )
    },
    { key: 'sort_order', label: 'Order' }
  ];

  const handleAdd = () => {
    setEditingProject({
      title: '',
      short_description: '',
      description: '',
      image_url: '',
      technologies: [],
      role: '',
      status: 'Completed',
      github_url: '',
      project_url: '',
      sort_order: (projects.length + 1) * 10,
      published: false
    });
    setIsEditing(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsEditing(true);
  };

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setIsProcessing(true);
    await deleteItem(projectToDelete.id);
    setIsProcessing(false);
    setIsDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setIsProcessing(true);
    
    // Convert technologies string back to array if it was edited as a string
    const dataToSave = { ...editingProject };
    if (typeof dataToSave.technologies === 'string') {
      dataToSave.technologies = (dataToSave.technologies as string).split(',').map(t => t.trim()).filter(Boolean);
    }

    if (editingProject.id) {
      await updateItem(editingProject.id, dataToSave);
    } else {
      await createItem(dataToSave);
    }
    
    setIsProcessing(false);
    setIsEditing(false);
    setEditingProject(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditingProject(prev => prev ? { ...prev, [name]: checked } : null);
    } else {
      setEditingProject(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  if (isEditing && editingProject) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold tracking-widest text-white mb-6">
          {editingProject.id ? 'EDIT PROJECT' : 'NEW PROJECT'}
        </h2>
        
        <form onSubmit={handleSave} className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Title" name="title" value={editingProject.title || ''} onChange={handleChange} required />
            <FormField label="Role" name="role" value={editingProject.role || ''} onChange={handleChange} required />
            <FormField label="Status (e.g. Completed)" name="status" value={editingProject.status || ''} onChange={handleChange} />
            <FormField label="Sort Order" name="sort_order" type="number" value={editingProject.sort_order || 0} onChange={handleChange} required />
            
            <div className="md:col-span-2">
              <FormField 
                label="Technologies (comma separated)" 
                name="technologies" 
                value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : (editingProject.technologies || '')} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="md:col-span-2">
              <TextAreaField label="Short Description" name="short_description" value={editingProject.short_description || ''} onChange={handleChange} rows={2} required />
            </div>
            
            <div className="md:col-span-2">
              <TextAreaField label="Full Description" name="description" value={editingProject.description || ''} onChange={handleChange} rows={5} required />
            </div>

            <div className="md:col-span-2">
              <MediaUploader
                label="Project Image"
                folder="projects"
                prefix={editingProject.title?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() || 'new'}
                currentUrl={editingProject.image_url}
                onUploadSuccess={(url) => setEditingProject(prev => prev ? { ...prev, image_url: url } : null)}
                onRemove={() => setEditingProject(prev => prev ? { ...prev, image_url: '' } : null)}
                accept="image"
              />
            </div>

            <FormField label="GitHub URL" name="github_url" value={editingProject.github_url || ''} onChange={handleChange} />
            <FormField label="Live Project URL" name="project_url" value={editingProject.project_url || ''} onChange={handleChange} />

            <div className="md:col-span-2 mt-4">
              <ToggleField 
                label="Published" 
                name="published" 
                checked={editingProject.published || false} 
                onChange={handleChange}
                description="Make this project visible on the public portfolio." 
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
        title="PROJECTS CMS" 
        description="Manage your portfolio projects" 
        onAdd={handleAdd}
        addLabel="ADD PROJECT"
      />
      
      <DataTable 
        data={projects} 
        columns={columns} 
        isLoading={isLoading} 
        error={error}
        onRetry={fetchItems}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        emptyMessage="No projects found. Click 'Add Project' to create one."
      />

      <DeleteConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        itemName={projectToDelete?.title}
        isDeleting={isProcessing}
      />
    </div>
  );
};
