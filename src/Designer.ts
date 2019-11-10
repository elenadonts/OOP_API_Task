import { Employee } from "./Employee";
import { Manager } from "./Manager";

export class Designer extends Employee {
    constructor(public firstName: string, public lastName: string, public salary: number,
                public experience: number, public effectivenessCoefficient: number, public manager?: Manager) {
        super(firstName, lastName, salary, experience, manager);
        this.effectivenessCoefficient = this.validateEffectivenessCoefficient(effectivenessCoefficient);
    }

    public getAdjustedSalary(): number {
        return Math.round(super.getAdjustedSalary() * this.effectivenessCoefficient);
    }

    public validateEffectivenessCoefficient(coefficient: number): number | undefined {
        if (coefficient <= 0 || coefficient > 1) {
            console.log("Invalid effectiveness coefficient");
        }
        return coefficient > 0 && coefficient <= 1 ? coefficient : undefined;
    }
}
