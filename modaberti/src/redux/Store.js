import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './ProductsReducer'
import { authReducer } from './AuthReducer'
import { cartReducer } from './CartReducer'

const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authReducer,
        cart: cartReducer,
    }
})

export default store