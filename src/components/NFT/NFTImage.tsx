import Image from 'next/image';
import { getImageUrl } from '@/utils/ipfs';

interface NFTImageProps {
  src?: string;
  alt?: string;
}

export function NFTImage({ src, alt = 'NFT' }: NFTImageProps) {
  // Convert IPFS URL to a usable HTTP URL
  const formattedSrc = src && src.startsWith('ipfs://')
    ? `https://ipfs.io/ipfs/${src.substring(7)}`
    : src;

  return (
    <div className="relative aspect-square w-full">
      <Image
        src={getImageUrl(formattedSrc)} // Ensure getImageUrl can handle the modified src
        alt={alt}
        fill
        className="object-cover rounded-lg"
      />
    </div>
  );
}