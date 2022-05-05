import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { InputNumber, Layout, Modal, PageHeader, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../../constants/endpoints";
import "./Cart.scss";
import { CartItem } from "./CartItem";
import { useAuth } from "../../auth/useAuth";
export const Cart = () => {
const auth = useAuth()

  const initialCart = JSON.parse(localStorage.getItem("inCart")) || [];

  const [order, setOrder] = useState(initialCart);
  localStorage.setItem("inCart", JSON.stringify(order));

  //Eliminar item completo
  const removeFromCart = (id) => {
    const updateOrder = order.filter((item) => item._id !== id);
    setOrder(updateOrder);
    totalToPay()

  };
  
  //   Cambiar cantidad
    const changeQuantity = (id,value)=>{
    console.log(value , id)
      const index=order.findIndex(item => item._id===id)
      const item= order[index]
      let item1={...item, cantidad:value}
      console.log(item1)
      order.splice(index,1,item1)
      setOrder(order)
      totalToPay()


   }

  const[ total, updTotal]=useState(0)
  const totalToPay = ()=>{
       
    const sumTotal = order.reduce((counter,item)=>
      counter + (item.price*item.cantidad),0
    );
    updTotal(sumTotal)
  }
 // updateTotalToPay(total)
  const addItem = () => {
    //chequear si el producto agregado ya existe en la lista
    //IF no existe agregar producto a la lista de local storage ELSE sumar una unidad
  };
  const sendOrder = async (user,menu)=>{
    const ticket ={
      user:user,
      menu:menu,
      total:total              }
    const sendTicket = await axios.post(`${URL}/order`, ticket)
    console.log('Enviar orden', ticket)
    Modal.info({
      title: 'Orden enviada',
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      content: `Recibimos tu pedido correctamente, su total a abonar es $${total}`,
      okText: 'Ok',
      okType: "ghost"

  })
   
  }
  useEffect(()=>{
    totalToPay()},[]
  )

  return (
    <>
      <div className="order-header">
      <Typography.Title level={1}>Mi Pedido</Typography.Title>
      </div>
      <div className="order-body">
        <h2>Estas llevando:</h2>
        {order.map((item, index) => (
          // <CartItem data={item} index={index} key={item._id}removeFromCart={removeFromCart} total={()=>totalToPay()} />
          <div className='order-card'key={item._id} data={item} index={index} >
          <img className='order-img'src={item.IMG} alt='' />
          <div className='order-detail'>
              <h4>{item.name}</h4>
              <div className='order-data'>
                  <div className='item-price'>${item.price}</div>
                  <div className='item-edit'>
                      <label htmlFor="qty">Cantidad: </label>
                      
                      <InputNumber 
                      min={1}
                      defaultValue={item.cantidad}
                      onChange={(value)=>changeQuantity(item._id,value)}
                      />
                      
                  </div>
                  <button onClick={()=>removeFromCart(item._id)}><DeleteOutlined /></button>
              </div>
          </div>
      </div>
        ))}
      </div>
      <div className="order-checkout">
        <div className="total-amount">El monto total a paga es : ${total||"error"}</div>
        <button onClick={()=>sendOrder(auth.user,order,total)}>Confirmar Orden</button>
      </div>
    </>
  );
};
