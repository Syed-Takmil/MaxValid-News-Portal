'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-30">
      {/* Desktop Navigation Pill */}
      <div className="hidden lg:flex max-w-6xl mx-auto items-center justify-between px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs">
        <div className="flex items-center gap-2 pl-2">
          <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white text-[10px] border border-white/30">
            🌳
          </div>
        </div>

        <div className="flex items-center gap-5 text-slate-200 text-[11px] font-medium">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/" className="hover:text-white transition">Donate ▾</Link>
          <Link href="/" className="hover:text-white transition">Events</Link>
          <Link href="/" className="hover:text-white transition">About Us ▾</Link>
          <Link href="/" className="hover:text-white transition">Gallery</Link>
          <Link href="/" className="text-white font-semibold underline underline-offset-4 decoration-sky-400">
            News & Articles ▾
          </Link>
          <Link href="/" className="hover:text-white transition">Partnership</Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-sky-500/80 p-0.5 rounded-full flex text-[10px] font-medium">
            <button className="bg-sky-500 px-2 py-0.5 rounded-full text-white">EN</button>
            <button className="px-2 py-0.5 text-white/80 hover:text-white">BN</button>
          </div>
          <Link href="/admin" className="px-3 py-1 text-[11px] border border-white/30 rounded-full hover:bg-white/10 transition">
            Sign in
          </Link>
          <button className="px-3.5 py-1 text-[11px] bg-sky-500 hover:bg-sky-600 font-medium rounded-full shadow-xs transition">
            Donate
          </button>
        </div>
      </div>

      {/* Mobile Top Controls (Hamburger Button) */}
      <div className="flex lg:hidden justify-between items-center w-full px-2">
        <div className="w-7 h-7 rounded-full bg-slate-800/60 flex items-center justify-center text-[10px]">
          🌳
        </div>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-sky-400 bg-slate-800/50 p-2 rounded-md hover:bg-slate-800 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-16 bg-slate-900/95 backdrop-blur-md p-5 rounded-2xl border border-slate-700 text-white z-50 flex flex-col gap-4 text-sm">
          <Link href="/" className="hover:text-sky-400">Home</Link>
          <Link href="/" className="hover:text-sky-400">Donate</Link>
          <Link href="/" className="hover:text-sky-400">Events</Link>
          <Link href="/" className="hover:text-sky-400">About Us</Link>
          <Link href="/" className="hover:text-sky-400">Gallery</Link>
          <Link href="/" className="text-sky-400 font-bold">News & Articles</Link>
          <Link href="/admin" className="pt-2 border-t border-slate-800 text-slate-300">Sign in</Link>
        </div>
      )}
    </nav>
  );
}