import { useNFTMetadata } from '@/hooks/useNFTMetadata';
import { NFTImage } from './NFTImage';
import { shortenAddress } from '@/utils/formatters';

interface NFTDisplayProps {
  nftAddress: `0x${string}`;
  nftId: bigint;
  showAddress?: boolean;
}

export function NFTDisplay({ nftAddress, nftId, showAddress = true }: NFTDisplayProps) {
  const { metadata, isLoading } = useNFTMetadata(nftAddress, nftId);

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl h-[400px] w-full animate-pulse" />
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
      <NFTImage 
        src={metadata?.image} 
        alt={metadata?.name}
        className="w-full h-[300px] object-cover"
      />
      <div className="p-6 space-y-3">
        <h3 className="text-lg font-semibold text-white">
          {metadata?.name || 'Unnamed NFT'}
        </h3>
        {showAddress && (
          <p className="text-sm text-white/60">
            Contract: <span className="text-white font-medium">{shortenAddress(nftAddress)}</span>
          </p>
        )}
        <p className="text-sm text-white/60">
          Token ID: <span className="text-white font-medium">{nftId.toString()}</span>
        </p>
      </div>
    </div>
  );
}