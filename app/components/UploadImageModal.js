'use client';

import React, { useState } from 'react';

export default function UploadImageModal({ isOpen, onClose, onUpload }) {
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpload(url);
      onClose();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      const url = URL.createObjectURL(e.dataTransfer.files[0]);
      onUpload(url);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-xl shadow-xl border border-slate-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg font-semibold"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div 
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`mt-4 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors ${
            dragActive ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="w-12 h-12 mb-3 flex items-center justify-center bg-slate-200 text-slate-600 rounded-full text-xl">
            ☁️
          </div>
          <p className="text-sm font-medium text-slate-700">Choose a file or drag & drop it here</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">PDF, JPG, JPEG, PNG . MAX (5MB)</p>
          
          <label className="cursor-pointer px-5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 shadow-sm">
            Browse File
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
          <span className="text-[11px] text-slate-400 mt-3">Recommended size: 1200×628 px</span>
        </div>
      </div>
    </div>
  );
}