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



// View Course
exports.view = (req, res) => {
    //connect to db
    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection
      connection.query('SELECT * FROM Courses', (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('course', { rows });
        } else {
          console.log(err);
        }
        console.log('Successfully for reading data! \n');
      });
    });
}

//search course
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;
    
        // User the connection
        connection.query('SELECT * FROM Courses WHERE course_id LIKE ?', ['%'+searchTerm + '%'], (err, rows) => {
          // if the connection is successfully, then release it
          connection.release();
          if (!err) {
            res.render('course', { rows });
          } else {
            console.log(err);
          }
          console.log('Successfully for searching_course! \n');
        });
      });


}

//add course form
exports.form = (req, res) => {
  //res.render('add_course');
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log('Connected as ID ' + connection.threadId);
    // User the connection
    connection.query('SELECT * FROM Departments', (err, foo1) => {
      
      // if the connection is successfully, then release it
      connection.release();
      if (!err) {
        res.render('add_course', { foo1 });


      } else {
        console.log(err);
      }
      console.log('Successfully for reading data! \n');
    });


  });

}



//add new course
exports.create = (req, res) => {
  const{course_id, course_name, department_id, instructor_id}=req.body;
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);

      // User the connection
      connection.query('INSERT INTO Courses SET course_id = ?, course_name = ?, department_id = ?, instructor_id = ?',[course_id, course_name, department_id, instructor_id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('add_course',{alert:'Course added successfully!'});
        } else {
          console.log(err);
        }
        console.log('Successfully for add_course! \n');
      });
    });


}

//updade course
exports.edit = (req, res) => {
  //connect to db
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection

      connection.query('SELECT * FROM Courses WHERE course_id = ?',[req.params.course_id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('edit_course', { rows });
        } else {
          console.log(err);
        }
        console.log('Successfully for edit data! \n');
      });
    });

}

exports.update = (req, res) => {
  const{course_name, department_id, instructor_id}=req.body;
  //connect to db
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection

      connection.query('UPDATE Courses SET course_id = ?, department_id = ?, instructor_id = ? WHERE course_id = ?',[course_name, department_id, instructor_id, req.params.course_id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
              //connect to db
           pool.getConnection((err, connection) => {
           if (err) throw err; // not connected!
           console.log('Connected as ID ' + connection.threadId);
              // User the connection

              connection.query('SELECT * FROM Courses WHERE course_id = ?',[req.params.course_id], (err, rows) => {
              // if the connection is successfully, then release it
               connection.release();
              if (!err) {
                  res.render('edit_course', { rows, alert:`${course_name} has been update!` });
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

      connection.query('DELETE FROM Courses WHERE course_id = ?',[req.params.course_id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.redirect('/course')
        } else {
          console.log(err);
        }
        console.log('Successfully for delete data! \n');
      });
    });

}