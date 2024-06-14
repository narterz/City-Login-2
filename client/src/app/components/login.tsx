import { ChangeEvent, FC, FormEvent } from "react";
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { useAppDispatch } from "../lib/hooks";
import { changeView } from "../lib/reducers/authUserSlice";

interface LoginProps {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Login: FC<LoginProps> = ({ handleSubmit, handleChange }) => {
    const dispatch = useAppDispatch();

    const loginInputs = [
        {
            type: "text",
            name: "username",
            placeholder: "Username",
            icon: <FaUser className="inputIcon" size={20} />
        },
        {
            type: "password",
            name: "password",
            placeholder: "Password",
            icon: <RiLockPasswordFill className="inputIcon" size={20} />
        }
    ]

    const handleChangeView = () => {
        dispatch(changeView("changePassword"))
    }

    return (
        <>
            <div className="flex flex-row items-center justify-center w-full h-1/5">
                <h1>Sign in for laughs</h1>
            </div>
            <form className="h-4/5 w-full flex flex-col justify-between" action="" onSubmit={handleSubmit}>
                <div className="h-3/5 w-full flex flex-col justify-around items-center">
                    {loginInputs.map((val, i) => {
                        return (
                            <div className="h-2/5 w-full relative flex items-center" key={i}>
                                <input
                                    type={val.type}
                                    className="h-3/5 w-full"
                                    placeholder={val.placeholder}
                                    name={val.name}
                                    onChange={handleChange}
                                />
                                {val.icon}
                            </div>
                        )
                    })}
                </div>
                <div className="h-2/5 flex flex-row items-center justify-between">
                    <button className="bg-input-color w-2/5 h-2/5" onClick={handleChangeView}>Forgot password</button>
                    <button className=" w-2/5 h-2/5" type="submit">Login</button>
                </div>
            </form>
        </>
    )
}