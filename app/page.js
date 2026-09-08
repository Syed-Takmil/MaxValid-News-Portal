'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { initialNews, categories } from './data/newsData';

export default function PublicNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Gallery & Media');
  const [search, setSearch] = useState('');

  const featured = initialNews[0];
  const gridNews = initialNews.filter(item => 
    (selectedCategory === 'All Gallery & Media' || item.category === selectedCategory) &&
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header Banner */}
      <header className="relative bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white pb-20 pt-6 px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center mb-16">
          <div className="font-bold text-xl">MaxValid</div>
          
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/" className="hover:text-white">Donate ▾</Link>
            <Link href="/" className="hover:text-white">Events</Link>
            <Link href="/" className="hover:text-white">About Us ▾</Link>
            <Link href="/" className="hover:text-white">Gallery</Link>
            <Link href="/" className="text-white font-semibold">News & Articles ▾</Link>
            <Link href="/" className="hover:text-white">Partnership</Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 text-xs px-2 py-1 rounded flex gap-1">
              <span className="bg-sky-500 px-1.5 py-0.5 rounded text-white font-medium">EN</span>
              <span className="px-1.5 py-0.5 text-slate-300">BN</span>
            </div>
            <Link href="/admin" className="text-xs px-3 py-1.5 border border-white/30 rounded hover:bg-white/10">Sign in</Link>
            <button className="text-xs px-3 py-1.5 bg-sky-500 hover:bg-sky-600 rounded font-medium">Donate</button>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-6">News & Articles</h1>
      </header>

      {/* Search Input Bar */}
      <div className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white p-2 rounded-xl shadow-md border border-slate-100 flex items-center gap-2">
          <span className="pl-3 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Blog search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm outline-none px-2 py-1"
          />
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Featured Section */}
        {featured && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Featured News & Articles</h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 grid md:grid-cols-2">
              <div className="h-64 md:h-auto bg-slate-200">
                <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{featured.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{featured.description}</p>
                </div>
                <div className="text-xs text-slate-400">{featured.date}</div>
              </div>
            </div>
          </section>
        )}

        {/* Content Layout with Sidebar */}
        <section className="grid md:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <aside className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm h-fit">
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                      selectedCategory === cat 
                        ? 'bg-sky-50 text-sky-600 font-semibold border-l-2 border-sky-500' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Cards Grid Area */}
          <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridNews.map((item) => (
              <article key={item.id} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="h-40 bg-slate-200">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-800 text-sm mb-2 line-clamp-2">{item.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">{item.description}</p>
                  </div>
                </div>
                <div className="px-4 pb-4 text-[11px] text-slate-400">
                  {item.date}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}