import { DeleteOutlined } from '@ant-design/icons';
import { Checkbox, Button } from 'antd';
import { Table, Space } from 'antd';


const { Column } = Table




export const ListaUsuarios = ({ functionDelete, handleActiveStatus, users, functionEditUser}) => {



    // function onChange(pagination, filters, sorter, extra) {
    //   console.log('params', pagination, filters, sorter, extra);
    // }

    return (
        <>
            <Table dataSource={users}>
                <Column title="Nombre y Apellido" dataIndex="fullName" key="fullName" />
                <Column title="Correo electrónico" dataIndex="email" key="email" />
                <Column
                    title="Rol"
                    dataIndex="role"
                    key="role"
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
                <Column
                    title="Editar usuario"
                    key="EditarUsuario"
                    render={(user) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => functionEditUser(user, user._id)}>
                                EDITAR
                            </Button>
                        </Space>
                    )}
                />
            </Table>;

        </>
    )
}