import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Dropdown, Menu, Button, Input, Drawer, Spin, message, Typography } from 'antd';
import {UserOutlined,EditOutlined} from '@ant-design/icons'
import axios from 'axios';



const { Header } = Layout;
const { Title,Text } = Typography;
export const HeaderBar = () => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({});
  
  

  const token = localStorage.getItem('token');
  const apiUrl = import.meta.env.VITE_API_URL;
 
     useEffect(() => {
             async function fetchData(){
           const res = await axios.get(`${apiUrl}/api/auth/studentinfo`, {
              headers: { Authorization: `Bearer ${token}` }
            }) 
            setUser(res.data);
            setTempUser(res.data);
            setIsLoading(false);
          }
          fetchData();
          }, []);

 // Toggle Drawer visibility
 const showDrawer = () => setIsDrawerVisible(true);
 const closeDrawer = () => {
  setIsDrawerVisible(false);
  setEditMode(false);
    setTempUser(user);
}

 
 const handleEditClick = () => {
  setIsEditing(true);
};

const handleUpdate = () => {
  const updated = JSON.parse(localStorage.getItem("token"));
  setUser(updated);
  onUserUpdate();
};
const handleSave  = async () => {
 
  try {
      const res = await axios.put(`${apiUrl}/api/auth/studentinfoUpdate`, { username: tempUser.username,
        register: tempUser.register,standard: tempUser.standard,section: tempUser.section},
          {headers: { Authorization: `Bearer ${token}` } 
      })
      setUser(res.data);
      setEditMode(false);
          fetchData();
        } catch (err) {
          message.error('Update failed');
        }
      };
      
      if (isLoading) return <Spin tip="Loading..." />;
  return (
    <>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#D7D4D8',
          padding: '0 24px',
          boxShadow: '0 2px 8pxrgb(207, 215, 223)',
        }}
      >
        <Title level={3} style={{ fontFamily:'Times New Roman',color:'#071098',fontSize:30,marginLeft:350}}>
          Student Leave Management
        </Title>

        <Dropdown overlay={<Menu><Menu.Item onClick={showDrawer}>View Profile</Menu.Item></Menu>} trigger={['click']}>
        <Avatar style={{fontSize:20,color:'#156F11'}}>{user.username[0]}</Avatar>
      </Dropdown>
  {/* Drawer for Profile */}
  <Drawer
        title="User Profile"
        placement="right"
        width={400}
        onClose={closeDrawer}
        visible={isDrawerVisible}
        footer={
          editMode ? (
            <div style={{ textAlign: 'right' }}>
              <Button onClick={() => { setEditMode(false); setTempUser(user); }} style={{ marginRight: 8,marginBottom:50}}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleSave}style={{ marginBottom:50}}  
       >Save</Button>
            </div>
          ) : (
            <Button style={{ marginBottom:200,marginLeft:250,position:'static' }} type="primary" onClick={() => setEditMode(true)}>{<EditOutlined/>}</Button>
          )
        }
      >
         <Avatar style={{marginLeft:150, fontSize:30, height:70,width:70,marginBottom:30}}>{<UserOutlined/>}</Avatar>
        <div style={{ marginBottom: 20 }}>
          <Text  strong>Name:</Text>
          {editMode ? (
            <Input
              value={tempUser.username}
              onChange={(e) => setTempUser({ ...tempUser, username: e.target.value })}
            />
          ) : (
            <Text>{user.username}</Text>
          )}
        </div>
        <div style={{ marginBottom: 20 }}>
          <Text strong>Register:</Text>
          {editMode ? (
            <Input
            style={{ boxSizing:50 }}
              value={tempUser.register}
              onChange={(e) => setTempUser({ ...tempUser, register: e.target.value })}
            />
          ) : (
            <Text>{user.register}</Text>
          )}
        </div>
        <div style={{ marginBottom: 20 }}>
          <Text strong>Standard:</Text>
          {editMode ? (
            <Input
              value={tempUser.standard}
              onChange={(e) => setTempUser({ ...tempUser, standard: e.target.value })}
            />
          ) : (
            <Text>{user.standard}</Text>
          )}
        </div>
        <div style={{ marginBottom: 2 }}>
          <Text strong>Section:</Text>
          {editMode ? (
            <Input
              value={tempUser.section}
              onChange={(e) => setTempUser({ ...tempUser, section: e.target.value })}
            />
          ) : (
            <Text>{user.section}</Text>
          )}
        </div>
      </Drawer>
      </Header>
    </>
  )
}
