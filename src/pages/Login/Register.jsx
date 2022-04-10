import { Button, Form, Input, Modal } from 'antd';
// import axios, { Axios } from 'axios';
import React, { useState } from 'react'

export const Register = () => {
 const [isModalVisible, setIsModalVisible] = useState(false);

  const registerUser = async (formData) =>{
    console.log(formData)
    // try{
    //   const { data } =await axios.post(`${URL}/users`, formData)

    // }catch(error){
    //   console.log("Error al registrar usuario")
    // }
  }
 
  return (
    <>
    
    </>
  )
}
