import React from 'react';
import { Staff, Student, AttendanceRecord, AttendanceStatus } from '../types';
import Badge from './ui/Badge';

interface AttendanceProps {
  teacher: Staff;
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  onMarkAttendance: (studentId: string, status: AttendanceStatus) => void;
}

const Attendance: React.FC<AttendanceProps> = ({ teacher, students, attendanceRecords, onMarkAttendance }) => {
  const today = new Date().toISOString().split('T')[0];

  const hasAttendanceBeenMarked = (studentId: string) => {
    return attendanceRecords.some(record => record.studentId === studentId && record.date === today);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-2">
        <div>
            <h2 className="text-3xl font-bold text-gray-800">Take Attendance</h2>
            <p className="text-lg text-gray-500">
                Class: Grade {teacher.classTeacherOfGrade}
            </p>
        </div>
        <p className="text-md text-gray-600 bg-slate-200 px-3 py-1 rounded-md">
            Date: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      {students.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
          No students found for your class (Grade {teacher.classTeacherOfGrade}).
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map(student => {
                            const isMarked = hasAttendanceBeenMarked(student.id);
                            const todaysRecord = isMarked ? attendanceRecords.find(r => r.studentId === student.id && r.date === today) : null;
                            
                            return (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full object-cover" src={student.imageUrl || `https://i.pravatar.cc/150?u=${student.id}`} alt={student.name} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {isMarked ? (
                                            <Badge color={todaysRecord?.status === AttendanceStatus.Present ? 'green' : 'red'}>
                                                {todaysRecord?.status}
                                            </Badge>
                                        ) : (
                                            <Badge color="blue">Pending</Badge>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {isMarked ? (
                                            <span className="text-sm text-gray-500">Completed</span>
                                        ) : (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => onMarkAttendance(student.id, AttendanceStatus.Present)}
                                                    className="px-3 py-1 text-sm font-medium rounded-md transition-colors bg-green-100 text-green-700 hover:bg-green-200"
                                                >
                                                    Present
                                                </button>
                                                <button
                                                    onClick={() => onMarkAttendance(student.id, AttendanceStatus.Absent)}
                                                    className="px-3 py-1 text-sm font-medium rounded-md transition-colors bg-red-100 text-red-700 hover:bg-red-200"
                                                >
                                                    Absent
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;