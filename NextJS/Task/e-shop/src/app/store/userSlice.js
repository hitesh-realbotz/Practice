// const {  nanoid, current, createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: [],
    productAPIData: [],
    users: []
    // users: JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
}

//call Sign up with email / password
export const resgisterUser = createAsyncThunk("resgisterUser", async () => {

    const result = await fetch("https://jsonplaceholder.typicode.com/users");
    return result.json();
});

//Persist UserDetails 
export const addUser = createAsyncThunk("addUser", async () => {

    const result = await fetch("https://jsonplaceholder.typicode.com/users");
    return result.json();
});

const Slice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.users = action.payload;   
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(resgisterUser.fulfilled, (state, action) => {
            console.log("reducer", action);

            state.isloading = false,
                state.userAPIData = action.payload
        }),
        builder.addCase(addUser.fulfilled, (state, action) => {
            console.log("reducer", action);
            state.isloading = false,
                state.productAPIData = action.payload
        })
    }
});

export const {  setUser } = Slice.actions;
export default Slice.reducer;