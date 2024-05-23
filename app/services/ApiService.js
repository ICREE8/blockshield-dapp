import httpClient from './HttpClient';

const apiService = {
    getAssets: () => httpClient.get('/api/v1/assets?activeOnly=true'),
    getAssetsByWallet: (wallet) => httpClient.get(`/api/v1/assets/wallet/${wallet}`),
    getTransactionsByWallet: (wallet) => httpClient.get(`/api/v1/transactions/wallet/${wallet}`)
};

export default apiService;
