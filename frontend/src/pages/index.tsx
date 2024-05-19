"use client";
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Spline from '@splinetool/react-spline';
import { web3 } from '../web3';
import contract from '../web3';
import Link from 'next/link';

export default function Home() {
    const [account, setAccount] = useState('');
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const loadAccount = async () => {
            if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                // fetchPoints(accounts[0]);
            } else {
                console.log('Metamask not detected');
            }
        };

        loadAccount();
    }, []);

    // const fetchPoints = async (account) => {
    //     const points = await contract.methods.points(account).call();
    //     setPoints(points);
    // };

    const joinProgram = async () => {
        await contract.methods.join().send({ from: account, value: web3.utils.toWei('0.01', 'ether') });
        fetchPoints(account);
    };

    const issuePoints = async (recipient, amount) => {
        await contract.methods.issuePoints(recipient, amount).send({ from: account });
        fetchPoints(recipient);
    };

    const transferPoints = async (recipient, amount) => {
        await contract.methods.transferPoints(recipient, amount).send({ from: account });
        fetchPoints(account);
        fetchPoints(recipient);
    };

    const redeemPoints = async (amount) => {
        await contract.methods.redeemPoints(amount).send({ from: account });
        fetchPoints(account);
    };

    return (
        <div className="flex flex-col h-screen px-4 md:px-8 bg-[#93E9BE] text-black">
            <NavBar />
            <div className="flex flex-row justify-center items-center">
                <div className="flex flex-col md:flex-row justify-between items-center px-8">
                    <div className="flex flex-col space-y-4 p-8 md:w-1/2 ">
                        <h1 className="text-4xl font-bold">Qiwi</h1>
                        <p className="text-xl">Accrue points through sustainable spending. Spend them on sustainable items. Try now!</p>
                        <Link href="/login"><button className="px-4 py-2 bg-black text-white rounded" >Join Program</button></Link>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 justify-center items-start">
                        <Spline scene='https://prod.spline.design/4PhJq1Zv274PwDqd/scene.splinecode' />
                    </div>
                </div>
            </div>
        </div>
    );
}
