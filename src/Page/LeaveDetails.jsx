import React, { useState } from 'react'
import axios from 'axios';
import { useEffect} from 'react';
import { Calendar, Badge, } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';



dayjs.extend(isBetween);
export const LeaveDetails = () => {

 const [leave,setLeave]=useState([]);
 

    const token = localStorage.getItem('token');
const apiUrl = import.meta.env.VITE_API_URL;
  
      async function fetchHistory(){
        const res = await axios.get(`${apiUrl}/api/auth/leaveHistory`, {
           headers: { Authorization: `Bearer ${token}` }
         }) 
         setLeave(res.data);
       
        }
        useEffect(() => {
        fetchHistory();
      }, []);
     
      const dateCellRender = (value) => {
        const list = leave.filter(item => {
          const start = moment(item.startDate);
          const end = moment(item.endDate);
          return value.isBetween(start, end, 'day', '[]');
        });
        return list.length > 0 ? <Badge status="success" text="On Leave" /> : null;
      };
  return (
    <>
    <Calendar dateCellRender={dateCellRender} />;
    </>
  )
}





