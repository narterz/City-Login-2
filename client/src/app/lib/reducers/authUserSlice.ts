import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthState } from "@/app/types";
import { RootState } from "../store";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const initialState = {
    user: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        accessToken: "",
    },
    auth: {
        isLoggedIn: false,
        loading: false,
        error: null,
        pathname: "/api/signUp"
    }
} as AuthState

export const signUpUser = createAsyncThunk(
    "api/signUp",
    async (user: AuthState['user']) => {
        try {
            const response = await axios.post(`${BASE_URL}${user.pathname}`, { ...user });
            const { firstName, lastName, username } = response.data;
            toast.success(`The user ${firstName} ${lastName} has logged in as ${username}`);
            console.log(response.data);
            return response.data; // Return the entire user object or whatever is appropriate
        } catch (error: any) {
            if (error.error.message) {
                const validateError = error.error.message;
                console.error(validateError);
                toast.error(validateError);
            }
            throw error;
        }
    }
);

export const AuthUserSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user
            state.auth.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.user = initialState.user;
            state.auth.isLoggedIn = false
        },
        changePathname: (state, action: PayloadAction<string>) => {
            state.user.pathname = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state) => {
            state.auth.loading = true
            state.auth.error = null
        });
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.auth.isLoggedIn = true;
            state.auth.error = false;
            state.auth.loading = false
        });
        builder.addCase(signUpUser.rejected, (state, action) => {
            state.auth.error = action.error.message;
            state.auth.loading = false
        });
    }
});

export const { addUser, logoutUser, changePathname } = AuthUserSlice.actions;
export const userSelector = (state: RootState) => state.auth
export default AuthUserSlice.reducer;

