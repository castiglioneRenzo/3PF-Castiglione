export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  enrollmentDate: string;
  active: boolean;
}

export interface CreateStudentDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
}

export interface UpdateStudentDto extends Partial<CreateStudentDto> {
  active?: boolean;
}
