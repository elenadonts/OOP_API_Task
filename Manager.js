const { Employee } = require("./Employee");
const { Developer } = require("./Developer");

class Manager extends Employee {
    constructor(firstName, lastName, salary, experience, manager, team = []) {
        super(firstName, lastName, salary, experience, manager);
        this.team = team;
    }

    hasTeam() {
        return this.team !== undefined;
    }

    getTeamMembers() {
        return this.team;
    }

    getAdjustedSalary() {
        let salary = this.getAdjustedBasicEmployeeSalary(this.salary);
        if (this.team.length > 10) {
            salary += 300;
        }
        if (this.team.length > 5 && this.team.length <= 10) {
            salary += 200;
        }
        //if more than a half of the team are developers then salary increases
        const devsCount = this.team.filter((employee => employee instanceof Developer)).length;
        if (this.team.length <  devsCount * 2) {
            salary *= 1.1;
        }
        return Math.round(salary);
    }

    addNewTeamMembers(members) {
        this.team = [...this.team, ...members];
    }
}
module.exports.Manager = Manager;