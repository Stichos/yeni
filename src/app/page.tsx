'use client';

import { WalletProvider } from '@/components/wallet-provider';
import { AirdropClaim } from '@/components/airdrop-claim';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <WalletProvider>
      <HomeContent />
    </WalletProvider>
  );
}

function HomeContent() {
  return (
    <div className="bg-background w-full min-h-screen relative py-[70px]">
      {/* Background gradient */}
      <div className="w-full h-[100vh] max-h-[800px] absolute left-0 top-0 z-0">
        <div
          className="absolute bottom-0 left-0 h-[600px] w-full"
          style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 1))' }}
        />
      </div>

      {/* Stars background - optional */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.1
        }} />
      </div>

      {/* Navbar */}
      <AppNavbar />

      {/* Main content */}
      <div className="pt-24 pb-16 lg:pt-36 lg:pb-24">
        <AirdropClaim />
      </div>
    </div>
  );
}

function AppNavbar() {
  const handleConnectWallet = () => {
    const walletButton = document.querySelector('div[role="button"], button:contains("Connect Wallet")');
    if (walletButton) {
      (walletButton as HTMLElement).click();
    }
  };

  return <Navbar onConnectWallet={handleConnectWallet} />;
}
