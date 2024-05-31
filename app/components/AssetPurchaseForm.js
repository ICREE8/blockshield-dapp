'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import blockchainService from '../services/BlockchainService';
import apiService from '../services/ApiService';

const AssetPurchaseForm = ({ asset }) => {
    const router = useRouter();
    const [quantity, setQuantity] = useState(0);
    const [insuranceInclude, setInsuranceInclude] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccessMessage] = useState('');

    console.log(asset);

    const goHome = async () => {
        router.push('/');
    }

    const handleBuy = async (e) => {
        e.preventDefault();

        if (quantity <= 0 || quantity > asset.total_supply) {
            setError('Invalid quantity');
            return;
        }

        try {
            const tx = await blockchainService.insure(
                asset.insurance_token_address,
                asset.id,
                quantity,
                insuranceInclude
            );

            if (tx) {
                const walletAccount = await blockchainService.getWalletAccount();
                const transaction = {
                    "hash": tx.transaction,
                    "wallet": walletAccount,
                    "assetTransaction": {
                        "id": asset.id,
                        "symbol": asset.symbol,
                        "quantity": quantity
                    }
                };

                const response = await apiService.createTransaction(transaction);
                console.log(response);
                setSuccessMessage(`Success transaction to hire insurance for [ ${asset.symbol} ] on Blockshield protocol!`);
            } else {
                console.error(err);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to complete the transaction on blockchain!');
        }

    };

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            {
                error && (
                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">{error}.</span>
                        </div>
                    </div>
                )
            }
            {
                success && (
                    <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">{success}.</span>
                        </div>
                    </div>
                )
            }

            <form className="max-w-sm mx-auto" onSubmit={handleBuy}>
                <div className="mb-5">
                    <h5 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{asset.name} - {asset.symbol}</h5>
                    <p className="mb-3 text-gray-500 dark:text-gray-400">{asset.description}</p>
                    <p className="mb-3 text-gray-500 dark:text-gray-400">{asset.observation}</p>
                </div>
                <br />
                <div className="mb-5">
                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                    <input type="number" min={0} max={asset.total_supply - asset.remaining_supply} value={quantity} onChange={(e) => setQuantity(e.target.value)} id="quantity" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    {/*
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5">
                                <input id="insurance" type="checkbox" checked={insuranceInclude} onChange={(e) => setInsuranceInclude(e.target.checked)} value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                            </div>
                            <label htmlFor="insurance" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to sign the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">insurance contract.</a></label>
                        </div>
                    */}
                </div>
                <br />
                <div role="group">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Insure/Buy Asset</button>
                    <button type="button" onClick={goHome} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go Home</button>
                </div>
            </form>
        </div>
    );
};

export default AssetPurchaseForm;
