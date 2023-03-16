import { FC, useContext, useEffect, useRef, useState } from 'react';
import axios from "axios";
import React from 'react'
import { ethers } from 'ethers'
import { Network, Alchemy, NftTokenType } from 'alchemy-sdk'
import { TokenResponse } from '../../types';
import { WalletState } from '@web3-onboard/core';
import erc721abi from '../../artifacts/erc721-abi.json'
import erc1155abi from '../../artifacts/erc1155-abi.json'
import NftCard from './NftCard';

type Props = {
  wallet?: WalletState
}

const contractAddress = process.env.NEXT_PUBLIC_KUDOS_CONTRACT
const chainType = process.env.NEXT_PUBLIC_CHAIN

const ListAllNFT: FC<Props> = (data) => {

  // const address = data.wallet.accounts[0].address;

  // const chainId = data.wallet.chains[0].id;
  // let chainType = "mainnet"
  // if (chainId == '0x5') {
  //   chainType = 'goerli'
  // }
  const defaultAtta: TokenResponse[] = []
  const [nftData, setNftData] = useState(defaultAtta)

  // const burnToken = async function (token: TokenResponse) {
  //   // create an ethers provider
  //   let ethersProvider
  //   ethersProvider = new ethers.providers.Web3Provider(data.wallet.provider, 'any');

  //   const signer = ethersProvider.getSigner(data.wallet.accounts[0].address);

  //   // explore https://github.com/alephao/erc721-batch-transfer for batch transfer
  //   try {
  //     let nftContract;
  //     if (token.tokenType === NftTokenType.ERC721) {
  //       nftContract = new ethers.Contract(token.contractAddress, erc721abi, signer);
  //       const tx = await nftContract["safeTransferFrom(address,address,uint256)"](address, "0x000000000000000000000000000000000000dead", token.tokenId, { gasPrice: 20e9 })
  //       const receipt = await tx.wait()
  //     } else if (token.tokenType === NftTokenType.ERC1155) {
  //       nftContract = new ethers.Contract(token.contractAddress, erc1155abi, signer);
  //       const tx = await nftContract["safeTransferFrom(address,address,uint256,uint256,bytes)"](address, "0x000000000000000000000000000000000000dead", token.tokenId, 1, ethers.constants.HashZero, { gasPrice: 20e9 })
  //       const receipt = await tx.wait()
  //     } else {
  //       console.log("invalid token type: ", token.tokenType)
  //       return;
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    axios.get('/api/v1/' + chainType + '/nft/contract/' + contractAddress)
      .then(response => {
        setNftData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [contractAddress, chainType])
  return (
    <div className='w-full'>
      {
        nftData
          ? <div className='w-full'>{nftData.map(element => {
            return (
              <div className='w-full space-between md:h-auto flex flex-col md:flex-row rounded-full'>
                <NftCard token={element}></NftCard>
              </div>
            )
          })}</div>
          : "No wallet connected"

      }
    </div>
  )
}

export default ListAllNFT