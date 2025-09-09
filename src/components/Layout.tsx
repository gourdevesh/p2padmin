import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={toggleMobileSidebar}
          />
          <div className="lg:hidden fixed inset-y-0 left-0 z-50">
            <Sidebar isCollapsed={false} onToggleCollapse={toggleMobileSidebar} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggleSidebar={toggleMobileSidebar} />
        
        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-6">
            <Outlet /> {/* ✅ Nested routes render here */}
          </div>
        </main>
      </div>
    </div>
  );
};
