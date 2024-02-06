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
  );

  db.connect(function(err) {
    if(err) {
        throw(err)
    }
    console.log(`Connected to the employee.db database.`)
  })


  inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    console.log(answers)
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });



  const sqlQuery = "SELECT * FROM role;"
  db.query(sqlQuery, function(err, result){
    if(err)console.log(err)
    console.log(result)
  })

//   const sql = ` INTO employee.db (employee_db)
//     VALUES (?)`;
//   const params = [department.employee_db];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
