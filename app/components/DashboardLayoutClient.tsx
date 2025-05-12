"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar dengan animasi dan hidden */}
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <div className="flex-1 flex flex-col">
        {/* Header/topbar */}
        <header className="flex items-center h-14 px-2 sm:px-4 border-b bg-white shadow-sm">
          {!isSidebarOpen && (
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
              aria-label="Show sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          )}
          <span className="ml-2 font-bold text-lg sm:text-xl text-gray-800">PandawaJogja</span>
        </header>
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
} 