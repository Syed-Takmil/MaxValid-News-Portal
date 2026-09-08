'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Newspaper, Settings, Menu, UserCheck } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Blog & News Management', href: '/admin/news', icon: Newspaper },
    { name: 'Setting Management', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between min-h-screen p-4">
      <div className="space-y-6">
        {/* Brand / Logo */}
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
              🌳
            </div>
          </div>
          <Menu className="w-5 h-5 text-slate-400 cursor-pointer" />
        </div>

        {/* Navigation List */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#0095E5] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
          <UserCheck className="w-4 h-4" />
        </div>
        <div className="truncate">
          <div className="text-xs font-bold text-slate-700 truncate">Super Admin</div>
          <div className="text-[10px] text-slate-400 truncate">superadmin@kichukori.com</div>
        </div>
      </div>
    </aside>
  );
}