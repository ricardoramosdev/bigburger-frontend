import { Checkbox, Form, Input, Modal, Table, Typography } from 'antd'
import Column from 'antd/lib/table/Column'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ListaUsuarios } from './userList/UserList'

export const User = () => {
    const [users, setUsers] = useState([]);
    const [actionDialog, toggleActionDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');



    async function loadUsers() {
        const res = await axios.get(`http://localhost:3100/api/users`);
        const usersDB = res.data.users;
        setUsers(usersDB);
        console.log(usersDB);
    }

    const handleDeleteUser = async (id) => {
        try {
            console.log(id)
            let userDE = users.find(user => user._id === id)
            const deletedUser = await axios.delete(`http://localhost:3100/api/user/${id}`)
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userEditing, setUserED] = useState("")

    const handleEditUser = async (user, id) => {
        setIsModalVisible(true);
        try {
            const userEditing = users.find(user => user._id === id);

            // const userRoleEdit = await axios.put(`http://localhost:3100/api/user/${id}`, user)
            console.log(userEditing)
        }
        catch (error) {

        }
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    //EDITAR USUARIOS

    const handleActiveStatus = async (value, property, id) => {
        try {
            const user = users.find(user => user._id === id);
            user[property] = value;
            const updUser = await axios.put(`http://localhost:3100/api/user/${id}`, user)
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
            <ListaUsuarios handleActiveStatus={handleActiveStatus} functionDelete={handleDeleteUser} users={users} functionEditUser={handleEditUser} />
            <Modal title={dialogTitle} visible={actionDialog} onOk={hiddeModal} onCancel={hiddeModal}>
                {dialogMessage}
            </Modal>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} handleEditUser={handleEditUser}>
                <Form
                >
                    <Form.Item
                        label="Rol"
                        name="role"
                    >
                        <Input placeholder={userEditing.role}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>


    )

}