'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ExternalLink, MoreVertical, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { usePagination } from '../hooks/usePagination';
import { useDebounce } from '../hooks/useDebounce';

export default function AdminDashboardPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to load data');
        const json = await res.json();
        setItems(json.data);
      } catch (err) {
        setItems([
          { id: 1, title: 'Relief distribution among flood victims...', date: 'Jun 29, 2026', time: '10:30 AM', sourceLink: '#' },
          { id: 2, title: 'Community Health Camp in Sylhet O...', date: 'Jun 29, 2026', time: '10:30 AM', sourceLink: '#' },
          { id: 3, title: 'AI Face Morphing in Entertainment', date: 'Jun 29, 2026', time: '10:30 AM', sourceLink: '#' },
          { id: 4, title: 'Virtual Reality Concerts Revolutionize Music Industry', date: 'Jul 15, 2026', time: '7:00 PM', sourceLink: '#' },
          { id: 5, title: 'AI-Powered Scriptwriting Gains Traction in Hollywood', date: 'Aug 4, 2026', time: '2:45 PM', sourceLink: '#' },
          { id: 6, title: 'Deepfake Technology Raises Ethical Questions in Media', date: 'Sep 12, 2026', time: '11:15 AM', sourceLink: '#' },
          { id: 7, title: 'Interactive Storytelling Experiences with AI', date: 'Oct 23, 2026', time: '9:00 AM', sourceLink: '#' },
          { id: 8, title: 'AI Animation Tools Speed Up Film Production', date: 'Nov 5, 2026', time: '1:30 PM', sourceLink: '#' },
          { id: 9, title: 'Augmented Reality Games Incorporate Real-Time AI', date: 'Dec 18, 2026', time: '4:45 PM', sourceLink: '#' },
          { id: 10, title: 'AI Face Morphing in Entertainment', date: 'Jun 29, 2026', time: '10:30 AM', sourceLink: '#' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const { currentPage, totalPages, currentData, goToPage, nextPage, prevPage } =
    usePagination(filteredItems, itemsPerPage);

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-2 font-sans">
      {/* Breadcrumb */}
      <div className="text-[11px] text-slate-400 font-medium mb-1">
        Dashboard &gt; Content Management
      </div>

      {/* Header & Primary CTA Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-800">Blog & News Management</h1>
        <Link
          href="/admin/create"
          className="px-5 py-2.5 bg-[#0095E5] text-white font-medium text-xs rounded-xl hover:bg-sky-600 shadow-sm transition-all"
        >
          Create New Content
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-5">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search Content"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-100 rounded-xl text-xs text-slate-700 placeholder-slate-400 outline-none focus:bg-white focus:border-[#0095E5] transition-all"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs mb-6">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50/60 border-b border-slate-100 text-slate-400 font-medium">
            <tr>
              <th className="py-3.5 px-6 font-medium">Content Title</th>
              <th className="py-3.5 px-6 font-medium">Published Date</th>
              <th className="py-3.5 px-6 font-medium">Source Link</th>
              <th className="py-3.5 px-6 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-slate-700 max-w-xs truncate">
                  {item.title}
                </td>
                <td className="py-4 px-6 text-slate-500">
                  <div className="font-medium text-slate-700 text-[11px]">{item.date}</div>
                  <div className="text-[10px] text-slate-400">{item.time}</div>
                </td>
                <td className="py-4 px-6">
                  <a
                    href={item.sourceLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0095E5] hover:text-sky-600 inline-block"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                    title="Delete item"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {currentData.length === 0 && (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-400">
                  No articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer - Exact Figma Design */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        {/* Left Side: Page counter text */}
        <div>
          Page {currentPage} of {totalPages || 1}
        </div>

        {/* Center: Blue-bordered pill navigation controls */}
        <div className="flex items-center">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center text-slate-300 disabled:opacity-40 hover:text-slate-500 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: Math.min(5, totalPages || 1) }, (_, i) => i + 1).map((num) => {
              const isActive = currentPage === num;
              return (
                <button
                  key={num}
                  onClick={() => goToPage(num)}
                  className={`w-8 h-8 rounded-xl font-medium text-xs flex items-center justify-center transition ${
                    isActive
                      ? 'bg-[#0095E5] text-white shadow-xs'
                      : 'bg-white border border-[#0095E5]/40 text-[#0095E5] hover:bg-sky-50'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center text-[#0095E5] disabled:text-slate-300 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Side: Items Per Page Selector */}
        <div className="flex items-center gap-1 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white text-slate-500 text-[11px]">
          <span>1/ Page</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </div>
      </div>
    </div>
  );
}