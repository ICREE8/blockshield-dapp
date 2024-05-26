'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "next/navigation";
import apiService from "../../services/ApiService";
import Footer from '../../components/Footer';
import AssetPurchaseForm from '../../components/AssetPurchaseForm';

/**
 * https://www.alura.com.br/artigos/roteamento-eficiente-next-js-app-router
 */
const BuyPage = () => {
    const [asset, setAsset] = useState(null);

    const params = useParams();
    const assetId = params.id;

    const fetchAsset = useCallback(async () => {
        if (assetId) {
            try {
                const response = await apiService.getAssetsById(assetId);
                console.log(response);
                setAsset(response.data);
            } catch (err) {
                console.error(`Failed to fetch asset by id [ ${assetId} ]`, err);
            }
        }
    }, [assetId]);

    useEffect(() => {
        fetchAsset();
    }, [fetchAsset]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
                {asset && <AssetPurchaseForm asset={asset} />}
            </div>
            <Footer />
        </main>
    );
};

export default BuyPage;
