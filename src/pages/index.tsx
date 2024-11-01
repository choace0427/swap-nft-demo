import { usePrivy } from '@privy-io/react-auth';
import { SwapNFTForm } from '@/components/Swap/SwapNFTForm';
import { ActiveSwaps } from '@/components/Swap/ActiveSwaps';
import { UserSwaps } from '@/components/Swap/UserSwaps';

export default function Home() {
  const { ready, authenticated } = usePrivy();

  if (!ready) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Welcome to SwapNFT</h1>
          <p className="text-gray-200">Please connect your wallet to continue</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Create New Swap</h2>
          <SwapNFTForm />
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Active Swaps</h2>
            <ActiveSwaps />
          </div>
        </div>
      </div>
    </main>
  );
}