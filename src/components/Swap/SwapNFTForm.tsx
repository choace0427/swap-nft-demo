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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          NFT Address
        </label>
        <input
          type="text"
          value={formData.nftAddress}
          onChange={(e) => setFormData({ ...formData, nftAddress: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="0x..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Token ID
        </label>
        <input
          type="number"
          value={formData.nftId}
          onChange={(e) => setFormData({ ...formData, nftId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          value={formData.nftAmount}
          onChange={(e) => setFormData({ ...formData, nftAmount: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Recipient Address (Optional)
        </label>
        <input
          type="text"
          value={formData.secondUser}
          onChange={(e) => setFormData({ ...formData, secondUser: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="0x..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Deadline (Optional)
        </label>
        <input
          type="datetime-local"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.isERC721}
          onChange={(e) => setFormData({ ...formData, isERC721: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Is ERC721?
        </label>
      </div>

      {!isApproved && (
        <button
          type="button"
          onClick={() => {
            approve?.();
          }}
          disabled={isApproving}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300"
        >
          {isApproving ? 'Approving...' : 'Approve NFT'}
        </button>
      )}

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Requested NFTs
        </label>
        {formData.requestNFTs.map((nft, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              value={nft.nftAddress}
              onChange={(e) => {
                const newRequestNFTs = [...formData.requestNFTs];
                newRequestNFTs[index].nftAddress = e.target.value;
                setFormData({ ...formData, requestNFTs: newRequestNFTs });
              }}
              placeholder="NFT Address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
          className="text-blue-600 hover:text-blue-700"
        >
          + Add Another NFT
        </button>
      </div>

      <button
        type="submit"
        disabled={isProposing || !isApproved}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300"
      >
        {isProposing ? 'Proposing...' : 'Propose Swap'}
      </button>
    </form>
  );
}