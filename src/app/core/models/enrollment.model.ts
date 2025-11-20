export type EnrollmentStatus = 'active' | 'completed' | 'cancelled';

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrollmentDate: string;
  status: EnrollmentStatus;
  grade: number | null;
  notes: string;
}

export interface EnrollmentWithDetails extends Enrollment {
  studentName?: string;
  courseName?: string;
}

export interface CreateEnrollmentDto {
  studentId: number;
  courseId: number;
  notes?: string;
}

export interface UpdateEnrollmentDto {
  status?: EnrollmentStatus;
  grade?: number | null;
  notes?: string;
}
