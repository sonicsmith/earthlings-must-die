require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-etherscan');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  solidity: '0.8.9',
  networks: {
    mumbai: {
      url: 'https://rpc.ankr.com/polygon_mumbai',
      chainId: 80001,
      accounts: process.env.DEPLOYMENT_PRIVATE_KEY
        ? [process.env.DEPLOYMENT_PRIVATE_KEY]
        : [],
    },
  },
  // etherscan: {
  //   apiKey: process.env.POLYGONSCAN_API_KEY,
  // },
};
