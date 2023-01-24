import React from 'react'
import { Form, message } from 'antd'

import { Link } from 'react-router-dom'
import { loginExistingUser } from '../../../services/User-api'
import { useDispatch } from 'react-redux'
import { ShowSpinner, HideSpinner } from '../../../reducers/spinnerSlice'
function Login() {
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    try {
      dispatch(ShowSpinner())
      const response = await loginExistingUser(values)
      dispatch(HideSpinner())
      if (response.success) {
        message.success(response.message)
        localStorage.setItem("token", response.data)
        window.location.href= "/"
      } else {
        message.error(response.message)
      }
    } catch (error) {
      dispatch(HideSpinner())
      message.error(error.message)
    }
  }

  return (
    <div className='flex justify-center item-center h-screen w-screen bg-primary'>
      <div className="tile w450 p4 ">
        <div className='flex flex-col'>
          <h1 className='text-2xl'>
            Login
          </h1>
          <div className='divider'></div>
          <Form className='mtop1' layout='vertical' onFinish={onFinish}>
            <Form.Item className=' ptop2 ' name="email" label="Email">
              <input type="text" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" />
            </Form.Item>
            <div className='flex flex-col gap1'>
              <button className="primary-btn text-md mtop3
             w100" type="submit">Login</button>
              <Link to="/register" className='underline ptop1'> New User? </Link>
            </div>
          </Form>
        </div>
      </div>

    </div>
  )
}

export default Login