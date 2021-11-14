const mysql = require("mysql2");
const db = require("./db/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require('figlet');

const {
  getAllEmployees,
  getAllDepartments,
  getAllRoles,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  getEmpByManager,
  getEmpByDepartment,
  deleteEmployee,
  deleteRole,
  deleteDepartment,
  deptBudgetUsed } = require("./routes/employeeRoutes");


figlet("Employee Tracker", {
  font: 'ANSI shadow',
  width: 80
}, function(err, data) {
  if (err) {
      console.log("Error with the ascii welcome message");
      console.dir(err);
      return;
  }
  console.log(data);
  startProgram();
});

function startProgram() {
  inquirer
    .prompt([
      {
        name: "empTracker",
        type: "list",
        message: "Welcome to the Employee Tracker. What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Update an employee's manager",
          "View employees by manager",
          "View employees by department",
          "Delete an employee",
          "Delete a role",
          "Delete a department",
          "View the utilized department budgets"
        ],
      },
    ])
    .then((answer) => {
      switch (answer.empTracker) {
        case "View all departments":
          getAllDepartments();
          startProgram();
          break;
        case "View all roles":
          getAllRoles();
          startProgram();
          break;
        case "View all employees":
          getAllEmployees();
          startProgram();
          break;
        case "Add a department":
          inquirer
            .prompt([
              {
                type: "input",
                name: "addDept",
                message:
                  "What is the name of the department you would like to add?",
              },
            ])
            .then((answers) => {
              const deptName = answers.addDept;
              addDepartment(deptName);
              startProgram();
            });
          break;
        case "Add a role":
          const roleSql = `SELECT id AS value, name FROM department`;
          db.query(roleSql, function (err, results) {
            if (err) {
              console.log(err);
            }
            inquirer
              .prompt([
                {
                  type: "input",
                  name: "addRoleTitle",
                  message:
                    "What is the title of the role you would like to add?",
                },
                {
                  type: "input",
                  name: "addRoleSalary",
                  message: "What is the salary for the role?",
                },
                {
                  type: "list",
                  name: "addRoleDept",
                  message: "Which department does the role belong to?",
                  choices: results,
                },
              ])
              .then((answers) => {
                const roleTitle = answers.addRoleTitle;
                const roleSalary = answers.addRoleSalary;
                const roleDept = answers.addRoleDept;
                addRole(roleTitle, roleSalary, roleDept);
                startProgram();
              });
          });
          break;
        case "Add an employee":
          const addEmpSQL = `SELECT id AS value, title AS name FROM role`
          db.query(addEmpSQL, function (err, roleResults) {
              if (err) {
                console.log(err);
              }
              const addEmpNameSQL = `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee`
              db.query(addEmpNameSQL, function (err, managerResults) {
                  if (err) {
                    console.log(err);
                  }
                  inquirer
                    .prompt([
                      {
                        type: "input",
                        name: "addEmployeeFirstName",
                        message:
                          "What is the first name of the employee you would like to add?",
                      },
                      {
                        type: "input",
                        name: "addEmployeeLastName",
                        message:
                          "What is the last name of the employee you would like to add?",
                      },
                      {
                        type: "list",
                        name: "addEmployeeRole",
                        message: "What is role of the employee?",
                        choices: roleResults,
                      },
                      {
                        type: "list",
                        name: "addEmployeeManager",
                        message: "Who is the employee's manager?",
                        choices: managerResults,
                      },
                    ])
                    .then((answers) => {
                      const empFirstName = answers.addEmployeeFirstName;
                      const empLastName = answers.addEmployeeLastName;
                      const empRole = answers.addEmployeeRole;
                      const empManager = answers.addEmployeeManager;
                      addEmployee(
                        empFirstName,
                        empLastName,
                        empRole,
                        empManager
                      );
                      startProgram();
                    });
                }
              );
            }
          );
          break;
        case "Update an employee role":
          const updateEmpRoleSQL = `SELECT id AS value, title AS name FROM role`
          db.query(updateEmpRoleSQL, function (err, roleResults) {
              if (err) {
                console.log(err);
              }
              const updateEmpRoleNameSQL = `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee`
              db.query(updateEmpRoleNameSQL, function (err, employeeResults) {
                  if (err) {
                    console.log(err);
                  }
                  inquirer
                    .prompt([
                      {
                        type: "list",
                        name: "updatedEmployee",
                        message: "Who is the employee you wish to update?",
                        choices: employeeResults,
                      },
                      {
                        type: "list",
                        name: "addUpdatedRole",
                        message:
                          'What is the new role of the employee? If the role is a new role in itself, please first add the role using the "Add Role" feature.',
                        choices: roleResults,
                      },
                    ])
                    .then((answers) => {
                      const updatedEmpR = answers.updatedEmployee;
                      const newRole = answers.addUpdatedRole;
                      updateEmployeeRole(updatedEmpR, newRole);
                      startProgram();
                    });
                }
              );
            }
          );
          break;
        case "Update an employee's manager":
          const managerNameUpdateEmpSQL = `SELECT manager_id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee`
          db.query(managerNameUpdateEmpSQL, function (err, managerResults) {
              if (err) {
                console.log(err);
              }
              const empNameUpdateEmpSQL = `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee`
              db.query(empNameUpdateEmpSQL, function (err, employeeResults) {
                  if (err) {
                    console.log(err);
                  }
                  inquirer
                    .prompt([
                      {
                        type: "list",
                        name: "updatedEmployee",
                        message: "Who is the employee you wish to update?",
                        choices: employeeResults,
                      },
                      {
                        type: "list",
                        name: "addUpdatedManager",
                        message: "Who is the employee's new manager?",
                        choices: managerResults,
                      },
                    ])
                    .then((answers) => {
                      const updatedEmpM = answers.updatedEmployee;
                      const newManager = answers.addUpdatedManager;
                      updateEmployeeManager(updatedEmpM, newManager);
                      startProgram();
                    });
                }
              );
            }
          );
          break;
        case "View employees by manager":
          const empByManSql = `SELECT DISTINCT manager.id AS value, 
                        CONCAT(manager.first_name, " ", manager.last_name) AS name 
                        FROM employee employee
                        JOIN employee manager
                        ON employee.manager_id = manager.id`;
          db.query(empByManSql, function (err, managerResults) {
            if (err) {
              console.log(err);
            }
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "viewByManager",
                  message:
                    "Please select the manager whose employees you wish to view.",
                  choices: managerResults,
                },
              ])
              .then((answers) => {
                const managerID = answers.viewByManager;
                getEmpByManager(managerID);
                startProgram();
              });
          });
          break;
        case "View employees by department":
          const empByDeptSql = `SELECT id AS value, name AS name FROM department`;
          db.query(empByDeptSql, function (err, departmentResults) {
            if (err) {
              console.log(err);
            }
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "viewByDepartment",
                  message:
                    "Please select the department whose employees you wish to view.",
                  choices: departmentResults,
                },
              ])
              .then((answers) => {
                const departmentID = answers.viewByDepartment;
                getEmpByDepartment(departmentID);
                startProgram();
              });
          });
          break;
        case "Delete an employee":
          const empSql = `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee`
          db.query(empSql, function (err, empSql) {
            if (err) {
              console.log(err);
            }
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "deleteEmployee",
                  message:
                    "Please select the employee you wish to delete.",
                  choices: empSql,
                },
              ])
              .then((answers) => {
                const deleteEmp = answers.deleteEmployee;
                deleteEmployee(deleteEmp);
                startProgram();
              });
          });
          break;
        case "Delete a role":
          const delRoleSql = `SELECT id AS value, title AS name FROM role`
          db.query(delRoleSql, function (err, delRoleSql) {
            if (err) {
              console.log(err);
            }
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "deleteRole",
                  message:
                    "Please select the role you wish to delete.",
                  choices: delRoleSql,
                },
              ])
              .then((answers) => {
                const roleToDel = answers.deleteRole;
                deleteRole(roleToDel);
                startProgram();
              });
          });
          break;
          case "Delete a department":
            const delDeptSql = `SELECT id AS value, name AS name FROM department`
            db.query(delDeptSql, function (err, delDeptSql) {
              if (err) {
                console.log(err);
              }
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "deleteDept",
                    message:
                      "Please select the role you wish to delete.",
                    choices: delDeptSql,
                  },
                ])
                .then((answers) => {
                  const deptToDel = answers.deleteDept;
                  deleteDepartment(deptToDel);
                  startProgram();
                });
            });
            break;
          case "View the utilized department budgets":
            const budgetSql = `SELECT id AS value, name AS name FROM department`
            db.query(budgetSql, function (err, budgetSql) {
              if (err) {
                console.log(err);
              }
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "deptBudget",
                    message:
                      "Which department's utilized budget to you wish to view?",
                    choices: budgetSql,
                  },
                ])
                .then((answers) => {
                  const deptBudg = answers.deptBudget;
                  deptBudgetUsed(deptBudg);
                  startProgram();
                });
            });
      }
    });
}

// startProgram();


