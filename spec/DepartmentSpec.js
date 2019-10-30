const { Developer } = require ("../Developer");
const { Designer } = require ("../Designer");
const { Manager } = require ("../Manager");
const { Employee } = require ("../Employee");
const { Department } = require ("../Department");

describe("Developer",  () => {
    it("validates final developer's salary of 1700", () => {
        const baseSalary = 1000, adjustedSalary = 1700, experience = 6;
        const dev = new Developer("John", "Smith", baseSalary, experience);
        expect(dev.getAdjustedSalary()).toEqual(adjustedSalary);
        expect(dev.getBaseSalary()).toEqual(baseSalary);

    });

    it("validates final developer's salary of 1000", () => {
        const baseSalary = 1000, adjustedSalary = 1000, experience = 1;
        const dev = new Developer("John", "Smith", baseSalary, experience);
        expect(dev.getAdjustedSalary()).toEqual(adjustedSalary);
        expect(dev.getBaseSalary()).toEqual(baseSalary);
    });
});

describe("Designer", () => {
    it("validates final designer's salary of 1606", () => {
        const baseSalary = 2000, adjustedSalary = 1606, experience = 5, effectiveness = 0.73;
        const des = new Designer("Ivan", "Ivanov", baseSalary, experience, effectiveness);
        expect(des.getAdjustedSalary()).toEqual(adjustedSalary);
        expect(des.getBaseSalary()).toEqual(baseSalary);
    });

    it("checks if effectiveness coefficient is set undefined when it's invalid", () => {
        const effectivenessCoefficient = 1.4, experience = 2;
        const des = new Designer("Ivan", "Ivanov", 2000, experience, effectivenessCoefficient);
        expect(des.validateEffectivenessCoefficient(effectivenessCoefficient)).toEqual(undefined);
    });
});

describe("Manager", () => {
    let manager;
    const developersCount = 8, designersCount = 3;
    beforeEach(() => {
        manager = new Manager("Sam", "Parks", 5000, 10);
        const salary = 3000, experience = 2, designerEfficiency = 0.9;
        const employees = [];
        for (let i = 0; i < developersCount; i++)  employees.push(new Developer("John", "Smith", salary, experience));
        for (let i = 0; i < designersCount; i++) employees.push(
            new Designer("Ivan", "Ivanov", salary, experience, designerEfficiency));

        manager.addNewTeamMembers(employees);
    });

    it("validates team members have been added to manager's team", () => {
        expect(manager.getTeamMembers().length === developersCount + designersCount);
    });

    it("validates final manager's salary of 7480 with all possible benefits", () => {
        const adjustedSalary = 7480;
        expect(manager.getAdjustedSalary()).toEqual(adjustedSalary);
    });
});

describe("Department", () => {
    let department;
    const developersCount = 5, designersCount = 3;
    function createNewTeam() {
        const salary = 2000, experience = 2, designerEfficiency = 0.9;
        const employees = [];
        for (let i = 0; i < developersCount; i++)  employees.push(
            new Developer("John", "Smith", salary, experience));
        for (let i = 0; i < designersCount; i++) employees.push(
            new Designer("Ivan", "Ivanov", salary, experience, designerEfficiency));

        return employees;
    }

    beforeEach(() => {
        const manager1 = new Manager("Bob", "Brown", 4000, 2);
        const manager2 = new Manager("Jay", "Clark", 4000, 2);

        manager1.addNewTeamMembers(createNewTeam());
        manager2.addNewTeamMembers(createNewTeam());

        department = new Department([manager1, manager2]);
    });

    it("validates salary information length", () => {
        const employeesInDepartmentCount = department.managersList.length * (developersCount + designersCount);
        expect(department.getSalaryInformation()).toBeDefined();
        expect(department.getSalaryInformation().length).toEqual(employeesInDepartmentCount);
    });
});

describe("Employee", () => {
    it("validates employee.toString correctness", () => {
        const baseSalary = 1000, adjustedSalary = 1700, experience = 5;
        const dev = new Employee("John", "Smith", baseSalary, experience);
        const expectedString = "John Smith, manager: no manager, experience: 5";
        expect(dev.toString()).toEqual(expectedString);
    })
});
