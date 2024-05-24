import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { encode, decode } from 'js-base64';
import { toast } from "react-toastify";

const initialState = {
    userData: {},
    isLoggedIn: false,
}

//Sign up with email & password
export const registerUser = createAsyncThunk("registerUser", async ({ email, password }) => {
    try {
        const regUserResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_ACCOUNT}:signUp?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
            email: email,
            password: password,
            returnSecureToken: true
        });

        const encodedEmail = encode(regUserResponse.data.email);
        const addUserResponse = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${encodedEmail}.json`, {
            email: regUserResponse.data.email,
            password: encode(password),
            localId: regUserResponse.data.localId,
            securityQuestion: '',
            answer: ''
        });
        return addUserResponse.data;
    } catch (error) {
        toast.error(error.response.data.error.message);
        // return error;
    }
});

//Login with email & password
export const loginUser = createAsyncThunk("loginUser", async ({ email, password }) => {
    try {
        const loginUserResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_ACCOUNT}:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
            email: email,
            password: password,
            returnSecureToken: true
        });

        const encodedEmail = encode(loginUserResponse.data.email);
        const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${encodedEmail}.json`);        
        return userResponse.data;
    } catch (error) {
        toast.error(error.response.data.error.message);
    }
});

//Update user details
export const updateUser = createAsyncThunk("updateUser", async (userData) => {
    try {
        const encodedEmail = encode(userData.email);

        const userResponse = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${encodedEmail}.json`,{...userData});        
        return userResponse.data;
    } catch (error) {
        toast.error(error.response.data.error.message);
    }
});


//Reset user password
export const updateUserPassword = createAsyncThunk("updateUserPassword", async (userWithNewPassword) => {
    try {
        const {email, password} = userWithNewPassword;
        const {newPassword, ...userDetails} = userWithNewPassword;

        const loginUserResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_ACCOUNT}:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
            email: email,
            password: decode(password),
            returnSecureToken: true
        });
        const passwordUpdateResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_ACCOUNT}:update?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
            idToken: loginUserResponse.data.idToken,
            password: newPassword,
            returnSecureToken: true,
        });

        const encodedEmail = encode(email);
        userDetails.password = encode(newPassword);
        const userResponse = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${encodedEmail}.json`,{...userDetails});        
        return userResponse.data;
    } catch (error) {
        toast.error(error.response.data.error.message);
    }
});

//Fetch user details
export const getUserByEmailId = createAsyncThunk("getUserByEmailId", async ({email}) => {
    try {
        const encodedEmail = encode(email);
        const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${encodedEmail}.json`);        
        return userResponse.data;
    } catch (error) {
        toast.error(error.response.data.error.message);
    }
});


const Slice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
        logoutUser: (state, action) => {    
            state.userData = initialState.userData;
            state.isLoggedIn = initialState.isLoggedIn;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log("reducer", action);
            if (!!action.payload) {
                state.userData = action.payload;
                state.isLoggedIn = true;
                toast.success("Account created successfully!");
            }
        }),
            builder.addCase(loginUser.fulfilled, (state, action) => {
                console.log("reducer", action);
                if (!!action.payload) {
                    state.userData = action.payload;
                    state.isLoggedIn = true;
                    toast.success("Login success!");
                }      
            }),
            builder.addCase(updateUser.fulfilled, (state, action) => {
                console.log("reducer", action);
                if (!!action.payload) {
                    state.userData = action.payload;
                    state.isLoggedIn = true;
                    toast.success("Profile updated successfully!");
                }      
            })            
        }    
    })


export const { setUser, logoutUser } = Slice.actions;
export default Slice.reducer;