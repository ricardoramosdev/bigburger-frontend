import { Layout, PageHeader } from 'antd'
import React from 'react'
import './Cart.scss'
export const Cart = () => {
  return (
    <>
        <div className='order-header'><h1>Mi Pedido</h1></div>
        <div className="order-body">
            <h2>Estas llevando:</h2>
            <div className='order-card'>
                <img className="order-img"src="" alt="" />
                <div className="order-detail">
                    <h4>Titulo Burger harcodeada</h4>
                    <div className='order-data'>
                        <div className="item-price">$850</div>
                        <div className="item-edit">-1+</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
