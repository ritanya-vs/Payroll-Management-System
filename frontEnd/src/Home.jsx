import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Outlet } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

function Home(){
    
    return (
        <div className = "container-fluid">
            <div className = "row flex-nowrap">
                <div className = "col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                        <Link to ="/home"
                        className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
                        >
                            <span className="fs-5 fw-bolder d-none d-sm-inline">
                                Payroll System
                            </span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" 
                        id="menu">
                            <li className="w-100">
                                <Link 
                                    to = "/home"
                                    className="nav-link text-white px-0 align-middle"
                                >
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Employees</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link 
                                    to = "/home/attendance"
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-people ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Attendance</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                to="/home/timeclock"
                                className="nav-link px-0 align-middle text-white"
                                >
                                <i className="fs-4 bi-columns ms-2"></i>
                                <span className="ms-2 d-none d-sm-inline">Time Clock</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                to="/home/payroll"
                                className="nav-link px-0 align-middle text-white"
                                >
                                <i className="fs-4 bi-person ms-2"></i>
                                <span className="ms-2 d-none d-sm-inline">Payroll</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className="p-2 d-flex justify-content-center shadow">
                        <h4>Payroll Management System</h4>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Home