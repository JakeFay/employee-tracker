INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');


INSERT INTO role (title, salary, department_id)
VALUES
('Sales Manager', 100000, 1),
('Sales Person', 80000, 1),
('Senior Dev', 175000, 2),
('Jr Dev', 125000, 2),
('Finance Manger', 100000, 3),
('Underwriter', 75000, 3),
('Lawyer', 200000, 4),
('Legal Assistant', 85000, 4)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Jack', 'Jackson', 3,NULL),
    ('June', 'July', 4, 3),
    ('Jerry', 'Rice', 7,NULL),
    ('Janet', 'Early', 6, NULL)

;

