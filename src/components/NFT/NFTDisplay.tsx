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
    return <div className="animate-pulse bg-gray-200 rounded-lg h-48 w-full" />;
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <NFTImage src={metadata?.image} alt={metadata?.name} />
      <div className="p-4">
        <h3 className="font-bold">{metadata?.name || 'Unnamed NFT'}</h3>
        {showAddress && (
          <p className="text-sm text-gray-600">
            Contract: {shortenAddress(nftAddress)}
          </p>
        )}
        <p className="text-sm text-gray-600">Token ID: {nftId.toString()}</p>
      </div>
    </div>
  );
}