import React, { useMemo } from 'react';
import { Staff, StaffAttendanceRecord, StaffAttendanceStatus } from '../types';
import Badge from './ui/Badge';

interface TeacherProfileProps {
  teacher: Staff;
  staffAttendance: StaffAttendanceRecord[];
  onMarkAttendance: (staffId: string, status: StaffAttendanceStatus) => void;
}

const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const TeacherProfile: React.FC<TeacherProfileProps> = ({ teacher, staffAttendance, onMarkAttendance }) => {
  const age = calculateAge(teacher.dateOfBirth);
  const today = new Date().toISOString().split('T')[0];
  const todaysRecord = staffAttendance.find(r => r.staffId === teacher.id && r.date === today);

  const yearlyAttendance = useMemo(() => {
    const records = staffAttendance.filter(r => r.staffId === teacher.id);
    const monthlyData: { [key: string]: { present: number; absent: number; absentDates: string[] } } = {};

    records.forEach(record => {
        const date = new Date(record.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { present: 0, absent: 0, absentDates: [] };
        }

        if (record.status === StaffAttendanceStatus.Present) {
            monthlyData[monthKey].present++;
        } else if (record.status === StaffAttendanceStatus.Absent) {
            monthlyData[monthKey].absent++;
            monthlyData[monthKey].absentDates.push(date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }));
        }
    });

    const result = [];
    const d = new Date();
    d.setDate(1); // Start from the first day of the current month
    for (let i = 0; i < 12; i++) {
        const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const monthName = d.toLocaleString('default', { month: 'long', year: 'numeric' });
        result.push({
            monthName,
            data: monthlyData[monthKey] || { present: 0, absent: 0, absentDates: [] }
        });
        d.setMonth(d.getMonth() - 1);
    }

    return result;
  }, [teacher.id, staffAttendance]);

  return (
    <div className="p-8">
      <div className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md mb-8">
        <img 
          src={teacher.imageUrl || `https://i.pravatar.cc/150?u=${teacher.id}`}
          alt={teacher.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-sky-200"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{teacher.name}</h2>
          <p className="text-lg text-gray-500">{teacher.role}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Personal Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Contact:</strong> {teacher.contact}</p>
                <p><strong>Date of Birth:</strong> {new Date(teacher.dateOfBirth).toLocaleDateString()} ({age} years old)</p>
                <p><strong>Address:</strong> {teacher.address}</p>
            </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">My Attendance</h3>
                <div className="flex items-center justify-between">
                    {todaysRecord ? (
                        <p className="text-sm text-gray-600">Today's attendance marked as: <Badge color={todaysRecord.status === StaffAttendanceStatus.Present ? 'green' : 'red'}>{todaysRecord.status}</Badge></p>
                    ) : (
                         <p className="text-sm text-gray-500">Your attendance for today is not yet marked.</p>
                    )}
                     <button
                        onClick={() => onMarkAttendance(teacher.id, StaffAttendanceStatus.Present)}
                        disabled={!!todaysRecord}
                        className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {todaysRecord ? 'Marked' : "Mark Me Present"}
                    </button>
                </div>
            </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Professional Details</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Joining Date:</strong> {new Date(teacher.joiningDate).toLocaleDateString()}</p>
            {teacher.classTeacherOfGrade && (
              <p><strong>Class Teacher of Grade:</strong> {teacher.classTeacherOfGrade}</p>
            )}
            {teacher.subjects && teacher.subjects.length > 0 && (
              <div>
                <strong>Subjects Taught:</strong>
                <ul className="space-y-1 list-disc list-inside mt-1">
                  {teacher.subjects.map(subject => <li key={subject}>{subject}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
         <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Yearly Attendance Overview</h3>
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Present Days</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Absent Days</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absence Dates</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {yearlyAttendance.map(({ monthName, data }) => (
                        <tr key={monthName}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{monthName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-green-600">{data.present}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-red-600">{data.absent}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {data.absent > 0 ? (
                                    <div className="flex flex-wrap gap-1">
                                        {data.absentDates.map(dateStr => (
                                            <span key={dateStr} className="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-md font-mono">{dateStr}</span>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-xs text-green-700">Perfect Attendance</span>
                                )}
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

export default TeacherProfile;