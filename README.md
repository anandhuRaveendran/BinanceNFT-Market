# BinanceNFT Marketplace

This repository contains the Solidity smart contract for an BinanceNFT Marketplace, built to facilitate both primary and secondary sales of NFTs. Users can mint NFTs, list them for sale, and engage in secondary market transactions. The contract is designed to be upgradable for future enhancements and includes comprehensive event logging for transparency.

## Key Features

- **Primary Sales**: Users can mint NFTs and list them for sale directly on the marketplace.
- **Secondary Sales**: NFTs can be resold, with transaction details logged for transparency.
- **Minting & Listing**: Users can mint their own NFTs and list them for sale.
- **Event Logging**: The contract emits events for minting, listing, and transfers to ensure transparency.
- **Upgradability**: The contract has been designed with upgradability in mind to accommodate future features and improvements.

### ENV Setup

- Make sure to replace the `PRIVATE_KEY`, `INFURA_URL`, `ETHERSCAN_API_KEY`, and other sensitive credentials in the `.env` file with your own credentials for secure transaction handling.

## Steps
```
npm i
npx hardhat compile
```
```
npx hardhat ignition deploy ./ignition/modules/Binance.js
```
```
npx hardhat ignition deploy ./ignition/modules/Binanceup.js
```
## For Testing
```
npx hardhat test
```
## Contract Deployment BinanceNFT

```
https://sepolia.etherscan.io/address/0x5FbDB2315678afecb367f032d93F642f64180aa3
```
## Contract Deployment BinanceNFTUUPS

```
https://sepolia.etherscan.io/address/0x5FbDB2315678afecb367f032d93F642f64180aa3

```
## Tools

![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat&logo=solidity&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=flat&logo=ethereum&logoColor=white)
![NFT](https://img.shields.io/badge/NFT-FF5733?style=flat&logo=ethereum&logoColor=white)
![Hardhat](https://img.shields.io/badge/Hardhat-ff6c37?style=flat&logo=hardhat&logoColor=white)
![Infura](https://img.shields.io/badge/Infura-FF533B?style=flat&logo=infura&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)



