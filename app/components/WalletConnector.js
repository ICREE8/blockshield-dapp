import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnector = ({ onConnect, onDisconnect }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
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

    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    onConnect(provider, accounts[0]);
  };

  const disconnectWallet = () => {
    setAccount(null);
    onDisconnect();
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Connected: {account}</p>
          <button onClick={disconnectWallet} className="btn btn-secondary">
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button onClick={connectWallet} className="btn btn-primary">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnector;
