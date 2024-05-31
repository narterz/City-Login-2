import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthState, UserAndRoutes } from "@/app/types";
import { RootState } from "../store";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SUCCESS_URL = process.env.NEXT_SUCCESS_URL;

export const initialState = {
    user: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    },
    auth: {
        isLoggedIn: false,
        loading: false,
        error: null,
    },
    socialMedia: {
        id: "",
        displayName: "",
        photo: ""
    },
    routeInfo: {
        pathname: '/api/signUp',
        isLoggingIn: false
    }

} as AuthState

//If username and password are not entered
export const signUpUser = createAsyncThunk(
    "user/auth",
    async (user: UserAndRoutes): Promise<any> => {
        try {
            const endpoint = `${BASE_URL}${user.pathname}`
            const response = await axios.post(endpoint, { ...user });
            const userData = response.data.user;
            const { firstName, lastName, username } = userData;
            toast.success(`Welcome back ${firstName}`);
            return userData;
        } catch (error: any) {
            if (error.error.message) {
                const errorMessage = error.response?.data?.message || error.message || "An error occurred";
                console.log(errorMessage)
            }
        }
    }
);

//take optional parameter for path
export const getSocialUser = createAsyncThunk(
    "user/get", 
    async (path?: string) => {
        let endpoint: string | undefined;
        path ? endpoint = path : endpoint = SUCCESS_URL
        console.log(`endpoint being called ${endpoint}`)
    try {
        const response = axios.get(`${endpoint}`)
        const user = (await response).data;
        console.log(user)
        // const { displayName } = userData;
        // toast.success(`Welcome ${displayName}`);
        // return userData
    } catch (err) {
        console.error(err)
    }
})


export const AuthUserSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<AuthState['user']>) => {
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.user = initialState.user;
            state.auth.isLoggedIn = false
        },
        handleLoading: (state, action: PayloadAction<boolean>) => {
            state.auth.loading = action.payload;
        },
        changePathname: (state, action: PayloadAction<AuthState['routeInfo']>) => {
            state.routeInfo.pathname = action.payload.pathname;
            state.routeInfo.isLoggingIn = action.payload.isLoggingIn
        },
        setSocialUser: (state, action: PayloadAction<AuthState['socialMedia'] & AuthState['auth']>) => {
            state.socialMedia = action.payload
            state.auth.isLoggedIn = true
        },
        changeRoute: (state, action: PayloadAction<boolean>) => {
            state.routeInfo.isLoggingIn = action.payload
        },
        handleError: (state, action: PayloadAction<string | boolean>) => {
            state.auth.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state) => {
            console.log("Loading should be set to true")
            state.auth.loading = true
            state.auth.error = null
        });
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.auth.isLoggedIn = true;
            state.auth.error = false;
            state.auth.loading = false
        });
        builder.addCase(signUpUser.rejected, (state, action) => {
            state.auth.error = action.error.message;
            state.auth.loading = false
        });

        // builder.addCase(getSocialUser.pending, (state) => {
        //     state.auth.loading = true
        //     state.auth.error = null
        // });
        // builder.addCase(getSocialUser.fulfilled, (state, action) => {
        //     state.socialMedia = action.payload;
        //     state.auth.isLoggedIn = true
        //     state.auth.error = false;
        //     state.auth.loading = false
        // });
        // builder.addCase(getSocialUser.rejected, (state, action) => {
        //     state.auth.error = action.error.message;
        //     state.auth.loading = false
        // });
    }
});

export const { addUser, logoutUser, changePathname, handleLoading, handleError, changeRoute, setSocialUser } = AuthUserSlice.actions;
export const userSelector = (state: RootState) => state.auth
export default AuthUserSlice.reducer;

