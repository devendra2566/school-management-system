import React from 'react';
import { Staff, Salary, SalaryStatus } from '../types';
import Badge from './ui/Badge';

interface SalaryManagementProps {
  staff: Staff[];
  salaries: Salary[];
  onPaySalary: (salaryId: string) => void;
}

const getStatusColor = (status: SalaryStatus) => {
    switch (status) {
        case SalaryStatus.Paid: return 'green';
        case SalaryStatus.Pending: return 'yellow';
        default: return 'blue';
    }
};

const SalaryManagement: React.FC<SalaryManagementProps> = ({ staff, salaries, onPaySalary }) => {
    const salaryData = salaries.map(salary => {
        const staffMember = staff.find(s => s.id === salary.staffId);
        return { ...salary, staffName: staffMember?.name, role: staffMember?.role };
    });

  return (
    <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Salary Management</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {salaryData.map(salary => (
                            <tr key={salary.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{salary.staffName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{salary.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${salary.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(salary.paymentDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <Badge color={getStatusColor(salary.status)}>{salary.status}</Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    { salary.status === SalaryStatus.Pending && (
                                        <button 
                                            onClick={() => onPaySalary(salary.id)}
                                            className="text-green-600 hover:text-green-900 transition duration-150 ease-in-out">
                                            Mark as Paid
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

export default SalaryManagement;
