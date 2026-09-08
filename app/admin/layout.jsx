import AdminSidebar from '../components/AdminSidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Stays Persistent Across Admin Routes */}
      <AdminSidebar />
      
      {/* Main Page Content */}
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}