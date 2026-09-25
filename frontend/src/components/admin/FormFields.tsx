import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'email' | 'url';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  description?: string;
}

export const FormField = ({ label, name, type = 'text', value, onChange, required, placeholder, description }: FormFieldProps) => (
  <div className="mb-4">
    <label className="block text-xs font-mono text-[#8ea3bd] mb-1 tracking-widest uppercase">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full bg-[#030609] border border-[#1a2b44] text-white px-3 py-2 rounded focus:outline-none focus:border-[#00d9ff]/50 focus:ring-1 focus:ring-[#00d9ff]/50 transition-all font-sans text-sm"
    />
    {description && <p className="text-[10px] text-[#4a5f78] mt-1">{description}</p>}
  </div>
);

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  description?: string;
}

export const TextAreaField = ({ label, name, value, onChange, required, rows = 4, placeholder, description }: TextAreaFieldProps) => (
  <div className="mb-4">
    <label className="block text-xs font-mono text-[#8ea3bd] mb-1 tracking-widest uppercase">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      placeholder={placeholder}
      className="w-full bg-[#030609] border border-[#1a2b44] text-white px-3 py-2 rounded focus:outline-none focus:border-[#00d9ff]/50 focus:ring-1 focus:ring-[#00d9ff]/50 transition-all font-sans text-sm resize-y"
    />
    {description && <p className="text-[10px] text-[#4a5f78] mt-1">{description}</p>}
  </div>
);

interface ToggleFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
}

export const ToggleField = ({ label, name, checked, onChange, description }: ToggleFieldProps) => (
  <div className="mb-4">
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input 
          type="checkbox" 
          name={name} 
          checked={checked} 
          onChange={onChange} 
          className="sr-only" 
        />
        <div className={`block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-[#00d9ff]' : 'bg-[#1a2b44]'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'transform translate-x-4' : ''}`}></div>
      </div>
      <div className="ml-3">
        <span className="block text-sm font-mono text-white tracking-widest uppercase">{label}</span>
        {description && <span className="block text-xs text-[#8ea3bd]">{description}</span>}
      </div>
    </label>
  </div>
);

interface ActionButtonsProps {
  onCancel: () => void;
  isSaving: boolean;
  saveLabel?: string;
}

export const ActionButtons = ({ onCancel, isSaving, saveLabel = "SAVE" }: ActionButtonsProps) => (
  <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-[#1a2b44]">
    <button
      type="button"
      onClick={onCancel}
      disabled={isSaving}
      className="px-4 py-2 bg-[#1a2b44] hover:bg-[#253959] text-white rounded font-mono text-sm transition-colors"
    >
      CANCEL
    </button>
    <button
      type="submit"
      disabled={isSaving}
      className="px-6 py-2 bg-[#00d9ff]/10 hover:bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/30 rounded font-mono text-sm tracking-widest transition-colors flex items-center"
    >
      {isSaving ? 'SAVING...' : saveLabel}
    </button>
  </div>
);
