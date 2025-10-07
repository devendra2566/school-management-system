import React, { useMemo } from 'react';
import { Student, Fee, FeeStatus, AttendanceRecord, AttendanceStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Badge from './ui/Badge';

interface StudentProfileProps {
  student: Student;
  fees: Fee[];
  attendanceRecords: AttendanceRecord[];
}

const getStatusColor = (status: FeeStatus) => {
    switch (status) {
        case FeeStatus.Paid: return 'green';
        case FeeStatus.Due: return 'yellow';
        case FeeStatus.Overdue: return 'red';
        default: return 'blue';
    }
};

const StudentProfile: React.FC<StudentProfileProps> = ({ student, fees, attendanceRecords }) => {
  const studentRecords = useMemo(() => attendanceRecords.filter(r => r.studentId === student.id), [attendanceRecords, student.id]);

  const overallAttendance = useMemo(() => {
    if (studentRecords.length === 0) return 100;
    const presentDays = studentRecords.filter(r => r.status === AttendanceStatus.Present).length;
    return Math.round((presentDays / studentRecords.length) * 100);
  }, [studentRecords]);

  const monthlyAttendanceData = useMemo(() => {
    const monthlyData: { [key: string]: { Present: number, Absent: number } } = {};
    
    studentRecords.forEach(record => {
        const month = new Date(record.date).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (!monthlyData[month]) {
            monthlyData[month] = { Present: 0, Absent: 0 };
        }
        monthlyData[month][record.status]++;
    });

    return Object.entries(monthlyData).map(([name, counts]) => ({
        name,
        ...counts
    })).reverse(); // Show most recent month first
  }, [studentRecords]);

  return (
    <div className="p-8">
      <div className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md mb-8">
        <img 
          src={student.imageUrl || `https://i.pravatar.cc/150?u=${student.id}`}
          alt={student.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-sky-200"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-lg text-gray-500">Grade {student.grade}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Student Details</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
              <p><strong>Address:</strong> {student.address}</p>
              <p><strong>Parent:</strong> {student.parentName}</p>
              <p><strong>Contact:</strong> {student.parentContact}</p>
              <p><strong>Overall Attendance:</strong> <span className={`font-bold ${overallAttendance >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>{overallAttendance}%</span></p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Fee Status</h3>
            {fees.length > 0 ? (
                <ul className="space-y-2">
                    {fees.map(fee => (
                        <li key={fee.id} className="flex justify-between items-center text-sm">
                            <span>Due Date: {new Date(fee.dueDate).toLocaleDateString()}</span>
                            <Badge color={getStatusColor(fee.status)}>{fee.status}</Badge>
                        </li>
                    ))}
                </ul>
            ) : <p className="text-sm text-gray-500">No fee records found.</p>}
          </div>
           <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Activities</h3>
            {student.activities.length > 0 ? (
                <ul className="space-y-2 list-disc list-inside text-sm text-gray-600">
                    {student.activities.map(activity => <li key={activity}>{activity}</li>)}
                </ul>
            ) : <p className="text-sm text-gray-500">No extracurricular activities.</p>}
          </div>
        </div>
        
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Attendance</h3>
           <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyAttendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Present" stackId="a" fill="#10b981" />
              <Bar dataKey="Absent" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-700 mb-2">Academic Performance & Comments</h4>
            <ul className="divide-y divide-gray-200">
                {student.performance.map(p => (
                    <li key={p.subject} className="py-3">
                        <div className="flex justify-between">
                            <p className="text-sm font-medium text-gray-800">{p.subject}</p>
                            <p className="text-sm font-medium text-gray-800">{p.marks}/100</p>
                        </div>
                        <p className="text-sm text-gray-600 italic">"{p.comments}"</p>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
