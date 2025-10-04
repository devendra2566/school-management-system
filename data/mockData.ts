import { Student, Staff, Fee, Salary, Notification, FeeStatus, SalaryStatus } from '../types';

export const students: Student[] = [
  { id: 'S001', name: 'Alice Johnson', grade: 5, parentId: 'P001', parentName: 'John Johnson', parentContact: '123-456-7890' },
  { id: 'S002', name: 'Bob Williams', grade: 3, parentId: 'P002', parentName: 'Jane Williams', parentContact: '123-456-7891' },
  { id: 'S003', name: 'Charlie Brown', grade: 7, parentId: 'P003', parentName: 'Chris Brown', parentContact: '123-456-7892' },
  { id: 'S004', name: 'Diana Miller', grade: 5, parentId: 'P004', parentName: 'David Miller', parentContact: '123-456-7893' },
  { id: 'S005', name: 'Ethan Davis', grade: 4, parentId: 'P005', parentName: 'Emily Davis', parentContact: '123-456-7894' },
];

export const staff: Staff[] = [
  { id: 'T01', name: 'Mr. Smith', role: 'Math Teacher', contact: '098-765-4321' },
  { id: 'T02', name: 'Ms. Jones', role: 'Science Teacher', contact: '098-765-4322' },
  { id: 'A01', name: 'Mrs. Gable', role: 'Administrator', contact: '098-765-4323' },
  { id: 'S01', name: 'Mr. Clean', role: 'Janitor', contact: '098-765-4324' },
];

export const fees: Fee[] = [
  { id: 'F001', studentId: 'S001', amount: 500, dueDate: '2024-08-15', status: FeeStatus.Paid },
  { id: 'F002', studentId: 'S002', amount: 450, dueDate: '2024-08-10', status: FeeStatus.Overdue },
  { id: 'F003', studentId: 'S003', amount: 600, dueDate: '2024-08-25', status: FeeStatus.Due },
  { id: 'F004', studentId: 'S004', amount: 500, dueDate: '2024-08-15', status: FeeStatus.Paid },
  { id: 'F005', studentId: 'S005', amount: 475, dueDate: '2024-08-25', status: FeeStatus.Due },
];

export const salaries: Salary[] = [
  { id: 'SAL01', staffId: 'T01', amount: 3000, paymentDate: '2024-08-30', status: SalaryStatus.Pending },
  { id: 'SAL02', staffId: 'T02', amount: 3200, paymentDate: '2024-08-30', status: SalaryStatus.Pending },
  { id: 'SAL03', staffId: 'A01', amount: 4000, paymentDate: '2024-07-30', status: SalaryStatus.Paid },
  { id: 'SAL04', staffId: 'S01', amount: 2200, paymentDate: '2024-07-30', status: SalaryStatus.Paid },
];

export const initialNotifications: Notification[] = [
    { id: 'N001', to: 'Jane Williams', studentName: 'Bob Williams', message: 'Fee payment is overdue.', sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
];