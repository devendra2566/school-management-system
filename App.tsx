import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FeesManagement from './components/FeesManagement';
import SalaryManagement from './components/SalaryManagement';
import NotificationsLog from './components/NotificationsLog';
import { View, Fee, Salary, Notification, Student, Staff, FeeStatus, SalaryStatus } from './types';
import { students as initialStudents, staff as initialStaff, fees as initialFees, salaries as initialSalaries, initialNotifications } from './data/mockData';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [students] = useState<Student[]>(initialStudents);
  const [staff] = useState<Staff[]>(initialStaff);
  const [fees, setFees] = useState<Fee[]>(initialFees);
  const [salaries, setSalaries] = useState<Salary[]>(initialSalaries);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const handleSendReminder = useCallback((studentId: string, parentName: string, studentName: string) => {
    const fee = fees.find(f => f.studentId === studentId && (f.status === FeeStatus.Due || f.status === FeeStatus.Overdue));
    if (!fee) return;

    const newNotification: Notification = {
      id: `N${Date.now()}`,
      to: parentName,
      studentName: studentName,
      message: `This is a reminder that the fee payment of $${fee.amount} for ${studentName} is ${fee.status.toLowerCase()}. Please pay by ${new Date(fee.dueDate).toLocaleDateString()}.`,
      sentAt: new Date().toISOString(),
    };

    setNotifications(prev => [...prev, newNotification]);
    alert(`Reminder sent to ${parentName} for ${studentName}.`);
  }, [fees]);

  const handlePaySalary = useCallback((salaryId: string) => {
    setSalaries(prevSalaries => 
      prevSalaries.map(salary => 
        salary.id === salaryId ? { ...salary, status: SalaryStatus.Paid, paymentDate: new Date().toISOString() } : salary
      )
    );
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard students={students} fees={fees} salaries={salaries} />;
      case 'fees':
        return <FeesManagement students={students} fees={fees} onSendReminder={handleSendReminder} />;
      case 'salaries':
        return <SalaryManagement staff={staff} salaries={salaries} onPaySalary={handlePaySalary} />;
      case 'notifications':
        return <NotificationsLog notifications={notifications} />;
      default:
        return <Dashboard students={students} fees={fees} salaries={salaries} />;
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar activeView={activeView} setActiveView={setActiveView} notificationCount={notifications.length} />
      <main className="flex-1">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
