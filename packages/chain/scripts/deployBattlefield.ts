import { ethers } from 'hardhat';

async function main() {
  // Deploy BattlefieldEarth
  console.log('Deploying BattlefieldEarth contract...');
  const BattlefieldEarth = await ethers.getContractFactory('BattlefieldEarth');
  const battlefieldEarth = await BattlefieldEarth.deploy();
  await battlefieldEarth.deployed();
  console.log(`BattlefieldEarth deployed to: ${battlefieldEarth.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
