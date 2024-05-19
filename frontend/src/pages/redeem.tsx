"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import NavBar from '@/components/NavBar';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card';
import Link from 'next/link';

const Redeem: React.FC = () => {
    const { account, login } = useAuth();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (account) {
            console.log(account);
            fetch(`http://localhost:8000/user/${account}`)
                .then(response => response.json())
                .then(data => setProgress(data.balance))
                .catch(error => console.error('Error:', error));
        }
    }, [account]);

    return (
        <div className='flex flex-col px-4 md:px-8 bg-[#93E9BE] text-black mb-12 min-h-screen'>
            <NavBar />

            {account ? (
                <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto mt-8 p-6  pb-8 bg-white rounded-lg shadow-md">
                    <ProgressBar progress={progress} goal="Goal: Bees Wax Candle" goalNum={200} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                        <Card image="https://media.discordapp.net/attachments/1228611822672941156/1241689261237993482/image.png?ex=664b1cbd&is=6649cb3d&hm=b53fa3d0e6f62128ec1c68aa12baffb00ac6143afb7b75c2ef58c126d8337370&=&format=webp&quality=lossless&width=663&height=663"
                            name="Reuseable Straws" points={100} userPoints={progress} address={account} />
                        <Card image="https://media.discordapp.net/attachments/1228611822672941156/1241691030504607806/Colors-Beeswax-Stick-Candle-Gifts-Set-Hand-Rolled-100-Beeswax-Pillar-Candles-3954137791.jpg?ex=664b1e63&is=6649cce3&hm=52f019561e4af61299eb0899f4cf2966bbfe911fc2b00756a9f921486cd174b4&=&format=webp&width=663&height=663"
                            name="Bees Wax Candle" points={200} userPoints={progress} address={account} />

                        <Card image="https://media.discordapp.net/attachments/1228611822672941156/1241690349236125797/image.png?ex=664b1dc0&is=6649cc40&hm=373f6c993222b58dcef8e791d8744ac5e59bcc677319847b299ee8d34a342aa8&=&format=webp&quality=lossless&width=410&height=393"
                            name="Bamboo Toothbrushes" points={350} userPoints={progress} address={account} />

                        <Card image="https://media.discordapp.net/attachments/1228611822672941156/1241695274448195686/91pFv5BD3nL._AC_SL1500_-61b316d14f474de3ab3347cc6d05268f-2074546110.jpg?ex=664b2257&is=6649d0d7&hm=8aab6c487ceb7d30fff7866a2f228058d5a97e04c5aa164d717cb054a461ace9&=&format=webp&width=929&height=663"
                            name="Solar Power Charger" points={5000} userPoints={progress} address={account} />
                        <Card image="https://media.discordapp.net/attachments/1228611822672941156/1241696364392484894/iu.png?ex=664b235a&is=6649d1da&hm=fb53d841e22cb299fc25806cb8f074f4dd80e59e5218a46855f1b6dcc26105c0&=&format=webp&quality=lossless&width=663&height=663"
                            name="Eco Bee Thermostat" points={15000} userPoints={progress} address={account} />

                    </div>
                </div>
            ) : (

                <div className='flex flex-1 flex-col items-center h-screen mx-auto mt-8 p-6 pb-8 justify-center h'>
                    <div className='bg-white rounded-md p-10 flex flex-col items-center'>
                        <b>Please Login to Redeem!</b>
                        <Link href="/login" className='mt-4'>
                            <button className='ml-4 py-2 px-4 bg-green-800 text-white rounded'>Login</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Redeem;
