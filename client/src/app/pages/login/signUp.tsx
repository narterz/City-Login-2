import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { RiProfileLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {

    //TODO: Change email to username

    const handleSocialLogin = (social: string) => {
        switch(social){
            case "facebook":
                break;
            case "twitter":
                break;
            case "github":
                break;
            case "google":
                break
            default:
                break;
        }
    }

    return (
        <div className="text-main h-full flex flex-col justify-between w-2/5">
            <div className="h-[18%] flex flex-col justify-between">
                <h3>Start for free</h3>
                <div className="flex flex-row items-end">
                    <h1>Create Your Account</h1>
                    <GoDotFill />
                </div>
                <h3>Already a Member? <Link href='/login' className="text-sky font-boldest">Log in</Link></h3>
            </div>
            <form action="" className="h-3/6 w-5/6 flex flex-col justify-between">
                <div className="flex flex-row justify-between flex-grow items-center">
                    <div className="w-2/5 h-1/2 flex items-center relative ">
                        <input type="text" id="firstName" placeholder="First Name" className="w-full bg-light-dark" />
                        <RiProfileLine className="inputIcon" size={20} />
                    </div>
                    <div className="w-2/5 h-1/2 relative flex items-center">
                        <input type="text" id="lastName" placeholder="Last Name" className="w-full" />
                        <RiProfileLine className="inputIcon" size={20} />
                    </div>
                </div>
                <div className="w-full relative flex flex-grow items-center">
                    <input type="text" className="h-1/2" placeholder="email" />
                    <MdEmail className="inputIcon" size={20} />
                </div>
                <div className="w-full relative flex items-center flex-grow">
                    <input type="password" className="h-1/2" placeholder="passport" />
                    <RiLockPasswordFill className="inputIcon" size={20} />
                </div>
            </form>
            <div className="flex flex-row justify-between items-center w-5/6 h-[8%]">
                <FaSquareFacebook size={30} className="opacity-hover text-[#1877F2]" onClick={() => handleSocialLogin("facebook")}/>
                <FaXTwitter size={30}className="opacity-hover" onClick={() => handleSocialLogin("twitter")}/>
                <FaGithub size={30} className="opacity-hover" onClick={() => handleSocialLogin("github")}/>
                <FcGoogle size={30} className="opacity-hover" onClick={() => handleSocialLogin("google")}/>
            </div>
            <div className="h-1/6 w-5/6 flex flex-row justify-between items-center">
                <button className="loginBtn bg-light-dark">Clear All</button>
                <button className="loginBtn bg-sky">Create Account</button>
            </div>
        </div>
    )
}