import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ProductsAdd } from "./ProductsAdd/ProductsAdd"
import {  Checkbox, Form, Input, Modal, Select, Typography } from 'antd'
import { ProductList } from './ProductsList/ProductList'
import { CheckCircleOutlined, CloseOutlined, ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import "./Products.css"
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

        loadProductsNoModal()

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
            // console.log(id)
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
            Modal.error({
                title: 'ERROR',
                icon: <CloseOutlined style={{ color: "#FF0000" }} />,
                content: `Ocurrió un error al cargar los productos`,
                okText: 'Ok',

            })
        }
    }

    // CARGAR PRODUCTOS SIN MODAL
    const loadProductsNoModal = async () => {
        try {
            const response = await axios.get(`${URL}/products`);
            const productsDB = response.data.products
            const total = response.data.total
            productsState(productsDB);
            totalProductsUpdate(total);

        } catch (error) {
            Modal.error({
                title: 'ERROR',
                icon: <CloseOutlined style={{ color: "#FF0000" }} />,
                content: `Ocurrió un error al cargar los productos`,
                okText: 'Ok',

            })
        }
    }



    // EDITAR PRODUCTOS 
    const [productEdit, setProductEdit] = useState(false)
    const [productEditing, setProductEditing] = useState(null)

    // ABRIR MODAL DE EDICION
    const editProductModal = async (fila) => {
        setProductEdit(true)
        // guardo el juego en una variable
        let searchedProduct = products.find(product => product._id === fila._id)

        // console.log(searchedProduct)

        // actualizo el estado y agrego al juego seleccionado
        setProductEditing(searchedProduct)
    }


    // CERRAR MODAL DE EDICION
    const resetEdit = () => {
        setProductEdit(false)
        setProductEditing(null)
    }




    return (
        <>
            {/* INFORMACION PRINCIPAL */}
            <div className='p10'>
                <ProductsAdd addProduct={addProduct} totalProducts={totalProducts} />
                <ProductList productsDBToList={products} deleteProduct={deleteModal} editModal={editProductModal} />
                <h1>Total: {totalProducts}</h1>
            </div>


            {/* MODAL DE EDICION */}
            <Modal
                title={"Editar producto"}
                visible={productEdit}
                okText={"Editar"}
                onCancel={() => {
                    resetEdit()
                }}
                onOk={() => {
                    productsState((pre) => {

                        pre.map((product) => {

                            if (product._id === productEditing._id) {
                                return productEditing
                            }
                        })
                    })

                    // PETICION PUT PARA EDITAR
                    const uploadChanges = async () => {
                        try {
                            await axios.put(`${URL}/product/upd_id`, productEditing, {
                                params: {
                                    updateId: productEditing._id
                                }
                            })
                            Modal.info({
                                title: 'Producto editado',
                                icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
                                content: `El producto ${productEditing.name} ha sido modificado correctamente`,
                                okText: 'Ok',
                                okType: "ghost"
                            })
                            loadProductsNoModal()

                        } catch (error) {
                            Modal.error({
                                title: 'ERROR',
                                icon: <CloseOutlined style={{ color: "#FF0000" }} />,
                                content: `Ocurrió un error al editar el producto ${productEditing.name}`,
                                okText: 'Ok',

                            })
                        }
                    }
                    uploadChanges()
                    resetEdit()
                }}
            >

                {/* FORMULARIO PARA EDITAR JUEGO */}
                <Form layout='vertical'>
                    <Form.Item label="Nombre">
                        <Input value={productEditing?.name} onChange={(e) => {
                            setProductEditing((pre) => {
                                return { ...pre, name: e.target.value }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item label="Descripcion">
                        <TextArea value={productEditing?.description} onChange={(e) => {
                            setProductEditing((pre) => {
                                return { ...pre, description: e.target.value }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item label="Precio">
                        <input className='inputEdit' type={"number"} value={productEditing?.price} onChange={(e) => {
                            setProductEditing((pre) => {



                                return { ...pre, price: e.target.value }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item label="Categoría">
                        <select value={productEditing?.categorie_id} 
                        className='inputEdit'
                        onChange={(e) => {
                            setProductEditing((pre) => {
                                return { ...pre, categorie_id: e.target.value }
                            })
                        }}>
                            <option value="Simples">Simples</option>
                            <option value="Dobles">Dobles</option>
                            <option value="Triples">Triples</option>
                            <option value="Vegetarianas">Vegetarianas</option>
                        </select>
                    </Form.Item>

                    <Form.Item label="Imagen">
                        <Input value={productEditing?.IMG} onChange={(e) => {
                            setProductEditing((pre) => {
                                return { ...pre, IMG: e.target.value }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item label="Stock">
                        <Checkbox checked={productEditing?.stock} onChange={(e) => {
                            setProductEditing((pre) => {

                                return { ...pre, stock: e.target.checked }
                            })
                        }} />
                    </Form.Item>
                </Form>
            </Modal>

        </>
    )
}
