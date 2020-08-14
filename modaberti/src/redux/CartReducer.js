import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserCart = createAsyncThunk("cart/getUserCart", async (id) => {
    try {
        const res = await axios.get(`/api/cart/${id}`);
        return res.data
    } catch (err) {
        console.log(err);
    }
});

export const addProductToCart = createAsyncThunk("cart/addProduct", async (data) => {
    try {
        const res = await axios.post(`http://localhost:4000/api/cart`, data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
});

export const removeCartItem = createAsyncThunk("cart/removeProduct", async (data) => {
    try {
        console.log(data);
        const res = await axios.patch(`/api/cart`, data);
        console.log(res);
        return res.data;
    } catch (err) {

    }
});

export const deleteUserCart = createAsyncThunk("cart/deleteUserCart", async (id) => {
    try {
        console.log(id);
        const res = await axios.delete(`/api/cart/${id}`)
        return res.data;
    } catch (err) {

    }
});

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        loading: false,
        cartId: '',
        products: [],
        count: 0,
        total: 0
    },
    reducers: {

    },
    extraReducers: {
        [getUserCart.pending]: (state, action) => {
            state.loading = true;
        },
        [getUserCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.cartId = action.payload.data._id;
            /*  console.log(action.payload.data.products); */

            //al refresh dice che data è undefined -> boh
            state.products = action.payload.data.products;
            console.log(state.products);
            /* state.count = state.products.length() */
            state.total = state.products.reduce((currentTotal, product) => currentTotal + product.price, 0)
        },
        [addProductToCart.fulfilled]: (state, action) => {
            console.log(action.payload);
        },
        [removeCartItem.fulfilled]: ({ products, total, count }, action) => {
            products.filter(product => product._id !== action.payload.itemId);
            total = products.reduce((currentTotal, product) => currentTotal + product.price, 0);
        },
        [deleteUserCart.fulfilled]: ({ id, products, count, total }, action) => {
            id = '';
            products = [];
            count = 0;
            total = 0;
        },
    }
})

export const { } = cartSlice.actions;

export const cartProducts = state => state.cart;

export const cartReducer = cartSlice.reducer;