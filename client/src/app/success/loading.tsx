import { ClipLoader } from "react-spinners";

export default function Loading(){
    return (
        <main className="bg-main h-screen w-screen flex items-center justify-center">
            <ClipLoader color="#fff" size={50} id="loader"/>
        </main>
    )
}