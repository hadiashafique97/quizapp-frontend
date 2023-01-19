import React from 'react'
import { Form, message } from 'antd'
import { Link } from 'react-router-dom'
import { registerNewUser } from '../../../services/User-api'
function Register() {
  const onFinish = async (values) => {
    try {
      const response = await registerNewUser(values)
      if (response.success) {
        message.success(response.message)
      } else {
        message.e(response.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <div className='flex justify-center item-center h-screen w-screen'>
      <div className="tile w450 p4 ">
        <div className='flex flex-col'>
          <h1 className='text-2xl'>
            New User
          </h1>
          <div className='divider'></div>
          <Form className='mtop1' layout='vertical' onFinish={onFinish}>
            <Form.Item className=' ptop2 ' name="name" label="Name">
              <input type="text" />
            </Form.Item>
            <Form.Item className=' ptop2 ' name="email" label="Email">
              <input type="text" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" />
            </Form.Item>
            <div className='flex flex-col gap1'>
              <button className="primary-btn text-md mtop3 w100" type="submit">Create User</button>
              <Link to="/login" className='underline'> Existing User? </Link>
            </div>
          </Form>
        </div>
      </div>

    </div>
  )
}

export default Register