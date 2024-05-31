"use client"

import { AuthState, UserAndRoutes } from "@/app/types";
import { handleRoute, handleRouteName } from "@/app/helpers/authUser";
import { validateLogin } from "../helpers/validate";
import { RiProfileLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { addUser, signUpUser, userSelector, initialState, handleError, handleLoading, changePathname, changeRoute, getSocialUser } from "@/app/lib/reducers/authUserSlice";

//TODO: handle error toast not going to useEffect (don't put in useEffect)
//TODO: Make seperate functions for handling social media and local login

export default function Home() {
    const [formData, setFormData] = useState<AuthState['user']>({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const { isLoggedIn, error, loading } = useAppSelector(userSelector).auth;
    const { pathname, isLoggingIn } = useAppSelector(userSelector).routeInfo;
    const dispatch = useAppDispatch();
    const router = useRouter();

    const credentials = [
        {
            type: "text",
            name: "firstName",
            placeholder: "First Name",
            icon: <RiProfileLine className="inputIcon" size={20} />
        },
        {
            type: "text",
            name: "lastName",
            placeholder: "Last Name",
            icon: <RiProfileLine className="inputIcon" size={20} />
        },
        {
            type: "text",
            name: "username",
            placeholder: "Username",
            icon: <MdEmail className="inputIcon" size={20} />
        },
        {
            type: "password",
            name: "password",
            placeholder: "Password",
            icon: <RiLockPasswordFill className="inputIcon" size={20} />
        }
    ];

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validateMessage = validateLogin(formData, pathname);
        if (validateMessage === true) {
            try {
                dispatch(signUpUser(formData))
                dispatch(addUser(formData))
            } catch (error) {
                console.error(error)
            }
        }
    };

    //For testing
    const handlePathName = (loginType: string) => {
        console.log(`Login type: ${loginType}`)
        const manualPathnames = {
            pathname: handleRouteName(loginType),
            isLoggingIn: loginType === "login"
        }
        if (loginType !== "signUp" && loginType !== "login") {
            const endpoint = `${BASE_URL}${manualPathnames.pathname}`
            console.log(`endpoint being sent ${endpoint}`)
            window.location.href = endpoint;
        } else {
            console.log("This else ran")
            dispatch(changePathname(manualPathnames))
        }
    }

    const filteredCredentials = isLoggingIn ? credentials.slice(2) : credentials;

    useEffect(() => {
        if (isLoggedIn === true) {
            setFormData(initialState.user)
            dispatch(handleError(""));
            router.push('/success')
        }
    }, [isLoggedIn]);


    // useEffect(() => {
    //     console.log("Error state updated", error)
    //     toast.error(error)
    // }, [error]);


    return (
        <div className="w-full h-full flex flex-row justify-between">
            <div className="text-bg-white bg-secondary  h-full flex flex-col items-center justify-between w-2/6">
                <div className={`${isLoggingIn ? "h-[20%] justify-center" : "h-[10%] justify-end "} w-5/6 flex flex-col items-center`}>
                    <div className="flex flex-row items-center justify-center">
                        {isLoggingIn
                            ? <h1>Sign in for laughs</h1>
                            : <h1>Create Your Account</h1>
                        }
                    </div>
                </div>
                <form action="" className={`${isLoggingIn ? "h-[75%]" : "h-[85%]"} w-5/6 flex flex-col justify-between`} onSubmit={handleSubmit}>
                    <div className={`${isLoggingIn ? "h-1/2" : "h-3/5"}  w-full flex flex-col justify-between items-center`}>
                        {filteredCredentials.map((credInputs, i) => {
                            return (
                                <div className={`w-full ${isLoggingIn ? "h-3/5" : "h-1/2"} relative flex items-center`} key={i}>
                                    <input
                                        type={credInputs.type}
                                        className={`w-full ${isLoggingIn ? "h-2/5" : "h-3/5"}`}
                                        placeholder={credInputs.placeholder}
                                        name={credInputs.name}
                                        onChange={handleChange}
                                    />
                                    {credInputs.icon}
                                </div>
                            )
                        })}
                    </div>
                    <div className={`${isLoggingIn ? "h-1/2" : "h-2/5"} flex flex-col justify-between items-center`}>
                        <div className="h-1/3 w-full flex flex-row justify-between items-center">
                            <button className="loginBtn w-full h-4/6" type="submit">{isLoggingIn ? "Login" : "Create Account"}</button>
                        </div>
                        <div className="flex flex-col justify-between items-center w-full h-1/3 ">
                            <div className="h-1/3 flex items-center text-center">
                                <h3>Or</h3>
                            </div>
                            <div className="h-2/3 w-full flex flex-row justify-between items-center">
                                <FaSquareFacebook size={30} className="opacity-hover text-[#1877F2]" onClick={() => handlePathName("facebook")} />
                                <FaXTwitter size={30} className="opacity-hover" onClick={() => handlePathName("linkedIn")} />
                                <FaGithub size={30} className="opacity-hover" onClick={() => handlePathName("github")} />
                                <FcGoogle size={30} className="opacity-hover" onClick={() => handlePathName("google")} />
                            </div>
                        </div>
                        <div className="w-full h-1/4 flex justify-center items-center">
                            {isLoggingIn
                                ? <h3 className="text-light font-normal" onClick={() => handlePathName("signUp")}>Don't have an account <b className="text-main opacity-hover">Sign Up</b></h3>
                                : <h3 className="text-light font-normal" onClick={() => handlePathName("login")}>Already a Member? <b className="text-main opacity-hover">Login</b></h3>
                            }
                        </div>
                    </div>
                </form>
            </div>
            <div className="w-4/6 h-full relative overflow-hidden">
                <div className="blurImg"></div>
                <div className="hero-text border-2 border-main">
                    <h1 className="w-full text-[7rem] h-1/2 text-white leading-relaxed">Login laughs</h1>
                    <h2 className="font-bold w-full text-white">Login manually or via social media to generate endless jokes on the click of a button</h2>
                </div>
            </div>
        </div>
    )
}
