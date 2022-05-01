import userEvent from '@testing-library/user-event';
import { Select, Table } from 'antd';
import { Option } from 'antd/lib/mentions';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URL } from '../../../constants/endpoints';

export const OrderList = () => {
  const[orders, updOrders] = useState()
  //Traer ordenes de la base de datos
  const getOrders = async ()=>{
    try{
    const dataFromDB = await axios.get(`${URL}/orders`)
    console.log(dataFromDB)
    const ordersDB = dataFromDB.data.ticket;
    
    updOrders(ordersDB)
    console.log(orders)


  }catch{
    console.log('No se pudo obtener ')
  }
}
  useEffect(() => {
    getOrders()
}, []);

  const columns = [
    {
      title: 'Usuario',
      key: 'user',
      render:(item)=>(item.user._id)
    },
    {
      title: 'Pedido',
      render:(item)=>(item._id),
      key: 'menu',
    },
    {
      title: 'Monto ($)',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Estado',
      render:(item)=>(
        <Select defaultValue={item.state} style={{ width: 120 }} >
          <Option value="false">Pendiente</Option>
          <Option value="true">Realizado</Option>
        </Select>),
      
      key: 'state'
    },
  ];
  
  return (
    <>
    <h1>Pedidos</h1>
    <Table dataSource={orders} columns={columns} />;
   
    </>
  )
}
