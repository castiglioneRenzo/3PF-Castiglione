export interface Course{
    id: number;
    title: string;
    description: string;
    beginDate: Date;
    endDate: Date;
    status: CourseStatus;
}

export enum CourseStatus{
    PLANNED = 'PLANNED',
    ONGOING = 'ONGOING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export const courseColumns: string[] = [
    'id',
    'title',
    'description',
    'beginDate',
    'endDate',
    'status',
    'actions'
];