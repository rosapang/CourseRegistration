// Reference : https://github.com/RaddyTheBrand/Nodejs-UserManagement-Express-Hbs-MySQL
// Author : Group 20
// Project name: Course Registration Management
// Description: This website uses to manage the course registration, 
//              and the code that we reference to set our website list above.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

//create,read, update, delete
router.get('/course',courseController.view);

router.post('/course',courseController.find);

router.get('/course/:course_id',courseController.delete);

router.get('/addcourse',courseController.form);
router.post('/addcourse',courseController.create);

router.get('/editcourse/:course_id',courseController.edit);
router.post('/editcourse/:course_id',courseController.update);


module.exports = router;