import { ethers } from 'ethers';

const DEFAULT_GAS_PRICE = 20 * 10 ** 9; // 20 Gwei

const blockchainService = {
    getAmountToPay: async () => {
        // TODO: recuperar o valor a partir do contrato em tempo real
        return 0.01; // 0.01 ETH
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
        const accounts = await blockchainService.getWalletProvider().send("eth_requestAccounts", []);
        return accounts[0];
    },

    insure: async (contractAddress, quantity, insuranceInclude) => {
        try {
            // Request access to the user's MetaMask account
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Create a new provider and signer
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Get the amount to send in Ether (ETH)
            const amountToSend = await blockchainService.getAmountToPay().toString();

            // Create a new contract instance
            const contract = new ethers.Contract(contractAddress, [
                "function hireInsurance(uint256 quantity_) external payable nonReentrant returns (bool)"
            ], signer);

            // Estimate gas for the transaction
            const gasEstimate = await contract.estimateGas.hireInsurance(quantity, { value: amountToSend });
            console.log(`Estimated Gas: ${gasEstimate.toString()}`);

            // Set gas price (optional)
            const gasPrice = await provider.getGasPrice();
            console.log(`Gas Price: ${gasPrice.toString()}`);

            // Create transaction object
            const tx = {
                to: contractAddress,
                value: ethers.parseEther(amountToSend),
                gasLimit: gasEstimate.mul(2n), // Safety buffer
                gasPrice: gasPrice
            };

            // Send the transaction
            if (insuranceInclude) {
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
            } else {
                // TODO: Invoke the contract without insurance hiring
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
};

export default blockchainService;
