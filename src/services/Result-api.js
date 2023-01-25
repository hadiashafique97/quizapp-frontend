const { default: axiosInstance } = require("./index-api")


//adding report
export const addResult = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/results/add-result", payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

//getting all the reports 

export const getAllResults = async (filters) => {
    try {
        const response = await axiosInstance.post("/api/results/get-all-results", filters)
        return response.data
    } catch (error) {
        return error.response.data
    }

}

// getting all reports by user specific
export const getAllResultsByUser = async (userId) => {
    try {
        const response = await axiosInstance.post("/api/results/get-all-results-by-user")
        return response.data
    } catch (error) {
        return error.response.data
    }

}
