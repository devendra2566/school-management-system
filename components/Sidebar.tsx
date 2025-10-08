import React from 'react';
import { View, User, Role } from '../types';
import { DashboardIcon, FeesIcon, SalaryIcon, NotificationIcon, SchoolIcon, UsersIcon, UserCircleIcon, AttendanceIcon } from './icons/Icons';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  notificationCount: number;
  currentUser: User;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const navItems: {
  id: 'dashboard' | 'fees' | 'salaries' | 'userManagement' | 'notifications' | 'attendance';
  label: string;
  icon: React.ReactNode;
  roles: Role[];
}[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, roles: ['admin', 'teacher', 'student'] },
  { id: 'fees', label: 'Fees Management', icon: <FeesIcon />, roles: ['admin'] },
  { id: 'salaries', label: 'Salary Management', icon: <SalaryIcon />, roles: ['admin'] },
  { id: 'attendance', label: 'Attendance', icon: <AttendanceIcon />, roles: ['teacher'] },
  { id: 'userManagement', label: 'User Management', icon: <UsersIcon />, roles: ['admin'] },
  { id: 'notifications', label: 'Notifications', icon: <NotificationIcon />, roles: ['admin', 'teacher', 'student'] },
];


const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, notificationCount, currentUser, isSidebarOpen, setIsSidebarOpen }) => {
  const availableNavItems = navItems.filter(item => item.roles.includes(currentUser.role));

  const handleProfileClick = () => {
    if (currentUser.role === 'student') {
        setActiveView('studentProfile');
    } else if (currentUser.role === 'teacher') {
        setActiveView('teacherProfile');
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      ></div>
      <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-800 text-slate-100 flex flex-col transform transition-transform duration-300 ease-in-out z-30 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center justify-between h-20 border-b border-slate-700 px-4">
            <div className="flex items-center">
                <SchoolIcon />
                <h1 className="text-xl font-bold ml-3">AcademiaPro</h1>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 rounded-md hover:bg-slate-700" aria-label="Close sidebar">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul>
            {availableNavItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center w-full px-4 py-3 my-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeView === item.id
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  aria-current={activeView === item.id ? 'page' : undefined}
                >
                  {item.icon}
                  <span className="ml-4">{item.label}</span>
                  {item.id === 'notifications' && notificationCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center" aria-label={`${notificationCount} new notifications`}>
                          {notificationCount}
                      </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {(currentUser.role === 'student' || currentUser.role === 'teacher') && (
          <div className="px-4 py-4 border-t border-slate-700">
              <button 
                  onClick={handleProfileClick}
                  className={`flex items-center w-full px-4 py-3 my-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeView.includes('Profile')
                        ? 'bg-sky-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
              >
                  <UserCircleIcon />
                  <span className="ml-4">My Profile</span>
              </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;