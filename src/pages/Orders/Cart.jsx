import { Layout, PageHeader } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../../constants/endpoints";
import "./Cart.scss";
import { CartItem } from "./CartItem";
export const Cart = () => {
  const initialCart = JSON.parse(localStorage.getItem("inCart")) || [
    {
      _id: "625a5c23755f354c3081d0e0",
      name: "Uncle Sam",
      description:
        "Medallón 90grs x2, cheddar x2, bacon, cebolla y salsa mágica. Incluye papas fritas. GOD",
      price: 803,
      stock: true,
      categorie_id: "Vegetarianas",
      clientId: "Unknow",
      cretatedAt: "2022-04-16T06:03:15.733Z",
      __v: 0,
      updatedAt: "2022-04-24T20:39:34.556Z",
      cantidad:1
    },
    {
      _id: "6264a9180d548d04da92ba72",
      name: "holaaaa chau",
      description: "iosdkjdfkldsjkldsfjfsd",
      price: 10,
      stock: false,
      categorie_id: "Triples",
      clientId: "Unknow",
      cretatedAt: "2022-04-24T01:34:16.482Z",
      __v: 0,
      updatedAt: "2022-04-24T01:34:29.937Z",
      cantidad:1
    },
    {
      _id: "625c8d4587100a3a7e977dcc",
      name: "Doble cuarto ",
      description: "insta",
      price: 65,
      stock: false,
      categorie_id: "Vegetarianas",
      clientId: "Unknow",
      cretatedAt: "2022-04-17T21:57:25.209Z",
      __v: 0,
      updatedAt: "2022-04-24T20:13:25.272Z",
      cantidad:3
    }
  ];

  const [order, setOrder] = useState(initialCart);
  localStorage.setItem("inCart", JSON.stringify(order));
  const removeFromCart = (id) => {
    const updateOrder = order.filter((item) => item._id !== id);
    setOrder(updateOrder);
  };
  console.log(order);

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
  const sendOrder = async (order)=>{
    const tiket = await axios.put(`${URL}/orden`, order)
    console.log(tiket)
  }
  useEffect(()=>{
    totalToPay()},[]
  )

  return (
    <>
      <div className="order-header">
        <h1>Mi Pedido</h1>
      </div>
      <div className="order-body">
        <h2>Estas llevando:</h2>
        {order.map((item, index) => (
          <CartItem data={item} index={index} key={item._id}removeFromCart={removeFromCart} total={totalToPay}/>
        ))}
      </div>
      <div className="order-checkout">
        <div className="total-amount">El monto total a paga es : ${total||"error"}</div>
        <button onClick={()=>sendOrder(order)}>Confirmar Orden</button>
      </div>
    </>
  );
};
