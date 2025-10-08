import React, { useState, useMemo, Fragment } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Staff, Salary, SalaryStatus, StaffAttendanceRecord, StaffAttendanceStatus } from '../types';
import Badge from './ui/Badge';

interface SalaryManagementProps {
  staff: Staff[];
  salaries: Salary[];
  onPaySalary: (salaryId: string) => void;
  staffAttendance: StaffAttendanceRecord[];
}

const getStatusColor = (status: SalaryStatus) => {
    switch (status) {
        case SalaryStatus.Paid: return 'green';
        case SalaryStatus.Pending: return 'yellow';
        default: return 'blue';
    }
};

const SalaryDetailModal: React.FC<{
    staffMember: Staff;
    salaries: Salary[];
    onClose: () => void;
    onPaySalary: (salaryId: string) => void;
    staffAttendance: StaffAttendanceRecord[];
}> = ({ staffMember, salaries, onClose, onPaySalary, staffAttendance }) => {
    
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const sortedSalaries = useMemo(() => {
        return [...salaries].sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());
    }, [salaries]);
    
    const chartData = useMemo(() => {
        return [...salaries]
            .sort((a, b) => new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime())
            .map(s => ({
                name: new Date(s.paymentDate).toLocaleString('default', { month: 'short' }),
                Salary: s.netSalary,
            }));
    }, [salaries]);

    const getAbsencesForMonth = (paymentDate: string): string[] => {
        const date = new Date(paymentDate);
        const year = date.getFullYear();
        const month = date.getMonth(); // 0-11

        return staffAttendance.filter(record => 
            record.staffId === staffMember.id &&
            record.status === StaffAttendanceStatus.Absent &&
            new Date(record.date).getFullYear() === year &&
            new Date(record.date).getMonth() === month
        ).map(r => new Date(r.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short'}));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4" aria-modal="true" role="dialog">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-xl md:max-w-4xl lg:max-w-6xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center space-x-4">
                        <img className="h-16 w-16 rounded-full object-cover" src={staffMember.imageUrl || `https://i.pravatar.cc/150?u=${staffMember.id}`} alt={staffMember.name} />
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{staffMember.name}</h3>
                            <p className="text-sm text-gray-500">{staffMember.role}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200" aria-label="Close modal">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 mb-4">Yearly Salary Overview</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => `$${value}`} />
                                <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Salary']} />
                                <Legend />
                                <Bar dataKey="Salary" fill="#4f46e5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Salary History & Absence Details</h4>
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="w-12 px-4 py-3"></th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedSalaries.map(salary => {
                                    const absences = getAbsencesForMonth(salary.paymentDate);
                                    const hasAbsences = absences.length > 0;
                                    const isExpanded = expandedRow === salary.id;

                                    return (
                                    <Fragment key={salary.id}>
                                        <tr className={isExpanded ? 'bg-sky-50' : ''}>
                                            <td className="px-4 py-2">
                                                {hasAbsences && (
                                                    <button onClick={() => setExpandedRow(isExpanded ? null : salary.id)} className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" aria-expanded={isExpanded} aria-controls={`absence-details-${salary.id}`}>
                                                        <svg className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{new Date(salary.paymentDate).toLocaleString('default', { month: 'long', year: 'numeric' })}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{salary.attendancePercentage}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">${salary.netSalary.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm"><Badge color={getStatusColor(salary.status)}>{salary.status}</Badge></td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                { salary.status === SalaryStatus.Pending ? (
                                                    <button onClick={() => onPaySalary(salary.id)} className="text-green-600 hover:text-green-900">Mark as Paid</button>
                                                ) : (
                                                    <span className="text-gray-500">Paid</span>
                                                )}
                                            </td>
                                        </tr>
                                        {isExpanded && hasAbsences && (
                                            <tr id={`absence-details-${salary.id}`}>
                                                <td colSpan={6} className="p-4 bg-slate-50 border-t border-sky-200">
                                                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Absence Details ({absences.length} day{absences.length > 1 ? 's' : ''})</h5>
                                                    <div className="flex flex-wrap gap-2">
                                                        {absences.map(dateStr => (
                                                            <span key={dateStr} className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-md font-mono">{dateStr}</span>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


const SalaryManagement: React.FC<SalaryManagementProps> = ({ staff, salaries, onPaySalary, staffAttendance }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

    const filteredStaff = useMemo(() => {
        if (!searchTerm) {
            return staff;
        }
        const lowercasedTerm = searchTerm.toLowerCase();
        return staff.filter(member =>
            member.name.toLowerCase().includes(lowercasedTerm) ||
            member.role.toLowerCase().includes(lowercasedTerm)
        );
    }, [staff, searchTerm]);

  return (
    <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-800">Salary Management</h2>
            <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full md:w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredStaff.map(member => (
                <div 
                    key={member.id} 
                    onClick={() => setSelectedStaff(member)}
                    className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:scale-105 transform transition-all duration-200"
                >
                    <img 
                        className="w-24 h-24 rounded-full object-cover mb-4"
                        src={member.imageUrl || `https://i.pravatar.cc/150?u=${member.id}`}
                        alt={member.name}
                    />
                    <h3 className="text-md font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                </div>
            ))}
        </div>
        
        {selectedStaff && (
            <SalaryDetailModal 
                staffMember={selectedStaff}
                salaries={salaries.filter(s => s.staffId === selectedStaff.id)}
                onClose={() => setSelectedStaff(null)}
                onPaySalary={onPaySalary}
                staffAttendance={staffAttendance}
            />
        )}
    </div>
  );
};

export default SalaryManagement;