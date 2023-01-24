const { default: axiosInstance } = require("./index-api")

// add test

export const addTest = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/tests/add', payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

// get all tests 

export const getAllTests = async () =>{
    try {
        const response = await axiosInstance.post("/api/tests/get-all-tests")
        return response.data
    } catch (error) {
        return error.response.data
    }
}

// test by id 

export const getTestById = async (payload) =>{
    try {
        const response = await axiosInstance.post("/api/tests/get-test-by-id", payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

//editing specific test by id 
export const editTestById = async (payload) =>{
    try {
        const response = await axiosInstance.post("/api/tests/edit-test-by-id", payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

// deleting test by id 

export const deleteTestById = async (payload) =>{
    try {
        const response = await axiosInstance.post("/api/tests/delete-test-by-id", payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}