import { useState } from 'react';
import { useSwapNFT } from '@/hooks/useSwapNFT';
import { useNFTApproval } from '@/hooks/useNFTApproval';
import { SWAP_NFT_ADDRESS } from '@/config/contracts';
import { parseAmount, isValidAddress } from '@/utils/formatters';
import { toast } from 'react-hot-toast';

interface FormData {
  nftAddress: string;
  nftId: string;
  nftAmount: string;
  secondUser: string;
  deadline: string;
  isERC721: boolean;
  requestNFTs: {
    nftAddress: string;
    nftId: string;
    nftAmount: string;
  }[];
}

export function SwapNFTForm() {
  const [formData, setFormData] = useState<FormData>({
    nftAddress: '',
    nftId: '',
    nftAmount: '1',
    secondUser: '',
    deadline: '',
    isERC721: true,
    requestNFTs: [{ nftAddress: '', nftId: '', nftAmount: '1' }]
  });

  const { proposeSwap, isProposing } = useSwapNFT();
  const { isApproved, approve, isApproving } = useNFTApproval(
    formData.nftAddress as `0x${string}`,
    BigInt(formData.nftId || '0'),
    SWAP_NFT_ADDRESS,
    formData.isERC721
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidAddress(formData.nftAddress)) {
      toast.error('Invalid NFT address');
      return;
    }

    if (!isApproved) {
      toast.error('Please approve the NFT first');
      return;
    }

    try {
      console.log('Form Data:', formData);
      
      const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      
      await proposeSwap({
        offerNFT: {
          nftAddress: formData.nftAddress,
          nftId: formData.nftId,
          nftAmount: formData.nftAmount || "1"
        },
        requestNFTs: [[
          {
            nftAddress: formData.requestNFTs[0].nftAddress,
            nftId: formData.requestNFTs[0].nftId,
            nftAmount: formData.requestNFTs[0].nftAmount || "1"
          }
        ]],
        secondUser: formData.secondUser,
        deadline
      });
    } catch (error) {
      console.error('Error in form submission:', error);
      toast.error('Failed to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#CBD5E1] mb-2">
            NFT Address
          </label>
          <input
            type="text"
            value={formData.nftAddress}
            onChange={(e) => setFormData({ ...formData, nftAddress: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[#F8FAFC] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="0x..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#CBD5E1] mb-2">
            Token ID
          </label>
          <input
            type="number"
            value={formData.nftId}
            onChange={(e) => setFormData({ ...formData, nftId: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[#F8FAFC] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#CBD5E1] mb-2">
            Amount
          </label>
          <input
            type="number"
            value={formData.nftAmount}
            onChange={(e) => setFormData({ ...formData, nftAmount: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[#F8FAFC] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#CBD5E1] mb-2">
            Recipient Address (Optional)
          </label>
          <input
            type="text"
            value={formData.secondUser}
            onChange={(e) => setFormData({ ...formData, secondUser: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[#F8FAFC] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="0x..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#CBD5E1] mb-2">
            Deadline (Optional)
          </label>
          <input
            type="datetime-local"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[#F8FAFC] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.isERC721}
            onChange={(e) => setFormData({ ...formData, isERC721: e.target.checked })}
            className="w-5 h-5 bg-white/5 border-white/10 rounded text-blue-500 focus:ring-blue-500/50"
          />
          <label className="text-sm text-[#F8FAFC]">
            Is ERC721?
          </label>
        </div>
      </div>

      {!isApproved && (
        <button
          type="button"
          onClick={() => approve?.()}
          disabled={isApproving}
          className="w-full px-6 py-3 bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA] text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/25"
        >
          {isApproving ? 'Approving...' : 'Approve NFT'}
        </button>
      )}

      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#CBD5E1] mb-2">
          Requested NFTs
        </label>
        {formData.requestNFTs.map((nft, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg space-y-3">
            <input
              type="text"
              value={nft.nftAddress}
              onChange={(e) => {
                const newRequestNFTs = [...formData.requestNFTs];
                newRequestNFTs[index].nftAddress = e.target.value;
                setFormData({ ...formData, requestNFTs: newRequestNFTs });
              }}
              placeholder="NFT Address"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[#F8FAFC] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <input
              type="number"
              value={nft.nftId}
              onChange={(e) => {
                const newRequestNFTs = [...formData.requestNFTs];
                newRequestNFTs[index].nftId = e.target.value;
                setFormData({ ...formData, requestNFTs: newRequestNFTs });
              }}
              placeholder="Token ID"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[#F8FAFC] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <input
              type="number"
              value={nft.nftAmount}
              onChange={(e) => {
                const newRequestNFTs = [...formData.requestNFTs];
                newRequestNFTs[index].nftAmount = e.target.value;
                setFormData({ ...formData, requestNFTs: newRequestNFTs });
              }}
              placeholder="Amount"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[#F8FAFC] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              min="1"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData({
            ...formData,
            requestNFTs: [...formData.requestNFTs, { nftAddress: '', nftId: '', nftAmount: '1' }]
          })}
          className="text-[#60A5FA] hover:text-[#93C5FD] font-semibold transition-colors duration-200"
        >
          + Add Another NFT
        </button>
      </div>

      <button
        type="submit"
        disabled={isProposing || !isApproved}
        className="w-full px-6 py-3 bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA] text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/25"
      >
        {isProposing ? 'Proposing...' : 'Propose Swap'}
      </button>
    </form>
  );
}