import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendurl = import.meta.env.VITE_BACKEND;

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        emp_id: 0,
        emp_name: '',
        designation_name: '',
        department_name: '',
        dob: '01-01-2022',
        doj: '01-01-2023',
        dor: '01-01-2023',
        mobile_number: '',
        email: '',
        marital_status: '',
        basic_pay: 0,
        emp_status: '',
        entry_user_id: 0
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.NODE_ENV === "production" ?  backendurl + "/home/add_employee":"http://localhost:8081/home/add_employee" }`, employee)
            .then(result => {
                if (result.data.Status) {
                    navigate('/home')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add Employee</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="inputEmployeeId" className="form-label">
                            Employee ID
                        </label>
                        <input
                            type="number"
                            className="form-control rounded-0"
                            id="inputEmployeeId"
                            placeholder="Enter Employee ID"
                            onChange={(e) => setEmployee({ ...employee, emp_id: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">
                            Employee Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Employee Name"
                            onChange={(e) => setEmployee({ ...employee, emp_name: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputDesignation" className="form-label">
                            Designation
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputDesignation"
                            placeholder="Enter Designation"
                            onChange={(e) => setEmployee({ ...employee, designation_name: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputDepartment" className="form-label">
                            Department
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputDepartment"
                            placeholder="Enter Department"
                            onChange={(e) => setEmployee({ ...employee, department_name: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputDob" className="form-label">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            className="form-control rounded-0"
                            id="inputDob"
                            onChange={(e) => setEmployee({ ...employee, dob: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputDoj" className="form-label">
                            Date of Join
                        </label>
                        <input
                            type="date"
                            className="form-control rounded-0"
                            id="inputDoj"
                            onChange={(e) => setEmployee({ ...employee, doj: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputDor" className="form-label">
                            Date of Relieve
                        </label>
                        <input
                            type="date"
                            className="form-control rounded-0"
                            id="inputDor"
                            onChange={(e) => setEmployee({ ...employee, dor: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputMobileNumber" className="form-label">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputMobileNumber"
                            placeholder="Enter Mobile Number"
                            onChange={(e) => setEmployee({ ...employee, mobile_number: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            id="inputEmail"
                            placeholder="Enter Email"
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputMaritalStatus" className="form-label">
                            Marital Status
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputMaritalStatus"
                            placeholder="Enter Marital Status"
                            onChange={(e) => setEmployee({ ...employee, marital_status: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmployeeStatus" className="form-label">
                            Employee Status
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputEmployeeStatus"
                            placeholder="Enter Employee Status (Alive or Dead)"
                            onChange={(e) => setEmployee({ ...employee, emp_status: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputBasicPay" className="form-label">
                            Basic Pay
                        </label>
                        <input
                            type="real"
                            className="form-control rounded-0"
                            id="inputBasicPay"
                            placeholder="Enter Basic Pay"
                            onChange={(e) => setEmployee({ ...employee, basic_pay: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEntryUserId" className="form-label">
                            Entry User ID
                        </label>
                        <input
                            type="number"
                            className="form-control rounded-0"
                            id="inputEntryUserId"
                            placeholder="Enter Entry User ID"
                            onChange={(e) => setEmployee({ ...employee, entry_user_id: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee