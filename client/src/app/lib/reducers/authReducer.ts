import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    username: string;
    password: string;
    email?: string;
}

const initialState: AuthState = {
    username: "",
    password: "",
    email: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    }
})

// export const { reducerNames } = authSlice.actions;
export const authReducer = authSlice.reducer;