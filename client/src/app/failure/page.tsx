"use client"

import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { userSelector, logoutUser, handleError } from "@/app/lib/reducers/authUserSlice";
import { useEffect } from "react";

export default function Failure() {
    const { error, code } = useAppSelector(userSelector).auth;
    const router = useRouter();
    const dispatch = useAppDispatch();

    const parseQueryParams = (queryString: string) => {
        const params = new URLSearchParams(queryString);
        const error = params.get("error")
        const message = params.get("Error: message");
        const code = params.get("code")
        return { error, code, message };
    };

    const handleBack = () => {
        dispatch(logoutUser());
        router.push('/home');
    }

    useEffect(() => {
        const { error, message, code } = parseQueryParams(window.location.search);
        console.log(error)
        const errorResponse = {
            isLoggedIn: false,
            error: message,
            code: code
        }
        dispatch(handleError(errorResponse))
        console.log(message)
    }, [])

    return (
        <div className="h-full w-full bg-secondary flex flex-col justify-between items-center">
            <div className="w-2/4 h-3/5 flex flex-row justify-evenly items-center">
                <h1>{code}</h1>
                <div className="border-l border-white h-1/4 w-[2px]"></div>
                <p className="text-white">{error}</p>
            </div>
            <div className="h-2/5 w-1/4 flex items-center justify-center">
                <button className="bg-white border rounded-md text-black w-1/2 h-1/5" onClick={handleBack}>Back to main</button>
            </div>
        </div>
    )
}