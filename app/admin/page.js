'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { initialNews } from '../data/newsData';

export default function AdminDashboardPage() {
  const [items, setItems] = useState(initialNews);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-xs text-slate-400 mb-2">Dashboard &gt; Content Management</div>
      
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Blog & News Management</h1>
        <Link 
          href="/admin/create" 
          className="px-4 py-2.5 bg-sky-500 text-white font-medium text-sm rounded-lg hover:bg-sky-600 shadow-sm transition"
        >
          Create New Content
        </Link>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Content"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
            <tr>
              <th className="py-3 px-4">Content Title</th>
              <th className="py-3 px-4">Published Date</th>
              <th className="py-3 px-4">Source Link</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                <td className="py-3.5 px-4 font-medium text-slate-800">{item.title}</td>
                <td className="py-3.5 px-4 text-xs text-slate-500">
                  <div>{item.date}</div>
                  <div className="text-slate-400">{item.time}</div>
                </td>
                <td className="py-3.5 px-4">
                  <a href={item.sourceLink} target="_blank" rel="noreferrer" className="text-sky-500 hover:underline">
                    🔗
                  </a>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-slate-400 hover:text-red-500 p-1"
                    title="Delete item"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-400">
                  No contents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Table Footer / Pagination */}
        <div className="flex justify-between items-center p-4 text-xs text-slate-500 bg-white">
          <span>Page {currentPage} of 1</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-50">‹</button>
            <button className="px-2.5 py-1 bg-sky-500 text-white rounded font-medium">1</button>
            <button className="px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-50">2</button>
            <button className="px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-50">3</button>
            <button className="px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-50">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}