import { configureStore } from "@reduxjs/toolkit";
import ecommerce from "./slice/api"
import cart from "./slice/cartSlice"

export const store = configureStore({
    reducer: {
        ecommerce,
        cart
    }
})