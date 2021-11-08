const db = require('../db/connection');

const getAllEmployees = () => {
  db.query(`SELECT * FROM employee`, function (err, results) {
    if (err) {
      console.log(err);
    } 
    console.table(results);
  });
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



module.exports = {
  getAllEmployees, 
  getAllDepartments,
  getAllRoles,
}