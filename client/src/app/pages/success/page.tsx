import axios from "axios"
import { useEffect, useState } from "react";
import { handleSuccess } from "@/app/helpers/authUser";

export default function Success(){
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: ""
    });


    useEffect(() => {

    },[]);

    return (
        <div className="w-full h-full">
            <h1>You have successfully logged in</h1>
            <h2>Username: {user.firstName}</h2>
            <button>Log Out</button>
        </div>
    )
}