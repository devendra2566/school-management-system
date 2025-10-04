import React from 'react';
import { Staff } from '../types';

interface TeacherProfileProps {
  teacher: Staff;
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

const TeacherProfile: React.FC<TeacherProfileProps> = ({ teacher }) => {
  const age = calculateAge(teacher.dateOfBirth);

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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Personal Information</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Contact:</strong> {teacher.contact}</p>
            <p><strong>Date of Birth:</strong> {new Date(teacher.dateOfBirth).toLocaleDateString()} ({age} years old)</p>
            <p><strong>Address:</strong> {teacher.address}</p>
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
    </div>
  );
};

export default TeacherProfile;