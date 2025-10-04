import { Student, Staff, Fee, Salary, Notification, FeeStatus, SalaryStatus, User } from '../types';

export const users: User[] = [
  { id: 'U01', name: 'Admin User', role: 'admin', profileId: 'A01' },
  { id: 'U02', name: 'Mr. Smith', role: 'teacher', profileId: 'T01' },
  { id: 'U03', name: 'Alice Johnson', role: 'student', profileId: 'S001' },
];

export const students: Student[] = [
  { 
    id: 'S001', name: 'Alice Johnson', grade: 5, parentId: 'P001', parentName: 'John Johnson', parentContact: '123-456-7890',
    attendance: 95,
    performance: [
      { subject: 'Math', marks: 88, comments: 'Excellent problem-solving skills.' },
      { subject: 'Science', marks: 92, comments: 'Very inquisitive and participates well in labs.' },
      { subject: 'English', marks: 85, comments: 'Good comprehension, needs to work on grammar.' },
    ],
    activities: ['Chess Club', 'School Choir'],
    dateOfBirth: '2013-05-15',
    address: '123 Maple Street, Springfield',
    imageUrl: 'https://i.pravatar.cc/150?u=S001'
  },
  { 
    id: 'S002', name: 'Bob Williams', grade: 3, parentId: 'P002', parentName: 'Jane Williams', parentContact: '123-456-7891',
    attendance: 88,
    performance: [
      { subject: 'Math', marks: 75, comments: 'Understands concepts but makes careless errors.' },
      { subject: 'Science', marks: 70, comments: 'Needs to be more attentive during experiments.' },
      { subject: 'English', marks: 80, comments: 'Creative writer.' },
    ],
    activities: ['Soccer Team'],
    dateOfBirth: '2015-09-22',
    address: '456 Oak Avenue, Springfield',
    imageUrl: 'https://i.pravatar.cc/150?u=S002'
  },
  { 
    id: 'S003', name: 'Charlie Brown', grade: 7, parentId: 'P003', parentName: 'Chris Brown', parentContact: '123-456-7892',
    attendance: 98,
    performance: [
      { subject: 'Math', marks: 95, comments: 'Top of the class.' },
      { subject: 'Science', marks: 98, comments: 'Exceptional scientific aptitude.' },
      { subject: 'English', marks: 91, comments: 'Articulate and well-read.' },
    ],
    activities: ['Debate Team', 'Student Council'],
    dateOfBirth: '2011-02-10',
    address: '789 Pine Lane, Springfield',
    imageUrl: 'https://i.pravatar.cc/150?u=S003'
  },
  { 
    id: 'S004', name: 'Diana Miller', grade: 5, parentId: 'P004', parentName: 'David Miller', parentContact: '123-456-7893',
    attendance: 91,
    performance: [
      { subject: 'Math', marks: 82, comments: 'Steady progress.' },
      { subject: 'Science', marks: 78, comments: 'Good effort.' },
      { subject: 'English', marks: 88, comments: 'Enjoys reading.' },
    ],
    activities: ['Art Club'],
    dateOfBirth: '2013-07-30',
    address: '101 Birch Road, Springfield',
    imageUrl: 'https://i.pravatar.cc/150?u=S004'
  },
  { 
    id: 'S005', name: 'Ethan Davis', grade: 4, parentId: 'P005', parentName: 'Emily Davis', parentContact: '123-456-7894',
    attendance: 85,
    performance: [
        { subject: 'Math', marks: 68, comments: 'Struggles with geometry.' },
        { subject: 'Science', marks: 72, comments: 'Shows interest but needs to study more.' },
        { subject: 'English', marks: 75, comments: 'Average performance.' },
    ],
    activities: ['Basketball Team'],
    dateOfBirth: '2014-11-05',
    address: '212 Cedar Drive, Springfield',
    imageUrl: 'https://i.pravatar.cc/150?u=S005'
  },
];

export const staff: Staff[] = [
  { id: 'T01', name: 'Mr. Smith', role: 'Math Teacher', contact: '098-765-4321', classTeacherOfGrade: 7, subjects: ['Math'], baseSalary: 3200, attendancePercentage: 98 },
  { id: 'T02', name: 'Ms. Jones', role: 'Science Teacher', contact: '098-765-4322', classTeacherOfGrade: 5, subjects: ['Science'], baseSalary: 3400, attendancePercentage: 100 },
  { id: 'A01', name: 'Mrs. Gable', role: 'Administrator', contact: '098-765-4323', baseSalary: 4000, attendancePercentage: 100 },
  { id: 'S01', name: 'Mr. Clean', role: 'Janitor', contact: '098-765-4324', baseSalary: 2200, attendancePercentage: 100 },
  { id: 'D01', name: 'Mr. Drives', role: 'Driver', contact: '098-765-4325', baseSalary: 2500, attendancePercentage: 95 },
  { id: 'SW01', name: 'Mrs. Sweep', role: 'Sweeper', contact: '098-765-4326', baseSalary: 2100, attendancePercentage: 100 },
];

export const fees: Fee[] = [
  { id: 'F001', studentId: 'S001', amount: 500, dueDate: '2024-08-15', status: FeeStatus.Paid },
  { id: 'F002', studentId: 'S002', amount: 450, dueDate: '2024-08-10', status: FeeStatus.Overdue },
  { id: 'F003', studentId: 'S003', amount: 600, dueDate: '2024-08-25', status: FeeStatus.Due },
  { id: 'F004', studentId: 'S004', amount: 500, dueDate: '2024-08-15', status: FeeStatus.Paid },
  { id: 'F005', studentId: 'S005', amount: 475, dueDate: '2024-08-25', status: FeeStatus.Due },
];

const calculateSalary = (staffMember: Staff | undefined): number => {
    if (!staffMember?.baseSalary || staffMember.attendancePercentage === undefined) return 0;
    return staffMember.baseSalary * (staffMember.attendancePercentage / 100);
}

export const salaries: Salary[] = [
  { id: 'SAL01', staffId: 'T01', amount: calculateSalary(staff.find(s => s.id === 'T01')), paymentDate: '2024-08-30', status: SalaryStatus.Pending },
  { id: 'SAL02', staffId: 'T02', amount: calculateSalary(staff.find(s => s.id === 'T02')), paymentDate: '2024-08-30', status: SalaryStatus.Pending },
  { id: 'SAL03', staffId: 'A01', amount: calculateSalary(staff.find(s => s.id === 'A01')), paymentDate: '2024-07-30', status: SalaryStatus.Paid },
  { id: 'SAL04', staffId: 'S01', amount: calculateSalary(staff.find(s => s.id === 'S01')), paymentDate: '2024-07-30', status: SalaryStatus.Paid },
  { id: 'SAL05', staffId: 'D01', amount: calculateSalary(staff.find(s => s.id === 'D01')), paymentDate: '2024-08-30', status: SalaryStatus.Pending },
  { id: 'SAL06', staffId: 'SW01', amount: calculateSalary(staff.find(s => s.id === 'SW01')), paymentDate: '2024-08-30', status: SalaryStatus.Pending },
];

export const initialNotifications: Notification[] = [
    { id: 'N001', to: 'Jane Williams', studentName: 'Bob Williams', message: 'Fee payment is overdue.', sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
];