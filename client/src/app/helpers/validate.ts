import { AuthState, UserAndRoutes } from "../types";
import { toast } from "react-toastify";

const specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;

const usernameValidate = (value: string) => {
    return value.length >= 8 
}

const passwordValidate = (value: any) => {
    const ints = /[0-9]/;
    const capitals = /[A-Z]/
    if (value.length >= 8) {
        return specialChars.test(value) && ints.test(value) && capitals.test(value);
    } else {
        return false
    }
}

export const validatePasswordChange = (user: AuthState['user']) => {
    if (passwordValidate(user.password)) {
        if (user.password === user.confirmPassword) {
            return "Password changed"
        } else {
            return "Passwords do not match"
        }
    } else {
        return passwordValidate(user.password)
    }
}

export const isEmpty = (formData: UserAndRoutes) => {
    const inputs = Object.values(formData);
    const hasEmptyInput = inputs.some(val => val === "");
    console.log(formData.pathname)
    if (hasEmptyInput) {
        if (formData.pathname === '/api/login') {
            if (!formData.username || !formData.password) {
                console.log("Thats here")
                return "Must enter a username or password!"
            }
        } else {
            return "Must enter values for all fields"
        }
    }
    return true
}

export const validateLogin = (formData: UserAndRoutes) => {
    const emptyValues = isEmpty(formData);
    const loginValidateValues = {
        usernameCheck: usernameValidate(formData.username),
        passwordCheck: passwordValidate(formData.password)
    }
    if (!emptyValues) {
        console.log("Its empty")
        toast.error(emptyValues);
        return false
    }
    if(loginValidateValues.passwordCheck !== true) {
        return "Password must be at least 8 characters long with capital, number, and special characters"
    }
    if(loginValidateValues.passwordCheck !== true){
        return "Username must be eight characters long"
    }
    return true
}
