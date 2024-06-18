"use client"

import { AuthState } from "@/app/types";
import { handleRouteName } from "@/app/helpers/authUser";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { userSelector, initialState, signUpUser, changePathname, changeView} from "@/app/lib/reducers/authUserSlice";
import { validateLogin, validatePasswordChange } from "../helpers/validate";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { ChangeLogin } from "../components/changeLogin";
import { SignUp } from "../components/signUp";
import { Login } from "../components/login";

export default function Home() {
    const [formData, setFormData] = useState<AuthState['user']>({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const { isLoggedIn, authType } = useAppSelector(userSelector).auth;
    const { pathname } = useAppSelector(userSelector).routeInfo;
    const dispatch = useAppDispatch();
    const router = useRouter();

    const renderContent = () => {
        switch (authType) {
            case "signUp":
                return <SignUp handleChange={handleChange} handleSubmit={handleSubmit} />;
            case "login":
                return <Login handleChange={handleChange} handleSubmit={handleSubmit} />;
            case "changePassword":
                return <ChangeLogin handleChange={handleChange} handleSubmit={handleSubmit} />;
            default:
                return <SignUp handleChange={handleChange} handleSubmit={handleSubmit} />;
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            ...formData,
            pathname
        }
        if (authType === "changePassword") {
            changePassword({
                username: user.username,
                password: user.password,
                confirmPassword: user.confirmPassword
            });
            return;
        }
        const validateMessage = validateLogin({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            pathname: pathname
        });
        if (validateMessage === true) {
            dispatch(signUpUser(user));
        } else {
            toast.error(validateMessage)
        }
    };

    const handlePathName = (loginType: string) => {
        const path = handleRouteName(loginType);
        if (loginType !== "signUp" && loginType !== "login") {
            dispatch(changePathname(path));
            const endpoint = `${BASE_URL}${path}`;
            window.location.href = endpoint;
        } else {
            dispatch(changeView(loginType))
            dispatch(changePathname(path))
        }
    }

    const changePassword = async (user: AuthState['user']) => {
        const validPassword = validatePasswordChange(user);
        try {
            if (validPassword) {
                console.log("2: Password is validated")
                const response = await axios.post(`${BASE_URL}/change/login`, 
                    { username: user.username, password: user.password }, 
                    { withCredentials: true });
                const message = response.data;
                toast.success(message);
                dispatch(changeView("login"));
                setFormData(initialState.user)
                return
            } else {
                toast.error(validPassword)
                return
            }
        } catch (error: any) {
            toast.error(error.message);
            return
        }
    }

    useEffect(() => {
        if (isLoggedIn === true) {
            router.push('/success');
            setFormData(initialState.user);
        } 
    }, [isLoggedIn]);

    useEffect(() => { renderContent() }, [authType]);

        useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_BASE_URL)
    },[])

    return (
        <div className="w-full h-full flex flex-row justify-between">
            <div className="text-bg-white bg-secondary h-full flex flex-col items-center justify-between sm:w-full xl:w-2/6">
                <div className="h-[75%] w-5/6">
                    {renderContent()}
                </div>
                <div className="flex flex-col justify-between items-center w-5/6 h-[10%] ">
                    <div className="h-1/3 flex items-center text-center">
                        <h3>Or</h3>
                    </div>
                    <div className="h-2/3 w-full flex flex-row justify-between items-center">
                        <FaSquareFacebook size={30} className="opacity-hover text-[#1877F2]" onClick={() => handlePathName("facebook")} />
                        <FaDiscord size={30} className="opacity-hover text-[#7289da]" onClick={() => handlePathName("discord")} />
                        <FaGithub size={30} className="opacity-hover" onClick={() => handlePathName("github")} />
                        <FcGoogle size={30} className="opacity-hover" onClick={() => handlePathName("google")} />
                    </div>
                </div>
                <div className="w-5/6 h-[10%] flex justify-center items-center">
                    {authType === "login"
                        ? <h3 className="text-light font-normal" onClick={() => handlePathName("signUp")}>Don&apos;t have an account <b className="text-main opacity-hover">Sign Up</b></h3>
                        : <h3 className="text-light font-normal" onClick={() => handlePathName("login")}>Already a Member? <b className="text-main opacity-hover">Login</b></h3>
                    }
                </div>
            </div>
            
            <div className="xl:w-4/6 md:w-2/5  sm:bg-white h-full relative overflow-hidden">
                <div className="blurImg sm-max-md:hidden"></div>
                <div className="hero-text md:hidden lg:block lg:w-[80%] xl:w-[60%] border-2 border-main">
                    <h1 className="w-full xl:text-[5rem] xsm:max-lg:text-[2.175rem] text-white leading-relaxed">Login laugh</h1>
                    <h2 className="font-bold w-full text-white">Login to generate limitless jokes</h2>
                </div>
            </div>
        </div>
    )
}
