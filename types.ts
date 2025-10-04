export enum FeeStatus {
  Paid = 'Paid',
  Due = 'Due',
  Overdue = 'Overdue',
}

export enum SalaryStatus {
  Paid = 'Paid',
  Pending = 'Pending',
}

export type View = 'dashboard' | 'fees' | 'salaries' | 'notifications';

export interface Student {
  id: string;
  name: string;
  grade: number;
  parentId: string;
  parentName: string;
  parentContact: string;
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
  role: string;
  contact: string;
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