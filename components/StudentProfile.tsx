import React from 'react';
import { Student, Fee, FeeStatus } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Badge from './ui/Badge';

interface StudentProfileProps {
  student: Student;
  fees: Fee[];
}

const getStatusColor = (status: FeeStatus) => {
    switch (status) {
        case FeeStatus.Paid: return 'green';
        case FeeStatus.Due: return 'yellow';
        case FeeStatus.Overdue: return 'red';
        default: return 'blue';
    }
};

const StudentProfile: React.FC<StudentProfileProps> = ({ student, fees }) => {
  const performanceData = student.performance.map(p => ({
    subject: p.subject,
    marks: p.marks,
    fullMark: 100,
  }));

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
              <p><strong>Attendance:</strong> <span className={`font-bold ${student.attendance >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>{student.attendance}%</span></p>
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
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Academic Performance</h3>
           <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]}/>
              <Radar name={student.name} dataKey="marks" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-700 mb-2">Teacher's Comments</h4>
            <ul className="divide-y divide-gray-200">
                {student.performance.map(p => (
                    <li key={p.subject} className="py-3">
                        <p className="text-sm font-medium text-gray-800">{p.subject}</p>
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