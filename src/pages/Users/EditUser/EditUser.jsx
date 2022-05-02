import { Form, Input, Select } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'


const { Option } = Select;

export const EditUser = ({ userToEdit, updateRole }) => {
    console.log(userToEdit.role)

    function handleChange(event){
        const user = userToEdit;
        user.role =event;
        updateRole(user)
    }
    return (
        <>
        <Form>

        {userToEdit.role === 'ADMIN_ROLE' ? 'ADMINISTRADOR' : 'USUARIO'} <br />
            <Select  style={{ width: 120 }} onChange={handleChange}>
                <Option value="USER_ROLE">User</Option>
                <Option value="CLIENT_ROLE">Cliente</Option>
                <Option value="ADMIN_ROLE">Admin</Option>
            </Select>
        </Form>
        </>
        
    )
}
