'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import { initialNews, categories } from './data/newsData';
import { useDebounce } from './hooks/useDebounce';
import { usePagination } from './hooks/usePagination';

export default function PublicNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Gallery & Media');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  // Fallback image in case Unsplash URLs break
  const fallbackImage =
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80';

  // 1. Filter data based on category and search query
  const filteredNews = initialNews.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All Gallery & Media' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 2. Custom pagination hook (6 items per page)
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

  //  pagination buttons (Accessible ,Responsive across mobile + desktop)
  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    // Dynamically calculate visible page range based on currentPage
    const maxVisible = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <nav
        aria-label="Pagination Navigation"
        className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-6"
      >
        {/* Previous Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="px-2.5 py-1 rounded bg-white border border-slate-200 hover:bg-slate-100 transition disabled:opacity-40 disabled:hover:bg-white"
        >
          ‹
        </button>

        {/* First Page Link if scrolled far */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className="w-7 h-7 rounded-full font-medium flex items-center justify-center text-[10px] bg-white border border-slate-200 hover:bg-slate-100 transition"
            >
              1
            </button>
            {startPage > 2 && <span className="px-1 text-slate-400">...</span>}
          </>
        )}

        {/* Active Sliding Window Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`w-7 h-7 rounded-full font-medium flex items-center justify-center text-[10px] transition ${
              currentPage === page
                ? 'bg-sky-500 text-white shadow-xs'
                : 'bg-white border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last Page Link if scrolled far back */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-1 text-slate-400">...</span>}
            <button
              onClick={() => goToPage(totalPages)}
              className="w-7 h-7 rounded-full font-medium flex items-center justify-center text-[10px] bg-white border border-slate-200 hover:bg-slate-100 transition"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className="px-2.5 py-1 rounded bg-white border border-slate-200 hover:bg-slate-100 transition disabled:opacity-40 disabled:hover:bg-white"
        >
          ›
        </button>
      </nav>
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
          <div className="bg-white/95 backdrop-blur-md p-2 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
            <span className="pl-2 text-slate-400 text-xs" role="img" aria-label="Search icon">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search news & articles..."
              aria-label="Search articles"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs outline-none text-slate-700 bg-transparent placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6">
          {/* Mobile Category Horizontal Pill Selector */}
          <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition ${
                    isActive
                      ? 'bg-sky-500 text-white font-medium shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Desktop Featured News Section */}
          {initialNews[0] && (
            <section className="hidden md:block">
              <h2 className="text-base font-bold text-slate-800 mb-3">Featured News & Articles</h2>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-100 grid md:grid-cols-2">
                <div className="h-60 bg-slate-200">
                  <img
                    src={initialNews[0].imageUrl}
                    alt={initialNews[0].title}
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
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
            {/* Category Sidebar (Desktop Only) */}
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

            {/* Articles Grid / Mobile Cards */}
            <div className="md:col-span-3 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {currentData.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs flex flex-col justify-between transition-transform hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="h-44 sm:h-40 bg-slate-200">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          onError={(e) => {
                            e.currentTarget.src = fallbackImage;
                          }}
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

              {/* Responsive Pagination Controls */}
              {filteredNews.length > 0 && renderPaginationButtons()}
            </div>
          </section>
        </main>
      </div>

      {/* Footer Elements */}
      <div className="hidden md:block">
        <Footer />
      </div>
      <MobileBottomNav />
    </div>
  );
}