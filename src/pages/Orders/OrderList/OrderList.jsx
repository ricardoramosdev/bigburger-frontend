import userEvent from '@testing-library/user-event';
import { Select, Table, Typography } from 'antd';
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
    const orderToRender= ordersDB.map(el=>({
      key:el._id,
      user:el.user.fullName,
      menu:el.menu,
      state:el.state,
      total:el.total
    }))

    
    updOrders(orderToRender)
    console.log(orderToRender)


  }catch{
    console.log('No se pudo obtener ')
  }
}
  useEffect(() => {
    getOrders()
}, []);

  const columns = [
    {
      title: 'Pedido',
      render:(item)=>(item.key),
      key: 'menu',
    },
    {
      title: 'Usuario',
      key: 'user',
      render:(item)=>(item.user)
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
          <Select.Option value="false">Pendiente</Select.Option>
          <Select.Option value="true">Realizado</Select.Option>
        </Select>),
      
      key: 'state'
    },
  ];
  
  return (
    <>
    <Typography.Title level={1}>Pedidos</Typography.Title>
    <Table dataSource={orders} columns={columns} expandable={{
      expandedRowRender: record => <div style={{ 
        margin: 0,
        padding:0 ,
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'column',
        width:'50%'

       }}>{record.menu.map(el=>(<><div style={{ 
        margin: 0,
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        width:'100%'
       }}><div>{el.name}</div><div>Cantidad:{el.cantidad }</div></div></>))}</div>,
      rowExpandable: record => record.name !== 'Not Expandable',
    }}/>;
   
    </>
  )
}
