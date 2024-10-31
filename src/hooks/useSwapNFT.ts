import { useReadContract, useWriteContract, useSimulateContract } from 'wagmi';
import { SWAP_NFT_ADDRESS } from '@/config/contracts';
import { SWAP_NFT_ABI } from '@/config/abis/swapNft';
import { Swap } from '@/types/contracts';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface NFTDetails {
  nftAddress: `0x${string}`;
  nftId: bigint;
  nftAmount: bigint;
}

interface SwapParams {
  offerNFT: {
    nftAddress: `0x${string}`;
    nftId: bigint;
    nftAmount: bigint;
  };
  requestNFTs: {
    nftAddress: `0x${string}`;
    nftId: bigint;
    nftAmount: bigint;
  }[][];
  secondUser: `0x${string}`;
  deadline: bigint;
}

export function useSwapNFT() {
  const [activeSwaps, setActiveSwaps] = useState<Swap[]>([]);
  const [userSwaps, setUserSwaps] = useState<Swap[]>([]);

  // Read total listings
  const { data: totalListings } = useReadContract({
    address: SWAP_NFT_ADDRESS,
    abi: SWAP_NFT_ABI,
    functionName: 'totalListings',
  });

  // Read active items
  const { data: activeItems, refetch: refetchSwaps } = useReadContract({
    address: SWAP_NFT_ADDRESS,
    abi: SWAP_NFT_ABI,
    functionName: 'activeItems',
  });

  // Contract writes
  const { writeContract: proposeSwap, isPending: isProposing, data: txHash } = useWriteContract();
  const { writeContract: acceptSwap, isPending: isAccepting } = useWriteContract();
  const { writeContract: cancelSwap, isPending: isCancelling } = useWriteContract();

  useEffect(() => {
    if (activeItems) {
      setActiveSwaps(activeItems as Swap[]);
    }
  }, [activeItems]);

  const validateSwapParams = (params: SwapParams) => {
    // Check if required fields exist
    if (!params.offerNFT?.nftId || !params.offerNFT?.nftAmount) {
      throw new Error('Offer NFT details are required');
    }

    if (!params.requestNFTs?.[0]?.[0]?.nftId || !params.requestNFTs?.[0]?.[0]?.nftAmount) {
      throw new Error('Request NFT details are required');
    }

    if (!params.deadline) {
      throw new Error('Deadline is required');
    }

    // Validate addresses
    if (!params.offerNFT.nftAddress || !params.offerNFT.nftAddress.startsWith('0x')) {
      throw new Error('Invalid offer NFT address');
    }

    if (!params.secondUser || !params.secondUser.startsWith('0x')) {
      throw new Error('Invalid second user address');
    }

    // Check if deadline is in the future
    const now = Math.floor(Date.now() / 1000);
    if (Number(params.deadline) <= now) {
      throw new Error('Deadline must be in the future');
    }
  };

  const handleProposeSwap = async (params: {
    offerNFT: {
      nftAddress: string;
      nftId: string | number;
      nftAmount: string | number;
    };
    requestNFTs: {
      nftAddress: string;
      nftId: string | number;
      nftAmount: string | number;
    }[][];
    secondUser: string;
    deadline: number;
  }) => {
    if (!proposeSwap) {
      throw new Error('Contract write not available');
    }

    // Add validation first
    if (!params?.offerNFT?.nftAddress) {
      throw new Error('Offer NFT address is required');
    }

    if (!params?.requestNFTs?.[0]?.[0]?.nftAddress) {
      throw new Error('Request NFT address is required');
    }

    try {
      const formattedParams = {
        offerNFT: {
          nftAddress: params.offerNFT.nftAddress as `0x${string}`,
          nftId: BigInt(params.offerNFT.nftId),
          nftAmount: BigInt(params.offerNFT.nftAmount)
        },
        requestNFTs: params.requestNFTs.map(group => 
          group.map(nft => ({
            nftAddress: nft.nftAddress as `0x${string}`,
            nftId: BigInt(nft.nftId),
            nftAmount: BigInt(nft.nftAmount)
          }))
        ),
        secondUser: params.secondUser as `0x${string}`,
        deadline: BigInt(params.deadline)
      };

      const hash = await proposeSwap(
        {
          address: SWAP_NFT_ADDRESS,
          abi: SWAP_NFT_ABI,
          functionName: 'proposeSwap',
          args: [
            formattedParams.offerNFT,
            formattedParams.requestNFTs,
            formattedParams.secondUser,
            formattedParams.deadline
          ]
        },
        {
          onSuccess: (hash) => {
            const proposalStorage = JSON.parse(localStorage.getItem('swapProposals') || '{}');
            const index = activeSwaps.length;
            proposalStorage[index] = formattedParams.requestNFTs.map(group => 
              group.map(nft => ({
                ...nft,
                nftId: nft.nftId.toString(),
                nftAmount: nft.nftAmount.toString()
              }))
            );
            localStorage.setItem('swapProposals', JSON.stringify(proposalStorage));
            toast.success('Swap proposal submitted!');
          },
          onError: (error: any) => {
            toast.error('Failed to propose swap. Please try again.');
            console.error('Swap error:', error);
          }
        }
      );
      return hash;
    } catch (error) {
      console.error('Error proposing swap:', error);
      throw error;
    }
  };

  const handleAcceptSwap = async (args: {
    swapId: string | number;    
  }) => {
    if (!acceptSwap) {
      throw new Error('Contract write not available');
    }

    try {
      const proposalStorage = JSON.parse(localStorage.getItem('swapProposals') || '{}');
      const swapIdNum = Number(args.swapId);
      const hash = await acceptSwap({
        address: SWAP_NFT_ADDRESS,
        abi: SWAP_NFT_ABI,
        functionName: 'acceptSwap',
        args: [BigInt(swapIdNum), proposalStorage[swapIdNum][0], 0n] 
      },
      {
        onSuccess: (tx) => {
          toast.success('Swap accepted successfully!');
        },
        onError: (error: any) => {
          toast.error('Failed to accept swap. Please try again.');
          console.error('Accept swap error:', error);
        }
      });
      return hash;
    } catch (error) {
      console.error('Error accepting swap:', error);
      throw error;
    }
  };

  return {
    activeSwaps,
    userSwaps,
    totalListings,
    proposeSwap: handleProposeSwap,
    acceptSwap: handleAcceptSwap,
    cancelSwap: (args: any) => cancelSwap?.({
      address: SWAP_NFT_ADDRESS,
      abi: SWAP_NFT_ABI,
      functionName: 'cancelSwap',
      args: args.args,
    }),
    isProposing,
    isAccepting,
    isCancelling,
    refetchSwaps,
  };
}