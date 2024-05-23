// const {  nanoid, current, createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { encode, decode } from 'js-base64';
import { toast } from "react-toastify";

const initialState = {
    userData: {},
}

//call Sign up with email / password
export const registerUser = createAsyncThunk("registerUser", async ({ email, password }) => {
    console.log("RegAction");
    try {
        const regUserResponse = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
            email: email,
            password: password,
            returnSecureToken: true
        });

        const encodedEmail = encode(regUserResponse.data.email);
        const addUserResponse = await axios.put(`https://e-shop-next-31253-default-rtdb.firebaseio.com/users/${encodedEmail}.json`, {
            email: email,
            localId: regUserResponse.data.localId,
            securityQuestion: '',
            Answer: ''
        });
        return addUserResponse.data;
    } catch (error) {
        toast.error(error.response.data.error.message);
        // return error;
    }
});
export const loginUser = createAsyncThunk("loginUser", async ({ email, password }) => {
    console.log("LoginAction");
    try {
        const loginUserResponse = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
            email: email,
            password: password,
            returnSecureToken: true
        });

        const encodedEmail = encode(loginUserResponse.data.email);

        const getUserResponse = await axios.get(`https://e-shop-next-31253-default-rtdb.firebaseio.com/users/${encodedEmail}.json`);        
        return getUserResponse.data;
    } catch (error) {
        toast.error(error.response.data.error.message);
        // return error;
    }
});

const Slice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("SetUser", action.payload);
            state.userData = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log("reducer", action);
            if (!!action.payload) {
                state.userData = action.payload;
                toast.success("Account created successfully!");
            }
        }),
            builder.addCase(loginUser.fulfilled, (state, action) => {
                console.log("reducer", action);
                if (!!action.payload) {
                    state.userData = action.payload;
                    toast.success("Login success!");
                }      
            })
    }
});

export const { setUser } = Slice.actions;
export default Slice.reducer;