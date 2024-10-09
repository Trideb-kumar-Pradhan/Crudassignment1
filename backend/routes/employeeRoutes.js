// routes/employeeRoutes.js
const express = require('express');
const {
    getEmployees,
    addEmployee,
    deleteEmployeeByName,
    getEmployeeByName,
    getHighestSalaryEmployee
} = require('../controllers/employeeController');

const router = express.Router();

router.get('/', getEmployees);
router.post('/', addEmployee);
router.get('/name/:name', getEmployeeByName);
router.get('/highest-salary', getHighestSalaryEmployee);
router.delete('/name/:name', deleteEmployeeByName); // Corrected this line

module.exports = router;
