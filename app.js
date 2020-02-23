var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");
let state = {
  employees: []
};

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.MYSQL_PASSWORD,
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by Departments",
        "View All Employees by Roles",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employees Role",
        "Remove Employee",
        "Remove Department",
        "Remove Role",
        "Exit Program"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Employees by Departments":
          employeeByDept();
          break;

        case "View All Employees by Roles":
          employeeByRole();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDept();
          break;

        case "Update Employees Role":
          updateEmployeeRole();
          break;

        case "Remove Employee":
          deleteEmployee();
          break;

        case "Remove Department":
          removeDepartment();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "Exit Program":
          connection.end();
          break;
      }
    });
}

// View all employees and details with a promise
function viewEmployeesPromise() {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT  first_name, last_name, title, salary, name FROM employee JOIN role ON employee.role_id = role.id Join department On role.department_id = department.id ";
    connection.query(query, function(err, data) {
      if (err) {
        reject(err);
      }

      console.table(data);
      resolve(data);
    });
  });
}

// View all employees and details
function viewEmployees(cb) {
  let query =
    "SELECT  first_name, last_name, title, salary, name FROM employee JOIN role ON employee.role_id = role.id Join department On role.department_id = department.id ";
  connection.query(query, function(err, data) {
    console.table(data);
    start();
  });
}

// Function to view all employees by the department they work in
function employeeByDept() {
  connection.query("SELECT * FROM department", function(err, data) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "View employees by department",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < data.length; i++) {
            choiceArray.push(data[i].name);
          }
          return choiceArray;
        }
      })
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < data.length; i++) {
          if (data[i].name === answer.action) {
            chosenItem = data[i];
          }
        }
        var query =
          "SELECT  first_name, last_name, title, name, salary, manager_id FROM employee JOIN role ON employee.role_id = role.id Join department On role.department_id = department.id WHERE ?";
        connection.query(query, { name: answer.action }, function(err, res) {
          console.table(res);
          start();
        });
      });
  });
}

// Function to view all employees by their role
function employeeByRole() {
  connection.query("SELECT * FROM role", function(err, data) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "View employees by role",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < data.length; i++) {
            choiceArray.push(data[i].title);
          }
          return choiceArray;
        }
      })
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < data.length; i++) {
          if (data[i].name === answer.action) {
            chosenItem = data[i];
          }
        }
        var query =
          "SELECT first_name, last_name, title, name, salary, manager_id FROM employee JOIN role ON employee.role_id = role.id Join department On role.department_id = department.id WHERE ?";
        connection.query(query, { title: answer.action }, function(err, res) {
          console.table(res);
          start();
        });
      });
  });
}

function addEmployee() {
  connection.query("SELECT * FROM role", function(err, data) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the employees first name?"
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employees last name?"
        },
        {
          name: "action",
          type: "rawlist",
          message: "What is the employees role",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < data.length; i++) {
              choiceArray.push({
                name: data[i].title,
                value: data[i].id
              });
            }
            return choiceArray;
          }
        }
      ])
      .then(function(answer) {
        var query =
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?, 0);";
        connection.query(
          query,
          [answer.firstName, answer.lastName, answer.action],
          function(err, res) {
            console.log(err);
            console.log("Employee added");
          }
        );

        // // The callback way
        // let mySuperAwesomeCallbackFunction = function() {
        //   start();
        // };

        // viewEmployees(mySuperAwesomeCallbackFunction);

        let mySuperAwesomePromise = viewEmployeesPromise();

        mySuperAwesomePromise
          .then(() => start())
          .catch(err => console.log(err));
      });
  });
}

function addRole() {
  connection.query("SELECT * FROM department", function(err, data) {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Add a job title"
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary? [example: 60000]"
        },
        {
          name: "department",
          type: "rawlist",
          message: "What department?",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < data.length; i++) {
              choiceArray.push({
                name: data[i].name,
                value: data[i].id
              });
            }
            return choiceArray;
          }
        }
      ])
      .then(function(answer) {
        var query =
          "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);";
        connection.query(
          query,
          [answer.title, answer.salary, answer.department],
          function(err, res) {
            if (err) throw err;
            console.log("Role added");
          }
        );

        let mySuperAwesomePromise = viewEmployeesPromise();

        mySuperAwesomePromise
          .then(() => start())
          .catch(err => console.log(err));
      });
  });
}

function addDept() {
  connection.query("SELECT * FROM department", function(err, data) {
    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "Add a department name"
        }
      ])
      .then(function(answer) {
        var query = "INSERT INTO department (name) VALUES (?);";
        connection.query(query, [answer.department], function(err, res) {
          if (err) throw err;
          console.log("Department added!");
        });
        let mySuperAwesomePromise = viewEmployeesPromise();

        mySuperAwesomePromise
          .then(() => start())
          .catch(err => console.log(err));
      });
  });
}

function viewRoles() {
  let query = "SELECT title FROM role";
  connection.query(query, function(err, data) {
    console.table(data);
    start();
  });
}

function viewDepartments() {
  let query = "SELECT name FROM department";
  connection.query(query, function(err, data) {
    console.table(data);
    start();
  });
}

function updateEmployeeRole() {
  // collect all available job roles for inquirer below
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    const roles = res.map(object => {
      return {
        name: `${object.title}`,
        value: object.id
      };
    });
    // collect all available employees for inquirer below
    connection.query("SELECT * FROM employee", (err, res) => {
      if (err) throw err;
      const employees = res.map(object => {
        return {
          name: `${object.first_name} ${object.last_name}`,
          value: object.id
        };
      });
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Whos role would you like to change?",
            choices: employees
          },
          {
            name: "newRole",
            type: "list",
            message: "What is the employee's new role?",
            choices: roles
          }
        ])
        .then(function(answer) {
          // when finished prompting, insert a new item into the db with that info
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: answer.newRole
              },
              {
                id: answer.employee
              }
            ],
            function(err) {
              if (err) throw err;
            },
            start()
          );
        });
    });
  });
}

function deleteEmployee() {
  connection.query("SELECT * FROM employee", function(err, data) {
    state.employees = data;
    inquirer
      .prompt({
        name: "employee",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];

          for (var i = 0; i < data.length; i++) {
            var name = `${data[i].first_name} ${data[i].last_name}`;

            choiceArray.push({
              name: `${name}`
            });
          }
          return choiceArray;
        }
      })
      .then(function(answer) {
        var query = "DELETE FROM employee WHERE id = ?";
        var empFirstLast = answer.employee.split(" ");
        var employee = state.employees.filter(
          employee =>
            employee.first_name === empFirstLast[0] &&
            employee.last_name === empFirstLast[1]
        );
        let employeeId = employee[0].id;
        connection.query(query, [employeeId], function(err, res) {
          if (err) throw err;
        });
        console.log("Employee Removed!");
        let mySuperAwesomePromise = viewEmployeesPromise();

        mySuperAwesomePromise
          .then(() => start())
          .catch(err => console.log(err));
      });
  });
}

function removeDepartment() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    const departments = res.map(object => {
      return {
        name: object.name,
        value: object.id
      };
    });
    inquirer
      .prompt([
        {
          name: "department",
          type: "list",
          message: "Which department would you like to remove?",
          choices: departments
        }
      ])
      .then(function(answer) {
        connection.query(
          "DELETE FROM department WHERE ?",
          [
            {
              id: answer.department
            },
            {
              name: answer.department
            }
          ],
          function(err) {
            if (err) throw err;
          },
          start()
        );
      });
  });
}

function removeRole() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    const roles = res.map(object => {
      return {
        name: object.title,
        value: object.id
      };
    });
    inquirer
      .prompt([
        {
          name: "role",
          type: "list",
          message: "Which role would you like to remove?",
          choices: roles
        }
      ])
      .then(function(answer) {
        connection.query(
          "DELETE FROM role WHERE ?",
          [
            {
              id: answer.role
            },
            {
              title: answer.role
            }
          ],
          function(err) {
            if (err) throw err;
          },
          start()
        );
      });
  });
}
