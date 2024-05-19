"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import NavBar from '@/components/NavBar';
import Spline from '@splinetool/react-spline';

export default function BuzManage() {
    const { account, login } = useAuth();
    const businessAccount = "0xcd91ed5d6a17dbb580d17b4bb991a4b9c9b7614f";

    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [showTransactions, setShowTransactions] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/users')
            .then(response => response.json())
            .then(data => setUsers(data));

        fetch('http://localhost:8000/transactions')
            .then(response => response.json())
            .then(data => setTransactions(data));
    }, []);

    return (
        <div className="flex flex-col h-screen px-4 md:px-8 bg-[#93E9BE] text-black">
            <NavBar />
            <div className='flex justify-center'>
                <div className='w-7/12'>
                    <div className='p-8 bg-white rounded shadow justify-center my-4'>
                        {
                            account === businessAccount ?
                                <div>
                                    <div style={{ textAlign: 'right' }}>
                                        <button
                                            onClick={() => setShowTransactions(!showTransactions)}
                                            style={{ backgroundColor: 'black', color: 'white', borderRadius: '5px', padding: '10px' }}
                                        >
                                            {showTransactions ? 'Show Users' : 'Show Transactions'}
                                        </button>
                                    </div>

                                    {showTransactions ? (
                                        <table style={{ width: '100%', tableLayout: 'fixed' }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '33%' }}>Transaction</th>
                                                    <th style={{ width: '33%', textAlign: 'center' }}>Amount</th>
                                                    <th style={{ width: '33%' }}>Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transactions.map((transaction, index) => (
                                                    <tr key={index}>
                                                        <td>{transaction.transaction}</td>
                                                        <td style={{ textAlign: 'center' }}>{transaction.amount}</td>
                                                        <td>{transaction.address}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (

                                        <table style={{ width: '100%', tableLayout: 'fixed' }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '50%' }}>Address</th>
                                                    <th style={{ width: '50%', textAlign: 'center' }}>Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user, index) => (
                                                    <tr key={index}>
                                                        <td>{user.address}</td>
                                                        <td style={{ textAlign: 'center' }}>{user.balance}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div> :
                                <div>
                                    <div>
                                        <Spline scene="https://prod.spline.design/XbVs02IuMqdUF0Y1/scene.splinecode" />
                                    </div>
                                    <div>
                                        You are not a business account! Return to redeem
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}