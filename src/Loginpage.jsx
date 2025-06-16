import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser} from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import'./login.css'; 

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
     <div className="wrapper">
           <div className='form-box login'>
            <form onSubmit={handlesubmit}>
              <h1>Login Page</h1>
              {error && <p className='text-danger '>{error}</p>}
              <div className="input-box" >
              <input type='text' placeholder='Register Number' name='register'onChange={(e)=>setRegister(e.target.value)} required/>
              <FaUser className="icon" />
              </div>
              <div className="input-box">
              <input type='password'placeholder='Password' name='password'onChange={(e)=>setPassword(e.target.value)} required/>
              <RiLockPasswordFill  className="icon" />
              </div>
              <center>
              <button type='submit'>Login</button>
              </center>
            </form>
            <center>
              <p className='register'>Don't have an Account ?</p>
              <Link to="/signup" className='btn'>Singup</Link>
              </center>
           </div>
         </div>
   )
 }
 

