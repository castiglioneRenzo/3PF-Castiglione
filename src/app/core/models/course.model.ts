export interface Course {
  id: number;
  name: string;
  description: string;
  duration: number; // en horas
  startDate: string;
  endDate: string;
  maxStudents: number;
  instructor: string;
  schedule: string;
  active: boolean;
}

export interface CreateCourseDto {
  name: string;
  description: string;
  duration: number;
  startDate: string;
  endDate: string;
  maxStudents: number;
  instructor: string;
  schedule: string;
}

export interface UpdateCourseDto extends Partial<CreateCourseDto> {
  active?: boolean;
}
