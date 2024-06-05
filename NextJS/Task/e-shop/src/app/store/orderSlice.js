import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

const initialState = {
    orders: [],
}

//Fetch order
export const fetchOrder = createAsyncThunk("fetchOrder", async ({ orderId }) => {
    try {

        const userOrdersId = (orderId.split("-"))[0];
        const orderIndex = (orderId.split("-"))[1];
        const orderResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/${userOrdersId}/${orderIndex}.json`);
        return orderResponse.data;
    } catch (error) {
        toast.error(error.response.data.error.message);
    }
});
//Fetch orders
export const fetchOrders = createAsyncThunk("fetchOrders", async ({ buyerId }) => {
    try {
        const ordersResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/${buyerId}.json`);
        return ordersResponse.data;
    } catch (error) {
        toast.error(error.response.data.error.message);
    }
});


export const addOrder = createAsyncThunk("addOrder", async ({ orders, buyerId }) => {
    try {
        const addOrderResponse = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/${buyerId}.json`, orders);
        return addOrderResponse.data;
    } catch (error) {
        toast.error(error.response.data.error.message);
        // return error;
    }
});


const Slice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.orders = action.payload;
        },
        getOrder: (state, action) => {
            return state.orders;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            console.log("reducer", action);
            if (!!action.payload) {
                state.orders = action.payload;
            }
        }),
            builder.addCase(addOrder.fulfilled, (state, action) => {
                console.log("reducer", action);
                if (!!action.payload) {
                    state.orders = action.payload;
                    toast.success("Order placed successfully!");
                }
            })
    }
})


export const { setOrder, getOrder } = Slice.actions;
export default Slice.reducer;