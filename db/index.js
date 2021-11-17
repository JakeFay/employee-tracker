const connection =  require('./connection');

class DB {
    constructor(connection){
        this.connection = connection;
    }
    getAllDepartments(){
        return this.connection.promise().query('SELECT * FROM department;')
    }

    getAllRoles(){
        return this.connection.promise().query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id')
    }

    getAllEmployees(){
        //employee ids, first names, last names, job titles, departments, salaries, and managers (full name...look into concat() in mysql) that the employees report to
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;')
    }

    addADepartment(){
        return this.connection.promise().query('INSERT INTO department SET ?', {name: HR})
    }

 
}

module.exports = new DB(connection);