import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backendurl = import.meta.env.VITE_BACKEND;

const EditEmployee = () => {
    const { emp_id } = useParams()
    const [employee, setEmployee] = useState({
        emp_name: '',
        designation_name: '',
        department_name: '',
        mobile_number: '',
        email: '',
        marital_status: '',
        basic_pay: 0,
        emp_status: ''
    });
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(
            `${process.env.NODE_ENV === "production" ? backendurl + "/employee/" : "http://localhost:8081/employee/"}${emp_id}`
        )
        .then(result => {
            setEmployee({
                emp_name: result.data.Result[0].emp_name,
                designation_name: result.data.Result[0].designation_name,
                department_name: result.data.Result[0].department_name,
                mobile_number: result.data.Result[0].mobile_number,
                email: result.data.Result[0].email,
                marital_status: result.data.Result[0].marital_status,
                basic_pay: result.data.Result[0].basic_pay,
                emp_status: result.data.Result[0].emp_status
            });
        })
        .catch(err => console.log(err));
    }, [emp_id]);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`${process.env.NODE_ENV === "production" ? backendurl + "/edit_employee/" : "http://localhost:8081/edit_employee/"}${emp_id}`, employee)
        .then(result => {
            if(result.data.Status) {
                navigate('/home')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Edit Employee</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">
                            Employee Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Employee Name"
                            value = {employee.emp_name}
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
                            value = {employee.designation_name}
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
                            value = {employee.department_name}
                            onChange={(e) => setEmployee({ ...employee, department_name: e.target.value })}
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
                            value = {employee.mobile_number}
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
                            value = {employee.email}
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
                            value = {employee.marital_status}
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
                            value = {employee.emp_status}
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
                            value = {employee.basic_pay}
                            onChange={(e) => setEmployee({ ...employee, basic_pay: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Edit Employee
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditEmployee