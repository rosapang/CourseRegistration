// Reference : https://github.com/RaddyTheBrand/Nodejs-UserManagement-Express-Hbs-MySQL
// Author : Group 20
// Project name: Course Registration Management
// Description: This website uses to manage the course registration, 
//              and the code that we reference to set our website list above.

//set to connect db
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit :  10,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});



// View department
exports.view = (req, res) => {
    //connect to db
    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection
      connection.query('SELECT * FROM Departments', (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('department', { rows });
        } else {
          console.log(err);
        }
        console.log('Successfully for reading data! \n');
      });
    });
}


//search the department ID
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;
    
        // User the connection
        connection.query('SELECT * FROM Departments WHERE department_id LIKE ?', ['%'+searchTerm + '%'], (err, rows) => {
          // if the connection is successfully, then release it
          connection.release();
          if (!err) {
            res.render('department', { rows });
          } else {
            console.log(err);
          }
          console.log('Successfully for searching_department! \n');
        });
      });


}

exports.form = (req, res) => {
    res.render('add_department');
}

//add new department
exports.create = (req, res) => {
    const{department_name}=req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        // User the connection
        connection.query('INSERT INTO Departments SET department_name = ?',[department_name], (err, rows) => {
          // if the connection is successfully, then release it
          connection.release();
          if (!err) {
            res.render('add_department',{alert:'Department added successfully!'});
          } else {
            console.log(err);
          }
          console.log('Successfully for add_department! \n');
        });
      });


}

//updade department
exports.edit = (req, res) => {
    //connect to db
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        // User the connection

        connection.query('SELECT * FROM Departments WHERE department_id = ?',[req.params.department_id], (err, rows) => {
          // if the connection is successfully, then release it
          connection.release();
          if (!err) {
            res.render('edit_department', { rows });
          } else {
            console.log(err);
          }
          console.log('Successfully for edit data! \n');
        });
      });

}

exports.update = (req, res) => {
    const{department_name}=req.body;
    //connect to db
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        // User the connection

        connection.query('UPDATE Departments SET department_name = ? WHERE department_id = ?',[department_name, req.params.department_id], (err, rows) => {
          // if the connection is successfully, then release it
          connection.release();
          if (!err) {
                //connect to db
             pool.getConnection((err, connection) => {
             if (err) throw err; // not connected!
             console.log('Connected as ID ' + connection.threadId);
                // User the connection

                connection.query('SELECT * FROM Departments WHERE department_id = ?',[req.params.department_id], (err, rows) => {
                // if the connection is successfully, then release it
                 connection.release();
                if (!err) {
                    res.render('edit_department', { rows, alert:`${department_name} has been update!` });
                } else {
                    console.log(err);
                }
                console.log('Successfully for edit data! \n');
                });
            });

          } else {
            console.log(err);
          }
          console.log('Successfully for edit data! \n');
        });
      });

}
//delete
exports.delete = (req, res) => {
  //connect to db
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection

      connection.query('DELETE FROM Departments WHERE department_id = ?',[req.params.department_id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.redirect('/department')
        } else {
          console.log(err);
        }
        console.log('Successfully for delete data! \n');
      });
    });

}
