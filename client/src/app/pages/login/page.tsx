"use client"

import { useRouter } from "next/router";
import { AuthState } from "@/app/types";
import { handleSocialLogin, handleSubmit } from "@/app/helpers/authUser";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState, ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { changePathname, userSelector } from "@/app/lib/reducers/authUserSlice";

//TODO: Once log in is successful link to success page

export default function SignUp() {
    const [formData, setFormData] = useState<AuthState['user']>({
        username: "",
        password: "",
    });

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoggedIn, error } = useAppSelector(userSelector).auth

    const credentials = [
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

    const clearInput = () => {
        setFormData({
            ...formData,
            firstName: "", 
            lastName: "",
            username: "",
            password: ""
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePathName = () => {
        router.push('/signUp');
        dispatch(changePathname('/api/signUp'))
    }

    useEffect(() => { clearInput(); },[handleSubmit]);

    useEffect(() => {
        if(isLoggedIn){
            router.push('/success')
        } else if (!isLoggedIn && error){
            router.push('/failure')
        }
    },[userSelector])

    return (
        <div className="text-main h-full flex flex-col justify-between w-2/5">
            <div className="h-[18%] flex flex-col justify-between">
                <h3>Start for free</h3>
                <h3 className="text-sky font-boldest no-underline" onClick={handlePathName}>Not a member? Sign Up</h3>
            </div>
            <form action="" className="h-[82%] w-5/6 flex flex-col justify-between" onSubmit={e => handleSubmit(e, formData)}>
                <div className="w-full h-3/5 flex flex-col justify-between items-center">
                    {credentials.map((credInputs) => {
                        return (
                            <div className="w-full relative flex items-center flex-grow">
                                <input
                                    type="text"
                                    className={"w-full h-2/3"}
                                    placeholder={credInputs.placeholder}
                                    name={credInputs.name}
                                    onChange={handleChange}
                                />
                                {credInputs.icon}
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-row justify-between items-center w-full h-1/5">
                    <FaSquareFacebook size={30} className="opacity-hover text-[#1877F2]" onClick={() => handleSocialLogin("facebook")} />
                    <FaXTwitter size={30} className="opacity-hover" onClick={() => handleSocialLogin("twitter")} />
                    <FaGithub size={30} className="opacity-hover" onClick={() => handleSocialLogin("github")} />
                    <FcGoogle size={30} className="opacity-hover" onClick={() => handleSocialLogin("google")} />
                </div>
                <div className="h-1/5 w-full flex flex-row justify-between items-center">
                    <button className="loginBtn bg-dark">Clear All</button>
                    <button className="loginBtn bg-sky" type="submit">Create Account</button>
                </div>
            </form>
        </div>
    )
}