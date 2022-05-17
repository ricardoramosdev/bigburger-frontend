import userEvent from '@testing-library/user-event';
import { Select, Table, Typography } from 'antd';
import { Option } from 'antd/lib/mentions';

import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../auth/useAuth';
// import { URL } from '../../../constants/endpoints';
import './OrderList.scss'

const URL = process.env.REACT_APP_API_URL;

export const OrderList = () => {
  const[orders, updOrders] = useState()
  const auth= useAuth()
  //Traer ordenes de la base de datos
  const getOrders = async ()=>{
    try{
    const dataFromDB = await axios.get(`${URL}/orders`)

    const ordersDB = dataFromDB.data.ticket;
    const orderToRender= ordersDB.map(el=>({
      key:el._id,
      user:el.user.fullName,
      menu:el.menu,
      state:el.state,
      total:el.total

    }
    ))
    updOrders(orderToRender)

  }catch{
    console.log('No se pudo obtener ')
  }
}


const handleOrderStatus= async (id,e)=>{
  //obtener el pedido q se va  a modifica
  //cambiar la propiedad state
  //enviar a base de datos con put
 const orderUd = await axios.put(`${URL}/order/${id}`,{state:e},{
  headers: {
    authorization:auth.token
}
})
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

        <Select defaultValue={item.state} style={{ width: 120 }} onChange={(e)=>handleOrderStatus(item.key,e)}>
          <Select.Option value="pendiente">Pendiente</Select.Option>
          <Select.Option value="realizado">Realizado</Select.Option>

        </Select>),
      
      key: 'state'
    },
  ];
  
  return (
    <>
    <Typography.Title level={1}>Pedidos</Typography.Title>

    <Table className='tabla'dataSource={orders} columns={columns} expandable={{

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
