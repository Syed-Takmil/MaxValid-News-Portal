'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bold, 
  Italic, 
  Underline, 
  Type, 
  List, 
  Image as ImageIcon, 
  RotateCcw,
  Trash2
} from 'lucide-react';
import UploadImageModal from '@/app/components/UploadImageModal';

export default function CreateContentPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tag, setTag] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Content title is required';
    if (!body.trim()) errs.body = 'Content body is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    router.push('/admin');
  };

  return (
    <div className="max-w-5xl mx-auto p-2">
      {/* Breadcrumb & Header */}
      <div className="text-[11px] text-slate-400 font-medium mb-1">
        Dashboard &gt; Create New Content
      </div>
      <h1 className="text-xl font-bold text-slate-800 mb-6">Create New Blog & News</h1>

      <form 
        onSubmit={handleSubmit} 
        className="space-y-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs"
      >
        {/* Title Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Content Title
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={64}
              placeholder="Plan name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 placeholder-slate-400 outline-none focus:bg-white focus:border-sky-500 transition-all pr-12"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">
              {title.length}/64
            </span>
          </div>
          {errors.title && <p className="text-[11px] text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-2 text-slate-600 border-b border-slate-100 pb-2">
          <button 
            type="button" 
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors" 
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button 
            type="button" 
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors" 
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button 
            type="button" 
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors" 
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button 
            type="button" 
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors" 
            title="Heading"
          >
            <Type className="w-4 h-4" />
          </button>
          <button 
            type="button" 
            className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors" 
            title="List"
          >
            <List className="w-4 h-4" />
          </button>

          {/* Upload Image Icon Button */}
          <button 
            type="button" 
            onClick={() => setIsModalOpen(true)}
            className="p-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-md transition-colors"
            title="Upload Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          <button 
            type="button" 
            className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors" 
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Content Body
          </label>
          <textarea
            rows={10}
            placeholder="Type something...."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 placeholder-slate-400 outline-none focus:bg-white focus:border-sky-500 transition-all resize-y"
          />
          {errors.body && <p className="text-[11px] text-red-500 mt-1">{errors.body}</p>}
        </div>

        {/* Tag Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Tag (max 3)
          </label>
          <input
            type="text"
            placeholder="Plan name"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 placeholder-slate-400 outline-none focus:bg-white focus:border-sky-500 transition-all"
          />
        </div>

        {/* Image Preview */}
        {imageUrl && (
          <div className="relative w-48 h-28 rounded-xl overflow-hidden border border-slate-200 group">
            <img 
              src={imageUrl} 
              alt="Uploaded preview" 
              className="w-full h-full object-cover" 
            />
            <button
              type="button"
              onClick={() => setImageUrl(null)}
              className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-red-500 p-1.5 rounded-md shadow-sm transition-all"
              title="Remove image"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="px-5 py-2.5 text-xs font-medium text-sky-500 bg-white border border-sky-400 rounded-xl hover:bg-sky-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-medium text-white bg-sky-500 rounded-xl hover:bg-sky-600 transition-colors shadow-sm"
          >
            Create Content
          </button>
        </div>
      </form>

      <UploadImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={(url) => setImageUrl(url)}
      />
    </div>
  );
}