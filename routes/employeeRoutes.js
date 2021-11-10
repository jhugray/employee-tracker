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
  // db.query(sql2, function (err, results) {
  //   if (err) {
  //     console.log(err);
  //   } 
  //   console.table(results);
  // });

  // console.table(results);
};

const getAllDepartments = () => {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
    }
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

const addRole = (roleTitle, roleSalary, roleDept) => {
  const sql = `INSERT INTO role (title, salary, department_name) VALUES (?, ?, ?)`;
  const params = [roleTitle, roleSalary, roleDept];
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log(err);
    }
    getAllRoles();
  });
};

// const addEmployee = (employee_id, first_name, last_name, manager_id, role_id)

module.exports = {
  getAllEmployees, 
  getAllDepartments,
  getAllRoles,
  addDepartment,
  addRole
}





