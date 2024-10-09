import React, { useState } from 'react';
import axios from 'axios';

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [searchName, setSearchName] = useState('');
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState('');
    const [highestSalaryEmployee, setHighestSalaryEmployee] = useState(null);
    const [searchnameemp, setsearchnameemp] = useState(null);
    const [showEmployees, setShowEmployees] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); 


    const addEmployee = async () => {
        if (!name || !position || !salary) {
            setMessage('Please fill in all fields');
            setMessageType('error');
            return; 
        }

        try {
            await axios.post('http://localhost:3000/employees', {
                name,
                position,
                salary,
            });

            setName('');
            setPosition('');
            setSalary('');
            setMessage('Employee added successfully!');
            setMessageType('success');
        } catch (error) {
            console.error('Error adding employee:', error);
            setMessage('Error adding employee. Please try again.');
            setMessageType('error');
        }
    };


    const deleteEmployee = async () => {
        try {
            await axios.delete(`http://localhost:3000/employees/name/${employeeIdToDelete}`);
            setEmployees(employees.filter((employee) => employee.name !== employeeIdToDelete));
            setEmployeeIdToDelete('');
            setMessage('Employee deleted successfully!');
            setMessageType('success');
        } catch (error) {
            console.error('Error deleting employee:', error);
            setMessage('Error deleting employee. Please try again.');
            setMessageType('error');
        }
    };

 
    const searchEmployeeByName = async () => {
        if (!searchName) {
            setMessage('Please enter a name to search');
            setMessageType('error');
            return; 
        }

        try {
            const response = await axios.get(`http://localhost:3000/employees/name/${searchName}`);
            if (response.data) {
                setsearchnameemp(response.data);
                setMessage('Employee found successfully!');
                setMessageType('success');
            } else {
                setsearchnameemp(null); 
                setMessage('No employee found with that name');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Error searching employee by name:', error);
            setMessage('Error searching employee. Please try again.');
            setMessageType('error');
        }
    };


    const fetchHighestSalaryEmployee = async () => {
        try {
            const response = await axios.get('http://localhost:3000/employees/highest-salary');
            setHighestSalaryEmployee(response.data);
        } catch (error) {
            console.error('Error fetching employee with highest salary:', error);
        }
    };


    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3000/employees');
            setEmployees(response.data);
            setShowEmployees(true);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };


    const toggleEmployeeList = () => {
        setShowEmployees(!showEmployees);
    };


    const styles = {
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
        header: {
            textAlign: 'center',
            color: '#007bff',
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
        },

        section: {
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #dee2e6',
            borderRadius: '5px',
            backgroundColor: '#ffffff',
        },
        input: {
            margin: '5px',
            padding: '10px',
            width: 'calc(33% - 20px)',
            borderRadius: '4px',
            border: '1px solid #ced4da',
        },
        button: {
            margin: '5px',
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        employeeList: {
            listStyleType: 'none',
            padding: 0,
        },
        employeeItem: {
            padding: '10px',
            borderBottom: '1px solid #dee2e6',
        },
        message: {
            margin: '10px 0',
            padding: '10px',
            borderRadius: '5px',
            color: '#fff',
            textAlign: 'center',
        },
        successMessage: {
            backgroundColor: '#28a745',
        },
        errorMessage: {
            backgroundColor: '#dc3545',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Employee Management</h2>


            {message && (
                <div style={{ ...styles.message, ...(messageType === 'success' ? styles.successMessage : styles.errorMessage) }}>
                    {message}
                </div>
            )}


            <div style={styles.section}>
                <h3>Add Employee</h3>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <input
                    style={styles.input}
                    type="number"
                    placeholder="Salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />
                <button style={styles.button} onClick={addEmployee}>Add Employee</button>
            </div>

            <div style={styles.section}>
                <h3>Delete Employee by Name</h3>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Enter Employee Name"
                    value={employeeIdToDelete}
                    onChange={(e) => setEmployeeIdToDelete(e.target.value)}
                />
                <button style={styles.button} onClick={deleteEmployee}>Delete Employee</button>
            </div>


            <div style={styles.section}>
                <h3>Search Employee by Name</h3>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Enter employee name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button style={styles.button} onClick={searchEmployeeByName}>Search</button>
                {searchnameemp ? (
                    <p>
                        {searchnameemp.name} - {searchnameemp.position} - ${searchnameemp.salary}
                    </p>
                ) : (
                    searchName && <p>No employee found with that name.</p>
                )}
            </div>

        
            <div style={styles.section}>
                <h3>Employee with Highest Salary</h3>
                <button style={styles.button} onClick={fetchHighestSalaryEmployee}>Get Employee with Highest Salary</button>
                {highestSalaryEmployee && (
                    <p>
                        {highestSalaryEmployee.name} - {highestSalaryEmployee.position} - ${highestSalaryEmployee.salary}
                    </p>
                )}
            </div>

  
            <div style={styles.section}>
                <h3>Employee List</h3>
                <button style={styles.button} onClick={fetchEmployees}>Get Employee List</button> 
                <button style={styles.button} onClick={toggleEmployeeList}>
                    {showEmployees ? 'Close Employee List' : 'Show Employee List'}
                </button>
                {showEmployees && (
                    <ul style={styles.employeeList}>
                        {employees.map((employee) => (
                            <li key={employee._id} style={styles.employeeItem}>
                                {employee.name} - {employee.position} - ${employee.salary}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Employee;
