import { Employee } from "./Employee";
import { Manager } from "./Manager";

export class Developer extends Employee {
    constructor(public firstName: string, public lastName: string, public salary: number,
                public experience: number, public manager?: Manager) {
        super(firstName, lastName, salary, experience, manager);
    }
}
