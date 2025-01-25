import React, { useState } from "react";
import axios from 'axios';

const convertYearMonthToWords = (yearMonth) => {
    const year = yearMonth.substring(0, 4);
    const month = yearMonth.substring(4);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthName = months[parseInt(month, 10) - 1];

    return `${monthName} ${year}`;
};
const backendurl = import.meta.env.VITE_BACKEND;

const Payroll = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [yearMonth, setYearMonth] = useState('');
    const [payCalcData, setPayCalcData] = useState(null);

    const handleGeneratePayroll = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${process.env.NODE_ENV === "production" ? backendurl + "/home/payroll":"http://localhost:8081/home/payroll"}`, { yearMonth });
            setSuccess(true);
            setPayCalcData(response.data.payCalc);
        } catch (error) {
            setError(error.message || 'Error generating payroll');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '24px' }}>Generate Payroll</h1>
            <input
                type="text"
                placeholder="Enter Year Month (YYYYMM)"
                value={yearMonth}
                onChange={(e) => setYearMonth(e.target.value)}
                style={{ fontSize: '16px', padding: '8px', marginBottom: '12px' }}
            />
            {isLoading && <p style={{ fontSize: '18px' }}>Loading...</p>}
            {error && <p style={{ fontSize: '18px', color: 'red' }}>Error: {error}</p>}
            {success && <p style={{ fontSize: '18px', color: 'green' }}>Payroll generated successfully!</p>}

            {payCalcData && (
                <div>
                    <h2 style={{ fontSize: '20px', marginTop: '24px' }}>Pay Calculation Data for {convertYearMonthToWords(yearMonth)}</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
                        <thead>
                            <tr>
                                <th style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>Emp ID</th>
                                <th style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payCalcData.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>{item.emp_id}</td>
                                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>{item.salary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button onClick={handleGeneratePayroll} disabled={isLoading} style={{ fontSize: '16px', padding: '8px 16px', marginTop: '12px' }}>
                Generate Payroll
            </button>
        </div>
    );
};

export default Payroll;
