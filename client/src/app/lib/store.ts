"use client"
import { configureStore } from "@reduxjs/toolkit";
import authUserSlice from "./reducers/authUserSlice";
import jokeSlice from "./reducers/jokeSlice";

export const store = configureStore({
    reducer: {
        auth: authUserSlice,
        jokes: jokeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch