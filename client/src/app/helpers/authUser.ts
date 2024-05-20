import axios from "axios";
import { FormEvent } from "react";
import { useAppDispatch } from "@/app/lib/hooks";
import { addUser } from "@/app/lib/reducers/authUserSlice";
import { AuthState } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const dispatch = useAppDispatch();

export const handleSocialLogin = (social: string) => {
    switch (social) {
        case "facebook":
            break;
        case "twitter":
            break;
        case "github":
            break;
        case "google":
            break
        default:
            break;
    }
}

export const handleRoute = (isLoggedIn: boolean) => {
    if (isLoggedIn) {
        return '/api/login'
    } else {
        return '/api/signUp'
    }
}

export const handleSubmit = (e: FormEvent<HTMLFormElement>, formData: AuthState['user']) => {
    e.preventDefault();
    const newUser = {
        user: formData,
        auth: {
            isLoggedIn: true,
        }
    }
    dispatch(addUser(newUser))

}

export const handleSuccess = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/success`);
        return response.data
    } catch (error: any) {
        console.error("There was an error retrieving user data")
    }
}



