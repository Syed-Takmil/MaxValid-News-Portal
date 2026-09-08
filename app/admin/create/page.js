'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadImageModal from '../../components/UploadImageModal';

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
    if (!title.trim()) errs.title = 'Title is required';
    if (!body.trim()) errs.body = 'Content body is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Navigate back to Admin Dashboard after saving
    router.push('/admin');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="text-xs text-slate-400 mb-2">Dashboard &gt; Create New Content</div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Create New Blog & News</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        {/* Title Field */}
        <div>
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
            <label>Content Title</label>
            <span className="text-xs text-slate-400">{title.length}/64</span>
          </div>
          <input
            type="text"
            maxLength={64}
            placeholder="Plan name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600">
          <button type="button" className="px-2 py-1 font-bold hover:bg-slate-200 rounded text-sm">B</button>
          <button type="button" className="px-2 py-1 italic hover:bg-slate-200 rounded text-sm">I</button>
          <button type="button" className="px-2 py-1 underline hover:bg-slate-200 rounded text-sm">U</button>
          <div className="h-4 w-[1px] bg-slate-300 mx-1" />
          <button 
            type="button" 
            onClick={() => setIsModalOpen(true)}
            className="px-2 py-1 hover:bg-slate-200 rounded text-sky-600 text-sm font-medium flex items-center gap-1"
          >
            🖼️ Upload Image
          </button>
        </div>

        {/* Content Body */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Content Body</label>
          <textarea
            rows={8}
            placeholder="Type something...."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {errors.body && <p className="text-xs text-red-500 mt-1">{errors.body}</p>}
        </div>

        {/* Tag Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tag (max 3)</label>
          <input
            type="text"
            placeholder="Plan name"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
          />
        </div>

        {/* Image Preview */}
        {imageUrl && (
          <div className="relative w-48 h-28 rounded-lg overflow-hidden border border-slate-200">
            <img src={imageUrl} alt="Uploaded thumbnail" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => setImageUrl(null)}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 text-xs hover:bg-black"
            >
              🗑️
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="px-5 py-2 text-sm font-medium text-sky-600 bg-white border border-sky-500 rounded-lg hover:bg-sky-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 shadow-sm"
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