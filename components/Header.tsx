import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { users } from '../data/mockData';
import { ChevronDownIcon, LogoutIcon, UserCircleIcon, UsersIcon } from './icons/Icons';

interface HeaderProps {
  currentUser: User;
  onLogout: () => void;
  onSwitchUser: (user: User) => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, onSwitchUser, onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserSwitch = (user: User) => {
    onSwitchUser(user);
    setDropdownOpen(false);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-slate-200 md:justify-end">
        <button onClick={onToggleSidebar} className="p-2 text-slate-500 rounded-lg hover:bg-slate-100 md:hidden" aria-label="Open sidebar">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100 transition-colors duration-200"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <UserCircleIcon />
          <span className="font-medium text-sm text-gray-700">{currentUser.name}</span>
          <ChevronDownIcon />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-20">
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-sm text-gray-500 capitalize">{currentUser.role}</p>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="py-1">
                <div className="px-4 py-2 text-xs text-gray-400 flex items-center">
                    <UsersIcon /> <span className="ml-2">Switch User (Demo)</span>
                </div>
                {users.filter(u => u.id !== currentUser.id).map(user => (
                    <a
                        key={user.id}
                        href="#"
                        onClick={(e) => { e.preventDefault(); handleUserSwitch(user); }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        {user.name} ({user.role})
                    </a>
                ))}
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="py-1">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onLogout(); }}
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogoutIcon />
                Logout
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;