import { List } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { URL } from '../../../constants/endpoints'

export const UserList = () => {
    
    const[users, usersUpdated]= useState([])
    

    const loadUsers = async ()=>{
        const { data } = await axios.get(`${URL}/users`)
        const loadUsers = data.users
        usersUpdated(loadUsers)
        console.log(loadUsers)
    }
    
  return (
    <>
    <List.Item>
      <button onClick={()=>loadUsers()}>Obtener lista de usuarios</button>
    </List.Item>
    <List
    itemLayout="horizontal"
    dataSource={users}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          
          title={<a href="https://ant.design">{item.title}</a>}
          description={item.fullName}
        />
      </List.Item>
       )}
       />
       
  </>
  )
}
