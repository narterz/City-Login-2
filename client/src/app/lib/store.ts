"use client"
import { configureStore } from "@reduxjs/toolkit";
import authUserSlice from "./reducers/authUserSlice";

export const store = configureStore({
    reducer: {
        auth: authUserSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch