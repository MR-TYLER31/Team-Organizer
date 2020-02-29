  
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department(
id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30)
);


CREATE TABLE employee(
id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	role_id INT(4) NOT NULL,
    manager_id INT(4)
);


CREATE TABLE role(
id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(30),
    salary DECIMAL,
    department_id INT(4) NOT NULL
);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;

-- CREATE TABLE department(
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- 	name VARCHAR(30),
-- 	PRIMARY KEY(id)
-- );


-- CREATE TABLE employee(
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- 	first_name VARCHAR(30),
-- 	last_name VARCHAR(30),
-- 	role_id INT NOT NULL,
-- 	INDEX `index_role`(role_id),
--     CONSTRAINT `fk_employee_role`
--     FOREIGN KEY (role_id)
--     REFERENCES role(id),
-- 	manager_id INT,
--     INDEX `idx_role` (role_id),
--     CONSTRAINT `fk_manager_role`
--     FOREIGN KEY (role_id)
--     REFERENCES role(id)
-- );


-- CREATE TABLE role(
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- 	title VARCHAR(30),
--     salary DECIMAL,
--     department_id INT NOT NULL,
--     INDEX `idx_dept`(department_id),
--     CONSTRAINT `fk_role_department`
--     FOREIGN KEY (department_id)
--     REFERENCES department(id)
-- );


-- SELECT * FROM employee;
-- SELECT * FROM role;
-- SELECT * FROM department;
