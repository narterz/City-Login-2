import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthState, UserAndRoutes } from "@/app/types";
import { RootState } from "../store";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const initialState = {
    user: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    },
    auth: {
        authType: "",
        loading: false,
        error: "",
        code: "",
    },
    socialMedia: {
        id: "",
        displayName: "",
        photo: ""
    },
    routeInfo: {
        pathname: '/api/signUp',
    }

} as AuthState

export const signUpUser = createAsyncThunk(
    "user/auth",
    async (user: UserAndRoutes, { rejectWithValue }): Promise<any> => {
        console.log("Sign up is running...")
        try {
            const endpoint = `${BASE_URL}${user.pathname}`;
            const response = await axios.post(endpoint, { ...user }, { withCredentials: true });
            const userData = response.data;
            const { username, firstName, lastName } = userData;
            toast.success(`Signed in as ${username}`);
            return { username, lastName, firstName };
        } catch (error: any) {
            const errorMessage = error.response.data.message || "There was an error please try again";
            toast.error(errorMessage)
            return rejectWithValue(errorMessage)
        }
    }
);

export const AuthUserSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<AuthState['user']>) => {
            state.user = action.payload
            state.auth.isLoggedIn = true
        },
        logoutUser: (state) => {
            state.routeInfo = initialState.routeInfo;
            state.socialMedia = initialState.socialMedia;
            state.auth = initialState.auth;
            state.user = initialState.user
        },
        changeView: (state, action: PayloadAction<string>) => {
            state.auth.authType = action.payload
        },
        changePathname: (state, action: PayloadAction<string | undefined>) => {
            state.routeInfo.pathname = action.payload;
        },
        setSocialUser: (state, action: PayloadAction<AuthState['socialMedia']>) => {
            state.socialMedia = action.payload
            state.auth.isLoggedIn = true
        },
        handleError: (state, action: PayloadAction<AuthState['auth']>) => {
            state.auth = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state) => {
            console.log("Loading should be set to true")
            state.auth.loading = true
            state.auth.error = initialState.auth.error
        });
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            console.log("Fuffiled")
            state.user = action.payload
            state.auth.isLoggedIn = true;
            state.auth.error = initialState.auth.error
            state.auth.loading = false
        });
        builder.addCase(signUpUser.rejected, (state, action) => {
            state.auth.error = action.error.message;
            state.auth.loading = false
            state.auth.isLoggedIn = false
            state.user = initialState.user
        });
    }
});

export const { addUser, logoutUser, changeView, changePathname, handleError, setSocialUser } = AuthUserSlice.actions;
export const userSelector = (state: RootState) => state.auth;
export default AuthUserSlice.reducer;

