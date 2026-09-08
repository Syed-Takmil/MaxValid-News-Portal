import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8 px-2">
            <span className="font-bold text-lg text-sky-600">MaxValid Admin</span>
          </div>

          <nav className="space-y-1">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              📊 Dashboard
            </Link>
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              👥 User Management
            </Link>
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-sky-500 text-white"
            >
              📰 Blog & News Management
            </Link>
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              ⚙️ Setting Management
            </Link>
          </nav>
        </div>

        {/* Admin Profile Tag */}
        <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-3 border border-slate-100">
          <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs">
            SA
          </div>
          <div className="overflow-hidden text-xs">
            <p className="font-semibold text-slate-800 truncate">Super Admin</p>
            <p className="text-slate-400 truncate">superadmin@kichukori.com</p>
          </div>
        </div>
      </aside>

      {/* Main Content View Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}