// Reference : https://github.com/RaddyTheBrand/Nodejs-UserManagement-Express-Hbs-MySQL
// Author : Group 20
// Project name: Course Registration Management
// Description: This website uses to manage the course registration, 
//              and the code that we reference to set our website list above.

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

//create,read, update, delete
router.get('/student',studentController.view);
router.post('/student',studentController.find);

router.get('/student/:student_id',studentController.delete);

router.get('/addstudent',studentController.form);
router.post('/addstudent',studentController.create);

router.get('/editstudent/:student_id',studentController.edit);
router.post('/editstudent/:student_id',studentController.update);




module.exports = router;