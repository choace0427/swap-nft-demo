const IPFS_GATEWAY_URLS = [
    'https://ipfs.io/ipfs/',
    'https://gateway.pinata.cloud/ipfs/',
    'https://cloudflare-ipfs.com/ipfs/',
    'https://gateway.ipfs.io/ipfs/',
  ];
  
  /**
   * Converts IPFS URI to HTTP URL
   * @param uri IPFS URI or HTTP URL
   * @param preferredGateway Optional preferred IPFS gateway
   */
  export function resolveIPFSUri(
    uri: string | undefined,
    preferredGateway: string = IPFS_GATEWAY_URLS[0]
  ): string {
    if (!uri) return '';
  
    // If already HTTP URL, return as is
    if (uri.startsWith('http')) {
      return uri;
    }
  
    // Handle ipfs:// protocol
    if (uri.startsWith('ipfs://')) {
      return `${preferredGateway}${uri.replace('ipfs://', '')}`;
    }
  
    // Handle ipfs/Qm... format
    if (uri.startsWith('ipfs/')) {
      return `${preferredGateway}${uri.replace('ipfs/', '')}`;
    }
  
    // Handle Qm... format
    if (uri.startsWith('Qm')) {
      return `${preferredGateway}${uri}`;
    }
  
    return uri;
  }
  
  /**
   * Fetches metadata from IPFS with fallback gateways
   * @param uri IPFS URI or HTTP URL
   */
  export async function fetchIPFSMetadata<T>(uri: string): Promise<T | null> {
    const errors: Error[] = [];
  
    // Try each gateway in sequence
    for (const gateway of IPFS_GATEWAY_URLS) {
      try {
        const url = resolveIPFSUri(uri, gateway);
        const response = await fetch(url, { cache: 'force-cache' });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        errors.push(error as Error);
        continue;
      }
    }
  
    console.error('Failed to fetch metadata from all gateways:', errors);
    return null;
  }
  
  /**
   * Uploads file to IPFS (example implementation)
   * Note: Requires appropriate IPFS service credentials
   * @param file File to upload
   */
  export async function uploadToIPFS(file: File): Promise<string | null> {
    try {
      // Example using Pinata - replace with your preferred IPFS service
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
        body: formData,
      });
  
      if (!response.ok) throw new Error('Upload failed');
  
      const data = await response.json();
      return `ipfs://${data.IpfsHash}`;
    } catch (error) {
      console.error('Failed to upload to IPFS:', error);
      return null;
    }
  }
  
  /**
   * Validates IPFS URI
   * @param uri URI to validate
   */
  export function isValidIPFSUri(uri: string): boolean {
    return (
      uri.startsWith('ipfs://') ||
      uri.startsWith('Qm') ||
      uri.startsWith('ipfs/') ||
      IPFS_GATEWAY_URLS.some(gateway => uri.startsWith(gateway))
    );
  }
  
  /**
   * Gets image URL with fallback
   * @param uri Image URI
   */
  export function getImageUrl(uri: string | undefined): string {
    if (!uri) return '/placeholder.png'; // Add a placeholder image in your public folder
    return resolveIPFSUri(uri);
  }