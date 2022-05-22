import { Typography } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Error.scss"
export const Error = () => {
  return (
    <>
    <section className="error404">
        
        <div className="error">
            <Typography.Title  className="error" level="2">Algun ingrediente salio mal</Typography.Title>
        </div>
        <button><NavLink className="button" to="/">Inicio</NavLink></button>
    </section>
    </>
  )
}
