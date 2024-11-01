import { Swap } from '@/types/contracts';
import { NFTDisplay } from '@/components/NFT/NFTDisplay';
import { shortenAddress, formatDeadline, formatNFTAmount } from '@/utils/formatters';

interface SwapCardProps {
  swap: Swap;
  index: number;
  onAccept: (index: number) => void;
  onCancel: (index: number) => void;
  isAccepting?: boolean;
  isCancelling?: boolean;
}

export function SwapCard({
  swap,
  index,
  onAccept,
  onCancel,
  isAccepting,
  isCancelling,
}: SwapCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg overflow-hidden">
          <NFTDisplay 
            nftAddress={swap.swapOffer.nftAddress}
            nftId={swap.swapOffer.nftId}
          />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[#CBD5E1]">
              Initiator: <span className="text-[#F8FAFC] font-medium">{shortenAddress(swap.initiator)}</span>
            </p>
            <p className="text-white/60">
              Amount: <span className="text-white font-medium">{formatNFTAmount(swap.swapOffer.nftAmount)}</span>
            </p>
            {swap.deadline > 0n && (
              <p className="text-white/60">
                Expires in: <span className="text-white font-medium">{formatDeadline(swap.deadline)}</span>
              </p>
            )}
            {swap.secondUser !== '0x0000000000000000000000000000000000000000' && (
              <p className="text-white/60">
                For: <span className="text-white font-medium">{shortenAddress(swap.secondUser)}</span>
              </p>
            )}
          </div>
          
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => onAccept(index)}
              disabled={isAccepting}
              className="flex-1 px-6 py-3 bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA] text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/25"
            >
              {isAccepting ? 'Accepting...' : 'Accept'}
            </button>
            
            <button
              onClick={() => onCancel(index)}
              disabled={isCancelling}
              className="flex-1 px-6 py-3 bg-gradient-to-br from-[#DC2626] via-[#EF4444] to-[#F87171] text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-red-500/25"
            >
              {isCancelling ? 'Cancelling...' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}