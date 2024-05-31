"use client"

import anime from "animejs";
import { ClipLoader } from "react-spinners";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { userSelector, handleLoading } from "@/app/lib/reducers/authUserSlice"
import { useEffect } from "react";

export default function Loading() {

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(userSelector).auth;

    // const animate = () => {
    //     const loader = anime.timeline({
    //         complete: () => dispatch(handleLoading(false))
    //     });
    //     loader.add({
    //         targets: "#loader",
    //         delay: 0,
    //         scale: 1,
    //         duration: 500,
    //         easing: "easeInOutExpo"
    //     });
    //     loader.add({
    //         targets: "#loader",
    //         delay: 0,
    //         scale: 1.25,
    //         duration: 500,
    //         easing: "easeInOutExpo"
    //     })
    // }

    // useEffect(() => {
    //     const timeout = setTimeout(() => dispatch(handleLoading(true)), 10);
    //     animate();
    //     return () => {
    //         clearInterval(timeout);
    //     }
    // }, [loading]);

    return (
        <div className="w-screen h-screen flex justify-evenly items-center z-20">
            <h1>Laugh Login</h1>
            <ClipLoader color="#f16568" size={50} id="loader" />
        </div>

    )
}
