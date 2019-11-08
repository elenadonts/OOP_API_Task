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
    return new Department([manager1, manager2]);
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

function employeeIsAlreadyInTheTeam(employeeId, managerId) {
    const team = department.getAllManagers()[managerId].getTeamMembers();
    const employee = department.getAllEmployees()[employeeId];
    return team.includes(employee);
}

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
    return employees;
};

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

exports.getEmployeeInfo = function(employeeId) {
    if (employeeId >= department.getAllEmployees().length || employeeId < 0) throw new Error("Employee doesn't exist");
    const employee = department.getAllEmployees()[employeeId];
    const type = employee.constructor.name.toLowerCase();
    const managerId = getManagerIdForEmployee(employee);
    const result = {type: type, id: employeeId, managerId: managerId, firstName: employee.firstName,
        lastName: employee.lastName, experience: employee.experience, salary: employee.getAdjustedSalary()};
    if (type === DESIGNER) result.effectivenessCoefficient = employee.effectivenessCoefficient;
    return result;
};

exports.getAllManagers = function () {
    let managers = [];
    department.getAllManagers().forEach((manager, index) => {
        let managerToAdd = {type: 'manager', id: index, firstName: manager.firstName,
            lastName: manager.lastName, experience: manager.experience, salary: manager.salary};
        managers.push(managerToAdd);
    });
    return managers;
};

exports.addNewManager = function(reqBody) {
    if (reqBody.type !== MANAGER) throw new Error('Entity passed is not a manager');
    let manager = new Manager(reqBody.firstName, reqBody.lastName,
        reqBody.salary, reqBody.experience, reqBody.manager);
    department.addNewManager(manager);
    return (department.getAllManagers().length - 1).toString();
};

exports.getManagerInfo = function(managerId) {
    if (managerId >= department.getAllManagers().length || managerId < 0) throw new Error("Manager doesn't exist");
    const manager = department.getAllManagers()[managerId];
    const type = manager.constructor.name.toLowerCase();
    return {type: type, id: managerId, firstName: manager.firstName,
        lastName: manager.lastName, experience: manager.experience, salary: manager.getAdjustedSalary()};
};

exports.getManagerTeam = function(managerId) {
    let teamMembers = [];
    if (managerId >= department.getAllManagers().length || managerId < 0) throw new Error("Manager doesn't exist");
    const manager = department.getAllManagers()[managerId];
    manager.getTeamMembers().forEach((member) => {
        const type = member.constructor.name.toLowerCase();
        const employeeId = getEmployeeId(member);
        const teamMember = {type: type, id: employeeId, firstName: member.firstName,
            lastName: member.lastName, experience: member.experience, salary: member.salary};
        if (type === DESIGNER) teamMember.effectivenessCoefficient = member.effectivenessCoefficient;
        teamMembers.push(teamMember);
    });
    return teamMembers;
};

exports.addEmployeeToManagerTeam = function (employeeId, managerId) {
    if (managerId >= department.getAllManagers().length || managerId < 0) throw new Error("Manager doesn't exist");
    if (employeeId >= department.getAllEmployees().length || employeeId < 0) throw new Error("Employee doesn't exist");
    if (employeeIsAlreadyInTheTeam(employeeId, managerId)) throw new Error("Employee is already in this team");
    const manager = department.getAllManagers()[managerId];
    const employee = department.getAllEmployees()[employeeId];
    manager.addNewTeamMembers([employee]);
    return {teamLength: manager.getTeamMembers().length};
};