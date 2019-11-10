import { Department } from "./Department";
import { Designer } from "./Designer";
import { Developer } from "./Developer";
import { Employee } from "./Employee";
import { EmployeeData } from "./EmployeeData";
import { EmployeePosition } from "./EmployeePosition";
import { Manager } from "./Manager";

const department: Department = initializeAndFillNewDepartment();

function initializeAndFillNewDepartment(): Department {
    const manager1 = new Manager("Jay", "Clark", 4000, 8);
    const manager2 = new Manager("Ivan", "Ivanov", 5000, 8);
    manager1.addNewTeamMembers(initializeAndFillNewTeam(6, 5));
    manager2.addNewTeamMembers(initializeAndFillNewTeam(5, 4));
    return new Department([manager1, manager2]);
}

function initializeAndFillNewTeam(devsCount: number, designersCount: number): Employee[] {
    const team = [];
    for (let i = 0; i < devsCount; i++) {
        team.push(new Developer(`John_${i}`, `Smith_${i}`, 2000, 5));
    }
    for (let i = 0; i < designersCount; i++) {
        team.push(new Designer(`Bob_${i}`, `Brown_${i}`, 3000, 5, 0.8));
    }
    return team;
}

function getManagerIdForEmployee(employee: Employee): number {
    return department.getAllManagers().findIndex((manager) => manager === employee.manager);
}

function getEmployeeId(employeeToFind: Employee): number {
    return department.getAllEmployees().findIndex((employee) => employeeToFind === employee);
}

function employeeIsAlreadyInTheTeam(employeeId: number, managerId: number): boolean {
    const team = department.getAllManagers()[managerId].getTeamMembers();
    const employee = department.getAllEmployees()[employeeId];
    return team.includes(employee);
}

export function getAllEmployees(): any {
    const employees: any = [];
    department.employees.forEach((employee: Employee, index: number) => {
        const managerId = getManagerIdForEmployee(employee);
        const result: EmployeeData = getEmployeeParsedData(employee, true, index, managerId);
        employees.push(result);
    });

    return employees;
}

export function addNewEmployee(reqBody: any): string  {
    let employee: Employee = null;
    switch (reqBody.type) {
        case EmployeePosition.Designer:
            employee = new Designer(reqBody.firstName, reqBody.lastName, reqBody.salary, reqBody.experience,
                reqBody.effectivenessCoefficient);
            break;
        case EmployeePosition.Developer:
            employee = new Developer(reqBody.firstName, reqBody.lastName, reqBody.salary, reqBody.experience);
            break;
        default:
            throw new Error("Unable to add employee");
    }
    department.addNewEmployee(employee);
    return (department.employees.length - 1).toString();
}

export function getEmployeeInfo(employeeId: number): EmployeeData  {
    if (employeeId >= department.getAllEmployees().length || employeeId < 0) {
        throw new Error("Employee doesn't exist");
    }
    const employee: Employee = department.getAllEmployees()[employeeId];
    const managerId: number = getManagerIdForEmployee(employee);
    return getEmployeeParsedData(employee, false, employeeId, managerId);
}

export function getAllManagers(): any {
    const managers: any = [];
    department.getAllManagers().forEach((manager, index) => {
        const result: EmployeeData = getEmployeeParsedData(manager, true, index);
        managers.push(result);
    });
    return managers;
}

export function addNewManager(reqBody: any): string {
    if (reqBody.type !== EmployeePosition.Manager) { throw new Error("Entity passed is not a manager"); }
    const manager: Manager = new Manager(reqBody.firstName, reqBody.lastName,
        reqBody.salary, reqBody.experience, reqBody.manager);

    department.addNewManager(manager);
    return (department.getAllManagers().length - 1).toString();
}

export function getManagerInfo(managerId: number): EmployeeData {
    if (managerId >= department.getAllManagers().length || managerId < 0) { throw new Error("Manager doesn't exist"); }
    const manager: Manager = department.getAllManagers()[managerId];
    return getEmployeeParsedData(manager, false, managerId);
}

export function getManagerTeam(managerId: number): any {
    const teamMembers: any = [];
    if (managerId >= department.getAllManagers().length || managerId < 0) { throw new Error("Manager doesn't exist"); }
    const manager: Manager = department.getAllManagers()[managerId];

    manager.getTeamMembers().forEach((member) => {
        const employeeId: number = getEmployeeId(member);
        const result: EmployeeData = getEmployeeParsedData(member, false, employeeId, managerId);
        teamMembers.push(result);
    });
    return teamMembers;
}

export function addEmployeeToManagerTeam(employeeId: number, managerId: number): any {
    if (managerId >= department.getAllManagers().length || managerId < 0) {
        throw new Error("Manager doesn't exist");
    }
    if (employeeId >= department.getAllEmployees().length || employeeId < 0) {
        throw new Error("Employee doesn't exist");
    }
    if (employeeIsAlreadyInTheTeam(employeeId, managerId)) {
        throw new Error("Employee is already in this team");
    }

    const manager: Manager = department.getAllManagers()[managerId];
    const employee: Employee = department.getAllEmployees()[employeeId];

    manager.addNewTeamMembers([employee]);
    return { teamLength: manager.getTeamMembers().length };
}

function getEmployeeParsedData(employee: Employee, useBasicSalary: boolean,
                               id: number, managerId?: number): EmployeeData {
    const type: string = employee.constructor.name.toLowerCase();
    const salary = useBasicSalary ? employee.salary : employee.getAdjustedSalary();

    const result: EmployeeData = {type, id, firstName: employee.firstName,
        lastName: employee.lastName, experience: employee.experience, salary};

    if (managerId !== undefined) { result.managerId = managerId; }
    if (type === EmployeePosition.Designer) { result.effectivenessCoefficient = employee.effectivenessCoefficient; }
    return result;
}
