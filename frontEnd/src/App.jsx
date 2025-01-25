import React, { useState } from 'react'
import {useEffect} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login';
import Employee from './Employee';
import Attendance from './Attendance';
import Timeclock from './Timeclock';
import Payroll from './Payroll';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import SignUp from './Signup';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path = '/home' element = {<Home />}>
        <Route path = '' element = {<Employee />} />
          <Route path = '/home/attendance' element ={<Attendance />}></Route>
          <Route path = '/home/timeclock' element ={<Timeclock />}></Route>
          <Route path = '/home/payroll' element ={<Payroll />}></Route>
          <Route path = '/home/add_employee' element ={<AddEmployee />}></Route>
          <Route path = '/home/edit_employee/:emp_id' element ={<EditEmployee />}></Route>
        </Route>  
      </Routes>
    </BrowserRouter>
  )
}

export default App