import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Optional: Import a separate CSS file for styling
const backendurl = import.meta.env.VITE_BACKEND;

function SignUp() {
  const [formData, setFormData] = useState({
    emp_id: '',
    emp_name: '',
    designation_name: '',
    department_name: '',
    dob: '',
    doj: '',
    dor: '', // Optional field
    mobile_number: '',
    email: '',
    marital_status: '',
    basic_pay: '',
    emp_status: '',
    entry_user_id: '',
    login_id: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Remove `dor` from the form data if it's empty
    const dataToSubmit = { ...formData };
    if (!dataToSubmit.dor) {
      delete dataToSubmit.dor;
    }

    axios
      .post(
        `${process.env.NODE_ENV === 'production' ? backendurl + '/signup' : 'http://localhost:8081/signup'}`,
        dataToSubmit
      )
      .then((res) => {
        setSuccess('Sign up successful!');
        setError('');
        setTimeout(() => navigate('/'), 2000); // Redirect to login page after 2 seconds
      })
      .catch((err) => {
        console.log(err);
        setError('Error signing up. Please try again.');
        setSuccess('');
      });
  };

  const getLabel = (key) => {
    switch (key) {
      case 'dob':
        return 'Date of Birth';
      case 'doj':
        return 'Date of Joining';
      case 'dor':
        return 'Date of Resignation (Optional)';
      default:
        return key.replace('_', ' ').toUpperCase();
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{getLabel(key)}</label>
            <input
              type={key === 'dob' || key === 'doj' || key === 'dor' ? 'date' : key === 'email' ? 'email' : 'text'}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required={key !== 'dor'} // `dor` is not required
            />
          </div>
        ))}
        <button type="submit" className="submit-btn">
          Sign Up
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
}

export default SignUp;
