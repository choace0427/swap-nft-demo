import { PrivyClientConfig } from '@privy-io/react-auth';
import { sepolia } from 'wagmi/chains';

export const PRIVY_CONFIG: PrivyClientConfig = {
  loginMethods: ['email', 'wallet'],
  appearance: {
    theme: 'light',
    accentColor: '#676FFF',
    showWalletLoginFirst: true,
  },
  supportedChains: [sepolia],
};