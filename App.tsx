import React, { useState, useCallback, Fragment } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FeesManagement from './components/FeesManagement';
import SalaryManagement from './components/SalaryManagement';
import NotificationsLog from './components/NotificationsLog';
import StudentProfile from './components/StudentProfile';
import TeacherProfile from './components/TeacherProfile';
import UserManagement from './components/UserManagement';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Attendance from './components/Attendance';
import { View, Fee, Salary, Notification, Student, Staff, FeeStatus, SalaryStatus, User, AttendanceRecord, AttendanceStatus } from './types';
import { users, students as initialStudents, staff as initialStaff, fees as initialFees, salaries as initialSalaries, initialNotifications, initialAttendanceRecords } from './data/mockData';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [students] = useState<Student[]>(initialStudents);
  const [staff] = useState<Staff[]>(initialStaff);
  const [fees, setFees] = useState<Fee[]>(initialFees);
  const [salaries, setSalaries] = useState<Salary[]>(initialSalaries);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setActiveView('dashboard');
    setSelectedProfileId(null);
  }

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  }

  const handleSwitchUser = (user: User) => {
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
  
  const handleMarkAttendance = useCallback((studentId: string, status: AttendanceStatus) => {
      const today = new Date().toISOString().split('T')[0];
      const student = students.find(s => s.id === studentId);
      if (!student) return;

      // Add attendance record
      setAttendanceRecords(prev => [...prev, { studentId, date: today, status }]);

      // Send notification to parent
      const newNotification: Notification = {
          id: `N${Date.now()}`,
          to: student.parentName,
          studentName: student.name,
          message: `Dear ${student.parentName}, this is to inform you that ${student.name} was marked ${status} at school today, ${new Date().toLocaleDateString()}.`,
          sentAt: new Date().toISOString(),
      };
      setNotifications(prev => [...prev, newNotification]);
      
      alert(`Attendance marked for ${student.name}. Parent has been notified.`);

  }, [students]);

  const handleSelectStudent = useCallback((studentId: string) => {
    setSelectedProfileId(studentId);
    setActiveView('studentProfile');
  }, []);

  const handleSelectStaff = useCallback((staffId: string) => {
    setSelectedProfileId(staffId);
    setActiveView('teacherProfile');
  }, []);

  const handleSetActiveView = (view: View) => {
    if (!currentUser) return;
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
    if (!currentUser) return null;

    if ((activeView === 'fees' || activeView === 'salaries' || activeView === 'userManagement') && currentUser.role !== 'admin') {
      return <Dashboard students={students} fees={fees} salaries={salaries} attendanceRecords={attendanceRecords} onSelectStudent={handleSelectStudent} currentUser={currentUser} />;
    }
     if (activeView === 'attendance' && currentUser.role !== 'teacher') {
      return <Dashboard students={students} fees={fees} salaries={salaries} attendanceRecords={attendanceRecords} onSelectStudent={handleSelectStudent} currentUser={currentUser} />;
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard students={students} fees={fees} salaries={salaries} attendanceRecords={attendanceRecords} onSelectStudent={handleSelectStudent} currentUser={currentUser} />;
      case 'fees':
        return <FeesManagement students={students} fees={fees} onSendReminder={handleSendReminder} />;
      case 'salaries':
        return <SalaryManagement staff={staff} salaries={salaries} onPaySalary={handlePaySalary} />;
      case 'notifications':
        return <NotificationsLog notifications={notifications} />;
      case 'attendance': {
        const teacherProfile = staff.find(s => s.id === currentUser.profileId);
        if (!teacherProfile || !teacherProfile.classTeacherOfGrade) {
            return <div className="p-8">You are not assigned as a class teacher for any grade.</div>;
        }
        return <Attendance 
          teacher={teacherProfile} 
          students={students.filter(s => s.grade === teacherProfile.classTeacherOfGrade)} 
          attendanceRecords={attendanceRecords} 
          onMarkAttendance={handleMarkAttendance}
        />
      }
      case 'studentProfile': {
        const studentIdToShow = selectedProfileId || (currentUser.role === 'student' ? currentUser.profileId : null);
        const student = students.find(s => s.id === studentIdToShow);
        return student ? <StudentProfile student={student} fees={fees.filter(f => f.studentId === student.id)} attendanceRecords={attendanceRecords} /> : <div className="p-8">Please select a student to view their profile.</div>;
      }
      case 'teacherProfile': {
        const teacherIdToShow = selectedProfileId || (currentUser.role === 'teacher' ? currentUser.profileId : null);
        const teacher = staff.find(s => s.id === teacherIdToShow);
        return teacher ? <TeacherProfile teacher={teacher} /> : <div className="p-8">Please select a teacher to view their profile.</div>;
      }
      case 'userManagement':
        return <UserManagement students={students} staff={staff} onSelectStudent={handleSelectStudent} onSelectStaff={handleSelectStaff} />;
      default:
        return <Dashboard students={students} fees={fees} salaries={salaries} attendanceRecords={attendanceRecords} onSelectStudent={handleSelectStudent} currentUser={currentUser} />;
    }
  };

  if (!isLoggedIn || !currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar activeView={activeView} setActiveView={handleSetActiveView} notificationCount={notifications.length} currentUser={currentUser} />
      <div className="flex-1 flex flex-col">
        <Header currentUser={currentUser} onLogout={handleLogout} onSwitchUser={handleSwitchUser} />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
