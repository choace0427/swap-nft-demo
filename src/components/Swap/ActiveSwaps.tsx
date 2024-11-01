import { useSwapNFT } from '@/hooks/useSwapNFT';
import { SwapCard } from './SwapCard';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

export function ActiveSwaps() {
  const { 
    activeSwaps, 
    acceptSwap, 
    cancelSwap 
  } = useSwapNFT();
  
  // Track loading states by swap ID
  const [acceptingSwaps, setAcceptingSwaps] = useState<Set<number>>(new Set());
  const [cancellingSwaps, setCancellingSwaps] = useState<Set<number>>(new Set());

  const handleAccept = async (index: number) => {
    try {
      setAcceptingSwaps(prev => new Set(prev).add(index));
      await acceptSwap({ swapId: index });
    } catch (error) {
      console.error('Error accepting swap:', error);
      toast.error('Failed to accept swap');
    } finally {
      setAcceptingSwaps(prev => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }
  };

  const handleCancelSwap = async (index: number) => {
    try {
      setCancellingSwaps(prev => new Set(prev).add(index));
      await cancelSwap({
        swapId: index
      });
    } catch (error) {
      console.error('Error cancelling swap:', error);
      toast.error('Failed to cancel swap');
    } finally {
      setCancellingSwaps(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
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
    <div className="space-y-6 h-[calc(100vh-theme(spacing.32))] overflow-y-auto">
      {activeSwaps.map((swap, index) => (
        <SwapCard
          key={index}
          swap={swap}
          index={Number(swap.id)}
          onAccept={handleAccept}
          onCancel={handleCancelSwap}
          isAccepting={acceptingSwaps.has(Number(swap.id))}
          isCancelling={cancellingSwaps.has(Number(swap.id))}
        />
      ))}
    </div>
  );
}