import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import { ERC721_ABI, ERC1155_ABI } from '@/config/abis';
import { NFTMetadata } from '@/types/nft';
import { fetchIPFSMetadata } from '@/utils/ipfs';

export function useNFTMetadata(
  nftAddress: `0x${string}`,
  tokenId: bigint,
  isERC721: boolean = true
) {
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { data: tokenURI } = useContractRead({
    address: nftAddress,
    abi: isERC721 ? ERC721_ABI : ERC1155_ABI,
    functionName: isERC721 ? 'tokenURI' : 'uri',
    args: [tokenId],
    enabled: Boolean(nftAddress && tokenId),
  });

  useEffect(() => {
    async function getMetadata() {
      if (!tokenURI) return;
      
      try {
        setIsLoading(true);
        const data = await fetchIPFSMetadata<NFTMetadata>(tokenURI);
        if (data) {
          setMetadata(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch metadata'));
      } finally {
        setIsLoading(false);
      }
    }

    getMetadata();
  }, [tokenURI]);

  return { metadata, isLoading, error };
}