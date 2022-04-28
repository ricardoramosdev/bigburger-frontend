import { DeleteOutlined } from '@ant-design/icons'
import React from 'react'

export const CartItem = ({data,index, removeFromCart,total}) => {
   let{_id:id, name,price,cantidad}=data
    const changeQuantity = (id)=>{ console.log(data)
     data.cantidad=data.cantidad+1
     console.log(data)
    }
    
  return (
      <>
    
    <div className='order-card' >
        <img className='order-img'src='' alt='' />
        <div className='order-detail'>
            <h4>{name}</h4>
            <div className='order-data'>
                <div className='item-price'>${price}</div>
                <div className='item-edit'>
                    <label htmlFor="qty">Cantidad: </label>
                    <input qtyid={id} name='qty'type="number"  min='1'  defaultValue={data.cantidad} onChange={()=>changeQuantity(id)} />
                    
                </div>
                <button onClick={()=>removeFromCart(id)}><DeleteOutlined /></button>
            </div>
        </div>
    </div>
</>
  )
}
