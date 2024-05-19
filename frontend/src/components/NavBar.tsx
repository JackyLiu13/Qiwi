import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const NavBar = () => {
    const { account, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);



    return (
        <nav className="flex justify-between items-center mx-8 bg-green-200">
            <div className="font-bold px-4">
                <Link href="/">Qiwi 🥝
                </Link>
            </div>            <div className="space-x-5 bg-black text-white p-4">
                <button>
                    <div className="text-white">
                        {account ? (<div>
                            <span>Logged in with account: ${account}</span>
                        </div>) : 'Not logged in'}
                    </div></button>
                <Link href="/"><button>Home</button></Link>
                <button>About</button>
                <Link href="/redeem" ><button>Redeem</button></Link>
                <div className="relative inline-block text-left">
                    {account ? (
                        <button onClick={logout} className="ml-4 py-2 px-4 bg-red-600 text-white rounded">Logout</button>
                    ) : (
                        <>
                            <button onClick={() => setIsOpen(!isOpen)} className='ml-4 py-2 px-4 bg-green-800 text-white rounded'>Login</button>
                            {isOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Customer</Link>
                                        <Link href="/buzlogin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Business</Link>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav >
    )
}

export default NavBar