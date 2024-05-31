import axios from "axios";
import { AuthState } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const handleRouteName = (social: string) => {
    let path: string | undefined;
    console.log(social)
    switch (social) {
        case "login":
            path = `/api/login`
            break;
        case "signUp":
            path = `/api/signUp`
        case "facebook":
            path = `/auth/facebook`
            break;
        case "linkedIn":
            path = `/auth/linkedin`
            break;
        case "github":
            path = `/auth/github`
            break;
        case "google":
            path = `/auth/google`
            break
        default:
            break;
    }
    return path
}


export const handleRoute = (isLoggedIn: boolean) => {
    if (isLoggedIn) {
        return '/api/login'
    } else {
        return '/api/signUp'
    }
}

export const handleSuccess = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/success`);
        return response.data
    } catch (error: any) {
        console.error("There was an error retrieving user data")
    }
}
