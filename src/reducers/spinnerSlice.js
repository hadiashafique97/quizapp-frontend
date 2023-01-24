import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
    name: "spinner",
    initialState:{
        loading:false,
    },
    reducers:{
        ShowSpinner(state){
            state.loading = true;
        },
        HideSpinner(state){
            state.loading = false;
        },
    },
})

export const { ShowSpinner, HideSpinner } = loaderSlice.actions

export default loaderSlice.reducer