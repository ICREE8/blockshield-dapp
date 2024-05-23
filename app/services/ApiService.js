import httpClient from './HttpClient';

const apiService = {
    getAssets: () => httpClient.get('/api/v1/assets?activeOnly=true'),
    getAssetsByWallet: (wallet) => httpClient.get(`/api/v1/assets/wallet/${wallet}`),
    getTransactionsByWallet: (wallet) => httpClient.get(`/api/v1/transactions/wallet/${wallet}`),
    createTransaction: (transaction) => httpClient.post('/api/v1/transactions', transaction)
};

export default apiService;
