'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import blockchainService from '../services/blockchainService';
import apiService from '../services/apiService';

const AssetPurchaseForm = ({ asset }) => {
    const [quantity, setQuantity] = useState('');
    const [insuranceInclude, setInsuranceInclude] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleBuy = async (e) => {
        e.preventDefault();

        if (quantity <= 0 || quantity > asset.value) {
            setError('Invalid quantity');
            return;
        }

        try {
            const success = await blockchainService.buyAsset(provider, asset.id, quantity);

            if (success) {
                await apiService.createTransaction({ assetId: asset.id, quantity });
                router.push('/');
            } else {
                setError('Failed to complete the transaction on blockchain');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred');
        }
    };

    return (
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <h2>Buy {asset.name}</h2>
            {error && <p className="text-danger">{error}</p>}
            <form class="max-w-sm mx-auto" onSubmit={handleBuy}>
                <div class="mb-5">
                    <label for="quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                    <input type="number" max={asset.remaining_supply} value={quantity} onChange={(e) => setQuantity(e.target.value)} id="quantity" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <div class="flex items-start mb-5">
                    <div class="flex items-center h-5">
                        <input id="insurance" type="checkbox" checked={insuranceInclude} onChange={(e) => setInsuranceInclude(e.target.checked)} value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                    </div>
                    <label for="insurance" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to sign the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">insurance contract.</a></label>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy Asset</button>
            </form>
        </div>
    );
};

export default AssetPurchaseForm;
