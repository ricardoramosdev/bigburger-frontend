import { Button, Checkbox, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import logo from '../../assets/img/logo-transparente.png'
import { Header } from "../../shared/Header/Header";
import  "./Login.scss"
// import { URL } from "../../constants/endpoints";
import axios from "axios";
import { useAuth } from "../../auth/useAuth";
import { CheckCircleOutlined } from "@ant-design/icons";

const URL = process.env.REACT_APP_API_URL;

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
  const registerUser = async (formData)=>{
    console.log(formData)
    try{
      const { data } =await axios.post(`${URL}/user`, formData)
      console.log("data ususario", data.usuarioNuevo)
      Modal.info({
        title: 'Usuario creado',
        icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        content: `Su usuario a sido creado exitosamente`,
        okText: 'Ok',
        okType: "ghost"

    })
    onLogin(formData)
    }catch(err){
      console.log(err);
    }
  }
 
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
        autoComplete="on"
        className=" formBlock"
        onFinish={onLogin}
      >
        <Form.Item
          label="Email"
          name={"email"}
          
          rules={[
            {
              required: validationOn,
              message: "Introduzca un email!",
            },
          ]}
          
        >
          <Input maxLength={30} placeholder="big@burger.com"/>
        </Form.Item>

        <Form.Item
          label="Password"
          name={"password"}
          
          rules={[
            {
              required: validationOn,
              message: "Introduzca un a contrase??a!",
            },
          ]}
        >
          <Input.Password maxLength={30}/>
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
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      </div>
      
          {/*===== Modal de Registro ======*/}
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
            name={"fullName"}
            rules={[{ required: validationOn, message: "Ingrese un nombre v??lido!" }]}
          >
            <Input maxLength={30} type='string'/>
          </Form.Item>
          <Form.Item
            label="Email"
            name={"email"}
            rules={[{ required: validationOn, message: "Ingrese un email v??lido!" },{
              type: 'email',
              message: 'Ingrese un email v??lido!',
            },]}
          >
            <Input maxLength={30} />
          </Form.Item>

          <Form.Item
            label="Contrase??a"
            name={"password"}
            rules={[{ required: validationOn, message: "Ingrese una contrase??a!" }, {min:8,message:"La contrase??a debe tener 8 o m??s caracteres"}]}
            hasFeedback
          >
            <Input.Password maxLength={30}/>
          </Form.Item>
            
          <Form.Item
            name="confirm"
            label="Confirmar Contrase??a"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Este campo debe ser rellenado',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('La contrase??a no coincide con la ingresada!'));
                },
              }),
            ]}
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
