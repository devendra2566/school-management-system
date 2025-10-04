import React from 'react';
import { View } from '../types';
import { DashboardIcon, FeesIcon, SalaryIcon, NotificationIcon, SchoolIcon } from './icons/Icons';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  notificationCount: number;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'fees', label: 'Fees Management', icon: <FeesIcon /> },
  { id: 'salaries', label: 'Salary Management', icon: <SalaryIcon /> },
  { id: 'notifications', label: 'Notifications', icon: <NotificationIcon /> },
] as const;


const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, notificationCount }) => {
  return (
    <aside className="w-64 bg-slate-800 text-slate-100 flex flex-col min-h-screen">
      <div className="flex items-center justify-center h-20 border-b border-slate-700">
        <SchoolIcon />
        <h1 className="text-xl font-bold ml-3">AcademiaPro</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveView(item.id)}
                className={`flex items-center w-full px-4 py-3 my-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeView === item.id
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="ml-4">{item.label}</span>
                {item.id === 'notifications' && notificationCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationCount}
                    </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
