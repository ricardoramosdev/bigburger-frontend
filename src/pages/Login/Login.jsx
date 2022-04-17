import { Button, Checkbox, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import logo from '../../assets/img/logo-transparente.png'
import { Header } from "../../shared/Header/Header";
import  "./Login.scss"
import { URL } from "../../constants/endpoints";
import axios from "axios";
import { useAuth } from "../../auth/useAuth";


export const Login = () => {
  
  const auth = useAuth();
  const onLogin = async (loginData)=>{
    auth.login(loginData)
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const validationOn = true;
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  async function registerUser(formData){
    console.log(formData)
    try{
      const userRegister =await axios.post(`${URL}/user`, formData)
      console.log(userRegister)
    }catch(error){
      console.log(error)
      alert("Error al registrar usuario")
    }
  }
  // const login = async
  return (
    <>
    
      <div className="logoContainer">
        <img src={logo} alt="big burguer logo" />
      </div>
      <div className="formContainer">
      <Form 
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        className=" formBlock"
        onFinish={onLogin}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: validationOn,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: validationOn,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="register"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <a onClick={showModal}>Register</a>
          
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
      

      <Modal
        title="Register"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="Register"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={registerUser}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre Completo"
            name="fullName"
            rules={[{ required: validationOn, message: "Please input your full name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: validationOn, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: validationOn, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
