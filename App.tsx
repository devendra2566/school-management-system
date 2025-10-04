import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FeesManagement from './components/FeesManagement';
import SalaryManagement from './components/SalaryManagement';
import NotificationsLog from './components/NotificationsLog';
import StudentProfile from './components/StudentProfile';
import TeacherProfile from './components/TeacherProfile';
import UserManagement from './components/UserManagement';
import { View, Fee, Salary, Notification, Student, Staff, FeeStatus, SalaryStatus, User, Role } from './types';
import { users, students as initialStudents, staff as initialStaff, fees as initialFees, salaries as initialSalaries, initialNotifications } from './data/mockData';

const RoleSwitcher: React.FC<{ currentUser: User; setCurrentUser: (user: User) => void;}> = ({ currentUser, setCurrentUser }) => {
  const handleRoleChange = (userId: string) => {
    const newUser = users.find(u => u.id === userId);
    if(newUser) {
      setCurrentUser(newUser);
    }
  }
  return (
    <div className="absolute top-0 right-0 p-4 bg-white bg-opacity-80 rounded-bl-lg shadow-md z-10">
      <label htmlFor="role-switcher" className="block text-sm font-medium text-gray-700 mr-2">
        Switch User Role (Demo):
      </label>
      <select
        id="role-switcher"
        value={currentUser.id}
        onChange={(e) => handleRoleChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
        ))}
      </select>
    </div>
  )
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [students] = useState<Student[]>(initialStudents);
  const [staff] = useState<Staff[]>(initialStaff);
  const [fees, setFees] = useState<Fee[]>(initialFees);
  const [salaries, setSalaries] = useState<Salary[]>(initialSalaries);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const handleSetCurrentUser = (user: User) => {
    setCurrentUser(user);
    setActiveView('dashboard');
    setSelectedProfileId(null);
  }

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

  const handleSelectStudent = useCallback((studentId: string) => {
    setSelectedProfileId(studentId);
    setActiveView('studentProfile');
  }, []);

  const handleSetActiveView = (view: View) => {
      if (view !== 'studentProfile' && view !== 'teacherProfile') {
          setSelectedProfileId(null);
      }
      if (view === 'studentProfile' && currentUser.role === 'student') {
          setSelectedProfileId(currentUser.profileId);
      } else if (view === 'teacherProfile' && currentUser.role === 'teacher') {
          setSelectedProfileId(currentUser.profileId);
      }
      setActiveView(view);
  };

  const renderView = () => {
    if ((activeView === 'fees' || activeView === 'salaries' || activeView === 'userManagement') && currentUser.role !== 'admin') {
      return <Dashboard students={students} fees={fees} salaries={salaries} onSelectStudent={handleSelectStudent} currentUser={currentUser} />;
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard students={students} fees={fees} salaries={salaries} onSelectStudent={handleSelectStudent} currentUser={currentUser} />;
      case 'fees':
        return <FeesManagement students={students} fees={fees} onSendReminder={handleSendReminder} />;
      case 'salaries':
        return <SalaryManagement staff={staff} salaries={salaries} onPaySalary={handlePaySalary} />;
      case 'notifications':
        return <NotificationsLog notifications={notifications} />;
      case 'studentProfile': {
        const studentIdToShow = selectedProfileId || (currentUser.role === 'student' ? currentUser.profileId : null);
        const student = students.find(s => s.id === studentIdToShow);
        return student ? <StudentProfile student={student} fees={fees.filter(f => f.studentId === student.id)} /> : <div className="p-8">Please select a student to view their profile.</div>;
      }
      case 'teacherProfile': {
        const teacherIdToShow = selectedProfileId || (currentUser.role === 'teacher' ? currentUser.profileId : null);
        const teacher = staff.find(s => s.id === teacherIdToShow);
        return teacher ? <TeacherProfile teacher={teacher} /> : <div className="p-8">Teacher profile not found.</div>;
      }
      case 'userManagement':
        return <UserManagement />;
      default:
        return <Dashboard students={students} fees={fees} salaries={salaries} onSelectStudent={handleSelectStudent} currentUser={currentUser} />;
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar activeView={activeView} setActiveView={handleSetActiveView} notificationCount={notifications.length} currentUser={currentUser}/>
      <main className="flex-1 relative">
        <RoleSwitcher currentUser={currentUser} setCurrentUser={handleSetCurrentUser} />
        {renderView()}
      </main>
    </div>
  );
};

export default App;
