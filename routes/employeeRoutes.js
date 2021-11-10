const db = require('../db/connection');

const getAllEmployees = () => {
 
  const sql = `SELECT
                  employee.id,
                  employee.first_name,
                  employee.last_name,
                  role.title AS role_title,
                  employee.manager_id,
                  CONCAT(manager.first_name, " ", manager.last_name) as ManagerName
                  FROM employee employee
                  JOIN employee manager
                  ON employee.manager_id = manager.id
                  LEFT JOIN role
                  ON employee.role_id = role.id`

  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(); 
    console.table(results);
  });
};

const getAllDepartments = () => {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log();
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
    getAllDepartments();
  });
};

const addRole = (roleTitle, roleSalary, roleDeptId) => {
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
  const params = [roleTitle, roleSalary, roleDeptId];
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
  });
};

const addEmployee = (empFirstName, empLastName, empRole, empManager) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
  const params = [empFirstName, empLastName, empRole, empManager];
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
  });
  };

const updateEmployee = (updatedEmp, newRole) => {
  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
  const params = [newRole, updatedEmp]
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
  });
}


module.exports = {
  getAllEmployees, 
  getAllDepartments,
  getAllRoles,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee
}





