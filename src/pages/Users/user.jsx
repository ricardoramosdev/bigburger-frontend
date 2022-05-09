import { Checkbox, Form, Input, Modal, Table, Typography } from 'antd'
import Column from 'antd/lib/table/Column'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { EditUser } from './EditUser/EditUser'
import { ListaUsuarios } from './UserList/UserList'
import { URL } from '../../constants/endpoints'

export const User = () => {
    const [users, setUsers] = useState([]);
    const [actionDialog, toggleActionDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');


    async function loadUsers() {
        const res = await axios.get(`${URL}/users`);
        console.log(res)
        const usersDB = res.data.users;
        setUsers(usersDB);
        console.log(usersDB);

    }

    const handleDeleteUser = async (id) => {
        try {
            console.log(id)
            let userDE = users.find(user => user._id === id)
            const deletedUser = await axios.delete(`${URL}/user/${id}`)
            console.log(deletedUser)
            const u = users.filter(user => user._id !== id);
            setUsers(u)
            console.log(u)
            setDialogMessage(deletedUser.data.msg);
            setDialogTitle(`USUARIO: "${userDE.fullName}" ELIMINADO`)
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null)
    const handleEditUser = async (user, id) => {
        console.log(id)
        try {
            const userEditing = users.find(user => user._id === id);
            console.log(userEditing)
            setUserToEdit(userEditing)
            setIsModalVisible(true);
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleOk = () => {

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setUserToEdit(null)
    };

    const updateRole = async (userUpdated) => {
        await axios.put(`${URL}/user/${userUpdated._id}`, userUpdated);
        // setIsModalVisible(false)
        loadUsers();
    }

    //EDITAR USUARIOS

    const handleActiveStatus = async (value, property, id) => {
        try {
            const user = users.find(user => user._id === id);
            user[property] = value;

            const updUser = await axios.put(`${URL}/user/${id}`, user)
            setUsers([...users])
            setDialogMessage(updUser.data.msg);
            if(user.active){
                setDialogTitle(`USUARIO: "${user.fullName}" ACTIVADO`)
                toggleActionDialog(true)
            } else { 
                setDialogTitle(`USUARIO: "${user.fullName}" DESACTIVADO`)
                setDialogMessage()
                toggleActionDialog(true)
            }
            
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

            <ListaUsuarios handleActiveStatus={handleActiveStatus} functionDelete={handleDeleteUser} users={users} functionEditUser={handleEditUser} />
            <Modal title={dialogTitle} visible={actionDialog} onOk={hiddeModal} onCancel={hiddeModal}>
                {dialogMessage}
            </Modal>
            <Modal title="Editar usuario" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} handleEditUser={handleEditUser} >
                <EditUser userToEdit={userToEdit} updateRole={updateRole}></EditUser>

            </Modal>
        </>
    )

}