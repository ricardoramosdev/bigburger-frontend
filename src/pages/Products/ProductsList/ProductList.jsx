import React, { createRef, useState } from 'react'
import { Table, Button, Modal, Input, Form } from 'antd'
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
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "Categoria",
            dataIndex: "categorie_id",
            key: "categorie_id"
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
            <br />
            <Table columns={columns} dataSource={productsDBToList} />
        </>
    )
}
