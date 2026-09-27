import React, { useState, useEffect } from "react";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { FormField, TextAreaField, ToggleField } from "../../components/admin/FormFields";
import { MediaUploader } from "../../components/admin/MediaUploader";
import { useAdminCRUD } from "../../hooks/useAdminCRUD";
import type { HomeContent } from "../../types/database";

export const HomeManager = () => {
  const { data: items, isLoading, error, fetchItems, createItem, updateItem } = useAdminCRUD<HomeContent>({
    table: "home_content",
  });

  const [editingItem, setEditingItem] = useState<Partial<HomeContent> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!isLoading && !error) {
      if (items.length > 0) {
        setEditingItem(items[0]);
      } else {
        setEditingItem({
          badge_text: "",
          hero_title: "",
          hero_highlight: "",
          hero_description: "",
          profile_image_url: "",
          email: "",
          linkedin_url: "",
          github_url: "",
          youtube_url: "",
          resume_url: "",
          visible: true,
          tags: "",
          eda_tools: "",
          domain_discipline: "RTL Design",
          hdl_syntax: "Verilog / SystemVerilog",
          verification_method: "UVM / Testbench",
          ieee_ref: "IEEE 1364",
          die_specimen_url: "",
          status_cap: "SYNTHESIS READY",
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
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Home content saved successfully!" });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setEditingItem((prev) => (prev ? { ...prev, [name]: checked } : null));
    } else {
      setEditingItem((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <AdminPageHeader title="HOME CONTENT" description="Manage the hero section" />
        <div className="text-center py-8 border border-red-500/30 bg-red-500/10 rounded mt-8">
          <p className="text-red-400 font-mono mb-4">{error}</p>
          <button onClick={fetchItems} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded font-mono text-sm transition-colors">Retry</button>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="text-[#8ea3bd] font-mono p-8">Loading home content...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <AdminPageHeader title="HOME CONTENT" description="Manage the main hero section of your portfolio" />

      {message && (
        <div className={`mb-6 p-4 rounded text-sm font-mono ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/30" : "bg-red-500/10 text-red-400 border border-red-500/30"}`}>
          {message.text}
        </div>
      )}

      {editingItem && (
        <form onSubmit={handleSave} className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg space-y-6">
          {/* HERO BASICS */}
          <div>
            <h3 className="text-xs font-mono text-[#00d9ff] tracking-widest uppercase mb-4 border-b border-[#1a2b44] pb-2">HERO TEXT</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Badge Text" name="badge_text" value={editingItem.badge_text || ""} onChange={handleChange} required />
              <FormField label="Hero Title / Role" name="hero_title" value={editingItem.hero_title || ""} onChange={handleChange} required />
              <FormField label="Hero Highlight (Cyan Text)" name="hero_highlight" value={editingItem.hero_highlight || ""} onChange={handleChange} required />
              <FormField label="Status Caption" name="status_cap" value={editingItem.status_cap || ""} onChange={handleChange} description="e.g. SYNTHESIS READY" />
              <div className="md:col-span-2">
                <TextAreaField label="Hero Description" name="hero_description" value={editingItem.hero_description || ""} onChange={handleChange} rows={3} required />
              </div>
              <div className="md:col-span-2">
                <FormField label="Tags (comma separated)" name="tags" value={editingItem.tags || ""} onChange={handleChange} description="e.g. RTL DESIGN, FPGA, ASIC" />
              </div>
            </div>
          </div>

          {/* SPEC BADGES */}
          <div>
            <h3 className="text-xs font-mono text-[#00d9ff] tracking-widest uppercase mb-4 border-b border-[#1a2b44] pb-2">SPEC BADGES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="EDA Tools" name="eda_tools" value={editingItem.eda_tools || ""} onChange={handleChange} description="e.g. Vivado Â· Quartus Â· ModelSim" />
              <FormField label="Domain / Discipline" name="domain_discipline" value={editingItem.domain_discipline || ""} onChange={handleChange} />
              <FormField label="HDL Syntax" name="hdl_syntax" value={editingItem.hdl_syntax || ""} onChange={handleChange} />
              <FormField label="Verification Method" name="verification_method" value={editingItem.verification_method || ""} onChange={handleChange} />
              <FormField label="IEEE Reference" name="ieee_ref" value={editingItem.ieee_ref || ""} onChange={handleChange} />
            </div>
          </div>

          {/* PROFILE IMAGE */}
          <div>
            <h3 className="text-xs font-mono text-[#00d9ff] tracking-widest uppercase mb-4 border-b border-[#1a2b44] pb-2">PROFILE IMAGE</h3>
            <MediaUploader
              label="Profile / Hero Image"
              folder="profile"
              currentUrl={editingItem.profile_image_url}
              onUploadSuccess={(url) => setEditingItem((prev) => (prev ? { ...prev, profile_image_url: url } : null))}
              onRemove={() => setEditingItem((prev) => (prev ? { ...prev, profile_image_url: "" } : null))}
              accept="image"
            />
            <MediaUploader
              label="Die Specimen / Chip Photo"
              folder="profile"
              prefix="die-"
              currentUrl={editingItem.die_specimen_url}
              onUploadSuccess={(url) => setEditingItem((prev) => (prev ? { ...prev, die_specimen_url: url } : null))}
              onRemove={() => setEditingItem((prev) => (prev ? { ...prev, die_specimen_url: null } : null))}
              accept="image"
            />
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-xs font-mono text-[#00d9ff] tracking-widest uppercase mb-4 border-b border-[#1a2b44] pb-2">CONTACT LINKS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Email" name="email" type="email" value={editingItem.email || ""} onChange={handleChange} required />
              <FormField label="LinkedIn URL" name="linkedin_url" type="url" value={editingItem.linkedin_url || ""} onChange={handleChange} />
              <FormField label="GitHub URL" name="github_url" type="url" value={editingItem.github_url || ""} onChange={handleChange} />
              <FormField label="YouTube URL" name="youtube_url" type="url" value={editingItem.youtube_url || ""} onChange={handleChange} />
              <FormField label="Resume URL" name="resume_url" type="url" value={editingItem.resume_url || ""} onChange={handleChange} />
            </div>
          </div>

          {/* VISIBILITY */}
          <div className="pt-2">
            <ToggleField label="Visible" name="visible" checked={editingItem.visible ?? true} onChange={handleChange} />
          </div>

          <div className="flex justify-end pt-4 border-t border-[#1a2b44]">
            <button type="submit" disabled={isProcessing} className="px-6 py-2 bg-[#00d9ff]/10 hover:bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/30 rounded font-mono text-sm tracking-widest transition-colors">
              {isProcessing ? "SAVING..." : "SAVE CHANGES"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};