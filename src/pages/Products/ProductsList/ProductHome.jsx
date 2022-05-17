import { CloseOutlined } from '@ant-design/icons'
import { Card, Col, InputNumber, Modal, notification, Row } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import  './ProductHome.scss'
// import { URL } from '../../../constants/endpoints'

const URL = process.env.REACT_APP_API_URL;

export const ProductHome = ({bCount}) => {

    const [products, productsState] = useState([])
    useEffect(() => {
        loadProducts()
    }, []);



    // CARGAR PRODUCTOS
    const loadProducts = async () => {
        try {
            const response = await axios.get(`${URL}/products`);
            const productsDB = response.data.products
           
            productsState(productsDB);

        } catch (error) {
            Modal.error({
                title: 'ERROR',
                icon: <CloseOutlined style={{ color: "#FF0000" }} />,
                content: `Ocurrió un error al cargar los productos`,
                okText: 'Ok',

            })
        }
    }

    //Agregar al carrito
    const addToCart = (id)=>{
        const productSelected = products.find(el=>el._id==id)
        const inCart = JSON.parse(localStorage.getItem('inCart'))||[]
        const itemInCart = inCart.find(item=>item._id===productSelected._id)
        let newCart=[];
        itemInCart?
        (
            newCart = inCart.map(item=>item._id===productSelected._id?{...item,cantidad:item.cantidad+1}:item)
            
        )
        :
        (
            newCart = [...inCart,{...productSelected, cantidad:1}]
        );
        notification['success']({
            message: 'Agregado al carrito',
            description:
              `${productSelected.name} agregado correctamente`,
            duration:2,
            placement: 'topRight',
            top:70
          });
        localStorage.setItem('inCart',JSON.stringify(newCart))

        bCount(newCart)

    }
  return (
    <>
    <div className="site-card-wrapper">
        <Row gutter={10}>
                {products.map(el=>(
                    
                <Card key={el._id}className='card-container'bordered={false}>
                <img src={el.IMG} alt={el.name} />
                <div className="card-info">
                    <h3>{el.name}</h3>
                    {el.description}
                    <br/>
                    <b>${el.price}</b>
                </div>
                <div className="card-action">
                   
                    <button onClick={()=>addToCart(el._id)}>Agregar</button></div>
                </Card>
                ))
            }
        </Row>
    </div>
    </>
  )
}
