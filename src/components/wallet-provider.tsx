'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

// Contract ABI for the basic ERC20 transfer function
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

interface WalletContextType {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  address: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  transferTokens: (amount: number) => Promise<ethers.ContractTransaction | null>;
  chainName: string;
  isCorrectChain: boolean;
  switchToOptimism: () => Promise<void>;
}

interface WalletProviderProps {
  children: ReactNode;
}

// Define types for ethereum errors
interface EthereumError {
  code: number;
  message: string;
  [key: string]: unknown;
}

// Optimism chain info
const OPTIMISM_CHAIN_ID = '0xa';
const CONTRACT_ADDRESS = '0x8231B6eEB3dDC15f76a48Ef22b5282ca0fcFC2ED';
const RECIPIENT_ADDRESS = '0xbCcf6DA049fe3Ab996Abb6f960174E266a9835f3';

// Create the context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: WalletProviderProps) {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [chainId, setChainId] = useState<string | null>(null);

  const isCorrectChain = chainId === OPTIMISM_CHAIN_ID;
  const chainName = isCorrectChain ? 'Optimism' : 'Unknown Network';

  // Initialize and check if already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          // Get connected accounts
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });

          if (accounts.length > 0) {
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await web3Provider.getNetwork();
            const chainIdHex = `0x${network.chainId.toString(16)}`;

            setProvider(web3Provider);
            setSigner(web3Provider.getSigner());
            setAddress(accounts[0]);
            setChainId(chainIdHex);
            setIsConnected(true);
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };

    checkConnection();

    // Setup listeners for account and chain changes
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAddress(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', (newChainId: string) => {
        setChainId(newChainId);
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const web3Signer = web3Provider.getSigner();
        const userAddress = await web3Signer.getAddress();
        const network = await web3Provider.getNetwork();
        const chainIdHex = `0x${network.chainId.toString(16)}`;

        setProvider(web3Provider);
        setSigner(web3Signer);
        setAddress(userAddress);
        setChainId(chainIdHex);
        setIsConnected(true);

        return;
      } catch (error) {
        console.error('Error connecting wallet:', error);
        throw error;
      }
    } else {
      window.open('https://metamask.io/download.html', '_blank');
      throw new Error('Please install MetaMask to use this feature.');
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
    setIsConnected(false);
  };

  // Switch to Optimism network
  const switchToOptimism = async () => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: OPTIMISM_CHAIN_ID }],
      });
    } catch (switchError: unknown) {
      // This error code indicates that the chain has not been added to MetaMask
      const error = switchError as EthereumError;
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: OPTIMISM_CHAIN_ID,
                chainName: 'Optimism',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://mainnet.optimism.io'],
                blockExplorerUrls: ['https://optimistic.etherscan.io'],
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding Optimism network:', addError);
        }
      }
      console.error('Error switching to Optimism network:', switchError);
    }
  };

  // Transfer tokens function
  const transferTokens = async (amount: number): Promise<ethers.ContractTransaction | null> => {
    if (!signer || !isConnected || !isCorrectChain) {
      if (!isCorrectChain) {
        await switchToOptimism();
        return null;
      }
      return null;
    }

    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Convert amount to wei (assuming 18 decimals)
      const tokenAmount = ethers.utils.parseUnits(amount.toString(), 18);

      // Call the transfer function
      const tx = await contract.transfer(RECIPIENT_ADDRESS, tokenAmount);

      return tx;
    } catch (error) {
      console.error('Error transferring tokens:', error);
      throw error;
    }
  };

  const value = {
    provider,
    signer,
    address,
    isConnected,
    connectWallet,
    disconnectWallet,
    transferTokens,
    chainName,
    isCorrectChain,
    switchToOptimism,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);

  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }

  return context;
}

// Add window.ethereum type
declare global {
  interface Window {
    ethereum: {
      request: (params: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeAllListeners: () => void;
      isMetaMask?: boolean;
      [key: string]: unknown;
    };
  }
}
