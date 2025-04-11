const express = require('express');
const router = express.Router();
const path = require('path');
const empController = require('../../controllers/empController');
const verifyJWT = require('../../middleware/verifyJWT');

// Route for root path '/'
router.route('/')
    .get(verifyJWT, empController.getAllEmployees)
    .post(verifyJWT, empController.createNewEmployee)
    .put(verifyJWT, empController.updateEmployee)
    .delete(verifyJWT, empController.deleteEmployee);

// Route for specific employee by ID
router.route('/:_id')
    .get(verifyJWT, empController.getEmployee);

module.exports = router;