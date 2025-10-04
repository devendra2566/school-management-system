export enum FeeStatus {
  Paid = 'Paid',
  Due = 'Due',
  Overdue = 'Overdue',
}

export enum SalaryStatus {
  Paid = 'Paid',
  Pending = 'Pending',
}

export type Role = 'admin' | 'teacher' | 'student';
export type StaffRole = 'Math Teacher' | 'Science Teacher' | 'Administrator' | 'Janitor' | 'Driver' | 'Sweeper';

export type View = 'dashboard' | 'fees' | 'salaries' | 'notifications' | 'studentProfile' | 'teacherProfile' | 'userManagement';

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
  attendance: number; // percentage
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

export interface Staff {
  id: string;
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
  attendancePercentage?: number; // monthly
}

export interface Salary {
  id: string;
  staffId: string;
  amount: number;
  paymentDate: string;
  status: SalaryStatus;
}

export interface Notification {
  id: string;
  to: string; // parent name
  studentName: string;
  message: string;
  sentAt: string;
}