// Key for storing contract addresses in localStorage
const CONTRACT_ADDRESSES_KEY = 'znode_contract_addresses';

/**
 * Save deployed contract addresses to localStorage
 * @param addresses Record of chain IDs to contract addresses
 */
export const saveContractAddresses = (addresses: Record<string, string>): void => {
  try {
    localStorage.setItem(CONTRACT_ADDRESSES_KEY, JSON.stringify(addresses));
  } catch (error) {
    console.error('Error saving contract addresses to localStorage:', error);
  }
};

/**
 * Load deployed contract addresses from localStorage
 * @returns Record of chain IDs to contract addresses, or empty object if none found
 */
export const loadContractAddresses = (): Record<string, string> => {
  try {
    const data = localStorage.getItem(CONTRACT_ADDRESSES_KEY);
    if (!data) return {};

    return JSON.parse(data) as Record<string, string>;
  } catch (error) {
    console.error('Error loading contract addresses from localStorage:', error);
    return {};
  }
};

/**
 * Add or update a contract address for a specific chain
 * @param chainId The chain ID
 * @param address The contract address
 */
export const updateContractAddress = (chainId: string, address: string): void => {
  try {
    const addresses = loadContractAddresses();
    addresses[chainId] = address;
    saveContractAddresses(addresses);
  } catch (error) {
    console.error('Error updating contract address:', error);
  }
};

/**
 * Get a contract address for a specific chain
 * @param chainId The chain ID
 * @returns The contract address or undefined if not found
 */
export const getContractAddress = (chainId: string): string | undefined => {
  try {
    const addresses = loadContractAddresses();
    return addresses[chainId];
  } catch (error) {
    console.error('Error getting contract address:', error);
    return undefined;
  }
};

/**
 * Check if a contract address exists for a specific chain
 * @param chainId The chain ID
 * @returns True if a contract address exists for the chain
 */
export const hasContractAddress = (chainId: string): boolean => {
  return !!getContractAddress(chainId);
};
