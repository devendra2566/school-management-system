import React, { useState, useMemo } from 'react';
import { Student, Fee, FeeStatus } from '../types';
import Badge from './ui/Badge';

interface FeesManagementProps {
  students: Student[];
  fees: Fee[];
  onSendReminder: (studentId: string, parentName: string, studentName: string) => void;
}

const getStatusColor = (status: FeeStatus) => {
    switch (status) {
        case FeeStatus.Paid: return 'green';
        case FeeStatus.Due: return 'yellow';
        case FeeStatus.Overdue: return 'red';
        default: return 'blue';
    }
};

const FeesManagement: React.FC<FeesManagementProps> = ({ students, fees, onSendReminder }) => {
    const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');

    const feeData = useMemo(() => fees.map(fee => {
        const student = students.find(s => s.id === fee.studentId);
        return { ...fee, studentName: student?.name, grade: student?.grade, parentName: student?.parentName };
    }), [fees, students]);

    const filteredFeeData = useMemo(() => {
        if (selectedGrade === 'all') {
            return feeData;
        }
        return feeData.filter(fee => fee.grade === selectedGrade);
    }, [feeData, selectedGrade]);

    const grades = useMemo(() => [...new Set(students.map(s => s.grade))].sort((a, b) => a - b), [students]);

  return (
    <div className="p-8">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Fees Management</h2>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <label htmlFor="grade-filter" className="text-sm font-medium text-gray-700">Filter by Grade:</label>
                    <select 
                        id="grade-filter"
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                        className="mt-1 block w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="all">All Grades</option>
                        {grades.map(grade => (
                            <option key={grade} value={grade}>Grade {grade}</option>
                        ))}
                    </select>
                </div>
                {selectedGrade !== 'all' && (
                    <button
                        onClick={() => setSelectedGrade('all')}
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Reset
                    </button>
                )}
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredFeeData.map(fee => (
                            <tr key={fee.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fee.studentName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.grade}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fee.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(fee.dueDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <Badge color={getStatusColor(fee.status)}>{fee.status}</Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    { (fee.status === FeeStatus.Due || fee.status === FeeStatus.Overdue) && (
                                        <button 
                                            onClick={() => onSendReminder(fee.studentId, fee.parentName!, fee.studentName!)}
                                            className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out">
                                            Send Reminder
                                        </button>
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

export default FeesManagement;