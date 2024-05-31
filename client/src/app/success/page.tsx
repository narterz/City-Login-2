"use client"

import { userSelector, logoutUser, getSocialUser} from "@/app/lib/reducers/authUserSlice";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Success() {
    const [isSocial, setIsSocial] = useState<boolean>(false);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const { username } = useAppSelector(userSelector).user
    const { displayName, photo } = useSelector(userSelector).socialMedia;

    const handleLogout = () => {
        dispatch(logoutUser());
        setIsSocial(false);
        router.push('/home');
    }

    useEffect(() => {
        dispatch(getSocialUser())
    },[])

    return (
        <div className="w-full h-full flex flex-col  items-center justify-evenly border border-red-500">
            <nav className="h-[15vh] w-full bg-secondary flex flex-row justify-between items-center">
                <div className="ms-10">
                    <h1 className=" tracking-wider">LL</h1>
                </div>
                <div className="me-10 w-1/5 h-1/2 flex flex-row justify-between items-center">
                    <div className="w-3/5 flex flex-row justify-evenly items-center">
                        { photo
                            ? <Image src={photo} alt="Social media profile picture" />
                            : <FaUser className="text-white" size={30} />
                        }
                        <h3>{isSocial ? displayName : username}</h3>
                    </div>
                    <button onClick={handleLogout} className="w-2/5 h-4/5">Log Out</button>
                </div>
            </nav>
            <div className="w-full h-[85vh] bg-main flex flex-col justify-evenly items-center">
                <h1>Your Joke</h1>
                <div className="w-1/2 h-1/3 bg-white border rounded-md">

                </div>
                <div className="w-1/5 h-1/6 flex justify-center items-center">
                    <button className="bg-white text-main h-1/2 w-2/3">New Joke</button>
                </div>
            </div>
        </div>
    )
}