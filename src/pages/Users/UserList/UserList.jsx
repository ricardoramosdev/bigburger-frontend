import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Checkbox, Button } from 'antd'
import { Table, Space } from 'antd';
import '../../Orders/OrderList/OrderList.scss'
const { Column } = Table

export const ListaUsuarios = ({ functionDelete, handleRoleUser, users, handleActiveStatus }) => {
    // function onChange(pagination, filters, sorter, extra) {
    //   console.log('params', pagination, filters, sorter, extra);
    // }

    return (
        <>
            <Table dataSource={users} className='tabla'>
                <Column title="Nombre y Apellido" dataIndex="fullName" key="fullName" />
                <Column title="Correo electrónico" dataIndex="email" key="email" />
                <Column
                    title="Rol"
                    dataIndex="role"
                    key="role"
                    render={(role, user) => (
                        <Space size="middle">
                            <span>{user.role}</span>
                            {/* BOTON PARA EDITAR  */}
                            <Button type='secondary' onClick={() => handleRoleUser(user._id)}><EditOutlined /></Button>
                        </Space>

                    )}
                />

                <Column
                    title="Active"
                    key="action"
                    dataIndex="active"
                    render={(active, user) => (
                        <Space size="middle">
                            {/* CHECKBOX STATUS  */}
                            <Checkbox
                                checked={active}
                                onChange={(e) => {
                                    handleActiveStatus(e.target.checked, 'active', user._id)
                                }}
                            >
                            </Checkbox>

                        </Space>
                    )}
                />
                <Column
                    title="Eliminar usuario"
                    key="DeleteUser"
                    render={(user) => (
                        <Space size="middle">
                            {/* BOTON PARA BORRAR  */}
                            <Button type='primary' danger onClick={() => functionDelete(user._id)}><DeleteOutlined /> </Button>
                        </Space>
                    )}

                />
            </Table>;

        </>
    )
}
