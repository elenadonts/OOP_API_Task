export interface EmployeeData {
    type: string;
    id: number;
    managerId?: number;
    firstName: string;
    lastName: string;
    experience: number;
    salary: number;
    effectivenessCoefficient?: number;
    index?: number;
}
