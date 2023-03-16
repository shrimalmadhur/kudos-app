// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Network, Alchemy, AlchemySettings } from 'alchemy-sdk'
import { TokenResponse } from '../../../../../../../types'

type Data = {
  names: TokenResponse[]
}

const alchemyAPIKey = process.env.NEXT_ALCHEMY_API_KEY || ""
const goerliAlchemyAPIKey = process.env.NEXT_GOERLI_ALCHEMY_API_KEY || ""


/**
 * 
 * [
  {
    contract: {
      address: '0xe611e14b7ea8113daf1a299949ffee6786259eb2',
      name: 'Kudos Collection',
      symbol: undefined,
      totalSupply: undefined,
      tokenType: 'ERC1155',
      openSea: [Object],
      contractDeployer: '0xe948f570bed62adbe9aa02a0e6928bb59d489376',
      deployedBlockNumber: 8657420
    },
    tokenId: '0',
    tokenType: 'ERC1155',
    title: 'Rosetta Contributor',
    description: 'Collectible for contribution to Rosetta. Thanks for the contribution!',
    timeLastUpdated: '2023-03-16T06:34:43.274Z',
    metadataError: undefined,
    rawMetadata: {
      name: 'Rosetta Contributor',
      image: 'ipfs://QmPvZ4dGnj8Qpx38bKfRdjRjrRfGZYtC6K5o6aDTMJENkh/sample.jpg',
      description: 'Collectible for contribution to Rosetta. Thanks for the contribution!'
    },
    tokenUri: {
      gateway: 'https://ipfs.io/ipfs/QmPXFpvwvWi7LbMDJfJiVkAF6mk2rC14o2okXeAhtgmDBJ/0.json',
      raw: 'ipfs://QmPXFpvwvWi7LbMDJfJiVkAF6mk2rC14o2okXeAhtgmDBJ/0.json'
    },
    media: [ [Object] ],
    spamInfo: undefined
  },
  {
    contract: {
      address: '0xe611e14b7ea8113daf1a299949ffee6786259eb2',
      name: 'Kudos Collection',
      symbol: undefined,
      totalSupply: undefined,
      tokenType: 'ERC1155',
      openSea: [Object],
      contractDeployer: '0xe948f570bed62adbe9aa02a0e6928bb59d489376',
      deployedBlockNumber: 8657420
    },
    tokenId: '1',
    tokenType: 'ERC1155',
    title: 'Rosetta Contributor - 2',
    description: 'New Collectible for contribution to Rosetta. Thanks for the contribution!',
    timeLastUpdated: '2023-03-16T06:34:43.223Z',
    metadataError: undefined,
    rawMetadata: {
      name: 'Rosetta Contributor - 2',
      image: 'ipfs://QmPvZ4dGnj8Qpx38bKfRdjRjrRfGZYtC6K5o6aDTMJENkh/rosetta.png',
      description: 'New Collectible for contribution to Rosetta. Thanks for the contribution!'
    },
    tokenUri: {
      gateway: 'https://ipfs.io/ipfs/QmPXFpvwvWi7LbMDJfJiVkAF6mk2rC14o2okXeAhtgmDBJ/1.json',
      raw: 'ipfs://QmPXFpvwvWi7LbMDJfJiVkAF6mk2rC14o2okXeAhtgmDBJ/1.json'
    },
    media: [ [Object] ],
    spamInfo: undefined
  }
]
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenResponse[]>
) {

  const settingsMap = {
    mainnet: {
      apiKey: alchemyAPIKey, // Replace with your Alchemy API Key.
      network: Network.ETH_MAINNET, // Replace with your network.
    },
    goerli: {
      apiKey: goerliAlchemyAPIKey, // Replace with your Alchemy API Key.
      network: Network.ETH_GOERLI, // Replace with your network.
    }, 
  }

  if (typeof req.query.address === 'string' && typeof req.query.chainType === 'string') {
    // Optional Config object, but defaults to demo api-key and eth-mainnet.
    let settings: AlchemySettings = settingsMap.mainnet;
    const chainType = req.query.chainType;
    if (chainType === 'goerli') {
      settings = settingsMap.goerli;
    }
  
    const alchemy = new Alchemy(settings);

    const nfts = await alchemy.nft.getNftsForContract(req.query.address);
    const ownedNFT = nfts.nfts
    // console.log(ownedNFT);
    const nftNames: TokenResponse[] = []
    ownedNFT.forEach(element => {
      const nftData = {
        name: element.title,
        contractAddress: element.contract.address,
        tokenId: element.tokenId,
        tokenType: element.tokenType,
        rawImageUrl: element.rawMetadata?.image
      }
      nftNames.push(nftData)
    });
    res.status(200).json(nftNames)
  } else {
    res.status(500)
  }
  
}
