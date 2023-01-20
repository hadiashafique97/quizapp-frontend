const { default: axiosInstance } = require("./index-api")


export const registerNewUser = async (payload) => {
  try {
    const response = await axiosInstance.post('api/users/register', payload)
    return response.data
  }
  catch (error) {
    return error.response.data
  }
}

export const loginExistingUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/login', payload)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const getUserInfo = async () =>{
  try {
    const response = await axiosInstance.post('/api/users/get-user-info')
    return response.data
  } catch (error) {
    return error.response.data
  }
}
