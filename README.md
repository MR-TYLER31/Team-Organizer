## Team Organizer CLI with MYSQL

<img class="img-fluid py-2" src="public/assets/images/screenshot.PNG" alt="screen shot" width="400" height="400">

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

# User Story

AS A user, I want to be able to write and save notes
I WANT to be able to delete notes I've written before
SO THAT I can organize my thoughts and keep track of tasks I need to complete

# Business Context

For users that need to keep track of a lot of information, it's easy to forget or be unable to recall something important. Being able to take persistent notes allows users to have written information available when needed.

# Acceptance Criteria

Application should allow users to create and save notes.
Application should allow users to view previously saved notes.
Application should allow users to delete previously saved notes.
