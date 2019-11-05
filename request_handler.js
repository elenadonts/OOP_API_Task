const { Developer } = require ("./Developer");
const { Designer } = require ("./Designer");
const { Manager } = require ("./Manager");
const { Employee } = require ("./Employee");
const { Department } = require ("./Department");

let department = initializeAndFillNewDepartment();
const DEVELOPER = 'developer';
const DESIGNER = 'designer';
const MANAGER = 'manager';

function initializeAndFillNewDepartment() {
    const manager1 = new Manager("Jay", "Clark", 4000, 8);
    const manager2 = new Manager("Ivan", "Ivanov", 5000, 8);
    manager1.addNewTeamMembers(initializeAndFillNewTeam(6, 5));
    manager2.addNewTeamMembers(initializeAndFillNewTeam(5, 4));
    let department = new Department([manager1, manager2]);
    return department;
}

function initializeAndFillNewTeam(devsCount, designersCount) {
    let team = [];
    for (let i = 0; i < devsCount; i++) {
        team.push(new Developer(`John_${i}`, `Smith_${i}`, 2000, 5));
    }
    for (let i = 0; i < designersCount; i++) {
        team.push(new Designer(`Bob_${i}`, `Brown_${i}`, 3000, 5, 0.8));
    }
    return team;
}

function getManagerIdForEmployee(employee) {
    return department.getAllManagers().findIndex(manager => manager === employee.manager);
}

function getEmployeeId(employeeToFind) {
    return department.getAllEmployees().findIndex(employee => employeeToFind === employee);
}

//GET {"type": "designer", "id": 0, "manager_id": 1, other data...},
exports.getAllEmployees = function () {
    let employees = [];
    department.employees.forEach((employee, index) => {
        const type = employee.constructor.name.toLowerCase();
        const managerId = getManagerIdForEmployee(employee);
        let result = {type: type, id: index, managerId: managerId, firstName: employee.firstName,
            lastName: employee.lastName, experience: employee.experience, salary: employee.salary};
        if (type === DESIGNER) result.effectivenessCoefficient = employee.effectivenessCoefficient;
        employees.push(result);
    });
    return JSON.stringify(employees);
};

//POST /api/v1/employees should accept an object {"type": "designer", other data...} (no id in post, as client does not know it when creating new employees) and depending on type field create an instance of Developer or Designer.
exports.addNewEmployee = function(reqBody) {
    let employee = null;
    switch (reqBody.type) {
        case DESIGNER:
            employee = new Designer(reqBody.firstName, reqBody.lastName, reqBody.salary, reqBody.experience,
                reqBody.effectivenessCoefficient);
            break;
        case DEVELOPER:
            employee = new Developer(reqBody.firstName, reqBody.lastName, reqBody.salary, reqBody.experience);
            break;
        default:
            throw new Error("Unable to add employee");
    }

    department.addNewEmployee(employee);
    return (department.employees.length - 1).toString();
};

//GET /api/v1/employees/:id should return all info about specific employee from general employee list in format ["type": "designer", "id": 0, "salary": 1500, other data...}, here you should return the employee's salary with bonuses!
exports.getEmployeeInfo = function(employeeId) {
    const id = Number(employeeId);
    if (id >= department.getAllEmployees().length || id < 0) throw new Error("Employee doesn't exist");
    const employee = department.getAllEmployees()[id];
    const type = employee.constructor.name.toLowerCase();
    const managerId = getManagerIdForEmployee(employee);
    const result = {type: type, id: id, managerId: managerId, firstName: employee.firstName,
        lastName: employee.lastName, experience: employee.experience, salary: employee.getAdjustedSalary()};
    if (type === DESIGNER) result.effectivenessCoefficient = employee.effectivenessCoefficient;
    return result;
};

//GET /api/v1/managers should return a list of all managers in format [{"type": "manager", "id": 0, other data...}]
exports.getAllManagers = function () {
    let managers = [];
    department.getAllManagers().forEach((manager, index) => {
        let managerToAdd = {type: 'manager', id: index, firstName: manager.firstName,
            lastName: manager.lastName, experience: manager.experience, salary: manager.salary};
        managers.push(managerToAdd);
    });
    return JSON.stringify(managers);
};

// POST /api/v1/managers should accept an object {"type": "manager", other data...}
exports.addNewManager = function(reqBody) {
    if (reqBody.type !== MANAGER) throw new Error('Entity passed is not a manager');
    let manager = new Manager(reqBody.firstName, reqBody.lastName,
        reqBody.salary, reqBody.experience, reqBody.manager);
    department.addNewManager(manager);
    return (department.getAllManagers().length - 1).toString();
};

//GET /api/v1/managers/:id should return all info about specific manager in format ["type": "manager", "id": 0, "salary": 1500, other data...}
exports.getManagerInfo = function(managerId) {
    const id = Number(managerId);
    if (id >= department.getAllManagers().length || id < 0) throw new Error("Manager doesn't exist");
    const manager = department.getAllManagers()[id];
    const type = manager.constructor.name.toLowerCase();
    return {type: type, id: id, firstName: manager.firstName,
        lastName: manager.lastName, experience: manager.experience, salary: manager.getAdjustedSalary()};
};

// GET /api/v1/managers/:id/team should return a list of this manager's team in format [{"type": "designer", "id": 0, other data...}, {"type
exports.getManagerTeam = function(managerId) {
    let teamMembers = [];
    const id = Number(managerId);
    if (id >= department.getAllManagers().length || id < 0) throw new Error("Manager doesn't exist");
    const manager = department.getAllManagers()[id];
    manager.getTeamMembers().forEach((member) => {
        const type = member.constructor.name.toLowerCase();
        const employeeId = getEmployeeId(member);
        const teamMember = {type: type, id: employeeId, firstName: member.firstName,
            lastName: member.lastName, experience: member.experience, salary: member.salary};
        if (type === DESIGNER) teamMember.effectivenessCoefficient = member.effectivenessCoefficient;
        teamMembers.push(teamMember);
    });
    return JSON.stringify(teamMembers);
};

// POST /api/v1/managers/:id/team should accept an object {"employee_id": 0} and should add an employee from general employee list by his employee_id (or index) to manager's team
exports.addEmployeeToManagerTeam = function (employeeId, managerId) {
    if (managerId >= department.getAllManagers().length || managerId < 0) throw new Error("Manager doesn't exist");
    if (employeeId >= department.getAllEmployees().length || employeeId < 0) throw new Error("Employee doesn't exist");
    const manager = department.getAllManagers()[managerId];
    const employee = department.getAllEmployees()[employeeId];
    manager.addNewTeamMembers([employee]);
    return JSON.stringify({teamLength: manager.getTeamMembers().length});
};