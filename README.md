# Humans Must Die

A web2.5 Pay-to-Earn game based on simple smart contract logic.

Players purchase "alien eggs" which hatch into alien species.
Each species is an ERC721 token on Polygon.
Aliens get an onchain value for strength which is randomized using a Chainlink Oracle.

At any one time, 4 species are invading earth.
Aliens can then be sent to earth by a player.
When a new alien species attacks earth it knocks the lowest strength alien species back to the owner.
Every round each invading species gathers humans.
These can then be traded for a set value in the native token of the network.

Main stack:

- Turborepo
- Nextjs
- Hardhat
- WAGMI
- React Three Fiber
- Tailwind
- Zustand

## Setup

Run contract tests:

```
npm run test
```

## Deploy Contracts

From the `packages/chain` directory:

```
npm run deployAliens
```

Copy the deployed address into chain/index/ADDRESSES/mumbai/ALIENS

```
npm run deployEquipment
```

Copy the deployed address into chain/index/ADDRESSES/mumbai/EQUIPMENT

```
npm run deployBattlefield
```

Copy the deployed address into chain/index/ADDRESSES/mumbai/BATTLEFIELD

```
npm run task:setupContracts
npm run task:verifyContracts
```
