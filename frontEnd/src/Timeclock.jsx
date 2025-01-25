import React, { useState } from "react";
import axios from 'axios';
const backendurl = import.meta.env.VITE_BACKEND;

const Timeclock = () => {
    const [empDailyAtt, setEmpDailyAtt] = useState({
        emp_id: 0,
        att_date: new Date().toISOString().split('T')[0], // Current date
        punch_in: '',
        punch_out: '',
    });

    const handleTimeIn = () => {
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
        setEmpDailyAtt({ ...empDailyAtt, punch_in: currentTime });
        saveTimeClockData(empDailyAtt.emp_id, empDailyAtt.att_date, currentTime, '');
    };

    const handleTimeOut = () => {
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
        setEmpDailyAtt({ ...empDailyAtt, punch_out: currentTime });
        saveTimeClockData(empDailyAtt.emp_id, empDailyAtt.att_date, '', currentTime);
    };

    const saveTimeClockData = async(emp_id, att_date, punch_in, punch_out) => {
        await axios.post(`${process.env.NODE_ENV === "production" ? backendurl + "/home/timeclock":"http://localhost:8081/home/timeclock" }`, {
            emp_id,
            att_date,
            punch_in,
            punch_out
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error('Error saving time clock data:', error);
        });
    };

    const handleTimeChange = (e) => {
    const { name, value } = e.target;
    if (value === '') {
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
        setEmpDailyAtt({ ...empDailyAtt, [name]: currentTime });
    } else {
        setEmpDailyAtt({ ...empDailyAtt, [name]: value });
    }
};
    return (
        <div>
            <h1>Enter the Entry and Exit timing</h1>
            <div className="mb-3">
                <label htmlFor="inputEmployeeId" className="form-label">
                    Employee ID
                </label>
                <input
                    type="number"
                    className="form-control rounded-0"
                    id="inputEmployeeId"
                    name="emp_id"
                    placeholder="Enter Employee ID"
                    onChange={handleTimeChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="inputCurrentDate" className="form-label">Current Date:</label>
                <input
                    type="date"
                    className="form-control rounded-0"
                    id="inputDob"
                    value={empDailyAtt.att_date}
                    readOnly
                />
            </div>
            <div className="mb-3">
                <label htmlFor="inputTime" className="form-label">Time:</label>
                <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputTime"
                    name="punch_in"
                    value={empDailyAtt.punch_in || empDailyAtt.punch_out}
                    onChange={handleTimeChange}
                />
            </div>
            <div>
                <button className="btn btn-info btn-sm me-2" onClick={handleTimeIn}>Time In</button>
                <button className="btn btn-warning btn-sm" onClick={handleTimeOut}>Time Out</button>
            </div>
        </div>
    );
}

export default Timeclock;
