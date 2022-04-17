import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ProductsAdd } from "./ProductsAdd/ProductsAdd"
import { Button, Checkbox, Form, Input, InputNumber, Modal, Select, Switch, Typography } from 'antd'
import { ProductList } from './ProductsList/ProductList'
import { CheckCircleOutlined, CloseOutlined, ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
const URL = 'http://localhost:3100/api'
const { Option } = Select;


export const Products = () => {

    const [products, productsState] = useState([])
    const [totalProducts, totalProductsUpdate] = useState(0)



    // AGREGAR PRODUCTO 
    const addProduct = (nuevoProducto) => {
        const newProductArray = [...products, nuevoProducto]
        productsState(newProductArray)
        totalProductsUpdate(totalProducts + 1)
        Modal.info({
            title: 'Producto agregado',
            icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            content: `El producto ${nuevoProducto.name} ha sido agregado correctamente`,
            okText: 'Ok',
            okType: "ghost"

        })
    }




    // BORRAR PRODUCTO MODAL
    const deleteModal = (fila, id) => {
        Modal.confirm({
            title: `¿Está seguro de que quiere eliminar el producto ${fila.name}?`,
            icon: <WarningOutlined />,
            content: `El producto se borrará de forma permanente`,
            onOk: () => {
                deleteProduct(fila, id)
            },
            okText: `Borrar`,
            okType: "danger"
        })
    }

    // BORRAR PRODUCTO
    const deleteProduct = async (fila, id) => {

        try {
            console.log(id)
            const deletedProduct = await axios.delete(`${URL}/product/`, {
                params: {
                    product_id_delete: id
                }
            });
            const newArrayDelete = products.filter(prod => prod._id !== id)
            productsState(newArrayDelete)

            totalProductsUpdate(newArrayDelete.length)

            Modal.info({
                title: 'Producto eliminado',
                icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
                content: `El producto ${fila.name} ha sido eliminado correctamente`,
                okText: 'Ok',
                okType: "ghost"

            })

        } catch (error) {
            Modal.error({
                title: 'ERROR',
                icon: <CloseOutlined style={{ color: "#FF0000" }} />,
                content: `Ocurrió un error al borrar el producto ${fila.name}`,
                okText: 'Ok',

            })
        }
    }



    useEffect(() => {
        loadProducts()
    }, []);



    // CARGAR PRODUCTOS
    const loadProducts = async () => {
        try {
            const response = await axios.get(`${URL}/products`);
            const productsDB = response.data.products
            const total = response.data.total
            productsState(productsDB);
            totalProductsUpdate(total);

            Modal.info({
                title: 'Productos obtenidos',
                icon: <ExclamationCircleOutlined />,
                content: `Se obtuvieron un total de ${total} productos`,
                okText: 'Ok',

            })

        } catch (error) {
            console.log(error.response.data.msg)
        }
    }



    // EDITAR PRODUCTOS 
    const [productEdit, setProductEdit] = useState(false)
    const [productEditing, setProductEditing] = useState(null)

    const editProductModal = async (fila, id) => {
        console.log(id)
        setProductEdit(true)
        setProductEditing({ ...fila })
    }

    return (
        <>
            <div className='p10'>
                <Typography.Title level={2}>Administración | Productos</Typography.Title>
                <ProductsAdd addProduct={addProduct} totalProducts={totalProducts} />
                <ProductList productsDBToList={products} deleteProduct={deleteModal} editModal={editProductModal} />
                <h1>Total: {totalProducts}</h1>
            </div>


            {/* MODAL DE EDICION */}
            <Modal
                title={"Editar producto"}
                visible={productEdit}
                onCancel={() => {
                    setProductEdit(false)
                }}
                onOk={() => {
                    setProductEdit(false)
                }}
                okText={"Editar"}
            >

            <Form layout='vertical'>
                <Form.Item label="Nombre">
                    <Input value={productEditing?.name} />
                </Form.Item>

                <Form.Item label="Descripcion">
                    <TextArea value={productEditing?.description} />
                </Form.Item>

                <Form.Item label="Precio">
                    <InputNumber value={productEditing?.price} addonBefore="$" />
                </Form.Item>

                <Form.Item label="Stock">
                    <Checkbox value={productEditing?.stock} />
                </Form.Item>

                <Form.Item label="Categoría">
                    <Select value={productEditing?.categorie_id}>
                        <Option value="Simples">Simples</Option>
                        <Option value="Dobles">Dobles</Option>
                        <Option value="Triples">Triples</Option>
                        <Option value="Vegetarianas">Vegetarianas</Option>
                    </Select>
                </Form.Item>
            </Form>
            </Modal>

        </>
    )
}
