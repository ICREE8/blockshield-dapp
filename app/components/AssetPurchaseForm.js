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
        
        <div className="container mt-5">
            <h2>Buy {asset.name}</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleBuy}>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        id="insuranceInclude"
                        className="form-check-input"
                        checked={insuranceInclude}
                        onChange={(e) => setInsuranceInclude(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="insuranceInclude">Include Insurance</label>
                </div>
                <button type="submit" className="btn btn-success">Buy</button>
            </form>
        </div>
    );
};

export default AssetPurchaseForm;
