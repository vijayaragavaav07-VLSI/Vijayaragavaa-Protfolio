import React, { useState, useEffect } from "react";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { FormField, TextAreaField, ToggleField } from "../../components/admin/FormFields";
import { MediaUploader } from "../../components/admin/MediaUploader";
import { useAdminCRUD } from "../../hooks/useAdminCRUD";
import type { AboutContent } from "../../types/database";

export const AboutManager = () => {
  const { data: items, isLoading, error, fetchItems, createItem, updateItem } = useAdminCRUD<AboutContent>({
    table: "about_content",
  });

  const [editingItem, setEditingItem] = useState<Partial<AboutContent> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!isLoading && !error) {
      if (items.length > 0) {
        setEditingItem(items[0]);
      } else {
        setEditingItem({
          section_title: "ABOUT / BIO",
          short_bio: "",
          engineering_philosophy: "",
          institution: "",
          specialization: "",
          primary_focus: "",
          target_hardware: "",
          visible: true,
          profile_icon_url: null,
          philosophy_title: "SILICON ENGINEERING PHILOSOPHY",
          principle_1_num: "01",
          principle_1_title: "DETERMINISM",
          principle_1_desc: "Synchronous state machine design with clean hazard-free transitions.",
          principle_2_num: "02",
          principle_2_title: "ROBUST CO-VERIFICATION",
          principle_2_desc: "Self-checking directed testbenches with corner-case assertion coverage.",
          principle_3_num: "03",
          principle_3_title: "PHYSICAL REALITY",
          principle_3_desc: "Designing RTL with clear awareness of LUT utilization, wire delays & setup times.",
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
      setMessage({ type: "success", text: "About content saved successfully!" });
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
        <AdminPageHeader title="ABOUT CONTENT" description="Manage your biography and professional summary" />
        <div className="text-center py-8 border border-red-500/30 bg-red-500/10 rounded mt-8">
          <p className="text-red-400 font-mono mb-4">{error}</p>
          <button onClick={fetchItems} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded font-mono text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="text-[#8ea3bd] font-mono p-8">Loading about content...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <AdminPageHeader title="ABOUT CONTENT" description="Manage your biography and professional summary" />

      {message && (
        <div className={`mb-6 p-4 rounded text-sm font-mono ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/30" : "bg-red-500/10 text-red-400 border border-red-500/30"}`}>
          {message.text}
        </div>
      )}

      {editingItem && (
        <form onSubmit={handleSave} className="bg-[#07111f] border border-[#1a2b44] p-6 rounded shadow-lg space-y-6">
          {/* PROFILE ICON */}
          <div>
            <h3 className="text-xs font-mono text-[#00d9ff] tracking-widest uppercase mb-4 border-b border-[#1a2b44] pb-2">PROFILE ICON / IMAGE</h3>
            <MediaUploader
              label="Profile / Icon Image (replaces {} placeholder)"
              folder="profile"
              prefix="about-icon-"
              currentUrl={editingItem.profile_icon_url}
              onUploadSuccess={(url) => setEditingItem((prev) => (prev ? { ...prev, profile_icon_url: url } : null))}
              onRemove={() => setEditingItem((prev) => (prev ? { ...prev, profile_icon_url: null } : null))}
              accept="image"
            />
          </div>

          {/* BIO FIELDS */}
          <div>
            <h3 className="text-xs font-mono text-[#00d9ff] tracking-widest uppercase mb-4 border-b border-[#1a2b44] pb-2">BIO DETAILS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Section Title" name="section_title" value={editingItem.section_title || ""} onChange={handleChange} required />
              <FormField label="Institution" name="institution" value={editingItem.institution || ""} onChange={handleChange} required />
              <FormField label="Specialization" name="specialization" value={editingItem.specialization || ""} onChange={handleChange} required />
              <FormField label="Primary Focus" name="primary_focus" value={editingItem.primary_focus || ""} onChange={handleChange} required />
              <FormField label="Target Hardware" name="target_hardware" value={editingItem.target_hardware || ""} onChange={handleChange} required />
              <div className="md:col-span-2">
                <TextAreaField label="Short Bio" name="short_bio" value={editingItem.short_bio || ""} onChange={handleChange} rows={4} required />
              </div>
              <div className="md:col-span-2">
                <TextAreaField label="Engineering Philosophy (short)" name="engineering_philosophy" value={editingItem.engineering_philosophy || ""} onChange={handleChange} rows={3} />
              </div>
            </div>
          </div>

          {/* ENGINEERING PRINCIPLES */}
          <div>
            <h3 className="text-xs font-mono text-[#00d9ff] tracking-widest uppercase mb-4 border-b border-[#1a2b44] pb-2">ENGINEERING PHILOSOPHY SECTION</h3>
            <FormField label="Philosophy Section Title" name="philosophy_title" value={editingItem.philosophy_title || ""} onChange={handleChange} />

            <div className="mt-4 space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-[#0a192f] border border-[#1a2b44] p-4 rounded">
                  <p className="text-xs font-mono text-[#8ea3bd] uppercase tracking-wider mb-3">Principle {n}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <FormField
                      label="Number"
                      name={`principle_${n}_num`}
                      value={(editingItem as Record<string, string>)[`principle_${n}_num`] || ""}
                      onChange={handleChange}
                    />
                    <div className="md:col-span-2">
                      <FormField
                        label="Title"
                        name={`principle_${n}_title`}
                        value={(editingItem as Record<string, string>)[`principle_${n}_title`] || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <TextAreaField
                        label="Description"
                        name={`principle_${n}_desc`}
                        value={(editingItem as Record<string, string>)[`principle_${n}_desc`] || ""}
                        onChange={handleChange}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VISIBILITY */}
          <div>
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