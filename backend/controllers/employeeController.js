
const Employee = require('../models/employeeModel');


exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees' });
    }
};

exports.addEmployee = async (req, res) => {
    try {
        const { name, position, salary } = req.body;
        const newEmployee = new Employee({ name, position, salary });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error adding employee' });
    }
};


exports.deleteEmployeeByName = async (req, res) => {
    try {
        const { name } = req.params; 
        const result = await Employee.findOneAndDelete({ name }); 

        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee' });
    }
};


exports.getEmployeeByName = async (req, res) => {
    try {
        const employee = await Employee.findOne({ name: req.params.name });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee by name' });
    }
};

exports.getHighestSalaryEmployee = async (req, res) => {
    try {
        const highestSalaryEmployee = await Employee.findOne().sort({ salary: -1 });
        res.status(200).json(highestSalaryEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching highest salary employee' });
    }
};
