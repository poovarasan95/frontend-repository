import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from'axios'
import { useNavigate } from 'react-router-dom'
import'./signup.css'; 

export const Signup = () => {
    const [register,setRegister]=useState('');
    const [username,setUsername]=useState('');
    const [section,setSection]=useState('');
    const [standard,setStandard]=useState('');
    const [gender,setGender]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate()
   const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async(e)=>{
        e.preventDefault()
       try {
        const response = await axios.post(`${apiUrl}/api/auth/signup`,
          {register,username,section,standard,gender,password}
        );
        console.log(response);
        navigate('/')
       } catch (error) {
        console.log(error);
       }
    }
  return (
    <div >
      <div className='wrapper'>
        <div className='form-box login'>
        <form onSubmit={handleSubmit}>
          <h1 >Register Form</h1>
        <div > 
        <label htmlFor='username' className="">
            <strong>Name :</strong>
        </label>
        <input type='text' className='input-0' name='username'onChange={(e)=>setUsername(e.target.value)} required/>
        </div> 
        <div className="main"> 
        <label htmlFor='standard' className="">
            <strong>Standard :</strong>
        </label>
        <input type='text' name='standard'className='input-1'onChange={(e)=>setStandard(e.target.value)} required/>
        </div>
        <div className="main">
        <label htmlFor='section' className="">
            <strong>Section :</strong>
        </label>
        <input type='text' name='section'className='input-2'onChange={(e)=>setSection(e.target.value)} required/>
        </div>
        <div className="main">
        <label htmlFor='register' className="">
            <strong>Register :</strong>
        </label>   
        <input type='text' name='register'className='input-3' onChange={(e)=>setRegister(e.target.value)} required/>
        </div>
        <div className="main">
        <label htmlFor='gender' className="">
            <strong>Gender :</strong>
        </label>    
        <input type='radio' name='gender'className='input-4'value='male' onChange={(e)=>setGender(e.target.value)} required/>Male
        <input type='radio' name='gender'className='input-4'value='female' onChange={(e)=>setGender(e.target.value)} required/>Female
        </div>
        <div className="main">
        <label htmlFor='password' className="">
            <strong>Password :</strong>
        </label>
        <input type='password' name='password'className='input-5'onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <center>
        <button type='submit' className='button'>Register</button>
        </center>
        </form>
        <center>
        <p className='m-2'>Already Have an Account</p>
        <Link to="/" className='btn'>Login</Link>
        </center>
        </div>
      </div>
    </div>
  )
}
