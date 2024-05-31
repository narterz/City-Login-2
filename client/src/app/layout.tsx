import type { Metadata } from "next";
import ReduxProvider from "./lib/provider";
import ToastProvider from '@/app/components/toastContainer';
import './globals.css';

export const metadata: Metadata = {
  title: "Laugh Login",
  description: "Login manually or through social media to view unique jokes",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center">
        <ReduxProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
