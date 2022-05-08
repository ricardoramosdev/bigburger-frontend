import { StarOutlined } from '@ant-design/icons';
import { Form, Input, Select } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import './EditUser.scss'


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
        <Form className='modalForm'>

        {userToEdit.role === 'ADMINISTRADOR' ? <b>ROL: <i>ADMINISTRADOR</i></b> : <b>ROL: <i>USUARIO</i></b>} <br />
            <Select  style={{ width: 120 }} onChange={handleChange} className='Select' value="modificar rol">
                <Option value="USUARIO">Usuario</Option>
                <Option value="ADMINISTRADOR">Administrador</Option>
            </Select>
        </Form>
        </>
        
    )
}
