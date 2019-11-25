class EmployeeLogic {

    constructor(){
        this.test = "test0";
    }
    
    getAllEmployees(){
        return {
            employees: ["Ofer","Lior", "Hen", "Roy", "Tzipora","Liad","Sagi"]
        }
    }
}


// whenever we want to export we user the 'module.exports' object
// which is an initialized empty object :  {}  
// that will be sent to require('employee-logic') calls

module.exports = new EmployeeLogic();