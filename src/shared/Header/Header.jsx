import { Menu, Switch } from 'antd'
import React from 'react'
import logo from '../../assets/img/logo-transparente.png'
import './Header.scss'
export const Header = () => {
  return (
    <>
    
            
            <Menu className="navbar"theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="0">
            <img src={logo} className='logo'></img>

                </Menu.Item>
                {/* <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Cart</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item> */}
                
            </Menu>
            
            

            
                
        
    </>
  )
}
