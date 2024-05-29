import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

const initialState = {
    products: [],
}


//Fetch user details
export const getProducts = createAsyncThunk("getProducts", async () => {
    try {      
        const productsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products.json`);        
        return productsResponse.data;
    } catch (error) {
        toast.error(error.response.data.error.message);
    }
});

//Reset products
export const resetProducts = createAsyncThunk("resetProducts", async () => {
    try {
        let products = [];
        let productResponse = await axios.get(`https://dummyjson.com/products?limit=90`);        
        console.log("products ", productResponse.data);
        products = productResponse.data.products.map((item) => ({
            itemId: item.id,
            title: item.title,
            price: Math.ceil(item.price),
            description: item.description,
            category: item.category,
            qty: !!item.stock ? item.stock : 15,
            availableQty: !!item.stock ? item.stock : 15,
            brand: item.brand || "Generic",
            image: item.images[0]
        }));
        const addProductsResponse = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/products.json`, products);
        return addProductsResponse.data;
    } catch (error) {
        toast.error(error.response.data.error.message);
    }
});


const Slice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.products = action.payload;    
        },  
        getProduct: (state, action) => {
            return state.products;    
        },  
    },
    extraReducers: (builder) => {
        builder.addCase(resetProducts.fulfilled, (state, action) => {
            console.log("reducer", action);
            if (!!action.payload) {
                state.products = action.payload;
                toast.success("Products Reset Success!");
            }
        }),
        builder.addCase(getProducts.fulfilled, (state, action) => {
            console.log("reducer", action);
            if (!!action.payload) {
                state.products = action.payload;
                // toast.success("Products Fetch Success!");
            }
        })      
        }    
    })


export const { setProduct, getProduct } = Slice.actions;
export default Slice.reducer;