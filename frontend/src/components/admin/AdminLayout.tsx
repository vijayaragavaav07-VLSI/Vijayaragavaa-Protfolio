import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Menu } from 'lucide-react';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030609] text-[#e8f1fb] flex overflow-hidden selection:bg-[#00d9ff]/30 selection:text-white">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-[#1a2b44] bg-[#07111f]">
          <span className="font-mono text-[#00d9ff] font-bold tracking-widest text-sm">VV ADMIN</span>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="text-[#8ea3bd] hover:text-[#00d9ff] focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-br from-[#030609] to-[#07111f]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
