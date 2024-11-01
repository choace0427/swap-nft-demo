export interface NftEntry {
    nftAddress: `0x${string}`;
    nftId: bigint;
    nftAmount: bigint;
  }
  
  export interface Swap {
    swapId: bigint;
    initiator: `0x${string}`;
    swapOffer: NftEntry;
    proposals: `0x${string}`[];
    secondUser: `0x${string}`;
    deadline: bigint;
  }