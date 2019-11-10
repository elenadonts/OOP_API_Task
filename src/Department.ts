import {Employee} from "./Employee";
import { Manager } from "./Manager";

export class Department {
    public employees: Employee[];

    constructor(public managersList: Manager[]) {
        this.managersList = managersList;
        this.employees = this.getAllEmployeesInTheDepartment();
    }

    public addNewManager(manager: Manager): void {
        this.managersList.push(manager);
        this.employees = [...this.employees, ...manager.getTeamMembers()];
    }

    public addNewEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    public getAllManagers(): Manager[] {
        return this.managersList;
    }

    public getAllEmployees(): Employee[] {
        return this.employees;
    }

    public getAllEmployeesInTheDepartment(): Employee[] {
        let employees: Employee[] = [];
        this.managersList.forEach((manager) => {
            if (manager.hasTeam()) {
                employees = [...employees, ...manager.team];
            }
        });
        return employees;
    }

    public getSalaryInformation(): string[] {
        const salaryInformation: string[] = [];
        this.managersList.forEach((manager) => {
            if (manager.hasTeam()) {
                manager.getTeamMembers().forEach((member) => {
                    salaryInformation.push(`${member.firstName} ${member.lastName} got salary: ${member.getAdjustedSalary()}`);
                });
            }
        });
        return salaryInformation;
    }
}
