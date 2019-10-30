class Employee {
    constructor(firstName, lastName, salary, experience, manager) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.experience = experience;
        this.manager = manager;
        this.salary = salary;
    }

    getBaseSalary(){
        return this.salary;
    }

    getAdjustedBasicEmployeeSalary(salary) {
        const fiveYearBonus = 500, twoYearBonus = 200;
        if (this.experience > 5) {
            salary = salary* 1.2 + fiveYearBonus;
        }
        if (this.experience <= 5 && this.experience > 2) {
            salary +=  twoYearBonus;
        }
        return Math.round(salary);
    }

    toString() {
        const manager = this.manager === undefined ? 'no manager' : this.manager.lastName;
        return `${this.firstName} ${this.lastName}, manager: ${manager}, experience: ${this.experience}`;
    }
}

module.exports.Employee = Employee;
