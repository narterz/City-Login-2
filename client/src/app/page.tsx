import Image from "next/image";
import Login from "./pages/login/page";
import SignUp from "./pages/signUp/page";
import Success from "./pages/success/page";
import Failure from "./pages/failure/page";
import { ToastContainer } from 'react-toastify';
import { GoDotFill } from "react-icons/go";
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {

  const renderPageContent = () => {

  }

  return (
    <main className="">
      <Login />
      <ToastContainer />
    </main>
  );
}
