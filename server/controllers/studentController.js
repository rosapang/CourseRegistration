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



// View students
exports.view = (req, res) => {
    //connect to db
    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection
      connection.query('SELECT * FROM Students', (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('student', { rows });
        } else {
          console.log(err);
        }
        console.log('Successfully for reading data! \n');
      });
    });
}

//search student
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;
    
        // User the connection
        connection.query('SELECT * FROM Students WHERE student_id LIKE ?', ['%'+searchTerm + '%'], (err, rows) => {
          // if the connection is successfully, then release it
          connection.release();
          if (!err) {
            res.render('student', { rows });
          } else {
            console.log(err);
          }
          console.log('Successfully for searching_student! \n');
        });
      });


}

exports.form = (req, res) => {
  res.render('add_student');
}

//add new student
exports.create = (req, res) => {
  const{student_name, student_degree}=req.body;
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);

      // User the connection
      connection.query('INSERT INTO Students SET student_name = ?, student_degree = ?',[student_name, student_degree], (err, rows) => {
        connection.release();
        if (!err) {
          res.render('add_student',{alert:'Student added successfully!'});
        } else {
          console.log(err);
        }
        console.log('Successfully for add_student! \n');
      });
    });


}


//updade student
exports.edit = (req, res) => {
  //connect to db
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection

      connection.query('SELECT * FROM Students WHERE student_id = ?',[req.params.student_id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('edit_student', { rows });
        } else {
          console.log(err);
        }
        console.log('Successfully for edit data! \n');
      });
    });

}

exports.update = (req, res) => {
  const{student_name, student_degree}=req.body;
  //connect to db
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection

      connection.query('UPDATE Students SET student_name = ?, student_degree = ? WHERE student_id = ?',[student_name, student_degree, req.params.student_id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
              //connect to db
           pool.getConnection((err, connection) => {
           if (err) throw err; // not connected!
           console.log('Connected as ID ' + connection.threadId);
              // User the connection

              connection.query('SELECT * FROM Students WHERE student_id = ?',[req.params.student_id], (err, rows) => {
              // if the connection is successfully, then release it
               connection.release();
              if (!err) {
                  res.render('edit_student', { rows, alert:`${student_name} has been update!` });
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

      connection.query('DELETE FROM Students WHERE student_id = ?',[req.params.student_id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.redirect('/student')
        } else {
          console.log(err);
        }
        console.log('Successfully for delete data! \n');
      });
    });

}