import { useAccount } from 'wagmi';
import { useSwapNFT } from '@/hooks/useSwapNFT';
import { SwapCard } from './SwapCard';

export function UserSwaps() {
  const { address } = useAccount();
  const { 
    userSwaps, 
    acceptSwap, 
    cancelSwap, 
    isAccepting, 
    isCancelling 
  } = useSwapNFT();

  const handleAccept = (swapId: string | number) => {
    acceptSwap({ swapId });
  };

  const handleCancel = (swapId: string | number) => {
    cancelSwap(swapId);
  };

  if (!address || !userSwaps?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No swaps found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {userSwaps.map((swap, index) => (
        <SwapCard
          key={index}
          swap={swap}
          index={index}
          onAccept={handleAccept}
          onCancel={handleCancel}
          isAccepting={isAccepting}
          isCancelling={isCancelling}
        />
      ))}
    </div>
  );
}