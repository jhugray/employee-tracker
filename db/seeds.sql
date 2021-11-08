INSERT INTO department
  (name, id)
VALUES
  ('Human Resources', 1),
  ('Accounting', 2),
  ('Sales', 3),
  ('Administration', 4),
  ('Warehouse', 5),
  ('Customer Service', 6);

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
  (first_name, last_name, role_id)
VALUES
  ('Michael', 'Scott', 5),
  ('Pam', 'Beesly', 4),
  ('Jim', 'Halpert', 3),
  ('Stanley', 'Hudson', 3),
  ('Phyliss', 'Lapin-Vance', 3),
  ('Dwight', 'Schrute', 3),
  ('Angela', 'Martin', 2),
  ('Kelly', 'Kapoor', 6),
  ('Kevin', 'Malone', 2),
  ('Oscar', 'Martinez', 2),
  ('Toby', 'Flenderson', 1),
  ('Daryl', 'Philbin', 7),
  ('Madge', 'Madsen', 7);

