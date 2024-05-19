// context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import Web3 from 'web3';

interface AuthContextProps {
    account: string | null;
    login: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);

    useEffect(() => {
        const storedAccount = localStorage.getItem('account');
        if (storedAccount) {
            setAccount(storedAccount);
        }
    }, []);

    const login = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                localStorage.setItem('account', accounts[0]);
            } catch (e) {
                console.log('User denied account access...');
            }
        } else if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider);
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            localStorage.setItem('account', accounts[0]);
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    };

    const logout = () => {
        setAccount(null);
        localStorage.removeItem('account');
    };

    return (
        <AuthContext.Provider value={{ account, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
