const { prompt } = require('inquirer');
require('console.table');
const db = require('./db');
const connection = require('./db/connection');
const { getAllEmployees, getAllRoles } = require('./db');



function start() {
    getQuestion();
};

function getQuestion() {
    prompt([{
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee', 'Quit']
    }]).then((res) => {

        switch (res.option) {
            case 'view all departments':
                viewAllDepartments();
                break;

            case 'view all roles':
                viewAllRoles();
                break;

            case 'view all employees':
                viewAllEmployees();
                break;

            case 'add a department':
                prompt([{
                    type: 'input',
                    name: 'name',
                    message: 'Type the name of the department you would like to add',
                }])
                    .then((data) => {
                        console.log(data)
                        addDepartment(data);
                    })
                break;

            case 'add a role':
                connection.query('SELECT * FROM department;', (err, data) => {
                    if (err) console.log(err)
                    console.table(data)
                })
               
                prompt([{
                    type: 'input',
                    name: 'department_id',
                    message: 'Type the department id for this position?',
                },
                {
                    type: 'input',
                    name: 'title',
                    message: 'Type the name of the role you would like to add'
                }, {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for this position?'
                }, ])
                    .then((data) => {
                        
                        console.log(data)
                        addRole(data);
                    })
                break;

            case 'add an employee':
                addEmployee()
                break;

            case 'update employee':
                update()
                break;

            default:
                process.exit();
                break;
        }

    })
}
function viewAllDepartments() {
    db.getAllDepartments().then(([data]) => {
        console.table(data);
    }).then(() => getQuestion());
};

function viewAllRoles() {
    db.getAllRoles().then(([data]) => {
        console.table(data);
    }).then(() => getQuestion());
}

function viewAllEmployees() {
    db.getAllEmployees().then(([data]) => {
        console.table(data);
    }).then(() => getQuestion());
};

function addDepartment(answerObject) {
    connection.query('insert into department set ?', answerObject)
        getQuestion();
};

async function addRole(data) {


    connection.query('insert into role set ?', data, (err, result) => {
        if (err) console.log(err)
        console.log('success')
        getQuestion();
    })
};

function updateEmployee(data) {
    connection.query('update employee set  = ? WHERE  = ?', [data.roleId, data.employeeId], (err, result) => {
        if (err) console.log(err)
        console.log('success')
        getQuestion();
    })
}

async function addEmployee() {
    let data = await db.getAllRoles().then(([data]) => {
        return data
    })
    let other = await db.getAllEmployees().then(([data]) => {
        return data
    })
    console.table(data)
    console.table(other)
    prompt([{
        type: 'input',
        name: 'first_name',
        message: 'Type emplyees first name.'
    }, {
        type: 'input',
        name: 'last_name',
        message: 'Type employees last name.'
    }, {
        type: 'input',
        name: 'role_id',
        message: 'type the employees role id.'
    }, {
        type: 'input',
        name: 'manager_id',
        message: 'what is the managers id for this employee?'
    }]).then((data) => {
        connection.query('insert into employee set  ?', data, (err, result) => {
            if (err) console.log(err)
            console.log('success')
            getQuestion();
        })
    })

    
}


function updateRole(data) {
    connection.query('update employee set role_id = ? WHERE id = ?', [data.roleId, data.employeeId], (err, result) => {
        if (err) console.log(err)
        console.log('success')
        getQuestion();
    })
}

async function update() {
    let data = await db.getAllRoles().then(([data]) => {
        return data
    })
    let other = await db.getAllEmployees().then(([data]) => {
        return data
    })
    console.table(data)
    console.table(other)
    prompt([{
        type: 'input',
        name: 'employeeId',
        message: 'What is the id of the employee you want to update?'
    }, {
        type: 'input',
        name: 'roleId',
        message: 'what is the new role Id for this employee?'
    }
    ]).then((data) => {
        updateRole(data)
    })
}
start();