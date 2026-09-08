'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#18191c] text-slate-400 text-xs py-14 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Left Info Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg">
              🌳
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400 max-w-sm">
            This institution is striving to build an ideal welfare society by following the footsteps of the Prophet of Humanity, the Messenger of Human Freedom and Peace, the ideal of humanservice, the Prophet Muhammad (PBUH), in the service of humanity.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-[12px]">Company</h4>
          <ul className="space-y-2 text-[11px]">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/" className="hover:text-white transition">Our Work</Link></li>
            <li><Link href="/" className="hover:text-white transition">Gallery</Link></li>
            <li><Link href="/" className="hover:text-white transition">Blog</Link></li>
          </ul>
        </div>

        {/* Donate Links */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-[12px]">Donate</h4>
          <ul className="space-y-2 text-[11px]">
            <li><Link href="/" className="hover:text-white transition">Donate</Link></li>
            <li><Link href="/" className="hover:text-white transition">Blood Donate</Link></li>
            <li><Link href="/" className="hover:text-white transition">Blood Request</Link></li>
          </ul>
        </div>

        {/* Others Links */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-[12px]">Others</h4>
          <ul className="space-y-2 text-[11px]">
            <li><Link href="/" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="/" className="hover:text-white transition">Terms of Conditions</Link></li>
            <li><Link href="/" className="hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800/60 text-center text-[10px] text-slate-500">
        © 2026 Bandhan Paribar. All rights reserved
      </div>
    </footer>
  );
}