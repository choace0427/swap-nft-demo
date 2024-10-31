import { useSwapNFT } from '@/hooks/useSwapNFT';
import { SwapCard } from './SwapCard';
import { toast } from 'react-hot-toast';

export function ActiveSwaps() {
  const { 
    activeSwaps, 
    acceptSwap, 
    cancelSwap, 
    isAccepting, 
    isCancelling 
  } = useSwapNFT();

  const handleAccept = async (index: number) => {
    console.log('Accepting swap with index:', index);
    try {
      await acceptSwap({ swapId: index });
    } catch (error) {
      console.error('Error accepting swap:', error);
      toast.error('Failed to accept swap');
    }
  };

  const handleCancel = async (index: number) => {
    try {
      await cancelSwap({ args: [BigInt(index)] });
      toast.success('Swap cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling swap:', error);
      toast.error('Failed to cancel swap');
    }
  };

  if (!activeSwaps?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No active swaps found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {activeSwaps.map((swap, index) => (
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