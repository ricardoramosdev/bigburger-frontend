import React from 'react'
import "./Footer.scss"
import logo from "../../assets/img/logo-transparente.png";
import { DeleteOutlined, EditOutlined, FacebookOutlined, GithubOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons'

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className="grupo-1">
        <div className="box">
          <figure>
            <img src={logo} alt="logo" />
          </figure>
        </div>
        <div className="box">
          <h2>Dirección</h2>
          <a href="https://www.google.com.ar/maps/place/Leno+Yerba+Buena/@-26.8143197,-65.2913045,17z/data=!3m1!4b1!4m5!3m4!1s0x942243ed8f9f071f:0x2af833d946423723!8m2!3d-26.8143245!4d-65.2891158" target="_blank">
            <p>
            Av. Aconquija 1336, T4107 Yerba Buena, Tucumán
            </p>
          </a>
        </div>
        <div className="box">
          <h2>Contacto</h2>
          <a href='https://api.whatsapp.com/send?phone=0123456789' target="_blank">
            <p>
              <WhatsAppOutlined /> 3815480041
            </p>
          </a>
          <a href='https://api.whatsapp.com/send?phone=0123456789' target="_blank">
            <p>
              <WhatsAppOutlined /> 3814029984
            </p>
          </a>
        </div>
        <div className="box">
          <h2>Redes</h2>
          <div className="red-social">
            <a href="https://www.facebook.com/" target="_blank"><FacebookOutlined /></a>
            <a href="https://www.instagram.com/?hl=es-la" target="_blank"><InstagramOutlined /></a>
            <a href="https://github.com/" target="_blank"><GithubOutlined /></a>
          </div>
        </div>
      </div>
      <div className="grupo-2">
        <small>&copy; <b>Big Burger</b> - Todos los Derechos Reservados.</small>
      </div>
    </footer>
  )
}
