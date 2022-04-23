import { Layout, PageHeader } from 'antd'
import React, { useState } from 'react'
import './Cart.scss'
export const Cart = () => {
    const totalAmount = 0;
    let itemsList = {
        item:{
            name:'BurgerRR',
            price:500},
        Qty:12};
    
    const addItem = ()=>{
//chequear si el producto agregado ya existe en la lista
        //IF no existe agregar producto a la lista de local storage ELSE sumar una unidad
    }
    const removeItem = ()=>{

    }
  return (
    <>
        <div className='order-header'><h1>Mi Pedido</h1></div>
        <div className='order-body'>
            <h2>Estas llevando:</h2>
            <div className='order-card'>
                <img className='order-img'src='' alt='' />
                <div className='order-detail'>
                    <h4>{itemsList.item.name}</h4>
                    <div className='order-data'>
                        <div className='item-price'>${itemsList.item.price}</div>
                        <div className='item-edit'>
                            <button>-</button>{itemsList.Qty}<button>+</button></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='order-checkout'>
            <div className='total-amount'>
                El monto total a paga es : ${totalAmount}

            </div>
            <button>Confirmar Orden</button>
        </div>
    </>
  )
}
