const { default : axiosInstance } = require("./index-api")


export const registerNewUser = async (payload) => {
    try{
      const response =  await axiosInstance.post('api/users/register', payload)
      return response.data
    }
    catch (error){
        return error.response.data
    }
}