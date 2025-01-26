import React, { useState, useEffect } from "react";
import axios from 'axios';
const backendurl = import.meta.env.VITE_BACKEND;

const Attendance = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        // Fetch attendance data when employeeId or selectedMonth changes
        fetchAttendanceData();
    }, [employeeId, selectedMonth]);

    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get(`${process.env.NODE_ENV === "production" ? `${backendurl}/home/attendance/${employeeId}/${selectedMonth}` : `http://localhost:8081/home/attendance/${employeeId}/${selectedMonth}`}`);
            setAttendanceData(response.data);
            console.log(response.data);
            
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    return (
        <div>
            <h1>Attendance Report</h1>
            <div className="mb-3">
                <label htmlFor="employeeId">Employee ID:</label>
                <input
                    type="text"
                    id="employeeId"
                    className="form-control rounded-0"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="month">Month:</label>
                <input
                    type="month"
                    id="month"
                    className="form-control rounded-0"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                />
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time In</th>
                            <th>Time Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((data) => (
                            <tr key={data.att_date}>
                            <td>{new Date(data.att_date).toLocaleDateString()}</td>
                            <td>{data.punch_in}</td>
                            <td>{data.punch_out}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;
