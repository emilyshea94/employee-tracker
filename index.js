const inquirer= require("inquirer")
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'sage123',
      database: 'employee_db'
    },
    console.log(`Connected to the employee.db database.`)
  );
  
  const sql = ` INTO employee.db (employee_db)
    VALUES (?)`;
  const params = [department.employee_db];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
