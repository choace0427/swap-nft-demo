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
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NFTDisplay 
          nftAddress={swap.swapOffer.nftAddress}
          nftId={swap.swapOffer.nftId}
        />
        
        <div className="space-y-2">
          <p className="font-medium">
            Initiator: {shortenAddress(swap.initiator)}
          </p>
          <p>Amount: {formatNFTAmount(swap.swapOffer.nftAmount)}</p>
          {swap.deadline > 0n && (
            <p>Expires in: {formatDeadline(swap.deadline)}</p>
          )}
          {swap.secondUser !== '0x0000000000000000000000000000000000000000' && (
            <p>For: {shortenAddress(swap.secondUser)}</p>
          )}
          
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => onAccept(index)}
              disabled={isAccepting}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
            >
              {isAccepting ? 'Accepting...' : 'Accept'}
            </button>
            
            <button
              onClick={() => onCancel(index)}
              disabled={isCancelling}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
            >
              {isCancelling ? 'Cancelling...' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}