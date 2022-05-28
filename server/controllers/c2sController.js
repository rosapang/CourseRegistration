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



// View Course2Students
exports.view = (req, res) => {
    //connect to db
    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection
      connection.query('SELECT * FROM Courses2Students', (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('c2s', { rows });
        } else {
          console.log(err);
        }
        console.log('Successfully for reading data! \n');
      });
    });
}

//search course2student
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;
    
        // User the connection
        connection.query('SELECT * FROM Courses2Students WHERE id LIKE ?', ['%'+searchTerm + '%'], (err, rows) => {
          // if the connection is successfully, then release it
          connection.release();
          if (!err) {
            res.render('c2s', { rows });
          } else {
            console.log(err);
          }
          console.log('Successfully for searching_c2s! \n');
        });
      });


}

//c2s form
exports.form = (req, res) => {
 // res.render('add_c2s');
 pool.getConnection((err, connection) => {
  if (err) throw err; // not connected!
  console.log('Connected as ID ' + connection.threadId);
  // User the connection
  connection.query('SELECT course_id FROM Courses', (err, foo1) => {
    // if the connection is successfully, then release it
    connection.release();
    if (!err) {
      res.render('add_c2s', { foo1 });
    } else {
      console.log(err);
    }
    console.log('Successfully for reading data! \n');
  });
});

}

//add new c2s
exports.create = (req, res) => {
  const{course_id, student_id}=req.body;
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);

      // User the connection
      connection.query('INSERT INTO Courses2Students SET course_id = ?, student_id = ?',[course_id, student_id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('add_c2s',{alert:'Courses + Students added successfully!'});
        } else {
          console.log(err);
        }
        console.log('Successfully for add_c2s! \n');
      });
    });


}

//updade c2s
exports.edit = (req, res) => {
  //connect to db
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection

      connection.query('SELECT * FROM Courses2Students WHERE id = ?',[req.params.id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.render('edit_c2s', { rows });
        } else {
          console.log(err);
        }
        console.log('Successfully for edit data! \n');
      });
    });

}

exports.update = (req, res) => {
  const{course_id, student_id}=req.body;
  //connect to db
  pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);
      // User the connection

      connection.query('UPDATE Courses2Students SET course_id = ?, student_id = ? WHERE id = ?',[course_id, student_id, req.params.id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
              //connect to db
           pool.getConnection((err, connection) => {
           if (err) throw err; // not connected!
           console.log('Connected as ID ' + connection.threadId);
              // User the connection

              connection.query('SELECT * FROM Courses2Students WHERE id = ?',[req.params.id], (err, rows) => {
              // if the connection is successfully, then release it
               connection.release();
              if (!err) {
                  res.render('edit_c2s', { rows, alert:`${course_id} has been update!` });
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

      connection.query('DELETE FROM Courses2Students WHERE id = ?',[req.params.id], (err, rows) => {
        // if the connection is successfully, then release it
        connection.release();
        if (!err) {
          res.redirect('/c2s')
        } else {
          console.log(err);
        }
        console.log('Successfully for delete data! \n');
      });
    });

}