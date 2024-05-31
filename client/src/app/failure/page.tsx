"use client"

import { useAppSelector } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { userSelector } from "@/app/lib/reducers/authUserSlice";
import { useState, useEffect } from "react";

//TODO: extract error message and code and set state for display in useEffect

export default function Failure(){
    const [errorCode, setErrorCode] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { error } = useAppSelector(userSelector).auth;
    const router = useRouter();

    const handleBack = () => {
        router.push('/signUp')
    }

    useEffect(() => {

    },[])

    //Display 401(Unauthorized), 500(Internal server error)
    return (
        <div>
            <div className="w-full h-3/5 flex flex-row justify-evenly items-center">
                <h1>{errorCode}</h1>
                <h4>{errorMessage}</h4>
            </div>
            <h3 onClick={handleBack}>Back to main</h3>
        </div>
    )
}