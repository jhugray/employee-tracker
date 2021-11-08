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




module.exports = {
  getAllEmployees, 
  getAllDepartments
}