import { createContext } from 'react'
import { LoggedUser } from '../interfaces/interfaces';

//type Logged user idk? 
const initialState: any = {
    token: '',
    userId: undefined,
    isLoggedIn: false,
    isAdmin: false,

}

export const UserContext = createContext(initialState);