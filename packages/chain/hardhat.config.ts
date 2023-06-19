import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
require('@nomiclabs/hardhat-etherscan');

import './tasks/verifyContracts';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    mumbai: {
      url: 'https://rpc.ankr.com/polygon_mumbai',
      chainId: 80001,
      accounts: process.env.DEPLOYMENT_PRIVATE_KEY
        ? [process.env.DEPLOYMENT_PRIVATE_KEY]
        : [],
      gasPrice: 150000000000,
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
};

export default config;
