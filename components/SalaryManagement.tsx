import React, { useState, useMemo } from 'react';
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
    const [searchTerm, setSearchTerm] = useState('');

    const salaryData = useMemo(() => salaries.map(salary => {
        const staffMember = staff.find(s => s.id === salary.staffId);
        return { 
            ...salary, 
            staffName: staffMember?.name, 
            role: staffMember?.role,
            imageUrl: staffMember?.imageUrl
        };
    }), [salaries, staff]);

    const filteredSalaryData = useMemo(() => {
        if (!searchTerm) {
            return salaryData;
        }
        const lowercasedTerm = searchTerm.toLowerCase();
        return salaryData.filter(salary =>
            salary.staffName?.toLowerCase().includes(lowercasedTerm) ||
            salary.role?.toLowerCase().includes(lowercasedTerm) ||
            String(salary.netSalary).includes(lowercasedTerm) ||
            salary.status.toLowerCase().includes(lowercasedTerm)
        );
    }, [salaryData, searchTerm]);

  return (
    <div className="p-8">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Salary Management</h2>
            <input
                type="text"
                placeholder="Search salaries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Salary</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonuses & Allowances</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Salary</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSalaryData.map(salary => {
                            const totalBonuses = (salary.allowances || []).reduce((s, i) => s + i.amount, 0) + (salary.bonuses || []).reduce((s, i) => s + i.amount, 0);
                            const totalDeductions = (salary.standardDeductions || []).reduce((s, i) => s + i.amount, 0) + (salary.deductions || []).reduce((s, i) => s + i.amount, 0);
                            const bonusItems = [...(salary.allowances || []), ...(salary.bonuses || [])];
                            const deductionItems = [...(salary.standardDeductions || []), ...(salary.deductions || [])];
                            
                            return (
                                <tr key={salary.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full object-cover" src={salary.imageUrl || `https://i.pravatar.cc/150?u=${salary.staffId}`} alt={salary.staffName || 'Staff'} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{salary.staffName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{salary.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${salary.baseSalary.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="relative group">
                                            <span className="text-green-600 font-medium cursor-pointer">+${totalBonuses.toFixed(2)}</span>
                                            {bonusItems.length > 0 && (
                                                <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-2 px-3 z-10 w-48 -translate-y-full -translate-x-1/2 left-1/2 bottom-0 mb-2 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-gray-800">
                                                    <ul className="space-y-1">
                                                        {bonusItems.map((item, index) => (
                                                            <li key={index} className="flex justify-between">
                                                                <span>{item.reason}</span>
                                                                <span className="font-semibold">+${item.amount.toFixed(2)}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                         <div className="relative group">
                                            <span className="text-red-600 font-medium cursor-pointer">-${totalDeductions.toFixed(2)}</span>
                                            {deductionItems.length > 0 && (
                                                <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-2 px-3 z-10 w-48 -translate-y-full -translate-x-1/2 left-1/2 bottom-0 mb-2 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-gray-800">
                                                    <ul className="space-y-1">
                                                        {deductionItems.map((item, index) => (
                                                            <li key={index} className="flex justify-between">
                                                                <span>{item.reason}</span>
                                                                <span className="font-semibold">-${item.amount.toFixed(2)}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">${salary.grossSalary.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">-${salary.tax.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">${salary.netSalary.toFixed(2)}</td>

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
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default SalaryManagement;