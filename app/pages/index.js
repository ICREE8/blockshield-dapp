'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from "next/image";
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WalletConnector from '../components/WalletConnector';
import DataTable from '../components/Table';
import apiService from '../services/ApiService';

const HomePage = () => {
    const [provider, setProvider] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [assets, setAssets] = useState([]);

    const fetchAssets = useCallback(async () => {
        if (wallet) {
            try {
                const response = await apiService.getAssetsByWallet(wallet);
                setAssets(response.data);
            } catch (err) {
                console.error("Failed to fetch assets", err);
            }
        }
    }, [wallet]);

    useEffect(() => {
        fetchAssets();
    }, [fetchAssets]);

    const handleWalletConnect = (provider, wallet) => {
        setProvider(provider);
        setWallet(wallet);
    };

    return (
        <div>
            <Head>
                <title>My DApp</title>
            </Head>
            <Navbar />
            <div className="container mt-5">
                <WalletConnector onConnect={handleWalletConnect} />
                {wallet && <DataTable data={assets} />}
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
