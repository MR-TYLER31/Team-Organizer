## Team Organizer CLI with MYSQL

# Description

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as Content Management Systems. Architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

## Instructions

Create a database called 'employee_trackerDB' and create 3 tables as listed below.

```
Create table called
department:


id - INT PRIMARY KEY

name - VARCHAR(30) to hold department name


Create table called
role:


id - INT PRIMARY KEY

title -  VARCHAR(30) to hold role title

salary -  DECIMAL to hold role salary

department_id -  INT to hold reference to department role belongs to


Create table called
employee:


id - INT PRIMARY KEY

first_name - VARCHAR(30) to hold employee first name

last_name - VARCHAR(30) to hold employee last name

role_id - INT to hold reference to role employee has

manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
```

## Functionality

```
Build a command-line application that at a minimum allows the user to:


Add departments, roles, employees


View departments, roles, employees


Update employee roles
```
