"use client";
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import NavBar from '@/components/NavBar';
import Spline from '@splinetool/react-spline';
import Link from 'next/link'; // Import Link

export default function buzlogin() {
    const { account, login } = useAuth();
    const businessAccount = "0xcd91ed5d6a17dbb580d17b4bb991a4b9c9b7614f";

    return (
        <div className="flex flex-col h-screen px-4 md:px-8 bg-[#93E9BE] text-black">
            <NavBar />
            <div className='flex justify-center'>
                <div className='w-4/12'>
                    <div className='p-8 bg-white rounded shadow justify-center my-4'>
                        <div>
                            <Spline scene="https://prod.spline.design/XbVs02IuMqdUF0Y1/scene.splinecode" />
                        </div>
                        <h2 className='text-2xl font-bold mb-4'>Login</h2>
                        {account ? (
                            account === businessAccount ? (
                                <>
                                    Logged in with business account: {account}
                                    <Link href="/BuzManage" className="inline-block mt-4 py-2 px-4 bg-black text-white rounded">
                                        Go to Manage
                                    </Link>                                </>
                            ) : 'You are not a business account! You are now logged in as Customer'
                        ) : 'Not logged in'}
                        {!account && <button className='mt-4 w-full py-2 px-4 bg-black text-white rounded' onClick={login}>Login with MetaMask</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}