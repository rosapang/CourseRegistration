// Reference : https://github.com/RaddyTheBrand/Nodejs-UserManagement-Express-Hbs-MySQL
// Author : Group 20
// Project name: Course Registration Management
// Description: This website uses to manage the course registration, 
//              and the code that we reference to set our website list above.

// database connection: set the database information in .env file.

// how to run : 
// 1. install by enter : npm install express dotenv express-handlebars body-parser mysql
// 2. install nodemon : npm install --save-dev nodemon
// 3. run the code : npm start

// set up

const express = require ('express');
const exphbs = require ('express-handlebars');
const bodyParser = require ('body-parser');
const mysql = require ('mysql');


require('dotenv').config();

const app = express ();
const port = process.env.PORT || 8888;

//parsing application
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//templating engine
app.engine('hbs', exphbs( {extname: '.hbs'}));
app.set('view engine', 'hbs');

//connect Pool
const pool = mysql.createPool({
    connectionLimit :  10,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME

});


//connect database
pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('Connected as ID '+ connection.threadId);
});



// router
// set the router to department/ student/ instructor/ course/ course2student page
app.use(require('./server/routes/department'));
app.use(require('./server/routes/student'));
app.use(require('./server/routes/instructor'));
app.use(require('./server/routes/course'));
app.use(require('./server/routes/c2s'));




app.get('/',(req, res)=>{
    res.render('home');
});

// listener
app.listen(port, ()=>console.log(`Listing on port ${port}`));