import type { AppProps } from 'next/app';
import { PrivyProvider } from '@privy-io/react-auth';
import { sepolia } from 'wagmi/chains';
import { http } from 'viem';
import { createConfig, WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/Layout';
import { PRIVY_CONFIG } from '@/config/privy';
import '@/styles/globals.css';

const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        config={PRIVY_CONFIG}
      >
        <WagmiProvider config={wagmiConfig}>
          <Layout>
            <Component {...pageProps} />
            <Toaster position="bottom-right" />
          </Layout>
        </WagmiProvider>
      </PrivyProvider>
    </QueryClientProvider>
  );
}