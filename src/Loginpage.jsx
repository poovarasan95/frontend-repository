 import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
 export const Loginpage = () => {
    const[register,setRegister]=useState('');
    const[password,setPassword]=useState('');
    const[error,setError]=useState('');
    const navigate=useNavigate()

   const apiUrl = import.meta.env.VITE_API_URL;


   console.log("API URL:", apiUrl);

    const handlesubmit= async(e)=>{
      e.preventDefault()
      try {
         const response = await axios.post(`${apiUrl}/api/auth/login`,
          {register,password}
        );
        
          localStorage.setItem('token', response.data.token);
          console.log(response.data);
          navigate("/dashboard")
        
      } catch (error) {
       console.log(error)
      if(error.response && !error.response.data.success){
      setError(error.response.data.error)
      }else{
        setError("server error");
      }
      }
    }
   return (
     <div className='container'>
           <div>
            <h2 className='title'>Login Page</h2>
            {error && <p className='text-danger '>{error}</p>}
            <form onSubmit={handlesubmit}>
              <div className='input-label' >
              <label className='label' htmlFor='register'>
              <strong>Register NO :</strong>
              </label>
              <input type='text' name='register'onChange={(e)=>setRegister(e.target.value)} required/>
              </div>
              <div>
              <label className='label' htmlFor='password'>
              <strong>Password :</strong>
              </label>
              <input type='password' name='password'className='input'onChange={(e)=>setPassword(e.target.value)} required/>
              </div>
              <center>
              <button type='submit' className='button'>Login</button>
              </center>
            </form>
            <center>
              <p className='register'>Register Account</p>
              <Link to="/signup" className='btn'>Singup</Link>
              </center>
           </div>
         </div>
   )
 }
 

