require('@openzeppelin/hardhat-upgrades');
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: __dirname + '/.env' });
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  networks: {
    hardhat: {
    },
    polygonTestnet: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.ADMIN_PK]
    },
    polygonMainnet: {
      url: "https://polygon-rpc.com/",
      accounts: [process.env.ADMIN_PK]
    },
    gochainMainnet: {
      url: "https://rpc.gochain.io/",
      accounts: [process.env.ADMIN_PK]
    },
    ethereumMainnet: {
      url: "https://mainnet.infura.io/v3/96136349e5e4402eb5cc039210bc6d5e",
      accounts: [process.env.ADMIN_PK]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}