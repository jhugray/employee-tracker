const { start } = require('repl');
const db = require('../db/connection');

const getAllEmployees = () => {
  const sql = `SELECT
                  employee.id,
                  employee.first_name,
                  employee.last_name,
                  role.title AS role_title,
                  department.name AS department,
                  role.salary AS salary,
                  CONCAT(manager.first_name, " ", manager.last_name) as manager_name
                  FROM employee employee
                  LEFT JOIN employee manager
                  ON employee.manager_id = manager.id
                  LEFT JOIN role
                  ON employee.role_id = role.id
                  LEFT JOIN department
                  ON role.department_id = department.id`

  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("The employees are:"); 
    console.table(results);
  });
};

const getAllDepartments = () => {
  const sql = `SELECT * FROM department`
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("The departments are:");
    console.table(results);
  });
};

const getAllRoles = () => {
  const sql = `SELECT role.*, department.name
                AS department_name
                FROM role
                LEFT JOIN department
                ON role.department_id = department.id`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } 
    console.log("The roles are:"); 
    console.table(results);
  });
};

const addDepartment = (deptName) => {
  const sql = `INSERT INTO department (name) VALUES (?)`;
  const params = [deptName];
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("Department added");
  });
};

const addRole = (roleTitle, roleSalary, roleDeptId) => {
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
  const params = [roleTitle, roleSalary, roleDeptId];
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("Role added!");
  });
};

const addEmployee = (empFirstName, empLastName, empRole, empManager) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
  const params = [empFirstName, empLastName, empRole, empManager];
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("Employee added!");
  });
  };

const updateEmployeeRole = (updatedEmpR, newRole) => {
  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
  const params = [newRole, updatedEmpR]
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("Employee Updated!");
  });
}

const updateEmployeeManager = (updatedEmpM, newManager) => {
  const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`
  const params = [newManager, updatedEmpM]
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log ("Manager updated!");
  });
}

const getEmpByManager = (managerID) => {
  const sql = `SELECT 
                CONCAT(employee.first_name, " ", employee.last_name) AS name,
                CONCAT(manager.first_name, " ", manager.last_name) as ManagerName
                FROM employee employee
                JOIN employee manager
                ON employee.manager_id = manager.id  
                WHERE manager.id = ?`
  const params = [managerID]
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("The employees by manager are:"); 
    console.table(results);
  });
}

const getEmpByDepartment = (departmentID) => {
  const sql = `SELECT 
                CONCAT(employee.first_name, " ", employee.last_name) AS name,
                department.name AS department
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                WHERE department.id = ?`
  const params = [departmentID]
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("The employees by department are:"); 
    console.table(results);
  });
}

const deleteEmployee = (deleteEmp) => {
  const sql = `DELETE FROM employee WHERE id = ?`
  const params = deleteEmp
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("This employee is a manager. They cannot be deleted until you update the employees who report to them, to have a different manager.");
    }
    console.log("Employee deleted!")
  });
}

const deleteRole = (roleToDel) => {
  const sql = `DELETE FROM role WHERE id = ?`
  const params = roleToDel
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("Role deleted!")
  });
}

const deleteDepartment = (deptToDel) => {
  const sql = `DELETE FROM department WHERE id = ?`
  const params = deptToDel
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("Department Deleted!")
  });
}

const deptBudgetUsed = (deptBudg) => {
  const sql = `SELECT department.name AS department,
                SUM(salary) AS utilized_budget
                FROM employee
                LEFT JOIN role
                ON employee.role_id = role.id
                LEFT JOIN department 
                ON role.department_id = department.id
                WHERE department.id = ?`
  const params = deptBudg
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("The utilized budget is:")
    console.table(results);
  });
}



module.exports = {
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
  deptBudgetUsed
}