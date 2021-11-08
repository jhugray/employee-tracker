const mysql = require('mysql2');
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const {getAllEmployees, getAllDepartments} = require('./routes/employeeRoutes');



function startProgram() {
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
        case "View all employees":
          getAllEmployees();
          startProgram()
          break;
        //  db.query(`SELECT * FROM employee`, (err, row) => {
        //   if (err) {
        //     console.log(err);
        //   }
        //   console.log(row);
        // }); 
      }
  })
}





startProgram();







// Set up API routes, joining employee/dept tables etc as needed where data is shared. 
// Add manager ID to the employee table in the seed file
// Set up inquirer prompts
// Add functions within inquirer to display info

//constructor class functions? cTable? 
