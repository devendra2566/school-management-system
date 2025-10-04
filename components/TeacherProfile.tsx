import React from 'react';
import { Staff } from '../types';

interface TeacherProfileProps {
  teacher: Staff;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({ teacher }) => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{teacher.name}'s Profile</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Personal Information</h3>
                <p className="text-sm text-gray-600"><strong>Role:</strong> {teacher.role}</p>
                <p className="text-sm text-gray-600"><strong>Contact:</strong> {teacher.contact}</p>
            </div>
            
            {teacher.classTeacherOfGrade && (
                 <div>
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Class Responsibility</h3>
                    <p className="text-sm text-gray-600"><strong>Class Teacher of Grade:</strong> {teacher.classTeacherOfGrade}</p>
                </div>
            )}

            {teacher.subjects && teacher.subjects.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Subjects Taught</h3>
                     <ul className="space-y-1 list-disc list-inside text-sm text-gray-600">
                        {teacher.subjects.map(subject => <li key={subject}>{subject}</li>)}
                    </ul>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
