"use client";

import Home from './home/page';
import { useAppSelector } from '@/app/lib/hooks';
import { userSelector } from '@/app//lib/reducers/authUserSlice';
import './globals.css'
import { useEffect } from 'react';

export default function Page() {
  const { loading } = useAppSelector(userSelector).auth;

  useEffect(() => {
    console.log("This is now loading", loading)
  },[loading])

  return (
    <>
       <Home />
    </>
  );
}

