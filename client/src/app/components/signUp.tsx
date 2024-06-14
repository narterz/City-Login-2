import { ChangeEvent, FC, FormEvent } from "react";
import { RiLockPasswordFill, RiProfileLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";

interface SignUpProps {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SignUp: FC<SignUpProps> = ({ handleChange, handleSubmit }) => {
    const signUpInputs = [
        {
            type: "text",
            name: "firstName",
            placeholder: "First Name",
            icon: <RiProfileLine className="inputIcon" size={20} />
        },
        {
            type: "text",
            name: "lastName",
            placeholder: "Last Name",
            icon: <RiProfileLine className="inputIcon" size={20} />
        },
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
    ];

    return (
        <>
            <div className="flex flex-row items-center justify-center w-full h-1/5">
                <h1>Create your account</h1>
            </div>
            <form className="h-4/5 w-full flex flex-col justify-between" action="" onSubmit={handleSubmit}>
                <div className="h-4/5 w-full flex flex-col justify-between items-center">
                    {signUpInputs.map((val, i) => {
                        return (
                            <div className="h-1/4 w-full relative flex items-center" key={i}>
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
                <div className="h-1/5 flex items-center justify-center">
                    <button className="loginBtn w-full h-4/6" type="submit">Create account</button>
                </div>
            </form>
        </>
    )
}