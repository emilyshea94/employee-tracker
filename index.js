const inquirer = require("inquirer");
const mysql = require("mysql2");

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sage123",
  database: "employee_db",
});

// Function to display main menu
function mainMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.choice) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          console.log("Goodbye!");
          connection.end();
          break;
      }
    });
}

// Function to view all departments
function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}

// Function to view all roles
function viewRoles() {
  connection.query(
    `SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      mainMenu();
    }
  );
}

// Function to view all employees
function viewEmployees() {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      mainMenu();
    }
  );
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter the name of the department:",
    })
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        { name: answer.name },
        function (err) {
          if (err) throw err;
          console.log("Department added successfully!");
          mainMenu();
        }
      );
    });
}

// Function to add a role
function addRole() {
  connection.query("SELECT * FROM department", function (err, departments) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the role:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary for the role:",
        },
        {
          type: "list",
          name: "department",
          message: "Select the department for the role:",
          choices: departments.map((department) => department.name),
        },
      ])
      .then((answers) => {
        const department = departments.find(
          (dept) => dept.name === answers.department
        );
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answers.title,
            salary: answers.salary,
            department_id: department.id,
          },
          function (err) {
            if (err) throw err;
            console.log("Role added successfully!");
            mainMenu();
          }
        );
      });
  });
}

// Function to add an employee
function addEmployee() {
  connection.query("SELECT * FROM role", function (err, roles) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter the first name of the employee:",
        },
        {
          type: "input",
          name: "last_name",
          message: "Enter the last name of the employee:",
        },
        {
          type: "list",
          name: "role",
          message: "Select the role for the employee:",
          choices: roles.map((role) => role.title),
        },
      ])
      .then((answers) => {
        const role = roles.find((r) => r.title === answers.role);
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: role.id,
          },
          function (err) {
            if (err) throw err;
            console.log("Employee added successfully!");
            mainMenu();
          }
        );
      });
  });
}

// Function to update an employee role
function updateEmployeeRole() {
  connection.query("SELECT * FROM employee", function (err, employees) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Select the employee to update:",
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
        {
          type: "input",
          name: "newRole",
          message: "Enter the new role ID for the employee:",
        },
      ])
      .then((answers) => {
        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            { role_id: answers.newRole },
            { id: answers.employee },
          ],
          function (err) {
            if (err) throw err;
            console.log("Employee role updated successfully!");
            mainMenu();
          }
        );
      });
  });
}

// Start the application
connection.connect(function (err) {
  if (err) throw err;
  console.log(`Connected as id ${connection.threadId}`);
  mainMenu();
});