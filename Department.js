class Department {
    constructor(managersList) {
        this.managersList = managersList;
    }

    getSalaryInformation() {
        const salaryInformation = [];
        this.managersList.forEach(manager => {
            if (manager.hasTeam()) {
                manager.team.forEach(member => {
                    salaryInformation.push(`${member.firstName} ${member.lastName} got salary: ${member.getAdjustedSalary()}`);
                });
            }
        });
        return salaryInformation;
    }
}
module.exports.Department = Department;