import { createContext } from 'react'

const initialState = {
    token: '',
    isLoggedIn: false,
    isAdmin: false,
}

export const UserContext = createContext(initialState);

