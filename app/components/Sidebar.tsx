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

const Sidebar = () => {
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
    <div className="flex flex-col h-screen bg-white border-r border-gray-200 w-64">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">PandawaJogja</h2>
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
    </div>
  );
};

export default Sidebar; 