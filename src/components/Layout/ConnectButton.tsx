import { usePrivy } from '@privy-io/react-auth';
import { useAccount } from 'wagmi';
import { shortenAddress } from '@/utils/formatters';

export function ConnectButton() {
  const { login, ready, authenticated } = usePrivy();
  const { address } = useAccount();

  if (!ready) return null;

  if (!authenticated) {
    return (
      <button
        onClick={login}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Connect
      </button>
    );
  }

  return (
    <div className="px-4 py-2 bg-gray-100 rounded">
      {address && shortenAddress(address)}
    </div>
  );
}