import { useAppDispatch } from "@/app/lib/hooks";
import { ChangeEvent, FormEvent, FC } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { changeView } from "../lib/reducers/authUserSlice";

interface ChangeLoginProps {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const ChangeLogin: FC<ChangeLoginProps> = ({ handleChange, handleSubmit }) => {
    const dispatch = useAppDispatch();

    const changeLoginInputs = [
        {
            type: "text",
            name: "username",
            placeholder: "username",
            icon: <FaUser className="inputIcon" size={20} />
        },
        {
            type: "password",
            name: "password",
            placeholder: "Enter new password",
            icon: <RiLockPasswordFill className="inputIcon" size={20} />
        },
        {
            type: "password",
            name: "confirmPassword",
            placeholder: "Confirm new password",
            icon: <RiLockPasswordFill className="inputIcon" size={20} />
        }
    ];

    const handleBack = () => {
        dispatch(changeView("login"))
    }
    

    return (
        <>
            <div className="flex flex-row items-center justify-center w-full h-1/5">
                <h1>Change password</h1>
            </div>
            <form className="h-4/5 w-full flex flex-col justify-between" action="" onSubmit={handleSubmit}>
                <div className="h-4/6 w-full flex flex-col justify-around items-center">
                    {changeLoginInputs.map((val, i) => {
                        return (
                            <div className="h-1/3 w-full relative flex  items-center" key={i}>
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
                <div className="h-2/6 flex flex-row items-center justify-between">
                    <button className="w-2/5 h-2/5 bg-input-color" onClick={handleBack}>Back</button>
                    <button className="w-2/5 h-2/5 bg-main " type="submit">Change password</button>
                </div>
            </form>
        </>

    )
}