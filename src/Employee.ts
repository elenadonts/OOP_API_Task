import { Manager } from "./Manager";

export class Employee {
    constructor(public firstName: string, public lastName: string, public salary: number,
                public experience: number, public manager?: Manager, public effectivenessCoefficient?: number) {
    }

    public getBaseSalary(): number {
        return this.salary;
    }

    public setManager(manager: Manager): void {
        this.manager = manager;
    }

    public getAdjustedSalary(): number {
        let salary: number = this.salary;
        const fiveYearBonus: number = 500;
        const twoYearBonus: number = 200;
        if (this.experience > 5) {
            salary = salary * 1.2 + fiveYearBonus;
        }
        if (this.experience <= 5 && this.experience > 2) {
            salary +=  twoYearBonus;
        }
        return Math.round(salary);
    }

    public toString(): string {
        const manager: string = this.manager === undefined ? "no manager" : this.manager.lastName;
        return `${this.firstName} ${this.lastName}, manager: ${manager}, experience: ${this.experience}`;
    }
}

// module.exports.Employee = Employee;
