const mysql = require('mysql2');
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const {getAllEmployees, getAllDepartments, getAllRoles, addDepartment, addRole, addEmployee, updateEmployee} = require('./routes/employeeRoutes');

const welcomeMessage = "Employee Tracker"

function startProgram() {
  console.log(welcomeMessage);
  inquirer
    .prompt ([
      {
        name: "empTracker",
        type: "list",
        message: "Welcome to the Employee Tracker. What would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", 
        "Add an employee", "Update an employee role"]
      }
    ])
    .then ((answer) => {
      switch (answer.empTracker) {
        case "View all departments":
          getAllDepartments();
          startProgram();
          break;
        case "View all roles":
          getAllRoles();
          startProgram()
          break;
        case "View all employees":
          getAllEmployees();
          startProgram()
          break;
        case "Add a department":
          inquirer
            .prompt([
              {
                type: "input",
                name: "addDept",
                message: "What is the name of the department you would like to add?"
              }
          ])
          .then((answers) => {
            const deptName = answers.addDept;
            addDepartment(deptName);
            startProgram()
          })
          break;
        case "Add a role":
          const sql = `SELECT id AS value, name FROM department`
          db.query(sql, function (err, results) {
            if (err) {
              console.log(err);
            }
            inquirer
            .prompt([
              {
                type: "input",
                name: "addRoleTitle",
                message: "What is the title of the role you would like to add?"
              },
              {
                type: "input",
                name: "addRoleSalary",
                message: "What is the salary for the role?"
              },
              {
                type: "list",
                name: "addRoleDept",
                message: "Which department does the role belong to?",
                choices: results
              }
          ])
            .then((answers) => {
              const roleTitle = answers.addRoleTitle;
              const roleSalary = answers.addRoleSalary;
              const roleDept = answers.addRoleDept;
              addRole(roleTitle, roleSalary, roleDept);
              startProgram()
            })
          });
          break;
        case "Add an employee":
          db.query(`SELECT id AS value, title AS name FROM role`, function (err, roleResults) {
            if (err) {
              console.log(err);
            }
            db.query(`SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee`, function (err, managerResults) {
              if (err) {
                console.log(err);
              }
              inquirer
              .prompt([
                {
                  type: "input",
                  name: "addEmployeeFirstName",
                  message: "What is the first name of the employee you would like to add?"
                },
                {
                  type: "input",
                  name: "addEmployeeLastName",
                  message: "What is the last name of the employee you would like to add?"
                },
                {
                  type: "list",
                  name: "addEmployeeRole",
                  message: "What is role of the employee?",
                  choices: roleResults
                },
                {
                  type: "list",
                  name: "addEmployeeManager",
                  message: "Who is the employee's manager?",
                  choices: managerResults
                }
            ])
              .then((answers) => {
                const empFirstName = answers.addEmployeeFirstName;
                const empLastName = answers.addEmployeeLastName;
                const empRole = answers.addEmployeeRole;
                const empManager = answers.addEmployeeManager
                addEmployee(empFirstName, empLastName, empRole, empManager);
                startProgram()
              })
            });
          });
          break;
        case "Update an employee role":
          db.query(`SELECT id AS value, title AS name FROM role`, function (err, roleResults) {
            if (err) {
              console.log(err);
            }
            db.query(`SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee`, function (err, employeeResults) {
              if (err) {
                console.log(err);
              }
              inquirer
              .prompt([
                {
                  type: "list",
                  name: "updatedEmployee",
                  message: "Who is the employee you wish to update?",
                  choices: employeeResults
                },
                {
                  type: "list",
                  name: "addUpdatedRole",
                  message: "What is the new role of the employee? If the role is a new role in itself, please first add the role using the \"Add Role\" feature.",
                  choices: roleResults
                },
              
            ])
              .then((answers) => {
                const updatedEmp = answers.updatedEmployee;
                const newRole = answers.addUpdatedRole;
                updateEmployee(updatedEmp, newRole);
                startProgram()
              })
            });
          });
          break;
      }
  })
}





startProgram();





// figure out manager "join", and class functions for holding array etc

// Set up API routes, joining employee/dept tables etc as needed where data is shared. 
// Add manager ID to the employee table in the seed file
// Set up inquirer prompts
// Add functions within inquirer to display info

//constructor class functions? cTable? 
