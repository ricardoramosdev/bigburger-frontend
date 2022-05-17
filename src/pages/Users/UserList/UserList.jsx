import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Checkbox, Button, Row, Pagination } from 'antd';
import { Table, Space } from 'antd';
import './userList.scss'
import '../../Orders/OrderList/OrderList.scss'
const { Column } = Table
export const ListaUsuarios = ({ functionDelete, handleActiveStatus, users, functionEditUser}) => {

    return (
        <>
            <Table className='Columns tabla' dataSource={users} rowKey="_id">
                <Column className="Active"
                    title="Active"
                    key="action"
                    dataIndex="active"
                    
                    render={(active, user) => (
                        <Space size="small">
                            {/* CHECKBOX STATUS  */}
                            <Checkbox className='checkbox'
                                checked={active}
                                onChange={(e) => {
                                    handleActiveStatus(e.target.checked, 'active', user._id)
                                }}
                            >
                            </Checkbox>

                        </Space>
                    )}
                />

                <Column className="fullName"
                    title="Nombre y Apellido" 
                    dataIndex="fullName" 
                    key="fullName" 
                    
                    />

                <Column className="Email"
                    title="Correo electrónico" 
                    dataIndex="email" 
                    key="email" 
                    
                />
                <Column className="Role"
                    title="Rol"
                    dataIndex="role"
                    key="role"
                    render={(role) => (
                        <span className='spanRole'>{role}</span>
                    )}
                    
                />

                <Column className="Actions"
                    title="Editar"
                    key="EditarUsuario"
                    
                    render={(user) => (
                        <Space size="middle">
                            <Button type="secondary" onClick={() => functionEditUser(user, user._id)}>
                                <EditOutlined />
                            </Button>
                        </Space>
                    )}
                />

                <Column className="Actions"
                    title="Eliminar"
                    key="DeleteUser"
                    
                    render={(user) => (
                        <Space size="middle">
                            {/* BOTON PARA BORRAR  */}
                            <Button type='primary' className='BtnD' danger onClick={() => functionDelete(user._id)}><DeleteOutlined /></Button>
                        </Space>
                    )}
                />
                {/* <Pagination defaultCurrent={1} total={50} />; */}

            </Table>;

        </>
    )

}

