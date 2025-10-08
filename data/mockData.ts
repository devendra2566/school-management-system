import { Student, Staff, Fee, Salary, Notification, FeeStatus, SalaryStatus, User, SalaryAdjustment, AttendanceRecord, AttendanceStatus, StaffAttendanceRecord, StaffAttendanceStatus } from '../types';

export const users: User[] = [
  { id: 'U01', name: 'Admin User', role: 'admin', profileId: 'A01' },
  { id: 'U02', name: 'Mr. Smith', role: 'teacher', profileId: 'T01' },
  { id: 'U03', name: 'Ms. Jones', role: 'teacher', profileId: 'T02' },
  { id: 'U04', name: 'Alice Johnson', role: 'student', profileId: 'S001' },
];

export const students: Student[] = [
  { 
    id: 'S001', name: 'Alice Johnson', grade: 5, parentId: 'P001', parentName: 'John Johnson', parentContact: '123-456-7890',
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
  { 
    id: 'S006', name: 'Frank Green', grade: 7, parentId: 'P006', parentName: 'Fiona Green', parentContact: '123-456-7895',
    performance: [
      { subject: 'Math', marks: 85, comments: 'Good analytical skills.' },
      { subject: 'Science', marks: 88, comments: 'Engages well in practicals.' },
      { subject: 'English', marks: 82, comments: 'Needs to participate more in discussions.' },
    ],
    activities: ['Science Club'],
    dateOfBirth: '2011-08-12',
    address: '321 Pine Street, Springfield',
    imageUrl: 'https://i.pravatar.cc/150?u=S006'
  },
  { 
    id: 'S007', name: 'Grace Hall', grade: 7, parentId: 'P007', parentName: 'George Hall', parentContact: '123-456-7896',
    performance: [
      { subject: 'Math', marks: 91, comments: 'Quick learner.' },
      { subject: 'Science', marks: 94, comments: 'Excellent understanding of concepts.' },
      { subject: 'English', marks: 89, comments: 'Strong vocabulary.' },
    ],
    activities: ['Spelling Bee Champion'],
    dateOfBirth: '2011-04-25',
    address: '432 Maple Avenue, Springfield',
    imageUrl: 'https://i.pravatar.cc/150?u=S007'
  },
  { 
    id: 'S008', name: 'Henry King', grade: 7, parentId: 'P008', parentName: 'Helen King', parentContact: '123-456-7897',
    performance: [
      { subject: 'Math', marks: 78, comments: 'Needs to practice more.' },
      { subject: 'Science', marks: 81, comments: 'Shows curiosity.' },
      { subject: 'English', marks: 79, comments: 'Improving steadily.' },
    ],
    activities: ['School Band'],
    dateOfBirth: '2011-11-18',
    address: '543 Oak Lane, Springfield',
    imageUrl: 'https://i.pravatar.cc/150?u=S008'
  },
  { 
    id: 'S009', name: 'Ivy Lewis', grade: 7, parentId: 'P009', parentName: 'Ian Lewis', parentContact: '123-456-7898',
    performance: [
      { subject: 'Math', marks: 88, comments: 'Very consistent.' },
      { subject: 'Science', marks: 85, comments: 'Good lab work.' },
      { subject: 'English', marks: 90, comments: 'Excellent writer.' },
    ],
    activities: ['Yearbook Committee'],
    dateOfBirth: '2011-01-30',
    address: '654 Birch Road, Springfield',
    imageUrl: 'https://i.pravatar.cc/150?u=S009'
  },
  { 
    id: 'S010', name: 'Jack Martin', grade: 7, parentId: 'P010', parentName: 'Julia Martin', parentContact: '123-456-7899',
    performance: [
      { subject: 'Math', marks: 72, comments: 'Finds algebra challenging.' },
      { subject: 'Science', marks: 75, comments: 'Needs to review notes regularly.' },
      { subject: 'English', marks: 81, comments: 'Good reader.' },
    ],
    activities: ['Drama Club'],
    dateOfBirth: '2011-06-07',
    address: '765 Cedar Drive, Springfield',
    imageUrl: 'https://i.pravatar.cc/150?u=S010'
  },
];

export const staff: Staff[] = [
  { id: 'T01', name: 'Mr. Smith', role: 'Math Teacher', contact: '098-765-4321', classTeacherOfGrade: 7, subjects: ['Math'], baseSalary: 3200, imageUrl: 'https://i.pravatar.cc/150?u=T01', joiningDate: '2018-08-15', dateOfBirth: '1985-04-20', address: '321 Elm Street, Springfield', allowances: [{ name: 'Transport', amount: 150 }, { name: 'Teaching Aid', amount: 100 }], standardDeductions: [{ name: 'Provident Fund', amount: 250 }] },
  { id: 'T02', name: 'Ms. Jones', role: 'Science Teacher', contact: '098-765-4322', classTeacherOfGrade: 5, subjects: ['Science'], baseSalary: 3400, imageUrl: 'https://i.pravatar.cc/150?u=T02', joiningDate: '2020-01-20', dateOfBirth: '1990-11-12', address: '654 Spruce Way, Springfield', allowances: [{ name: 'Transport', amount: 150 }, { name: 'Lab Maintenance', amount: 120 }], standardDeductions: [{ name: 'Provident Fund', amount: 280 }] },
  { id: 'A01', name: 'Mrs. Gable', role: 'Administrator', contact: '098-765-4323', baseSalary: 4000, imageUrl: 'https://i.pravatar.cc/150?u=A01', joiningDate: '2015-03-01', dateOfBirth: '1978-07-03', address: '987 Willow Creek, Springfield', allowances: [{ name: 'Transport', amount: 200 }, { name: 'Health Insurance', amount: 300 }], standardDeductions: [{ name: 'Provident Fund', amount: 350 }] },
  { id: 'S01', name: 'Mr. Clean', role: 'Janitor', contact: '098-765-4324', baseSalary: 2200, imageUrl: 'https://i.pravatar.cc/150?u=S01', joiningDate: '2021-09-01', dateOfBirth: '1982-02-28', address: '159 Redwood Path, Springfield', allowances: [{ name: 'Transport', amount: 100 }], standardDeductions: [{ name: 'Provident Fund', amount: 150 }] },
  { id: 'D01', name: 'Mr. Drives', role: 'Driver', contact: '098-765-4325', baseSalary: 2500, imageUrl: 'https://i.pravatar.cc/150?u=D01', joiningDate: '2019-07-22', dateOfBirth: '1988-12-19', address: '753 Aspen Court, Springfield', allowances: [{ name: 'Transport', amount: 100 }, { name: 'Vehicle Maint.', amount: 150 }], standardDeductions: [{ name: 'Provident Fund', amount: 180 }] },
  { id: 'SW01', name: 'Mrs. Sweep', role: 'Sweeper', contact: '098-765-4326', baseSalary: 2100, imageUrl: 'https://i.pravatar.cc/150?u=SW01', joiningDate: '2022-02-11', dateOfBirth: '1995-06-08', address: '852 Sequoia Trail, Springfield', allowances: [{ name: 'Transport', amount: 100 }], standardDeductions: [{ name: 'Provident Fund', amount: 140 }] },
];

export const fees: Fee[] = [
  { id: 'F001', studentId: 'S001', amount: 500, dueDate: '2024-08-15', status: FeeStatus.Paid },
  { id: 'F002', studentId: 'S002', amount: 450, dueDate: '2024-08-10', status: FeeStatus.Overdue },
  { id: 'F003', studentId: 'S003', amount: 600, dueDate: '2024-08-25', status: FeeStatus.Due },
  { id: 'F004', studentId: 'S004', amount: 500, dueDate: '2024-08-15', status: FeeStatus.Paid },
  { id: 'F005', studentId: 'S005', amount: 475, dueDate: '2024-08-25', status: FeeStatus.Due },
  { id: 'F006', studentId: 'S006', amount: 600, dueDate: '2024-08-25', status: FeeStatus.Due },
  { id: 'F007', studentId: 'S007', amount: 600, dueDate: '2024-08-15', status: FeeStatus.Paid },
  { id: 'F008', studentId: 'S008', amount: 600, dueDate: '2024-08-25', status: FeeStatus.Due },
  { id: 'F009', studentId: 'S009', amount: 600, dueDate: '2024-08-10', status: FeeStatus.Overdue },
  { id: 'F010', studentId: 'S010', amount: 600, dueDate: '2024-08-25', status: FeeStatus.Due },
];

const getWorkingDays = (year: number, month: number) => { // month is 1-12
    const daysInMonth = new Date(year, month, 0).getDate();
    let workingDays = 0;
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Sunday=0, Saturday=6
            workingDays++;
        }
    }
    return workingDays;
}

const generateSalaryRecord = (
    staffMember: Staff,
    month: number, // 1-12
    year: number,
    allAttendance: StaffAttendanceRecord[],
    oneTimeBonuses: SalaryAdjustment[] = [],
    oneTimeDeductions: SalaryAdjustment[] = []
): Omit<Salary, 'id' | 'staffId' | 'paymentDate' | 'status'> => {
    if (!staffMember?.baseSalary) {
        return { baseSalary: 0, attendancePercentage: 0, allowances: [], bonuses: [], standardDeductions: [], deductions: [], grossSalary: 0, tax: 0, netSalary: 0 };
    }

    const workingDays = getWorkingDays(year, month);
    const staffAttendanceThisMonth = allAttendance.filter(r => 
        r.staffId === staffMember.id &&
        new Date(r.date).getFullYear() === year &&
        new Date(r.date).getMonth() === month - 1 &&
        r.status === StaffAttendanceStatus.Present
    );
    
    const presentDays = staffAttendanceThisMonth.length;
    const attendancePercentage = workingDays > 0 ? Math.round((presentDays / workingDays) * 100) : 100;

    const baseSalary = staffMember.baseSalary;
    const attendanceAdjustedBase = baseSalary * (attendancePercentage / 100);

    const allowances = staffMember.allowances?.map(a => ({ reason: a.name, amount: a.amount })) || [];
    const standardDeductions = staffMember.standardDeductions?.map(d => ({ reason: d.name, amount: d.amount })) || [];

    const totalAllowances = allowances.reduce((sum, item) => sum + item.amount, 0);
    const totalBonuses = oneTimeBonuses.reduce((sum, item) => sum + item.amount, 0);
    const totalStandardDeductions = standardDeductions.reduce((sum, item) => sum + item.amount, 0);
    const totalDeductions = oneTimeDeductions.reduce((sum, item) => sum + item.amount, 0);

    const grossSalary = attendanceAdjustedBase + totalAllowances + totalBonuses - totalStandardDeductions - totalDeductions;
    
    let tax = 0;
    if (grossSalary > 3000) {
        tax = (1000 * 0.10) + ((grossSalary - 3000) * 0.15);
    } else if (grossSalary > 2000) {
        tax = (grossSalary - 2000) * 0.10;
    }
    
    const netSalary = grossSalary - tax;

    return {
        baseSalary,
        attendancePercentage,
        allowances,
        bonuses: oneTimeBonuses,
        standardDeductions,
        deductions: oneTimeDeductions,
        grossSalary: parseFloat(grossSalary.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        netSalary: parseFloat(netSalary.toFixed(2)),
    };
};

export const generateMockStaffAttendance = (allStaff: Staff[]): StaffAttendanceRecord[] => {
    const records: StaffAttendanceRecord[] = [];
    const today = new Date();
    const staffIds = allStaff.map(s => s.id);
    
    for (let i = 365; i > 0; i--) { // 1 year of data
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        if (date.getDay() === 0 || date.getDay() === 6) {
            continue;
        }
        
        const dateString = date.toISOString().split('T')[0];

        staffIds.forEach(staffId => {
            const isPresent = Math.random() > 0.08; 
            records.push({
                staffId,
                date: dateString,
                status: isPresent ? StaffAttendanceStatus.Present : StaffAttendanceStatus.Absent
            });
        });
    }

    return records;
};

export const initialStaffAttendanceRecords: StaffAttendanceRecord[] = generateMockStaffAttendance(staff);

export const salaries: Salary[] = [];
const processMonths: { year: number; month: number }[] = [];
const today = new Date();
for (let i = 11; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    processMonths.push({ year: d.getFullYear(), month: d.getMonth() + 1 });
}

staff.forEach(staffMember => {
    processMonths.forEach(({ year, month }) => {
        const bonuses = Math.random() > 0.7 ? [{ reason: 'Performance Bonus', amount: Math.floor(Math.random() * 200) + 50 }] : [];
        const deductions = Math.random() > 0.8 ? [{ reason: 'Late Fine', amount: Math.floor(Math.random() * 50) + 20 }] : [];
        
        const salaryRecord = generateSalaryRecord(staffMember, month, year, initialStaffAttendanceRecords, bonuses, deductions);
        
        if (salaryRecord) {
             salaries.push({
                id: `SAL-${staffMember.id}-${year}-${month}`,
                staffId: staffMember.id,
                ...salaryRecord,
                paymentDate: new Date(year, month - 1, 28).toISOString(),
                status: (year === today.getFullYear() && (month === today.getMonth() + 1)) ? SalaryStatus.Pending : SalaryStatus.Paid,
            });
        }
    });
});

export const initialNotifications: Notification[] = [
    { id: 'N001', to: 'Jane Williams', studentName: 'Bob Williams', message: 'Fee payment is overdue.', sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
];

// Generate mock attendance data for the last 60 days
const generateMockAttendance = (allStudents: Student[]): AttendanceRecord[] => {
    const records: AttendanceRecord[] = [];
    const today = new Date();
    const studentIds = allStudents.map(s => s.id);
    
    for (let i = 60; i > 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) {
            continue;
        }
        
        const dateString = date.toISOString().split('T')[0];

        studentIds.forEach(studentId => {
            // Give each student a slightly different attendance rate
            const isPresent = Math.random() > (0.05 + (parseInt(studentId.slice(2), 10) * 0.01)); 
            records.push({
                studentId,
                date: dateString,
                status: isPresent ? AttendanceStatus.Present : AttendanceStatus.Absent
            });
        });
    }

    return records;
};

export const initialAttendanceRecords: AttendanceRecord[] = generateMockAttendance(students);