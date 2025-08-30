import axios from 'axios';

import React, { useState } from 'react';
import '../styles/login.css'; // Import the CSS file
import { useAuth } from '../context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState(null)
    const {login}=useAuth()
    const navigate=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
            const response=await axios.post("http://localhost:5000/api/auth/login",{email,password});
            if(response.data.success){
                login(response.data.user)
                // console.log(response.data.user)
                localStorage.setItem("token",response.data.token)
                if(response.data.user.role==="admin"){
                  navigate('/admin-dashboard/dashboard')
                
                }else{
                  navigate("/employee-dashboard/dashboard")
                }
            }
        }catch(error){
          
            if(error.response && !error.response.data.success){
                setError(error.response.data.error)
            }else{
                setError("Server Error")
            }
            
        }

    }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="title">Employee Management System</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <h3 className="subtitle">Login</h3>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="******" onChange={(e)=>setPassword(e.target.value)} required/>
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

