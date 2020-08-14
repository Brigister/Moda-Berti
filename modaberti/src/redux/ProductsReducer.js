import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("products/getProducts", async (endpoint) => {
    try {
        const res = await axios.get(endpoint);
        return res.data;
    } catch (err) {
        console.log(err);
    }
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
    try {
        const res = await axios.delete(`/api/products/${id}`);
        return res.data
    } catch (err) {
        console.log(err);
    }
})

export const postProduct = createAsyncThunk("products/postProduct", async (product) => {
    try {
        console.log(product);
        /* debugger */;
        const res = await axios.post("/api/products", product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },

        });
        console.log(res);
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
})

export const editProduct = createAsyncThunk("products/editProduct", async (product) => {
    try {

        console.log(product.id);
        const res = await axios.patch(`/api/products/${product.id}`, product)
        console.log(res);
        return res.data
    } catch (err) {
        console.log(err);
    }
})

export const productSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        error: '',
        products: []
    },
    reducers: {
        /*        edit(state, action) {
                   const { _id, name, brand, price } = action.payload;
                   const product = state.products.find(item => item._id === _id);
       
               } */

    },
    extraReducers: {
        [getProducts.pending]: state => {
            state.loading = true;
        },
        [getProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.data;
        },
        [deleteProduct.rejected]: (state, action) => {
            state.error = action.error.message;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            const index = state.products.findIndex(product => product._id === action.meta.arg);
            console.log(index);
            if (index > -1) {
                state.products.splice(index, 1);
            }

        },
        [postProduct.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.products.push(action.payload.data);
        },
        [editProduct.fulfilled]: (state, action) => {

            /* console.log(action.meta.arg)
            const index = state.products.findIndex(product => product._id === action.meta.arg.id);
            console.log(action.payload)
            debugger;
            if (index > -1) {
                state.products[index] = (action.meta.arg);
            } */
        },
    }

});

/* export const {
    dlt,
    edit
} = productSlice.actions */

export const selectProducts = state => state.product;

export const productReducer = productSlice.reducer;