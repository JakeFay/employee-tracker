const { prompt } = require('inquirer');
require('console.table');
const db = require('./db');
const inquirer = require('inquirer');
const connection = require('./db/connection');



function start() {
    getQuestion();
};

function getQuestion() {
    prompt([{
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Quit']
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
                inquirer.prompt([{
                    type: 'input',
                    name: 'name',
                    message: 'Type the name of the department you would like to add',
                }])
                .then((data)=> {
                    console.log(data)
                    addDepartment(data);
                })
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
    .then(() => getQuestion());
};

start();