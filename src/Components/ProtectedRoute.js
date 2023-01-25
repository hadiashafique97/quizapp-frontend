import { message } from 'antd'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getUserInfo } from '../services/User-api'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SetUser } from "../reducers/usersSlice"
import { ShowSpinner, HideSpinner } from '../reducers/spinnerSlice'

function ProtectedRoute({ children }) {
  
  const { user } = useSelector((state) => state.users)
  const navigate = useNavigate()

  const [menu, setMenu] = useState([])
  const [collapsed, setCollapsed] = useState(false)

  const userMenu = [
    {
      title: "Home",
      paths: ['/', "/user/write-test"],
      icon: <i className="ri-home-heart-fill"></i>,
      onClick: () => navigate("/")
    },
    {
      title: "Results",
      paths: ["/results"],
      icon: <i className="ri-folder-chart-fill"></i>,
      onClick: () => navigate("/results")
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <i className="ri-user-3-fill"></i>,
      onClick: () => navigate("/profile")
    },
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-circle-r-fill"></i>,
      onClick: () => {
        localStorage.removeItem("token")
        navigate("/login")
      }
    }

  ]
  const adminMenu = [
    {
      title: "Home",
      paths: ['/', "/user/write-test"],
      icon: <i className="ri-home-heart-fill"></i>,
      onClick: () => navigate("/"),
    },
    {
      title: "Tests",
      paths: ["/admin/tests", "/admin/tests/add"],
      icon: <i class="ri-file-edit-fill"></i>,
      onClick: () => navigate("/admin/tests"),
    },
    {
      title: "Results",
      paths: ["/resutls"],
      icon: <i className="ri-folder-chart-fill"></i>,
      onClick: () => navigate("/admin/results"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <i className="ri-user-3-fill"></i>,
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-circle-r-fill"></i>,
      onClick: () => {
        localStorage.removeItem("token")
        navigate("/login")
      },
    }

  ]
  const dispatch = useDispatch()

  const getUserData = async () => {
    try {
      dispatch(ShowSpinner())
      const response = await getUserInfo()
      dispatch(HideSpinner())
      if (response.success) {
        dispatch(SetUser(response.data))
        if (response.data.isAdmin) {
          setMenu(adminMenu)
        } else {
          setMenu(userMenu)
        }
      } else {
        message.error(response.message)
      }
    } catch (error) {
      navigate("/login")
      dispatch(HideSpinner())
      message.error(error.message)
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      getUserData()
    }else{
      navigate("/login")
    }
  }, [])
  const activeRoute = window.location.pathname
  
  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)){
      return true
    } else {
      if(activeRoute.includes("/admin/tests/edit") && paths.includes("/admin/tests")){
        return true
      }
      if(activeRoute.includes("/user/write-test") && paths.includes("/user/write-test")){
        return true
      }
    }
    return false
  }
  return (
    <div className='layout'>
      <div className='flex gap2 w100 h100'>
        <div className='sidebar'>
          <div className='menu'>
            {menu.map((item, index) => {
              return(
               <div className={`menu-item ${getIsActiveOrNot(item.paths) && 'active-menu-item'}`}
                key={index} onClick={item.onClick}>
                {item.icon}
                {!collapsed &&<span>{item.title}</span> }
              </div>
              )
            })}
          </div>
        </div>
        <div className='body'>
          <div className='header flex justify-between'>
          {!collapsed && <i className="ri-close-circle-fill" onClick={()=> setCollapsed(true)}></i>}
          {collapsed && <i className="ri-menu-fill" onClick={()=> setCollapsed(false)}></i>}
            <h1 className="text-2xl">
              TEST ME
            </h1>
            <div className='flex gap1 item-center'>
            <i className="ri-user-3-fill"></i>
              <h1 className="text-xl underline">
              {user?.name}
            </h1>
            </div>
            
          </div>
          <div className='content'>
            {children}
          </div>


        </div>
      </div>
    </div>
  )
}

export default ProtectedRoute

