import React, { useState,useEffect } from 'react'
import { Button, Modal, Form, DatePicker,Tag ,Input, message} from 'antd';
import axios from 'axios';
import { Select, Table,Typography, Empty } from 'antd';
import dayjs from 'dayjs';


const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const HOLIDAYS = [
  { key: '1',  startDate: '2025-01-26', endDate: '2025-01-26', reason: 'Republic Day' },
  { key: '2',  startDate: '2025-08-15', endDate: '2025-08-15', reason: 'Independence Day' },
  { key: '3',  startDate: '2025-10-02', endDate: '2025-10-02', reason: 'Gandhi Jayanti' }
];

export const Home = () => {

  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const [dates, setDates] = useState([]);
  const [reason, setReason] = useState('');
  const [leave,setLeave]=useState([]);
  const [loading, setLoading] = useState(false);
   const[error,setError]=useState('');
   const [leaveType, setLeaveType] = useState('upcoming');
  const [data, setData] = useState([]);


  

  const token = localStorage.getItem('token');
 const apiUrl = import.meta.env.VITE_API_URL;

   //studentInformation
         async function fetchData(){
       const res = await axios.get(`${apiUrl}/api/auth/studentinfo`, {
          headers: { Authorization: `Bearer ${token}` }
        }) 
        setUser(res.data);
      }
  //leaveHistoryOption
     
  async function fetchHistory(){
    const res = await axios.get(`${apiUrl}/api/auth/leaveHistory`, {
       headers: { Authorization: `Bearer ${token}` }
     }) 
     const today = dayjs().startOf('day');

      const filtered = res.data
        .filter((leave) => {
          const start = dayjs(leave.startDate).startOf('day');
          if (leaveType === 'past') return start.isBefore(today);
          if (leaveType === 'upcoming') return start.isAfter(today);
          return false;
        })
        .map((leave) => ({
          key: leave._id,
          startDate: dayjs(leave.startDate).format('YYYY-MM-DD'),
          endDate: dayjs(leave.endDate).format('YYYY-MM-DD'),
          reason: leave.reason || leave.leaveType,
          isUpcoming: dayjs(leave.startDate).isAfter(today)
        }));
    setData(filtered);
     setLeave(res.data);
     setLoading(false)
    }

      useEffect(() => {
        fetchData();
        
      }, []);
      useEffect(() => {
        if (leaveType === 'holiday') {
          setData(HOLIDAYS);
        } else {
          fetchHistory();
        }
      }, [leaveType]);

//leaveform
      const onFinish = async () => {
        try {
              await axios.post(`${apiUrl}/api/auth/leaveform`,
           {  reason,
            startDate: dates[0].toISOString(),
            endDate: dates[1].toISOString()},{headers : { Authorization: `Bearer ${token}` }}
         );
         message.success('Leave applied');
         setDates([]);
      setReason('');
      setVisible(false);
      fetchData();
      fetchHistory();
        } 
        catch (error) {
         console.log(error);
         if(error.response && !error.response.data.success){
          setError(error.response.data.error)
          }else{
            setError("server error");
          }
        }
     }
   //cancel the leave
   const handleCancel = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/auth/leaveCancel`, {
        data:{ id },
        headers: { Authorization: `Bearer ${token}` }
      }) ; 
      message.success('Leave cancelled and balance restored');
      fetchHistory();
      fetchData();
    } catch (err) {
      message.error('Failed to cancel leave');
    }
  };
   
   

        const baseColumns  = [
          
          {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate'
          },
          {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate'
          },
          {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason'
          },
         
        ];

// Add "Cancel" column only for upcoming
const columns = leaveType === 'upcoming'
  ? [
      ...baseColumns,
      {
        title: 'Action',
        dataIndex: 'action',
        render: (_, record) =>
          record.isUpcoming ? (
            <Button danger onClick={() => handleCancel(record.key)}>
              Cancel
            </Button>
          ) : null,
      },
    ]
  : baseColumns;
       
  return (
    <>
    <div>
     
    <h4>Welcome - {user?.username}</h4>
    <p>Leave Balance- {user?.leaveBalance}days</p>
    <div className='d-flex justify-content-end pb-5 me-5'>
    <Button type="primary" style={{alignItems:'center', position: 'fixed',
    top: 80,
    right: 40,
    zIndex: 1000,}}onClick={() => setVisible(true)}>Apply for Leave</Button>
    </div>
    <Modal
      title="Apply for Leave"
      visible={visible}
      onCancel={() => setVisible(false)}
      option={loading}
      footer={null}
    >
      {error && <p className='text-danger '>{error}</p>}
      <Form layout="vertical" onFinish={onFinish}>
      
      <Input
        placeholder="Enter Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        style={{ margin: '10px 0' }}
      />
      <RangePicker
        value={dates}
        onChange={(val) => setDates(val)}
        style={{ marginBottom: '10px', display: 'block' }}
      />
       <Button htmlType="submit" type="primary">Submit</Button>
      </Form>
    </Modal>
   
  </div>
  <div>
      <Select value={leaveType} onChange={setLeaveType} style={{ marginBottom: 16, width: 220 }}>
        <Option value="past">Past Leave</Option>
        <Option value="upcoming">Upcoming Leave</Option>
        <Option value="holiday">Holiday Leave</Option>
      </Select>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
 
  </>
  )
}
