import React, { useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Switch, Row, Col, Modal, } from 'antd';
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
import { CloseOutlined } from '@ant-design/icons';
const { Option } = Select;
const URL = 'http://localhost:3100/api'


export const ProductsAdd = ({ addProduct }) => {
    const addNewProduct = async (formData) => {
        try {
            const { data } = await axios.post(`${URL}/product`, formData );
            console.log('dataOne', data.nuevoProducto)
            addProduct(data.nuevoProducto)
        } catch (error) {
            Modal.info({
                title: 'Ocurrió un error al cargar el producto',
                icon: <CloseOutlined style={{ color:"#f80000" }}/>,
                content: `No se pudo establecer conexion con la base de datos`,
                okText: 'Ok',
                okType: "danger"
                
            })
        }
        
    }

    return (
        <Row>
            <Col xs={18} lg={12} offset={6}>
                <Form
                    layout='vertical'
                    name="product"
                    onFinish={addNewProduct}
                    initialValues={{ stock: true, price: 0 }}
                >
                    <Row gutter={16}>

                        <Col xs={24} lg={24}>
                            {/* NOMBRE */}
                            <Form.Item label="Nombre" name={"name"} rules={[{ required: true }]}>
                                <Input placeholder="Ingrese el nombre del producto" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} lg={24}>
                            {/* DESCRIPTION */}
                            <Form.Item label="Descripcion" name={"description"} rules={[{ maxlength: 250, required: true }]}>
                                <TextArea placeholder="Ingrese la descripcion del producto" rows={3} />
                            </Form.Item>
                        </Col>

                        <Col xs={12} lg={12}>
                            {/* PRECIO */}
                            <Form.Item label="Precio" name={"price"} rules={[{ type: 'number', min: 0, max: 10000, required: true }]}>
                                <InputNumber placeholder="Ingrese el precio del producto" addonBefore="$" />
                            </Form.Item>
                        </Col>

                        <Col xs={12} lg={12}>
                            {/* CATEGORIA */}
                            <Form.Item label="Categoría" name={"categorie_id"} rules={[{ required: true }]}>
                                <Select>
                                    <Option value="Simples">Simples</Option>
                                    <Option value="Dobles">Dobles</Option>
                                    <Option value="Triples">Triples</Option>
                                    <Option value="Vegetarianas">Vegetarianas</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col lg={12}>
                        {/* STOCK */}
                            <Form.Item label="Stock" name={"stock"} valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>

                        <Col lg={12}>
                        {/* BOTON */}
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Añadir
                                </Button>
                            </Form.Item>
                        </Col>
                        
                    </Row>
                </Form>
            </Col>
        </Row>
    )
}
