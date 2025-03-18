'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/components/wallet-provider';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function AirdropClaim() {
  const { isConnected, connectWallet, address, transferTokens, isCorrectChain, switchToOptimism } = useWallet();
  const [randomReward, setRandomReward] = useState<number>(0);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  // Generate random reward between 1000-10000
  useEffect(() => {
    const min = 1000;
    const max = 10000;
    setRandomReward(Math.floor(Math.random() * (max - min + 1)) + min);
  }, []);

  const handleClaimReward = async () => {
    if (!isConnected) {
      try {
        await connectWallet();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        return;
      }
      return;
    }

    if (!isCorrectChain) {
      try {
        await switchToOptimism();
      } catch (error) {
        console.error('Failed to switch to Optimism network:', error);
        return;
      }
      return;
    }

    setIsClaiming(true);

    try {
      const tx = await transferTokens(randomReward);

      if (tx) {
        setTransactionHash(tx.hash);
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 5000);
        }
      }
    } catch (error) {
      console.error('Claim transaction failed:', error);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative z-10">
      <div className="flex flex-col items-center">
        {/* Coin image */}
        <div className="relative w-[200px] h-[200px] mb-8">
          <div className="w-[210px] h-[210px] rounded-full bg-mint-light-green blur-[148px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0"></div>
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 coin-animation">
            <Image
              src="https://ext.same-assets.com/53723560/1956966566.gif"
              alt="MintChain Coin"
              width={150}
              height={150}
              priority
            />
          </div>
        </div>

        {/* Main numbers */}
        <span className="text-[52px] leading-[60px] lg:text-[48px] lg:leading-[56px] font-bold mb-24 reward-glow">
          {isConnected ? randomReward.toLocaleString() : '120,000,000'}
        </span>

        {/* Percentage circles */}
        <div className="relative w-[80vw] h-[42vw] lg:w-[559px] lg:h-[300px]">
          {/* 10% section */}
          <div className="h-30 lg:h-50 flex gap-4 absolute -left-10 lg:left-8 -top-4">
            <span className="text-sm lg:text-base text-right">
              <span className="text-md lg:text-[20px] font-bold text-mint-green">10%</span>
              <br />
              10% of total supply <br />
              is claimable for <br />
              eligible users.
            </span>
            <div className="w-6 h-full relative">
              <div className="w-6 h-6 rounded-full absolute left-0 top-0 bg-mint-green"></div>
              <div
                className="w-[3px] h-full rounded-full absolute left-1/2 -translate-x-1/2 top-2"
                style={{
                  background: 'linear-gradient(to bottom, #36D95F, rgba(54,217,95,0))'
                }}
              ></div>
            </div>
          </div>

          {/* 2% section */}
          <div className="h-30 lg:h-50 flex gap-4 absolute -right-20 lg:-right-8 -top-4">
            <div className="w-6 h-full relative">
              <div className="w-6 h-6 rounded-full absolute left-0 top-0 bg-mint-orange"></div>
              <div
                className="w-[3px] h-full rounded-full absolute left-1/2 -translate-x-1/2 top-2"
                style={{
                  background: 'linear-gradient(to bottom, #FE9202, rgba(254,146,2,0))'
                }}
              ></div>
            </div>
            <span className="text-sm lg:text-base">
              <span className="text-md lg:text-[20px] font-bold text-mint-orange">2%</span>
              <br />
              2% of total supply will<br />
              be airdropped to Mint Forest V3 in 2026.
            </span>
          </div>

          {/* Center content */}
          <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-[78px] lg:top-[120px]">
            <span className="text-sm">$MINT Airdrop</span>
            <span className="text-sm lg:text-[20px] font-bold">12%</span>
            <span className="text-sm lg:text-[20px] font-bold">
              {isConnected ? `${randomReward.toLocaleString()} $MINT` : '120,000,000 $MINT'}
            </span>
          </div>
        </div>
      </div>

      {/* Connect/Claim button */}
      <Button
        onClick={handleClaimReward}
        disabled={isClaiming}
        className={`w-[320px] h-12 rounded-xl mt-8 text-lg font-medium flex items-center justify-center break-keep whitespace-nowrap ${
          isClaiming ? 'opacity-70' : 'hover:brightness-110'
        } bg-mint-green text-black`}
      >
        {isClaiming ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin w-5 h-5 border-2 border-black/20 border-t-black rounded-full"></div>
            Processing...
          </div>
        ) : isConnected ? (
          'Claim Rewards'
        ) : (
          'Connect Wallet'
        )}
      </Button>

      {/* Transaction hash display */}
      {transactionHash && (
        <div className="mt-4 text-sm text-center">
          <p>Transaction submitted!</p>
          <a
            href={`https://optimistic.etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noreferrer"
            className="text-mint-green hover:underline"
          >
            View on Explorer
          </a>
        </div>
      )}

      {/* Success message */}
      {showSuccessMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-mint-green text-black p-4 rounded-md shadow-lg z-50 animate-in fade-in duration-300">
          Successfully claimed {randomReward.toLocaleString()} $MINT!
        </div>
      )}

      {/* Wallet info */}
      {isConnected && address && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">Connected: {`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}</p>
          <p className="text-sm text-mint-green">Network: {isCorrectChain ? 'Optimism' : 'Wrong Network (Switch to Optimism)'}</p>
        </div>
      )}
    </div>
  );
}
