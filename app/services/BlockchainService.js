import { ethers } from 'ethers';

import TokenInsurance from './ABI/TokenInsurance.json';

const USDC_CONTRACT_ADDRESS = "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582";
const USDC_ABI_APPROVE = "function approve(address spender, uint256 value) external returns (bool)";
const TOKEN_ABI_INSURANCE = TokenInsurance.abi;
// const TOKEN_ABI_INSURANCE = "function hireInsurance(uint256 quantity_) external payable";

const blockchainService = {
    getAmountToPay: async (contractAddress, quantity, unitaryValue) => {
        // The value to pay will be used in USD, then, converse to the USD dividing per 100000000
        const ABI = "function getLatestPrice() public view returns (int)";
        const provider = await blockchainService.getWalletProvider();
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(contractAddress, [ABI], signer);
        const lastedPrice = await contract.getLatestPrice();
        console.log(parseFloat(lastedPrice.toString()));
        const amountToPay = (parseFloat(lastedPrice.toString()) / 100000000); // TODO: unitaryValue * quantity
        console.log(`Lasted price: ${lastedPrice},\nQuantity: ${quantity}, \nAmount to pay: ${(amountToPay * quantity * unitaryValue)}`);

        return amountToPay;
    },

    getWalletProvider: async () => {
        // Request access to the user's MetaMask account
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        let provider;

        if (window.ethereum) {
            try {
                provider = new ethers.BrowserProvider(window.ethereum);
            } catch (err) {
                console.error("Failed to connect wallet", err);
                provider = ethers.getDefaultProvider();
            }
        } else {
            console.log("MetaMask not installed; using read-only defaults");
            provider = ethers.getDefaultProvider();
        }

        return provider;
    },

    getWalletAccount: async () => {
        const provider = await blockchainService.getWalletProvider();
        const accounts = await provider.send("eth_requestAccounts", []);
        return accounts[0];
    },

    insure: async (contractAddress, amountToPay, quantity, insuranceInclude) => {
        try {
            // Request access to the user's MetaMask account
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Create a new provider and signer
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Get the amount to send in Ether (ETH)
            const amountToSend = amountToPay;
            const amountToApprove = ethers.parseUnits(amountToSend, 6);
            console.log(`Amount to send: ${amountToApprove}`);

            // Create contracts instances
            const contract = new ethers.Contract(contractAddress, TOKEN_ABI_INSURANCE, signer);
            const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, [ USDC_ABI_APPROVE ], signer);

            // Estimate gas for the transaction
            const gasEstimateApproveUsdc = await usdcContract.approve.estimateGas(contractAddress, amountToApprove);
            const gasEstimateBnUsdc = ethers.toBigInt(gasEstimateApproveUsdc);
            console.log(`Estimated USDC Gas: ${gasEstimateBnUsdc}`);

            try {
                const txUsdcResponse = await usdcContract.approve(contractAddress, amountToApprove, { 
                    gasLimit: gasEstimateBnUsdc + ethers.parseUnits("10000", "wei")
                });
                await txUsdcResponse.wait();
                console.log(txUsdcResponse);
            } catch (error) {
                console.error("Failed to approve USDC", err);
                return false;
            }

            // Estimate gas for the transaction
            // const gasEstimate = await contract.hireInsurance.estimateGas(quantity, { value: amountToApprove });
            console.log(`Quantity to insure: ${quantity}`);
            const gasEstimate = await contract.hireInsurance.estimateGas(quantity);
            const gasEstimateBn = ethers.toBigInt(gasEstimate);
            console.log(`Estimated Gas: ${gasEstimateBn}`);

            // Set gas limit plus amount to pay the fee
            const gasLimit = gasEstimateBn + (ethers.parseUnits("10000", "wei"));
            console.log(`Gas Limit: ${gasLimit.toString()}`);

            // Create transaction object
            const tx = {
                gasLimit: gasLimit
            };

            try {
                const txResponse = await contract.hireInsurance(quantity, tx);
                console.log('Transaction Sent:', txResponse);

                // Wait for the transaction to be mined
                const receipt = await txResponse.wait();
                console.log('Transaction Mined:', receipt);
                return receipt;
            } catch (err) {
                console.error("Failed to buy asset", err);
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
};

export default blockchainService;
