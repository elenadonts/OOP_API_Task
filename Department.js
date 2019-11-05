class Department {
    constructor(managersList) {
        this.managersList = managersList;
        this.employees = this.getAllEmployeesInTheDepartment();
    }

    addNewManager(manager) {
        this.managersList.push(manager);
        this.employees = [...this.employees, ...manager.getTeamMembers()]
    }

    addNewEmployee(employee) {
        this.employees.push(employee);
    }

    getAllManagers() {
        return this.managersList;
    }

    getAllEmployees() {
        return this.employees;
    }

    getAllEmployeesInTheDepartment() {
        let employees = [];
        this.managersList.forEach((manager) => {
            if (manager.hasTeam()) {
                employees = [...employees, ...manager.team];
            }
        });
        return employees;
    }

    getSalaryInformation() {
        const salaryInformation = [];
        this.managersList.forEach(manager => {
            if (manager.hasTeam()) {
                manager.getTeamMembers().forEach(member => {
                    salaryInformation.push(`${member.firstName} ${member.lastName} got salary: ${member.getAdjustedSalary()}`);
                });
            }
        });
        return salaryInformation;
    }
}
module.exports.Department = Department;