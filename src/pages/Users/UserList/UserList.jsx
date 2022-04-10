import { List } from 'antd'
import axios from 'axios'
import React from 'react'

export const UserList = () => {
    const userList = async ()=>{
        const user = await axios.get(`${URL}/users`)
    }
  return (
    <List.Item>

    </List.Item>
  )
}
