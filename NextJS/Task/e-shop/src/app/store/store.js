import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
    reducer:{
        usersData:userReducer,
        productsData:productReducer,
        ordersData:orderReducer,
    }
})