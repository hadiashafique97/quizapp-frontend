import React from 'react'
import { Form, message } from 'antd'
import { Link } from 'react-router-dom'
import { registerNewUser } from '../../../services/User-api'
import { useDispatch } from 'react-redux'
import { ShowSpinner, HideSpinner } from '../../../reducers/spinnerSlice'
function Register() {
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    try {
      dispatch(ShowSpinner())
      const response = await registerNewUser(values)
      dispatch(HideSpinner())
      if (response.success) {
        message.success(response.message)
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
              <Link to="/login" className='underline ptop1'> Existing User? </Link>
            </div>
          </Form>
        </div>
      </div>

    </div>
  )
}

export default Register