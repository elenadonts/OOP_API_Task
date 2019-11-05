const { Employee } = require("./Employee");

class Designer extends Employee {
    constructor(firstName, lastName, salary, experience, effectivenessCoefficient, manager) {
        super(firstName, lastName, salary, experience, manager);
        this.effectivenessCoefficient = this.validateEffectivenessCoefficient(effectivenessCoefficient);
    }

    getAdjustedSalary() {
        return Math.round(super.getAdjustedSalary() * this.effectivenessCoefficient);
    }

    validateEffectivenessCoefficient(coefficient) {
        if (coefficient <= 0 || coefficient > 1) {
            console.log("Invalid effectiveness coefficient");
        }
        return coefficient > 0 && coefficient <= 1 ? coefficient : undefined;
    }
}
module.exports.Designer = Designer;