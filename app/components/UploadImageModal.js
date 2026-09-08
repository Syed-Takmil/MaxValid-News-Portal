'use client';

import React, { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';

export default function UploadImageModal({ isOpen, onClose, onUpload }) {
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleFile = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      onUpload(url);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      {/* Modal Container with Dashed Border matching Figma */}
      <div 
        onDragOver={(e) => { 
          e.preventDefault(); 
          setDragActive(true); 
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
        }}
        className={`relative w-full max-w-md bg-slate-50/80 p-8 rounded-2xl border-2 border-dashed text-center transition-all ${
          dragActive 
            ? 'border-sky-500 bg-sky-50/50' 
            : 'border-slate-300 hover:border-slate-400'
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cloud Upload Icon */}
        <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-slate-800 text-white rounded-xl shadow-xs">
          <UploadCloud className="w-6 h-6" />
        </div>

        {/* Title & Specs */}
        <p className="text-sm font-semibold text-slate-800 mb-1">
          Choose a file or drag & drop it here
        </p>
        <p className="text-[11px] text-slate-400 mb-5">
          PDF, JPG, JPEG, PNG . MAX (5MB)
        </p>

        {/* Browse Button */}
        <label className="inline-block cursor-pointer px-6 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 shadow-xs transition-all">
          Browse File
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} 
          />
        </label>

        {/* Subtext */}
        <p className="text-[10px] text-slate-400 mt-5">
          Recommended size: 1200×628px
        </p>
      </div>
    </div>
  );
}