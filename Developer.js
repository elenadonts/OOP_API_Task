const { Employee } = require("./Employee");

class Developer extends Employee {
    constructor(firstName, lastName, salary, experience, manager) {
        super(firstName, lastName, salary, experience, manager);
    }

    getAdjustedSalary() {
        return super.getAdjustedBasicEmployeeSalary(this.salary);
    }
}
module.exports.Developer = Developer;