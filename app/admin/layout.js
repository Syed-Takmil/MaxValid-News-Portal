'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDebounce } from '../hooks/useDebounce';
import { usePagination } from '../hooks/usePagination';

export default function AdminDashboardPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useDebounce(searchTerm, 300);

  // API Integration using async/await
  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to load content');
        const result = await res.json();
        setItems(result.data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const { currentPage, totalPages, currentData, goToPage, nextPage, prevPage } =
    usePagination(filteredItems, 5);

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="text-xs text-slate-400 mb-2">Dashboard &gt; Content Management</div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Blog & News Management</h1>
        <Link
          href="/admin/create"
          className="px-4 py-2.5 bg-sky-500 text-white font-medium text-sm rounded-lg hover:bg-sky-600 shadow-sm transition"
        >
          Create New Content
        </Link>
      </div>

      {/* Debounced Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Content (Debounced)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search content"
          className="w-full max-w-md px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent mb-2"></div>
          <p className="text-sm">Loading articles...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-6 text-center text-red-600 bg-red-50 rounded-xl border border-red-200">
          <p className="text-sm font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Content Table */}
      {!loading && !error && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm text-slate-600" aria-label="News articles table">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
              <tr>
                <th scope="col" className="py-3 px-4">Content Title</th>
                <th scope="col" className="py-3 px-4">Published Date</th>
                <th scope="col" className="py-3 px-4">Source Link</th>
                <th scope="col" className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-medium text-slate-800">{item.title}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    <div>{item.date}</div>
                    <div className="text-slate-400">{item.time}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <a
                      href={item.sourceLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open source link for ${item.title}`}
                      className="text-sky-500 hover:underline"
                    >
                      🔗
                    </a>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      aria-label={`Delete ${item.title}`}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              {currentData.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-400">
                    No content found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4 text-xs text-slate-500 bg-white border-t border-slate-100">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-2.5 py-1 border border-slate-200 rounded disabled:opacity-40 hover:bg-slate-50"
                aria-label="Previous page"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => goToPage(num)}
                  className={`px-2.5 py-1 rounded font-medium ${
                    currentPage === num
                      ? 'bg-sky-500 text-white'
                      : 'border border-slate-200 hover:bg-slate-50'
                  }`}
                  aria-label={`Go to page ${num}`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1 border border-slate-200 rounded disabled:opacity-40 hover:bg-slate-50"
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}