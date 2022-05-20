import { Checkbox, Form, Input, Modal, Table, Typography } from 'antd'
import Column from 'antd/lib/table/Column'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { EditUser } from './EditUser/EditUser'
import { ListaUsuarios } from './UserList/UserList'
// import { URL } from '../../constants/endpoints'
import { useAuth } from '../../auth/useAuth'
const URL = process.env.REACT_APP_API_URL;

export const User = () => {
    const auth= useAuth()
    const [users, setUsers] = useState([]);
    const [actionDialog, toggleActionDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');


    async function loadUsers() {
        const res = await axios.get(`${URL}/users`,{
            headers:{authorization:auth.token}
        });
        const usersDB = res.data.users;
        setUsers(usersDB);
    }

    const handleDeleteUser = async (id) => {
        try {
            console.log(id)
            let userDE = users.find(user => user._id === id)
            const deletedUser = await axios.delete(`${URL}/user/${id}`,{
                headers:{authorization:auth.token}
            })
            console.log(deletedUser)
            const u = users.filter(user => user._id !== id);
            setUsers(u)
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
        try {
            const userEditing = users.find(user => user._id === id);
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
        await axios.put(`${URL}/user/${userUpdated._id}`, userUpdated,{
            headers:{authorization:auth.token}
        });
        // setIsModalVisible(false)
        loadUsers();
    }

    //EDITAR USUARIOS

    const handleActiveStatus = async (value, property, id) => {
        try {
            const user = users.find(user => user._id === id);
            user[property] = value;

            const updUser = await axios.put(`${URL}/user/${id}`, user,{
                headers:{authorization:auth.token}
            })
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