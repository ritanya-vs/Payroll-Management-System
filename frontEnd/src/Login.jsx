import React, { useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backendurl = import.meta.env.VITE_BACKEND_DOMAIN;
function Login(){
    console.log(backendurl);
    console.log("helo")
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();
    function handleSubmit(event){
        event.preventDefault();
        axios.post(`${process.env.NODE_ENV === "production" ? process.env.BACKEND + "/login":"http://localhost:8081/login" }`,{email,password})
        .then(res=> {
            console.log(res);
            document.body.classList.add('logged-in');
            navigate('/home')})
        .catch(err => {
            console.log(err);
            setError('Invalid email or password');
        });
    }
    return(
        <div className='log'>
            <div className = 'wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className ="input-box">
                        <input type ="text" placeholder = 'Username' required 
                        onChange={e => setEmail(e.target.value)}/>
                        <FaUser className='icon'/>
                    </div>
                    <div className ="input-box">
                        <input type ="password" placeholder = 'Password' required 
                        onChange={e => setPassword(e.target.value)}/>
                        <FaLock className='icon'/>
                    </div>
                    
                    <button type ="submit">Login</button>
                    {error && <div className="error">{error}</div>}
                    
                </form>
            </div>
        </div>
    )
}

export default Login;