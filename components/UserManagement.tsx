import React, { useState, useMemo } from 'react';
import { Student, Staff } from '../types';

interface UserManagementProps {
  students: Student[];
  staff: Staff[];
  onSelectStudent: (studentId: string) => void;
  onSelectStaff: (staffId: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ students, staff, onSelectStudent, onSelectStaff }) => {
  const [studentSearch, setStudentSearch] = useState('');
  const [staffSearch, setStaffSearch] = useState('');

  const handleAddUser = (userType: 'Student' | 'Staff') => {
    alert(`'Add ${userType}' functionality is coming soon!`);
  }

  const filteredStudents = useMemo(() => {
    if (!studentSearch) return students;
    const lowercasedTerm = studentSearch.toLowerCase();
    return students.filter(s =>
      s.name.toLowerCase().includes(lowercasedTerm) ||
      String(s.grade).includes(lowercasedTerm) ||
      s.parentName.toLowerCase().includes(lowercasedTerm) ||
      s.parentContact.includes(lowercasedTerm)
    );
  }, [students, studentSearch]);

  const filteredStaff = useMemo(() => {
    if (!staffSearch) return staff;
    const lowercasedTerm = staffSearch.toLowerCase();
    return staff.filter(s =>
      s.name.toLowerCase().includes(lowercasedTerm) ||
      s.role.toLowerCase().includes(lowercasedTerm) ||
      s.contact.includes(lowercasedTerm)
    );
  }, [staff, staffSearch]);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">User Management</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h3 className="text-xl font-semibold text-gray-700">Students</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
             <input
                type="text"
                placeholder="Search students..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="block w-full sm:w-auto md:w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
            <button
              onClick={() => handleAddUser('Student')}
              className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors duration-200 flex-shrink-0"
            >
              Add Student
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Contact</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map(student => (
                <tr key={student.id} onClick={() => onSelectStudent(student.id)} className="cursor-pointer hover:bg-gray-50">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.parentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.parentContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h3 className="text-xl font-semibold text-gray-700">Staff</h3>
           <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
              <input
                  type="text"
                  placeholder="Search staff..."
                  value={staffSearch}
                  onChange={(e) => setStaffSearch(e.target.value)}
                  className="block w-full sm:w-auto md:w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
              <button
                onClick={() => handleAddUser('Staff')}
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors duration-200 flex-shrink-0"
              >
                Add Staff
              </button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map(member => (
                <tr key={member.id} onClick={() => onSelectStaff(member.id)} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={member.imageUrl || `https://i.pravatar.cc/150?u=${member.id}`} alt={member.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        </div>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;