  INSERT INTO department
  (id, name)
VALUES
  (1, 'Human Resources'),
  (2, 'Accounting'),
  (3, 'Sales'),
  (4, 'Administration'),
  (5, 'Warehouse'),
  (6, 'Customer Service');

INSERT INTO role
  (id, title, salary, department_id)
VALUES
  (1, 'Human Resources Lead', 60000.00, 1),
  (2, 'Accountant', 75000.00, 2),
  (3, 'Sales rep', 70000.00, 3),
  (4, 'Reception', 60000.00, 4),
  (5, 'Manager', 85000.00, 4),
  (6, 'Customer service rep', 55000.00, 6),
  (7, 'Warehouse worker', 50000.00, 5);

INSERT INTO employee
  (id, first_name, last_name, manager_id, role_id)
VALUES
  (1, 'Michael', 'Scott', NULL, 5),
  (2, 'Pam', 'Beesly', 1, 4),
  (3, 'Jim', 'Halpert', 1, 3),
  (4, 'Stanley', 'Hudson', 1, 3),
  (5, 'Phyliss', 'Lapin-Vance', 1, 3),
  (6, 'Dwight', 'Schrute', 1, 3),
  (7, 'Angela', 'Martin', 1, 2),
  (8, 'Kelly', 'Kapoor', 1, 6),
  (9, 'Kevin', 'Malone', 1, 2),
  (10, 'Oscar', 'Martinez', 1, 2),
  (11, 'Toby', 'Flenderson', NULL, 1),
  (12, 'Daryl', 'Philbin', 1, 7),
  (13, 'Madge', 'Madsen', 12, 7);




