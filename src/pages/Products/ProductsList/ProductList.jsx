import React from 'react'
import { Table, Button, Image, Checkbox} from 'antd'
import "antd/dist/antd.css"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'


export const ProductList = ({ productsDBToList, deleteProduct, editModal }) => {

    const columns = [ 
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id"
        },
        {
            title: "Nombre",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Descripcion",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Precio",
            dataIndex: "price",
            key: "price"
        },
        {
            title: "Disponible",
            dataIndex: "stock",
            key: "stock",
            render: (stock) => (
                <Checkbox checked={stock}/>
            )
        },
        {
            title: "Categoria",
            dataIndex: "categorie_id",
            key: "categorie_id"
        },
        {
            title: "Imágen",
            key: "price",
            render: (fila) => (
                
                <Image src={fila.IMG ? fila.IMG : null} />
            ) 
        },
        {
            title: "Acciones",
            key: "actions",
            render: (fila) => (
                <>
                    <Button type="link" onClick={() => editModal(fila, fila._id)}>
                        <EditOutlined style={{ color:"#000000" }} />
                    </Button> 
                    {"      "}
                    <Button type="link" danger onClick={() => deleteProduct(fila, fila._id)}>
                        <DeleteOutlined />
                    </Button>
                </>
            ),
        },
    ]

    return (
        <>
            <br />
           
            <Table columns={columns} dataSource={productsDBToList} className={"tabla"}/>
        </>
    )
}
