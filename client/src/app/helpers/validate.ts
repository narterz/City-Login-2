import { AuthState } from "../types";
import { toast } from "react-toastify";

const specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;

const usernameValidate = (value: string) => {
    return value.length >= 8 ? true : "Username must be eight characters long"
}

const passwordValidate = (value: string) => {
    const ints = /[0-9]/;
    const capitals = /[A-Z]/
    if (value.length >= 8) {
        return specialChars.test(value) && ints.test(value) && capitals.test(value);
    } else {
        return "Password must be at least 8 characters long with capital, number, and special characters"
    }
}

export const isEmpty = (formData: AuthState['user'], pathname: string | undefined) => {
    const inputs = Object.values(formData);
    console.log(inputs)
    const hasEmptyInput = inputs.some(val => val === "");
    if(hasEmptyInput){
        if(pathname === '/api/login'){
            if(!formData.username || !formData.password){
                return "Must enter a username or password!"
            }
        } else {
            return "Must enter values for all fields"
        }
    }
    return true
}

export const validateLogin = (formData: AuthState['user'], pathname: string | undefined) => {
    console.log(formData)
    const emptyValues = isEmpty(formData, pathname);
    const loginValidateValues = [ 
        usernameValidate(formData.username), 
        passwordValidate(formData.password)
    ]
    const failedValidations = loginValidateValues.filter(val => val !== true);
    if(emptyValues !== true){
        toast.error(emptyValues);
        return false
    }
    if(failedValidations.length > 0){
        failedValidations.forEach((failure) => {
            toast.error(failure)
        })
        return false
    } 
    return true
}
