import React from 'react';
import { Notification } from '../types';

interface NotificationsLogProps {
  notifications: Notification[];
}

const NotificationsLog: React.FC<NotificationsLogProps> = ({ notifications }) => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Notifications Log</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications sent yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {[...notifications].reverse().map((notification) => (
              <li key={notification.id} className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Reminder to {notification.to} (Parent of {notification.studentName})
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(notification.sentAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsLog;
