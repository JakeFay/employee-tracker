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

            case 'update employee':

                update()


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
        .then(() => getQuestion());
};

function updateRole(data) {
    connection.query('update employee.role_id set role_id = ? WHERE id = ?', [data.roleId, data.employeeId], (err, result) => {
        if (err) console.log(err)
        console.log(result)
    })
}
async function update(){
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
 },{
     type: 'input',
     name: 'roleId',
     message: 'what is the new role Id for this employee?'
 }
 ]).then((data)=> {
 updateRole(data)
 })
 }
start();