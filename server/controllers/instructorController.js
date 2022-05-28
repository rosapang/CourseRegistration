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



// View Instructor
exports.view = (req, res) => {
    //connect to db
    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection
      connection.query('SELECT * FROM Instructors', (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('instructor', { rows });
        } else {
          console.log(err);
        }
        console.log('Successfully for reading data! \n');
      });
    });
}

//search instructor
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;
    
        // User the connection
        connection.query('SELECT * FROM Instructors WHERE instructor_id LIKE ?', ['%'+searchTerm + '%'], (err, rows) => {
          // if the connection is successfully, then release it
          connection.release();
          if (!err) {
            res.render('instructor', { rows });
          } else {
            console.log(err);
          }
          console.log('Successfully for searching_instructor! \n');
        });
      });


}

//set add form
exports.form = (req, res) => {
  //res.render('add_instructor');
    //connect to db
    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection
      connection.query('SELECT * FROM Departments', (err, foo) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('add_instructor', { foo });
        } else {
          console.log(err);
        }
        console.log('Successfully for reading data! \n');
      });
    });


}


//add new instructor
exports.create = (req, res) => {
  const{instructor_name, department_id}=req.body;
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);

      // User the connection
      connection.query('INSERT INTO Instructors SET instructor_name = ?, department_id = ?',[instructor_name, department_id], (err, foo) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('add_instructor',{foo},{alert:'Instructor added successfully!'});
        } else {
          console.log(err);
        }
        console.log('Successfully for add_instructor! \n');
      });
    });


}


//updade instructor
exports.edit = (req, res) => {
  //connect to db
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection

      connection.query('SELECT * FROM Instructors WHERE instructor_id = ?',[req.params.instructor_id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('edit_instructor', { rows });
        } else {
          console.log(err);
        }
        console.log('Successfully for edit data! \n');
      });
    });

}

exports.update = (req, res) => {
  const{instructor_name, department_id}=req.body;
  //connect to db
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection

      connection.query('UPDATE Instructors SET instructor_name = ?, department_id = ? WHERE instructor_id = ?',[instructor_name, department_id, req.params.instructor_id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
              //connect to db
           pool.getConnection((err, connection) => {
           if (err) throw err; // not connected!
           console.log('Connected as ID ' + connection.threadId);
              // User the connection

              connection.query('SELECT * FROM Instructors WHERE instructor_id = ?',[req.params.instructor_id], (err, rows) => {
              // if the connection is successfully, then release it
               connection.release();
              if (!err) {
                  res.render('edit_instructor', { rows, alert:`${instructor_name} has been update!` });
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

      connection.query('DELETE FROM Instructors WHERE instructor_id = ?',[req.params.instructor_id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.redirect('/instructor')
        } else {
          console.log(err);
        }
        console.log('Successfully for delete data! \n');
      });
    });

}