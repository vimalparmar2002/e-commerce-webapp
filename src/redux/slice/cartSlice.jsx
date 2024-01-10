import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find((e) => e.id === action.payload.id)

            if (!existingItem) {
                state.cart.push(action.payload)
            }
        },

        deleteFromCart: (state, action) => {
            state.cart = state.cart.filter((element) => action.payload !== element.id)
            console.log("Not deleted items", state.cart)
        },

        incrementCart: (state, action) => {
            console.log("Reducer is being executed");
            const existingItem = state.cart.find((e) => e.id === action.payload)

            if (existingItem) {
                existingItem.quantity++;
            }
        },
        decrementCart: (state, action) => {
            console.log("Reducer is being executed");
            const existingItem = state.cart.find((e) => e.id === action.payload)

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity--;
            }
        },
        
        
    }
})

export const { addToCart, deleteFromCart, incrementCart, decrementCart } = cartSlice.actions
export default cartSlice.reducer