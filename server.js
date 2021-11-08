const mysql = require('mysql2');
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const {getAllEmployees, getAllDepartments, getAllRoles, addDepartment} = require('./routes/employeeRoutes');

const welcomeMessage = "Employee Tracker"

function startProgram() {
  console.log(welcomeMessage);
  return inquirer
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
          return inquirer
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
        case "Add a role":
          addRole();
          startProgram()
          break;
        case "Add an employee":
          addEmployee();
          startProgram()
          break;
        case "Update an employee role":
          updateEmployeeRole();
          startProgram()
          break;
      }
  })
}





startProgram();







// Set up API routes, joining employee/dept tables etc as needed where data is shared. 
// Add manager ID to the employee table in the seed file
// Set up inquirer prompts
// Add functions within inquirer to display info

//constructor class functions? cTable? 
