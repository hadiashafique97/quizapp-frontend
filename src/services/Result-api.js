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

export const getAllResults = async () => {
    try {
        const response = await axiosInstance.post("/api/results/get-all-results")
        return response.data
    } catch (error) {
        return error.response.data
    }

}

// getting all reports by user specific
export const getAllResultsByUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/results/get-all-results-by-user", payload)
        return response.data
    } catch (error) {
        return error.response.data
    }

}
