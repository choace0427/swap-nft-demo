import { formatEther, formatUnits, parseEther, parseUnits } from 'viem';

/**
 * Formats an address to a shortened display format
 * @param address The full address
 * @param startLength Number of characters to show at start
 * @param endLength Number of characters to show at end
 */
export function shortenAddress(
  address: string | undefined,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address) return '';
  if (address.length < startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

/**
 * Formats a timestamp to a human-readable date
 * @param timestamp Unix timestamp in seconds
 */
export function formatDate(timestamp: number | bigint): string {
  return new Date(Number(timestamp) * 1000).toLocaleString();
}

/**
 * Formats deadline to remaining time
 * @param deadline Unix timestamp in seconds
 */
export function formatDeadline(deadline: bigint): string {
  const now = BigInt(Math.floor(Date.now() / 1000));
  if (deadline < now) return 'Expired';
  
  const diff = Number(deadline - now);
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

/**
 * Formats amount with specified decimals
 * @param amount Amount in wei
 * @param decimals Number of decimals
 */
export function formatAmount(amount: bigint, decimals: number = 18): string {
  try {
    return formatUnits(amount, decimals);
  } catch {
    return '0';
  }
}

/**
 * Parses amount to wei
 * @param amount Amount as string
 * @param decimals Number of decimals
 */
export function parseAmount(amount: string, decimals: number = 18): bigint {
  try {
    return parseUnits(amount, decimals);
  } catch {
    return 0n;
  }
}

/**
 * Formats NFT amount for display
 * @param amount Amount of NFTs
 */
export function formatNFTAmount(amount: bigint): string {
  return amount === 1n ? '1 token' : `${amount.toString()} tokens`;
}

/**
 * Validates Ethereum address
 * @param address Address to validate
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}