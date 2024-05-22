import { ethers } from 'ethers';

const blockchainService = {
    insureAsset: async (provider, contractAddress, assetId) => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, [
            // ABI of the smart contract
            "function insure(uint256 assetId) public returns (bool)"
        ], signer);

        try {
            const tx = await contract.insure(assetId);
            await tx.wait();
            return true;
        } catch (err) {
            console.error("Failed to insure asset", err);
            return false;
        }
    }
};

export default blockchainService;
