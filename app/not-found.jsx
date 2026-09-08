import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 p-8 md:p-10 shadow-xs text-center space-y-6">
        {/* Large 404 Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-50 rounded-2xl text-[#0095E5] font-extrabold text-3xl tracking-wider">
          404
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            Sorry, the page you are looking for doesn't exist, was removed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#0095E5] text-white text-xs font-medium rounded-xl hover:bg-sky-600 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Home className="w-4 h-4" />
            Go to Public Home
          </Link>

          <Link
            href="/admin/news"
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}