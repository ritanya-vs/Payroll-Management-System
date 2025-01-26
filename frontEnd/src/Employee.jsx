import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const backendurl = import.meta.env.VITE_BACKEND;

const Employee = () => {
    const [employee, setEmployee] = useState([])
    const navigate = useNavigate()
    useEffect(() => {

        axios.get(`${process.env.NODE_ENV === "production" ? backendurl + "/employee":"http://localhost:8081/employee" }`)
            .then((result) => {
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (emp_id) => {
        const deleteUrl = `${process.env.NODE_ENV === "production" ? backendurl + "/delete_employee/" : "http://localhost:8081/delete_employee/"}${emp_id}`;
        
        console.log("DELETE request URL:", deleteUrl); // Logs the generated URL for debugging
    
        axios.delete(deleteUrl)
            .then(result => {
                if (result.data.Status) {
                    console.log("Delete successful:", result.data); // Logs the response if the delete was successful
                    setEmployee(employee.filter(emp => emp.emp_id !== emp_id));
                    navigate('/home');
                    //window.location.reload();
                } else {
                    console.error("Error deleting employee:", result.data.Error); // Logs error message from the response
                    alert(result.data.Error);
                }
            })
            .catch(err => {
                console.error("Error in DELETE request:", err); // Logs any unexpected errors
            });
    };
    
    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Employee List</h3>
            </div>
            <Link to="/home/add_employee" className='btn btn-success'>
                Add Employee</Link>
            <div className='mt-3'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>EID</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Basic Pay</th>
                            <th>Mobile No.</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map(e => (
                                <tr>
                                    <td>{e.emp_id}</td>
                                    <td>{e.emp_name}</td>
                                    <td>{e.designation_name}</td>
                                    <td>{e.basic_pay}</td>
                                    <td>{e.mobile_number}</td>
                                    <td>{e.emp_status}</td>
                                    <td>
                                        <Link to={`/home/edit_employee/` + e.emp_id} className="btn btn-info btn-sm me-2">Edit</Link>
                                        <button className="btn btn-warning btn-sm" 
                                        onClick={() => handleDelete(e.emp_id)}
                                        >
                                            Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>

    )
}

export default Employee