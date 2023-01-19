import React from 'react'
import { Form } from 'antd'
import {Link} from 'react-router-dom'
function Login() {
const onFinish = (values)=>{

}

  return (
    <div className='flex justify-center item-center h-screen w-screen'>
      <div className="tile w450 p4 ">
        <div className='flex flex-col'>
          <h1 className='text-2xl'>
            Login
          </h1>
          <div className='divider'></div>
          <Form className='mtop1'layout='vertical' onFinish={onFinish}>
            <Form.Item className=' ptop2 'name="email" label="Email">
              <input type="text" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" />
            </Form.Item>
            <div className='flex flex-col gap1'>
            <button className="primary-btn text-md mtop3
             w100" type="submit">Login</button>
            <Link to="/register" className='underline'> New User? </Link>
            </div>
          </Form>
        </div>
      </div>

    </div>
  )
}

export default Login