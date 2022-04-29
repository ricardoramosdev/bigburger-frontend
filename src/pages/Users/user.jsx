import { Form, Input, Modal, Typography } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ListaUsuarios } from './userList/UserList'

export const User = () => {
    const [users, setUsers] = useState([]);
    const [actionDialog, toggleActionDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');


    async function loadUsers() {
        const res = await axios.get(`http://localhost:3000/api/users`);
        const usersDB = res.data.users;
        setUsers(usersDB);
        console.log(usersDB);
    }

    const handleDeleteUser = async (id) => {
        try {
            console.log(id)
            let userDE = users.find(user => user._id === id)
            const deletedUser = await axios.delete(`http://localhost:3000/api/user/${id}`)
            console.log(deletedUser)
            const u = users.filter(user => user._id !== id);
            setUsers(u)
            setDialogMessage(deletedUser.data.msg);
            setDialogTitle(`USUARIO ${userDE.fullName} ELIMINADO`)
            toggleActionDialog(true)
        }
        catch (error) {
            console.log(error)
            setDialogMessage('Error al borrar el usuario');
            setDialogTitle(`ERROR`)
            toggleActionDialog(true)
        }
    }

    //EDITAR ROL DE USUARIO

    const [isModalVisible, setUserEdit] = useState(false);
    const [userEditing, setUserUD] = useState(true)


    const handleRoleUser = async (id) => {
        setUserEdit(true)
        try {
            const user = users.find(user => user._id === id);
            const userUd = await axios.put(`http://localhost:3000/api/user/${id}`, user)
            console.log(userUd.data)
            setUsers([...users])
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleOk = () => {
        setUserEdit(false);
    };

    const handleCancel = () => {
        setUserEdit(false);
    };
    //EDITAR USUARIOS

    const handleActiveStatus = async (value, property, id) => {
        try {
            const user = users.find(user => user._id === id);
            user[property] = value;
            const updUser = await axios.put(`http://localhost:3000/api/user/${id}`, user)
            console.log(updUser.data)
            setUsers([...users])
            setDialogMessage(updUser.data.msg);
            setDialogTitle(`USUARIO ${user.fullName} MODIFICADO CORRECTAMENTE`)
            toggleActionDialog(true)
        } catch (error) {
            console.log(error)
            setDialogMessage(`Error al modificar el usuario`);
            setDialogTitle(`ERROR`)
            toggleActionDialog(true)
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const hiddeModal = () => toggleActionDialog(false)

    return (
        <>
            <Typography.Title level={1}>Usuarios</Typography.Title>
            {/* <UserList/> */}
            <ListaUsuarios handleActiveStatus={handleActiveStatus} functionDelete={handleDeleteUser} handleRoleUser={handleRoleUser} users={users} />
            <Modal title={dialogTitle} visible={actionDialog} onOk={hiddeModal} onCancel={hiddeModal}>
                {dialogMessage}
            </Modal>
            <Modal title="Editar ROL de usuario"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form>
                    <label for="UserROl">Rol de usuario</label>
                    <select name="Rol" id="SelectRol" value="ss" onChange={handleRoleUser}>
                        <option value="ADMIN_ROLE">ADMIN_ROLE</option>
                        <option value="USER_ROLE">USER_ROLE</option>
                    </select>
                </Form>

            </Modal>
        </>


    )

}