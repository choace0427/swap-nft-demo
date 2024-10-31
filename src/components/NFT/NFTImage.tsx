import Image from 'next/image';
import { getImageUrl } from '@/utils/ipfs';

interface NFTImageProps {
  src?: string;
  alt?: string;
}

export function NFTImage({ src, alt = 'NFT' }: NFTImageProps) {
  return (
    <div className="relative aspect-square w-full">
      <Image
        src={getImageUrl(src)}
        alt={alt}
        fill
        className="object-cover rounded-lg"
      />
    </div>
  );
}