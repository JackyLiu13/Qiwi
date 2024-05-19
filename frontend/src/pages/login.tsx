// pages/login.tsx
"use client";
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import NavBar from '@/components/NavBar';
import Spline from '@splinetool/react-spline';

export default function Login() {
    const { account, login } = useAuth();

    return (
        <div className="flex flex-col h-screen px-4 md:px-8 bg-[#93E9BE] text-black">
            <NavBar />
            <div className='flex justify-center'>
                <div className='w-4/12'>
                    <div className='p-8 bg-white rounded shadow justify-center my-4'>
                        <div>
                            <Spline scene="https://prod.spline.design/e2mDxzJztumOR8jk/scene.splinecode" />
                        </div>
                        <h2 className='text-2xl font-bold mb-4'>Login</h2>
                        {account ? `Logged in with account: ${account}` : 'Not logged in'}
                        {!account && <button className='mt-4 w-full py-2 px-4 bg-black text-white rounded' onClick={login}>Login with MetaMask</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}
