import { useReadContract, useWriteContract } from 'wagmi';
import { ERC721_ABI, ERC1155_ABI } from '@/config/abis';
import { useState, useEffect } from 'react';

export function useNFTApproval(
  nftAddress: `0x${string}`,
  tokenId: bigint,
  spender: `0x${string}`,
  isERC721: boolean = true
) {
  const [isApproved, setIsApproved] = useState(false);

  const { data: approvalData } = useReadContract({
    address: nftAddress,
    abi: isERC721 ? ERC721_ABI : ERC1155_ABI,
    functionName: isERC721 ? 'getApproved' : 'isApprovedForAll',
    args: isERC721 ? [tokenId] : [nftAddress, spender],
  });

  const { writeContract: approve, isPending: isApproving } = useWriteContract();

  const handleApprove = () => {
    approve({
      address: nftAddress,
      abi: isERC721 ? ERC721_ABI : ERC1155_ABI,
      functionName: isERC721 ? 'approve' : 'setApprovalForAll',
      args: isERC721 ? [spender, tokenId] : [spender, true],
    });
  };

  useEffect(() => {
    if (typeof approvalData === 'string') {
      setIsApproved(isERC721 
        ? approvalData === spender 
        : Boolean(approvalData));
    } else {
      setIsApproved(Boolean(approvalData));
    }
  }, [approvalData, spender, isERC721]);

  return { isApproved, approve: handleApprove, isApproving };
}