import React, { useState } from 'react';
import { users } from '../data/mockData';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const SchoolIconLogin = () => (
    <svg className="w-16 h-16 text-sky-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
);

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedUserId, setSelectedUserId] = useState(users[0].id);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const userToLogin = users.find(u => u.id === selectedUserId);
    
    // Simulate network request
    setTimeout(() => {
        if (userToLogin) {
            onLogin(userToLogin);
        }
        setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <SchoolIconLogin />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">AcademiaPro</h1>
            <p className="text-gray-500">School Management System</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select a user to log in as (Demo)
              </label>
              <select
                id="user-select"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                disabled={isLoading}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
              >
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
                ))}
              </select>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;