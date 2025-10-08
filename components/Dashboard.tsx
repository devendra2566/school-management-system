import React from 'react';
import { Fee, Salary, FeeStatus, SalaryStatus, Student, User, AttendanceRecord, AttendanceStatus } from '../types';
import Card from './ui/Card';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  students: Student[];
  fees: Fee[];
  salaries: Salary[];
  attendanceRecords: AttendanceRecord[];
  currentUser: User;
  onSelectStudent: (studentId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ students, fees, salaries, attendanceRecords, currentUser, onSelectStudent }) => {
    
    const calculateAttendance = (studentId: string) => {
        const studentRecords = attendanceRecords.filter(r => r.studentId === studentId);
        if (studentRecords.length === 0) return 100;
        const presentDays = studentRecords.filter(r => r.status === AttendanceStatus.Present).length;
        return Math.round((presentDays / studentRecords.length) * 100);
    };

    if (currentUser.role === 'student') {
        const student = students.find(s => s.id === currentUser.profileId);
        if (!student) {
            return <div className="p-4 md:p-8"><p>Could not find student data.</p></div>;
        }
        
        const studentAttendance = calculateAttendance(student.id);
        const studentFee = fees.find(f => f.studentId === student.id);
        const averagePerformance = student.performance.length > 0
            ? student.performance.reduce((acc, p) => acc + p.marks, 0) / student.performance.length
            : 0;
        
        const feeStatusColor = () => {
            if (!studentFee) return 'bg-gray-100 text-gray-600';
            switch(studentFee.status) {
                case FeeStatus.Paid: return 'bg-green-100 text-green-600';
                case FeeStatus.Due: return 'bg-yellow-100 text-yellow-600';
                case FeeStatus.Overdue: return 'bg-red-100 text-red-600';
                default: return 'bg-gray-100 text-gray-600';
            }
        };

        return (
            <div className="p-4 md:p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Welcome, {student.name}!</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card title="Attendance" value={`${studentAttendance}%`} color={studentAttendance >= 90 ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"} icon={<CheckBadgeIcon />} />
                    <Card title="Average Performance" value={`${averagePerformance.toFixed(1)}%`} color="bg-blue-100 text-blue-600" icon={<AcademicCapIcon />} />
                    <Card title="Fee Status" value={studentFee?.status || 'Up to date'} color={feeStatusColor()} icon={<CreditCardIcon />} />
                </div>
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
                  <button onClick={() => onSelectStudent(student.id)} className="text-indigo-600 hover:text-indigo-900 font-medium">
                      View My Full Profile & Performance
                  </button>
                </div>
            </div>
        );
    }

    const totalStudents = students.length;
    const feesCollected = fees.filter(f => f.status === FeeStatus.Paid).reduce((sum, f) => sum + f.amount, 0);
    const feesDue = fees.filter(f => f.status === FeeStatus.Due || f.status === FeeStatus.Overdue).reduce((sum, f) => sum + f.amount, 0);
    const salariesPaid = salaries.filter(s => s.status === SalaryStatus.Paid).reduce((sum, s) => sum + s.netSalary, 0);

    const feeStatusData = [
        { name: 'Paid', value: fees.filter(f => f.status === FeeStatus.Paid).length },
        { name: 'Due', value: fees.filter(f => f.status === FeeStatus.Due).length },
        { name: 'Overdue', value: fees.filter(f => f.status === FeeStatus.Overdue).length },
    ];
    
    const COLORS = ['#10b981', '#f59e0b', '#ef4444'];
    
    const monthlyData = [
        { name: 'Jan', fees: 4000, salaries: 2400 },
        { name: 'Feb', fees: 3000, salaries: 1398 },
        { name: 'Mar', fees: 2000, salaries: 9800 },
        { name: 'Apr', fees: 2780, salaries: 3908 },
        { name: 'May', fees: 1890, salaries: 4800 },
        { name: 'Jun', fees: 2390, salaries: 3800 },
        { name: 'Jul', fees: 3490, salaries: 4300 },
      ];

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card title="Total Students" value={totalStudents} color="bg-blue-100 text-blue-600" icon={<UserGroupIcon />} />
                <Card title="Fees Collected" value={`$${feesCollected.toLocaleString()}`} color="bg-green-100 text-green-600" icon={<CurrencyDollarIcon />} />
                <Card title="Fees Due" value={`$${feesDue.toLocaleString()}`} color="bg-yellow-100 text-yellow-600" icon={<ExclamationTriangleIcon />} />
                <Card title="Salaries Paid (MTD)" value={`$${salariesPaid.toLocaleString()}`} color="bg-indigo-100 text-indigo-600" icon={<BanknotesIcon />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Financial Overview (Monthly)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="fees" fill="#4f46e5" name="Fees Collected" />
                            <Bar dataKey="salaries" fill="#10b981" name="Salaries Paid" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Fee Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={feeStatusData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}>
                                {feeStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
              <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Student Overview</h3>
                  <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                              <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                              </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                              {students.map(student => (
                                  <tr key={student.id}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade}</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calculateAttendance(student.id)}%</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                          <button onClick={() => onSelectStudent(student.id)} className="text-indigo-600 hover:text-indigo-900">
                                              View Profile
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
        </div>
    );
};

const iconProps = { className: "h-6 w-6", strokeWidth: 2 };
const UserGroupIcon = () => <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 00-12 0m12 0a9.094 9.094 0 00-12 0m12 0v-2.25m-12 0v-2.25m12 0A9.1 9.1 0 0012 5.25 9.1 9.1 0 006 8.25m6 10.5h0m-6.75-2.25h13.5" /></svg>;
const CurrencyDollarIcon = () => <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0l.879-.659M7.5 14.25l-2.489-1.867a.75.75 0 01.3-1.382l4.124 2.062a.75.75 0 00.914 0l4.124-2.062a.75.75 0 01.3 1.382L16.5 14.25" /></svg>;
const ExclamationTriangleIcon = () => <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;
const BanknotesIcon = () => <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v.75A.75.75 0 014.5 8.25h-.75m0 0h.75a.75.75 0 01.75.75v.75m0 0v.75a.75.75 0 01-.75.75h-.75m0 0H3m1.5-9h16.5a1.5 1.5 0 011.5 1.5v6.75a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5z" /></svg>;
const CheckBadgeIcon = () => <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const AcademicCapIcon = () => <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" /></svg>;
const CreditCardIcon = () => <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-3.75l-3 3m3 0l-3-3m-3.75 6.75h16.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" /></svg>;

export default Dashboard;