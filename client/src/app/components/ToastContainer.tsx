"use client";

import "react-toastify/dist/ReactToastify.css";
import "../globals.css";
import { ToastProviderProps } from "../types";
import { ToastContainer } from "react-toastify";


export default function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
          {children}
          <ToastContainer 
            position="bottom-center"
            autoClose={3000}
          />
        </>
      );
}