class EmployeeLogic {

    constructor() {
    }

    getAllEmployees() {
        return [
            {
                id: 1,
                name: "Ofer",
            },
            {
                id: 2,
                name: "Lior",
            },
            {
                id: 3,
                name: "Hen",
            },
            {
                id: 4,
                name: "Tzipora",
            },
            {
                id: 5,
                name: "Liad",
            },
            {
                id: 6,
                name: "Sagi",
            },
            {
                id: 7,
                name: "Olga"
            }
        ]
    }

    getEmployee(id) {
        console.log('id',id);
        const employee = this.getAllEmployees().find(x => x.id == id);
        console.dir(employee);
        return employee;
    }
}


// whenever we want to export we user the 'module.exports' object
// which is an initialized empty object :  {}  
// that will be sent to require('employee-logic') calls

module.exports = new EmployeeLogic();