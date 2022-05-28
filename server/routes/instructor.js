// Reference : https://github.com/RaddyTheBrand/Nodejs-UserManagement-Express-Hbs-MySQL
// Author : Group 20
// Project name: Course Registration Management
// Description: This website uses to manage the course registration, 
//              and the code that we reference to set our website list above.

const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

//create,read, update, delete
router.get('/instructor',instructorController.view);

router.post('/instructor',instructorController.find);

router.get('/instructor/:instructor_id',instructorController.delete);

router.get('/addinstructor',instructorController.form);
router.post('/addinstructor',instructorController.create);

router.get('/editinstructor/:instructor_id',instructorController.edit);
router.post('/editinstructor/:instructor_id',instructorController.update);


module.exports = router;