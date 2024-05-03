import { FaCity } from "react-icons/fa";
import Link from 'next/link';
import SignUp from "./signUp";

export default function Home() {
    return (
        <div className="wrapper w-screen h-screen relative bg-sky flex items-center justify-center">
            <div className="loginBg backdrop-blur-lg bg-light-dark shadow-3xl h-[90%] w-[90%] rounded-xl pr-8 pl-8 py-2 flex flex-col justify-between">
                <div className='flex flex-row justify-between h-[10%] w-full'>
                    <div className='w-[15%] flex flex-row items-center justify-evenly'>
                        <FaCity className="text-main" size={40} />
                        <h2 className="text-main">City Login<b className='text-triadic'>.</b></h2>
                    </div>
                    <div className='flex flex-row w-1/6 justify-between items-center'>
                        <Link href="/login" className='color-hover text-lg text-bold'>Login</Link>
                        <Link href="/signUp" className='color-hover text-lg text-bold'>Sign up</Link>
                    </div>
                </div>
                <div className="h-[90%]">
                    <SignUp />
                </div>
            </div>
        </div>
    )
}
