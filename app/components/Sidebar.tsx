'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ChartBarIcon,
  ChartPieIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: ChartBarIcon,
    },
    {
      name: 'Complaint Trends',
      href: '/dashboard/trends',
      icon: ChartBarIcon,
    },
    {
      name: 'Status Breakdown',
      href: '/dashboard/status',
      icon: ClipboardDocumentListIcon,
    },
    {
      name: 'Category Distribution',
      href: '/dashboard/categories',
      icon: ChartPieIcon,
    },
    {
      name: 'Department Performance',
      href: '/dashboard/departments',
      icon: UserGroupIcon,
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 h-screen bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-500 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center p-4 border-b border-gray-100">
          <button className="p-2 mr-2" onClick={onClose} aria-label="Hide sidebar">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <h2 className="font-bold text-lg sm:text-xl text-gray-800">PandawaJogja</h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto">
          <ul className="px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="space-y-1">
            <Link
              href="/dashboard/account"
              className="flex items-center gap-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <UserCircleIcon className="w-5 h-5" />
              Account
            </Link>
            <button
              className="flex w-full items-center gap-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Log out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 