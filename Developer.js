const { Employee } = require("./Employee");

class Developer extends Employee {
    constructor(firstName, lastName, salary, experience, manager) {
        super(firstName, lastName, salary, experience, manager);
    }
}
module.exports.Developer = Developer;