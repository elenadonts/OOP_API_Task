import { Developer } from "./Developer";
import { Employee } from "./Employee";

export class Manager extends Employee {
    constructor(public firstName: string, public lastName: string, public salary: number,
                public experience: number, public manager?: Manager, public team: Employee[] = []) {
        super(firstName, lastName, salary, experience, manager);
        this.team = team;
    }

    public hasTeam(): boolean {
        return this.team !== undefined;
    }

    public getTeamMembers(): Employee[] {
        return this.team;
    }

    public getAdjustedSalary(): number {
        let salary: number = super.getAdjustedSalary();
        if (this.team.length > 10) {
            salary += 300;
        }
        if (this.team.length > 5 && this.team.length <= 10) {
            salary += 200;
        }
        // if more than a half of the team are developers then salary increases
        const devsCount = this.team.filter(((employee) => employee instanceof Developer)).length;
        if (this.team.length <  devsCount * 2) {
            salary *= 1.1;
        }
        return Math.round(salary);
    }

    public addNewTeamMembers(members: Employee[]): void {
        this.team = [...this.team, ...members];
        this.team.forEach((member) => {
            member.setManager(this);
        });
    }
}
