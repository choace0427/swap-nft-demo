import { ConnectButton } from './ConnectButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="border-b">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">SwapNFT</h1>
          <ConnectButton />
        </div>
      </header>
      {children}
    </div>
  );
}