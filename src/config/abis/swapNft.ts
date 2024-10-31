export const SWAP_NFT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ArrayLengthMismatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "DeadlineInvalid",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EmptyProposal",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NftTokenAlreadyAdded",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NftTokenInvalid",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotExpired",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ProposalInvalid",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SwapExpired",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SwapIdInvalid",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Unauthorized",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "previousAdmin",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "AdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "beacon",
        "type": "address"
      }
    ],
    "name": "BeaconUpgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "feeReceiver",
        "type": "address"
      }
    ],
    "name": "FeeReceiverSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "FeeSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "feeToken",
        "type": "address"
      }
    ],
    "name": "FeeTokenSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "nftToken",
        "type": "address"
      }
    ],
    "name": "NftTokenAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "nftToken",
        "type": "address"
      }
    ],
    "name": "NftTokenRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "swapId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "secondUser",
        "type": "address"
      }
    ],
    "name": "SwapAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "swapId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "SwapCancelled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "initiator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "secondUser",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "swapId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "nftAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nftAmount",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct SwapNFT.NftEntry",
        "name": "swapOffer",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "nftAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nftAmount",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct SwapNFT.NftEntry[][]",
        "name": "proposals",
        "type": "tuple[][]"
      }
    ],
    "name": "SwapProposed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "implementation",
        "type": "address"
      }
    ],
    "name": "Upgraded",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "_fee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_feeReceiver",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_feeToken",
    "outputs": [
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "swapId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "nftAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nftAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct SwapNFT.NftEntry[]",
        "name": "swapProposal",
        "type": "tuple[]"
      },
      {
        "internalType": "uint64",
        "name": "proposalId",
        "type": "uint64"
      }
    ],
    "name": "acceptSwap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "activeItems",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "initiator",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "nftAmount",
                "type": "uint256"
              }
            ],
            "internalType": "struct SwapNFT.NftEntry",
            "name": "swapOffer",
            "type": "tuple"
          },
          {
            "internalType": "bytes32[]",
            "name": "proposals",
            "type": "bytes32[]"
          },
          {
            "internalType": "address",
            "name": "secondUser",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "internalType": "struct SwapNFT.Swap[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftToken",
        "type": "address"
      }
    ],
    "name": "addNftToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "swapIds",
        "type": "uint256[]"
      }
    ],
    "name": "cancelExpiredSwaps",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "swapId",
        "type": "uint256"
      }
    ],
    "name": "cancelSwap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "from",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "to",
        "type": "uint256"
      }
    ],
    "name": "expiredListingIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "nftTokens",
        "type": "address[]"
      },
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "feeToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "feeReceiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "isNftToken",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "nftToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC1155BatchReceived",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC1155Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC721Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "nftAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nftAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct SwapNFT.NftEntry",
        "name": "swapOffer",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "nftAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nftId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nftAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct SwapNFT.NftEntry[][]",
        "name": "proposals",
        "type": "tuple[][]"
      },
      {
        "internalType": "address",
        "name": "secondUser",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "proposeSwap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proxiableUUID",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftToken",
        "type": "address"
      }
    ],
    "name": "removeNftToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "setFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "feeReceiver",
        "type": "address"
      }
    ],
    "name": "setFeeReceiver",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "feeToken",
        "type": "address"
      }
    ],
    "name": "setFeeToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalListings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      }
    ],
    "name": "upgradeTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "upgradeToAndCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "usersListingIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "usersListings",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "initiator",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "nftAmount",
                "type": "uint256"
              }
            ],
            "internalType": "struct SwapNFT.NftEntry",
            "name": "swapOffer",
            "type": "tuple"
          },
          {
            "internalType": "bytes32[]",
            "name": "proposals",
            "type": "bytes32[]"
          },
          {
            "internalType": "address",
            "name": "secondUser",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "internalType": "struct SwapNFT.Swap[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;