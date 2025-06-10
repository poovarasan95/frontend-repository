//import { useState } from 'react'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import { Signup } from './Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Loginpage } from './Loginpage'
import { Dashboard } from "./Dashboard"
import { Home } from "./Page/Home"
import { LeaveDetails } from "./Page/LeaveDetails"
import './app.css';

//import { Home } from "./Page/Home"
//import { LeaveDetails } from "./Page/LeaveDetails"

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Loginpage/>}></Route>
        <Route path="/signup" element={ <Signup/>}></Route>
        <Route path="/dashboard" element={ <Dashboard/>}>
        <Route index element={<Home/>}></Route>
        <Route path="home" element={<Home/>}></Route>
        <Route path="leavedetails" element={<LeaveDetails/>}></Route>    
        </Route>  
          <Route path="/dashboard/*" element={<Navigate to="/" />} />
      </Routes>
      </BrowserRouter>
        
    </>
  )
}

export default App
