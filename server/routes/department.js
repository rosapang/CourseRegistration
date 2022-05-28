// Reference : https://github.com/RaddyTheBrand/Nodejs-UserManagement-Express-Hbs-MySQL
// Author : Group 20
// Project name: Course Registration Management
// Description: This website uses to manage the course registration, 
//              and the code that we reference to set our website list above.

const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

//create,read, update, delete
router.get('/department',departmentController.view);

router.post('/department',departmentController.find);

router.get('/department/:department_id',departmentController.delete);

router.get('/adddepartment',departmentController.form);
router.post('/adddepartment',departmentController.create);

router.get('/editdepartment/:department_id',departmentController.edit);
router.post('/editdepartment/:department_id',departmentController.update);

module.exports = router;