import { FC, useContext, useEffect, useRef, useState } from 'react';
import axios from "axios";
import React from 'react'
import { ethers } from 'ethers'
import { Network, Alchemy, NftTokenType } from 'alchemy-sdk'
import { TokenResponse } from '../../types';
import { WalletState } from '@web3-onboard/core';
import erc721abi from '../../artifacts/erc721-abi.json'
import erc1155abi from '../../artifacts/erc1155-abi.json'

type Props = {
  token: TokenResponse
}

const NftCard: FC<Props> = (data) => {

  let img = data.token.rawImageUrl?.split("://")
  const finalImg = "https://ipfs.io/ipfs/" + img[1];
  const divStyle = {
    backgroundImage: 'url(' + finalImg + ')'
  }
  return (
    <div>
      <div className="w-80 bg-white shadow rounded">
        <div className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center" style={divStyle}>

        </div>
        <div className="p-4 flex flex-col items-center">
          <h1 className="text-gray-800 text-center mt-1">{data.token.name}</h1>
          <p className="text-center text-gray-800 mt-1">0.005 ETH</p>
          {/* <div className="inline-flex items-center mt-2">
            <button className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/> 
              </svg>
            </button>
            <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">2</div>
            <button className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/> 
              </svg>
            </button>
          </div> */}
          <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
            Mint To
          </button>
        </div> 
      </div> 
    </div>
  )
}

export default NftCard;