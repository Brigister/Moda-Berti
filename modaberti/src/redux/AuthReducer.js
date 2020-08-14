import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import decode from 'jwt-decode';

export const login = createAsyncThunk("auth/login", async (data) => {
    try {
        const res = await axios.post("/api/auth/login", data);
        return res.data;
    }
    catch (err) {
        console.log(err)
    }
})

export const signup = createAsyncThunk("auth/signup", async (data) => {
    try {
        console.log(data);
        const res = await axios.post("api/auth/signup", data);
        console.log(res);
        return res.data;
    } catch (err) {
        console.log(err);
    }
})



export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        isAdmin: false,
        id: ''
    },
    reducers: {
        checkLoginStatus(state, action) {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = decode(token);
                if (decoded.exp * 1000 >= Date.now()) {
                    state.isLoggedIn = true;
                    state.isAdmin = decoded.isAdmin ? true : false;
                    state.id = decoded.id;
                }
                else localStorage.removeItem('token');
            }
        },
        logout(state, action) {
            state.isLoggedIn = false;
            state.isAdmin = false;
            state.id = '';
            localStorage.removeItem('token');
        }
    },
    extraReducers: {
        [login.rejected]: (state, action) => {
            console.log(action.error.message)
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;

            localStorage.setItem("token", action.payload.token);
            const decoded = decode(action.payload.token);
            console.log(decoded);
            state.isAdmin = decoded.isAdmin ? true : false;
            state.id = decoded.id;
        },
        [signup.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.isLoggedIn = true;
        }
    }
})

export const { logout, checkLoginStatus } = authSlice.actions

export const loggedUser = state => state.auth;

export const authReducer = authSlice.reducer;