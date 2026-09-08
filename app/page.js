'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import { initialNews, categories } from './data/newsData';
import { useDebounce } from './hooks/useDebounce';
import { usePagination } from './hooks/usePagination'; // Imported your hook

export default function PublicNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Gallery & Media');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  // 1. Filter data based on category and search query
  const filteredNews = initialNews.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All Gallery & Media' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 2. Use your custom pagination hook (6 items per page)
  const {
    currentPage,
    totalPages,
    currentData,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination(filteredNews, 6);

  // Reset to page 1 whenever category or search changes
  useEffect(() => {
    goToPage(1);
  }, [selectedCategory, debouncedSearch]);

  // Helper function to render pagination range matching Figma
  const renderPaginationButtons = () => {
    const pages = [];
    const maxVisiblePages = 3;

    for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
      pages.push(i);
    }

    return (
      <div className="hidden sm:flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-6">
        {/* Previous Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded hover:bg-slate-200/60 transition disabled:opacity-30 disabled:hover:bg-transparent"
        >
          ‹
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-6 h-6 rounded-full font-medium flex items-center justify-center text-[10px] transition ${
              currentPage === page ? 'bg-sky-500 text-white' : 'hover:bg-slate-200/60'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Ellipsis and Last Page */}
        {totalPages > maxVisiblePages && (
          <>
            <span className="px-1 text-slate-400">...</span>
            <button
              onClick={() => goToPage(totalPages)}
              className={`px-1.5 py-0.5 rounded text-[10px] hover:bg-slate-200/60 transition ${
                currentPage === totalPages ? 'bg-sky-500 text-white' : ''
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded hover:bg-slate-200/60 transition disabled:opacity-30 disabled:hover:bg-transparent"
        >
          ›
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col justify-between pb-20 md:pb-0">
      <div>
        {/* Banner Hero Section */}
        <header className="relative bg-slate-900 text-white pt-4 pb-14 md:pb-28 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/90 to-slate-950 pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <Navbar />
            <h1 className="text-2xl md:text-4xl font-extrabold text-center mt-6 md:mt-12 tracking-tight">
              News & Articles
            </h1>
          </div>
        </header>

        {/* Floating Search Bar */}
        <div className="max-w-4xl mx-auto px-4 -mt-5 md:-mt-6 relative z-20">
          <div className="bg-slate-100/90 backdrop-blur-md p-2 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-2">
            <span className="pl-2 text-slate-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Blog search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs outline-none text-slate-700 bg-transparent placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-8">
          {/* Desktop-only Featured Section */}
          {initialNews[0] && (
            <section className="hidden md:block">
              <h2 className="text-base font-bold text-slate-800 mb-3">Featured News & Articles</h2>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-100 grid md:grid-cols-2">
                <div className="h-60 bg-slate-200">
                  <img
                    src={initialNews[0].imageUrl}
                    alt={initialNews[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug">
                      {initialNews[0].title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {initialNews[0].description}
                    </p>
                  </div>
                  <div className="text-[11px] font-medium text-slate-400">{initialNews[0].date}</div>
                </div>
              </div>
            </section>
          )}

          {/* Sidebar & Article Grid */}
          <section className="grid md:grid-cols-4 gap-6 items-start">
            {/* Category Sidebar (Hidden on Mobile) */}
            <aside className="hidden md:block bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
              <ul className="space-y-1">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] transition ${
                          isActive
                            ? 'text-sky-600 font-bold border-l-2 border-sky-500 bg-sky-50/50 pl-2.5'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Articles Grid / Mobile Single Column */}
            <div className="md:col-span-3 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {/* 3. Render currentData slice provided by usePagination */}
                {currentData.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 sm:h-40 bg-slate-200">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-slate-800 text-xs mb-1.5 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}

                {filteredNews.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-400 text-xs">
                    No matching articles found.
                  </div>
                )}
              </div>

              {/* Dynamic Desktop Pagination */}
              {filteredNews.length > 0 && renderPaginationButtons()}
            </div>
          </section>
        </main>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}