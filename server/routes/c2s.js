// Reference : https://github.com/RaddyTheBrand/Nodejs-UserManagement-Express-Hbs-MySQL
// Author : Group 20
// Project name: Course Registration Management
// Description: This website uses to manage the course registration, 
//              and the code that we reference to set our website list above.


const express = require('express');
const router = express.Router();
const c2sController = require('../controllers/c2sController');

//create,read, update, delete
router.get('/c2s',c2sController.view);

router.post('/c2s',c2sController.find);

router.get('/c2s/:id',c2sController.delete);

router.get('/addc2s',c2sController.form);
router.post('/addc2s',c2sController.create);

router.get('/editc2s/:id',c2sController.edit);
router.post('/editc2s/:id',c2sController.update);


module.exports = router;