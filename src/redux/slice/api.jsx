import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";
export const fetchApi = createAsyncThunk("ecommerce/fetchApi", async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`);
        const data = response.data;
        console.log("fetchApi data: ", data);
        return data;
    } catch (error) {
        console.error("fetchApi error: ", error);
        throw error; // Re-throw the error to let it propagate to the Redux store
    }
});

const ecommerceSlice = createSlice({
    name: "ecommerce",
    initialState: {
        isLoading: true,
        data: null,
        selectedCategory: "",
        categoryData: null,
        isError: false,
    },
    reducers: {
        selectedCategoryItems: (state, action) => {
            state.selectedCategory = action.payload;
            state.categoryData = state.data.filter((element) => action.payload === element.category);
            console.log("newCart", state.categoryData);
        },
        clearCategory: (state, action) => {
            state.selectedCategory = "";
        },
        sortLowToHigh: (state, action) => {
            const property = action.payload;
            if(property==="price"){
                state.data.sort((a, b) => a[property] - b[property]);
            }
            else{
                state.data.sort((a, b) => a.rating[property] - b.rating[property]);
            }
        },
        sortHighToLow: (state, action) => {
            const property = action.payload;
            if(property==="price"){
                state.data.sort((a, b) => b[property] - a[property]);
            }
            else{
                state.data.sort((a, b) => b.rating[property] - a.rating[property]);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApi.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchApi.rejected, (state, action) => {
            console.error("Error is", action.error.message); // Log the error message
            state.isError = true;
        });
    }
});

export const { selectedCategoryItems, clearCategory, sortHighToLow, sortLowToHigh } = ecommerceSlice.actions;
export default ecommerceSlice.reducer;
