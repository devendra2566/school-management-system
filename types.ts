export enum FeeStatus {
  Paid = 'Paid',
  Due = 'Due',
  Overdue = 'Overdue',
}

export enum SalaryStatus {
  Paid = 'Paid',
  Pending = 'Pending',
}

export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
}

export enum StaffAttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
  OnLeave = 'On Leave'
}

export type Role = 'admin' | 'teacher' | 'student';
export type StaffRole = 'Math Teacher' | 'Science Teacher' | 'Administrator' | 'Janitor' | 'Driver' | 'Sweeper';

export type View = 'dashboard' | 'fees' | 'salaries' | 'notifications' | 'studentProfile' | 'teacherProfile' | 'userManagement' | 'attendance';

export interface User {
  id: string;
  name: string;
  role: Role;
  // if student or teacher, this will link to their detailed profile
  profileId: string;
}

export interface StudentPerformance {
  subject: string;
  marks: number; // out of 100
  comments: string;
}

export interface Student {
  id: string;
  name: string;
  grade: number;
  parentId: string;
  parentName: string;
  parentContact: string;
  performance: StudentPerformance[];
  activities: string[];
  dateOfBirth: string;
  address: string;
  imageUrl?: string;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  status: FeeStatus;
}

export interface Allowance {
  name: string;
  amount: number;
}

export interface StandardDeduction {
  name: string;
  amount: number;
}

export interface Staff {
  id:string;
  name: string;
  role: StaffRole;
  contact: string;
  imageUrl?: string;
  joiningDate: string;
  dateOfBirth: string;
  address: string;
  // For teachers
  classTeacherOfGrade?: number;
  subjects?: string[];
  // For salary calculation
  baseSalary?: number;
  allowances?: Allowance[];
  standardDeductions?: StandardDeduction[];
}

export interface SalaryAdjustment {
    reason: string;
    amount: number;
}

export interface Salary {
  id: string;
  staffId: string;
  paymentDate: string;
  status: SalaryStatus;
  
  // Calculation components
  baseSalary: number; // The original base salary
  attendancePercentage: number;
  
  allowances: SalaryAdjustment[]; // from Staff profile
  bonuses: SalaryAdjustment[]; // one-time bonuses
  
  standardDeductions: SalaryAdjustment[]; // from Staff profile
  deductions: SalaryAdjustment[]; // one-time deductions
  
  // Calculated values
  grossSalary: number;
  tax: number;
  netSalary: number;
}


export interface Notification {
  id: string;
  to: string; // parent name
  studentName: string;
  message: string;
  sentAt: string;
}

export interface AttendanceRecord {
  studentId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
}

export interface StaffAttendanceRecord {
  staffId: string;
  date: string; // YYYY-MM-DD
  status: StaffAttendanceStatus;
}
