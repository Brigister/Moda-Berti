import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserOrders = createAsyncThunk("orders/getUserOrders", async (id) => {
    try {
        console.log(id);
        const res = await axios.get(`/api/orders/${id}`)
        console.log(res);
        return res.data
    } catch (err) {
        console.log(err);
    }
})

export const postOrder = createAsyncThunk("orders/postOrder", async (data) => {
    try {
        console.log(data);
        const res = await axios.post("/api/orders", data);
        console.log(res);
        return res.data
    } catch (err) {
        console.log(err);
    }
})

export const OrdersSlice = createSlice({
    name: "orders",
    initialState: {
        loading: false,
        orders: [],
    },
    reducers: {

    },
    extraReducers: {
        [getUserOrders.pending]: (state, action) => {
            state.loading = true;
        },
        [getUserOrders.fulfilled]: (state, action) => {
            state.loading = false;
            state.orders = action.payload.data
        },
        [postOrder.fulfilled]: (state, action) => {
            state.orders.push(action.payload.data)
        }

    }
})