import { ethers } from 'ethers';

const blockchainService = {
    buyAsset: async (provider, contractAddress, assetId, quantity, includeInsurance) => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, [
            // ABI of the smart contract
            "function buyAsset(string assetId, uint256 quantity, bool includeInsurance) public payable returns (bool)"
        ], signer);

        try {
            const tx = await contract.buyAsset(assetId, quantity, includeInsurance);
            await tx.wait();
            return tx;
        } catch (err) {
            console.error("Failed to buy asset", err);
            return false;
        }
    }
};

export default blockchainService;