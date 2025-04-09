const express = require('express');
const router = express.Router();
const path = require('path');

const data = {};
data.employees = require('../../data/employees.json');

// Route for root path '/'
router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .put((req, res) => {
        res.json({
            'firstname': req.body.firstname,
            'lastname': req.body.lastname
        });
    })
    .delete((req, res) => {
        res.json({
            'id': req.body.id
        });
    });

// Route for specific employee by ID
router.route('/:id')
    .get((req, res) => {
        res.json({
            'id': req.params.id
        });
    });
    

module.exports = router;
