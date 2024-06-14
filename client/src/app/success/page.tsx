"use client"

import { userSelector, logoutUser, setSocialUser } from "@/app/lib/reducers/authUserSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { appendJoke, clearState, jokeSelector, nextJoke } from "../lib/reducers/jokeSlice";
import axios from "axios";
import { toast } from "react-toastify";

export default function Success() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { username } = useSelector(userSelector).user || {}
    const { displayName, photo } = useSelector(userSelector).socialMedia || {};
    const { pathname } = useSelector(userSelector).routeInfo;

    const { jokeArray, index } = useSelector(jokeSelector)

    const handleLogout = async () => {
        dispatch(logoutUser());
        router.push('/home');
    }

    const parseQueryParams = (queryString: string) => {
        const params = new URLSearchParams(queryString);
        const id = params.get("id");
        const displayName = params.get("displayName");
        const photo = params.get("photo");
        return { id, displayName, photo };
    };

    const generateJoke = async () => {
        try {
            const response = await axios.get(`https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark?type=single&amount=10`);
            console.log(response)
            const jokes = response.data.jokes.map((joke: any) => joke.joke);
            dispatch(appendJoke(jokes))
        } catch (error) {
            toast.error("Error fetching joke please try again");
            return
        }
    };

    const handleJokes = async () => {
        try {
            if (index >= jokeArray.length - 1) {
                dispatch(clearState());
                await generateJoke()
            } else {
                dispatch(nextJoke())
            }
        } catch (err) {
            toast.error("Error fetching joke please try again");
            return
        }
    }

    useEffect(() => {
        console.log(pathname)
        if (!username) {
            const { id, displayName, photo } = parseQueryParams(window.location.search);

            const socialUser = {
                displayName: displayName,
                id: id,
                photo: photo
            }
            dispatch(setSocialUser(socialUser));
        }
        console.log(displayName)
    }, []);

    useEffect(() => {
        console.log(index);
        console.log(jokeArray)
        console.log(jokeArray[index])

    },[handleJokes])


    return (
        <div className="w-full h-full flex flex-col  items-center justify-evenly">
            <nav className="h-[15vh] w-full bg-secondary flex flex-row justify-between items-center">
                <div className="ms-10">
                    <h1 className=" tracking-wider">LL</h1>
                </div>
                <div className="me-10 w-1/5 h-1/2 flex flex-row justify-between items-center">
                    <div className="w-1/5 flex flex-row justify-evenly items-center">
                        {photo
                            ? <img src={photo} alt="Social media profile picture" className="w-full h-full" />
                            : <FaUser className="text-white" size={30} />
                        }
                    </div>
                    <div className="h-full w-2/5 flex items-center justify-center">
                        <h3>{displayName ? `${displayName}` : `${username}`}</h3>
                    </div>
                    <button onClick={handleLogout} className="w-2/5 h-4/5">Log Out</button>
                </div>
            </nav>
            <div className="w-full h-[85vh] bg-main flex flex-col justify-evenly items-center">
                <h1>Your Joke</h1>
                <div className="w-1/2 h-1/3 flex items-center text-center justify-center ">
                    <h2 className="text- m-2 leading-relaxed text-white">{jokeArray[index]}</h2>
                </div>
                <div className="w-1/5 h-1/6 flex justify-center items-center">
                    <button className="bg-white text-main h-1/2 w-2/3" onClick={handleJokes}>New Joke</button>
                </div>
            </div>
        </div>
    )
}

