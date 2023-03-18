import { FC, useContext, useEffect, useRef, useState } from 'react';
import axios from "axios";
import React from 'react'
import { ethers } from 'ethers'
import { Network, Alchemy, NftTokenType, Wallet } from 'alchemy-sdk'
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
          ? <div className='grid grid-cols-4 gap-4'>{nftData.map(element => {
            return (
              <div className='w-full space-between md:h-auto flex flex-col md:flex-row rounded-full'>
                <NftCard token={element} wallet={data.wallet}></NftCard>
              </div>
            )
          })}</div>
          : "No wallet connected"

      }
    </div>
  )
}

export default ListAllNFT