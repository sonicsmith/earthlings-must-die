import { ethers } from 'hardhat';

async function main() {
  // Deploy Aliens and Equipment contracts
  console.log('Deploying Aliens contract...');
  const Aliens = await ethers.getContractFactory('Aliens');
  const aliens = await Aliens.deploy();
  await aliens.deployed();
  console.log(`Aliens deployed to: ${aliens.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
