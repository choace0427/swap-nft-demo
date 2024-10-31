export interface NFTMetadata {
    name?: string;
    description?: string;
    image?: string;
    attributes?: Array<{
      trait_type: string;
      value: string | number;
    }>;
  }
  
  export type NFTStandard = 'ERC721' | 'ERC1155';